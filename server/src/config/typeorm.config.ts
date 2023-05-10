import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from './config.module';

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
