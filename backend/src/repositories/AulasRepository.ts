import { EntityRepository, Repository } from 'typeorm';

import Aula from '../models/Aula';

@EntityRepository(Aula)
class AulaRepository extends Repository<Aula> {
  public async findByName(nome: string): Promise<Aula | null> {
    const findAula = await this.findOne({
      where: { nome },
    });

    return findAula || null;
  }
}

export default AulaRepository;
