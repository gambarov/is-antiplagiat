import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from './config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ALL_ENTITIES } from '../database/constants';
import { isPromise } from 'util/types';

export const buildDataSourceOptions = (
    configService: ConfigService,
): DataSourceOptions => {
    const options: DataSourceOptions = {
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
    };
    return options;
};

export const buildTypeOrmModuleAsyncOptions = (
    useFactoryOptions: (configService: ConfigService) => TypeOrmModuleOptions,
): TypeOrmModuleAsyncOptions => {
    const useFactory = (
        configService: ConfigService,
    ): TypeOrmModuleAsyncOptions => ({
        ...buildDataSourceOptions(configService),
        entities: ALL_ENTITIES,
        ...useFactoryOptions(configService),
    });

    const options: TypeOrmModuleAsyncOptions = {
        imports: [NestConfigModule],
        inject: [ConfigService],
        useFactory,
    };

    return options;
};

const buildDataSource = async () => {
    const app = await NestFactory.create(ConfigModule);
    const configService = app.get(ConfigService);

    return new DataSource({
        ...buildDataSourceOptions(configService),
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/database/migrations/*.js'],
    });
};

export default buildDataSource();
