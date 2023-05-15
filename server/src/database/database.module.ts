import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildTypeOrmModuleAsyncOptions } from '../config/typeorm.config';
import { AssignmentSubscriber } from '../assignment/subscribers/assignment.subscriber';

@Module({
    imports: [
        TypeOrmModule.forRootAsync(
            buildTypeOrmModuleAsyncOptions(() => ({
                subscribers: [AssignmentSubscriber],
                synchronize: false,
            })),
        ),
    ],
})
export class DatabaseModule {}
