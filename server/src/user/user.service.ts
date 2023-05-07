import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/crud/crud-service.mixin';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService extends CrudService(UserEntity) {}
