import { IsNotEmpty, IsDefined, MaxLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PersonaCreateDto {
  @ApiProperty({
    description: 'Número de Documento',
    minimum: 1,
    maximum: 50,
    type: String,
  })
  @IsDefined({ message: 'El campo noDocumento no existe.' })
  @MaxLength(50, {
    message: 'El campo noDocumento debe contener máximo 50 caracteres.',
  })
  @IsNotEmpty({ message: 'El campo noDocumento es requerido.' })
  @IsString()
  noDocumento: string;

  @ApiProperty({
    description: 'Nombres',
    minimum: 1,
    maximum: 100,
    type: String,
  })
  @IsDefined({ message: 'El campo nombres no existe.' })
  @MaxLength(100, {
    message: 'El campo nombres debe contener máximo 100 caracteres.',
  })
  @IsNotEmpty({ message: 'El campo nombres es requerido.' })
  @IsString()
  nombres: string;

  @ApiProperty({
    description: 'apellidos',
    minimum: 1,
    maximum: 100,
    type: String,
  })
  @IsDefined({ message: 'El campo apellidos no existe.' })
  @MaxLength(100, {
    message: 'El campo apellidos debe contener máximo 100 caracteres.',
  })
  @IsNotEmpty({ message: 'El campo apellidos es requerido.' })
  @IsString()
  apellidos: string;
}
