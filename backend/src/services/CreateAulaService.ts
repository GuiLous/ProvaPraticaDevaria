import { getCustomRepository } from 'typeorm';

import AppError from '../err/AppError';

import Aula from '../models/Aula';
import AulasRepository from '../repositories/AulasRepository';

interface Request {
  nome: string;
  modulo: string;
  dataAula: Date;
}

class CreateAulaService {
  public async execute({ nome, modulo, dataAula }: Request): Promise<Aula> {
    const aulasRepository = getCustomRepository(AulasRepository);

    const checkAulaExists = await aulasRepository.findByName(nome);

    if (checkAulaExists) {
      throw new AppError('Aula has already been created.');
    }

    const aula = aulasRepository.create({
      nome,
      modulo,
      dataAula,
    });

    await aulasRepository.save(aula);

    return aula;
  }
}

export default CreateAulaService;
