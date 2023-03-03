import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
import { PersonaCreateDto } from './persona-create.dto';

export class PersonaUpdateDto extends PartialType(PersonaCreateDto) {
  @ApiProperty({
    description: 'idPersona',
    type: Number,
  })
  @IsDefined({ message: 'El campo idPersona no existe.' })
  @IsNotEmpty({ message: 'El campo idPersona es requerido.' })
  @IsNumber()
  idPersona: number;
}
