import { EntityRepository, Repository } from 'typeorm';

import Modulo from '../models/Modulo';

@EntityRepository(Modulo)
class ModulosRepository extends Repository<Modulo> {
  public async findByName(nome: string): Promise<Modulo | null> {
    const findModulo = await this.findOne({
      where: { nome },
    });

    return findModulo || null;
  }
}

export default ModulosRepository;
