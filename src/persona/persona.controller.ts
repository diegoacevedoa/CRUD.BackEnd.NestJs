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
import { ApiTags } from '@nestjs/swagger';
import { PersonaCreateDto, PersonaUpdateDto } from './dto';
import { PersonaService } from './persona.service';

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
