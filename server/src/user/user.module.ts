import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { StudentEntity } from './student.entity';
import { SupervisorEntity } from './supervisor.entity';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        TypeOrmModule.forFeature([UserEntity, StudentEntity, SupervisorEntity]),
    ],
})
export class UserModule {}
