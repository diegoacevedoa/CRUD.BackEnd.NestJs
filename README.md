# CRUD.BackEnd.NestJs
CRUD en NestJs.

PASOS PARA DESARROLLARLO

	PASOS DESARROLLO NESTJS

Ayudas: nest --help
1- Instalar nest si no lo tiene instalado en la máquina: npm i -g @nestjs/cli
2- Crear el proyecto, esto lo crea con una plantilla base de modulo, controlador, servicio y ubicarse en la carpeta del proyecto: nest new project-name
3- Agregar código en el main.ts para habilitar cors (opcional):  

const app = await NestFactory.create(AppModule, { cors: true });

4- Instalar class-validator y class-transformer para las validaciones middleware: npm i class-validator class-transformer
5- Agregar código para las validaciones de los middlewares de los dtos en el main.ts: 

import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe()); 
useContainer(app.select(AppModule), { fallbackOnErrors: true });

6- Instalar Swagger para ver las APIs en el navegador web así (http://localhost:3000/api/docs): npm i @nestjs/swagger
7- Agregar código en el main.ts para el swagger: 

const config = new DocumentBuilder()
    .setTitle('Mi Bolsillo')
    .setDescription('API para la gestión de Mi Bolsillo.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

8- Fijar el prefijo global en el main.ts: app.setGlobalPrefix("/api");
9- Instalar dotenv para las variables de entorno y agregar el archivo .env afuera de src, esto es opcional, ya que el paquete @nestjs/config tiene dotenv internamente: npm i dotenv
10- Instalar ConfigService para capturar de variable de entorno: npm i @nestjs/config 
11- Instalar TypeORM para la base de datos: npm install --save @nestjs/typeorm
12- Instalar TypeORM para la base de datos: npm install typeorm mssql 
13- Agregar las sgtes variables de entorno en el archivo .env que debe quedar ubicado en la raíz del proyecto:

DB_NAME=Prueba
DB_PORT=1433
DB_USERNAME=diego.acevedo
DB_PASSWORD=Medellin1*
DB_HOST=localhost
DB_DATABASE=Prueba
DB_TIMEOUT=30000

14- Configurar acceso a la base de datos en las carpetas /config/database con los archivos database.module.ts, database.service.ts:

database.service.ts ********************************************************************************************************************


import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaEntity } from '../../persona/entity/persona.entity';
import { DataSourceOptions } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(configService: ConfigService) {
      return {
        name: configService.get('DB_NAME'),
        type: 'mssql',
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        requestTimeout: +configService.get('DB_TIMEOUT'),
        pool: { acquireTimeoutMillis: +configService.get('DB_TIMEOUT') },
	//entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        entities: [PersonaEntity],
        synchronize: false,
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
      } as DataSourceOptions;
    },
  }),
];


database.module.ts ******************************************************************************************************

import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.service";

@Module({
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

15- Agregar en los imports del app.module.ts: ConfigModule.forRoot({ isGlobal: true }), DatabaseModule
16- Crear módulo: nest g mo module-name
17- Crear controlador: nest g co controller-name
18- Crear servicio: nest g s service-name
19- Crear entidades adentro de la carpeta entity de cada módulo, ejemplo:

persona.entity.ts  ********************************************************************************************************

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Persona' })
export class PersonaEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'IdPersona',
    type: 'int',
  })
  idPersona: number;

  @Column({
    name: 'NoDocumento',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  noDocumento: string;

  @Column({
    name: 'Nombres',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  nombres: string;

  @Column({
    name: 'Apellidos',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  apellidos: string;
}


20- Crear Dtos con validaciones de columnas adentro de la carpeta dto de cada módulo, ejemplos:

persona-create.dto.ts **********************************************************************************************************

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


persona-update.dto.ts ***************************************************************************************************

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


21- Crear validaciones middleware si aplica
22- Crear funcionalidades de las APIs en el service, el controlador y el modulo, ejemplo:

persona.service.ts  ************************************************************************************************

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


persona.controller.ts  ************************************************************************

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PersonaCreateDto, PersonaUpdateDto } from './dto';
import { PersonaService } from './persona.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Persona")
@Controller('persona')
export class PersonaController {
  constructor(private readonly _personaService: PersonaService) {}

  @Get()
  async findAll(@Res() res) {
    try {
      const response = await this._personaService.findAll();

      return res
        .status(HttpStatus.OK)
        .json({ data: response[0], totalCount: response[1] });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const response = await this._personaService.findOne(+id);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Post()
  async create(@Res() res, @Body() personaCreateDto: PersonaCreateDto) {
    try {
      const response = await this._personaService.create(personaCreateDto);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() personaUpdateDto: PersonaUpdateDto,
  ) {
    try {
      const response = await this._personaService.update(+id, personaUpdateDto);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      const response = await this._personaService.remove(+id);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}


persona.module.ts ********************************************************************************************************************

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaEntity } from './entity/persona.entity';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonaEntity])],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule {}