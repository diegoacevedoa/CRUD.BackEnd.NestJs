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
