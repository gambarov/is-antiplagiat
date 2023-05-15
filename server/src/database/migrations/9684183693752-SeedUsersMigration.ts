import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { StudentEntity } from '../../user/entities/student.entity';
import { UserType } from '../../user/enums/user-type.enum';

export class SeedUsersMigration9684183693751 implements MigrationInterface {
    name = 'SeedUsersMigration9684183693751';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Даже учитывая каскадную связь, здесь приходится сначала сохранять сущность
        const student = await queryRunner.manager.save<StudentEntity>(
            queryRunner.manager.create<StudentEntity>(StudentEntity),
        );

        await queryRunner.manager.save(
            queryRunner.manager.create<UserEntity>(UserEntity, {
                login: 'test',
                password: 'test',
                surname: 'gamb',
                name: 'den',
                patronymic: 'ild',
                type: UserType.STUDENT,
                student,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const users = await queryRunner.manager.find<UserEntity>(UserEntity);
        await queryRunner.manager.delete<UserEntity>(UserEntity, users);
    }
}
