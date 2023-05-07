import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { StudentEntity } from './entities/student.entity';
import { SupervisorEntity } from './entities/supervisor.entity';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        TypeOrmModule.forFeature([UserEntity, StudentEntity, SupervisorEntity]),
    ],
    exports: [UserService],
})
export class UserModule {}
