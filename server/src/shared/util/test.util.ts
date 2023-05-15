import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildTypeOrmModuleAsyncOptions } from '../../config/typeorm.config';
import { Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

export const createTestingModuleWithDatabase = async (
    entites: any[],
    providers: Provider[],
) => {
    return await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot({ envFilePath: '.env' }),
            TypeOrmModule.forRootAsync(
                buildTypeOrmModuleAsyncOptions((configService) => ({
                    dropSchema: true,
                    synchronize: true,
                    database: configService.get<string>('DB_TEST_DATABASE'),
                })),
            ),
            TypeOrmModule.forFeature(entites),
        ],
        providers,
    }).compile();
};
