/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { getConnection, getCustomRepository } from 'typeorm';

import CreateModuloService from '../services/CreateModuloService';
import ModulosRepository from '../repositories/ModulosRepository';

export default class ModulosController {
  public async show(request: Request, response: Response): Promise<Response> {
    const modulosRepository = getCustomRepository(ModulosRepository);
    const modulos = await modulosRepository.find();

    return response.json(modulos);
  }

  public async showOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const modulosRepository = getCustomRepository(ModulosRepository);
    const { id } = request.params;
    const modulo = await modulosRepository.findOne(id);

    return response.json(modulo);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;

    const createModulo = new CreateModuloService();

    const modulo = await createModulo.execute({
      nome,
    });

    return response.json(modulo);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const modulosRepository = getCustomRepository(ModulosRepository);

    const { id } = request.params;
    const { nome } = request.body;

    const modulo = await modulosRepository.findOne({
      where: { id },
    });

    if (!modulo) {
      return response.status(400).json({ Error: 'Modulo not found.' });
    }

    const updatedModulo = {
      id,
      nome,
      created_at: modulo.created_at,
    };

    await modulosRepository.update(id, updatedModulo);

    return response.json(updatedModulo);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const modulosRepository = getCustomRepository(ModulosRepository);
    const { id } = request.params;

    const modulo = await modulosRepository.findOne({
      where: { id },
    });

    if (!modulo) {
      return response.status(400).json({ Error: 'Modulo not found.' });
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('modulos')
      .where('id = :id', { id })
      .execute();

    return response.status(204).send();
  }
}
