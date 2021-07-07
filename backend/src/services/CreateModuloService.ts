/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';

import AppError from '../err/AppError';

import ModuloRepository from '../repositories/ModulosRepository';

import Modulo from '../models/Modulo';

interface Request {
  nome: string;
}

class CreateModuloService {
  public async execute({ nome }: Request): Promise<Modulo> {
    const modulesRepository = getCustomRepository(ModuloRepository);

    const checkModuloExists = await modulesRepository.findByName(nome);

    if (checkModuloExists) {
      throw new AppError('Modulo has already been created.');
    }

    const modulo = modulesRepository.create({
      nome,
    });

    await modulesRepository.save(modulo);

    return modulo;
  }
}

export default CreateModuloService;
