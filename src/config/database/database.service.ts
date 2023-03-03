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
