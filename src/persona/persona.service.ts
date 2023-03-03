import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonaCreateDto, PersonaUpdateDto } from './dto';
import { PersonaEntity } from './entity/persona.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(PersonaEntity)
    private readonly _personaRepository: Repository<PersonaEntity>,
  ) {}

  async findAll() {
    return this._personaRepository.findAndCount();
  }

  async findOne(id: number) {
    const data = await this._personaRepository.findOneBy({ idPersona: id });

    return data;
  }

  async create(personaCreateDto: PersonaCreateDto) {
    const data = this._personaRepository.create({
      noDocumento: personaCreateDto.noDocumento,
      nombres: personaCreateDto.nombres,
      apellidos: personaCreateDto.apellidos,
    });

    return this._personaRepository.save(data);
  }

  async update(id: number, personaUpdateDto: PersonaUpdateDto) {
    return this._personaRepository.update(id, {
      noDocumento: personaUpdateDto.noDocumento,
      nombres: personaUpdateDto.nombres,
      apellidos: personaUpdateDto.apellidos,
    });
  }

  async remove(id: number) {
    return this._personaRepository.delete(id);
  }
}
