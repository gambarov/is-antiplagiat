import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { StudentEntity } from '../../user/entities/student.entity';

export class SeedUsersMigration1683755615136 implements MigrationInterface {
    name = 'SeedUsersMigration1683755615136';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const student = await queryRunner.manager.save<StudentEntity>(
            queryRunner.manager.create<StudentEntity>(StudentEntity, {
                ExternalUserID: 'testid',
            }),
        );

        await queryRunner.manager.save(
            queryRunner.manager.create<UserEntity>(UserEntity, {
                login: 'test',
                password: 'test',
                surname: 'gamb',
                name: 'den',
                patronymic: 'ild',
                student,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const users = await queryRunner.manager.find<UserEntity>(UserEntity);
        await queryRunner.manager.delete<UserEntity>(UserEntity, users);
    }
}
