import { Request, Response } from 'express';
import { getConnection, getCustomRepository } from 'typeorm';

import { parseISO } from 'date-fns';
import CreateAulaService from '../services/CreateAulaService';

import AulasRepository from '../repositories/AulasRepository';
import ModulosRepository from '../repositories/ModulosRepository';

export default class AulasController {
  public async show(request: Request, response: Response): Promise<Response> {
    const aulasRepository = getCustomRepository(AulasRepository);
    const aulas = await aulasRepository.find();

    return response.json(aulas);
  }

  public async showOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const aulasRepository = getCustomRepository(AulasRepository);
    const { id } = request.params;
    const aula = await aulasRepository.findOne(id);

    return response.json(aula);
  }

  public async showByModulo(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const aulasRepository = getCustomRepository(AulasRepository);
    const { modulo } = request.params;

    const aulas = await aulasRepository.find({
      where: { modulo },
    });

    return response.json(aulas);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, modulo, dataAula } = request.body;
    const modulosRepository = getCustomRepository(ModulosRepository);

    const createAula = new CreateAulaService();

    const parsedDate = parseISO(dataAula);

    const checkModuloExists = await modulosRepository.findOne(modulo);

    if (!checkModuloExists) {
      return response
        .status(400)
        .json({ Error: 'This modulo does not exists.' });
    }

    if (modulo != null) {
      await getConnection()
        .createQueryBuilder()
        .update('modulos')
        .set({ qntAulas: () => `${checkModuloExists.qntAulas + 1}` })
        .where('id = :modulo', { modulo })
        .execute();
    }

    const aula = await createAula.execute({
      nome,
      modulo,
      dataAula: parsedDate,
    });

    return response.json(aula);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const aulasRepository = getCustomRepository(AulasRepository);
    const modulosRepository = getCustomRepository(ModulosRepository);
    const { id } = request.params;

    const { nome, modulo, dataAula } = request.body;

    const aula = await aulasRepository.findOne({
      where: { id },
    });

    if (!aula) {
      return response.status(400).json({ Error: 'Aula not found.' });
    }

    const checkModuloExists = await modulosRepository.findOne(modulo);
    const previousModulo = await modulosRepository.findOne(aula.modulo);

    if (!checkModuloExists) {
      return response
        .status(400)
        .json({ Error: 'This modulo does not exists.' });
    }

    if (
      aula.modulo != null &&
      aula.modulo !== modulo &&
      previousModulo != null
    ) {
      const moduloId = aula.modulo;
      await getConnection()
        .createQueryBuilder()
        .update('modulos')
        .set({ qntAulas: () => `${previousModulo.qntAulas - 1}` })
        .where('id = :moduloId', { moduloId })
        .execute();
    }

    if (modulo != null && aula.modulo !== modulo) {
      await getConnection()
        .createQueryBuilder()
        .update('modulos')
        .set({ qntAulas: () => `${checkModuloExists.qntAulas + 1}` })
        .where('id = :modulo', { modulo })
        .execute();
    }

    const parsedDate = parseISO(dataAula);

    const updatedAula = {
      id,
      nome,
      modulo,
      dataAula: parsedDate,
      created_at: aula.created_at,
    };

    await aulasRepository.update(id, updatedAula);

    return response.json(updatedAula);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const aulasRepository = getCustomRepository(AulasRepository);
    const { id } = request.params;

    const aula = await aulasRepository.findOne({
      where: { id },
    });

    if (!aula) {
      return response.status(400).json({ Error: 'Aula not found.' });
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('aulas')
      .where('id = :id', { id })
      .execute();

    return response.status(204).send();
  }
}
