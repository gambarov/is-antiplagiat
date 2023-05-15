import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1684184109106 implements MigrationInterface {
    name = 'InitMigration1684184109106';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`supervisors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, UNIQUE INDEX \`REL_266e1d373e337927127c3f0a44\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`refresh_token\` varchar(256) NOT NULL DEFAULT '', \`surname\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL DEFAULT '', \`patronymic\` varchar(255) NOT NULL DEFAULT '', \`type\` enum ('STUDENT', 'SUPERVISOR') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5230070094e8135a3d763d90e7\` (\`refresh_token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`enrollments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`student_id\` int NULL, \`course_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`students\` (\`id\` int NOT NULL AUTO_INCREMENT, \`edu_type\` enum ('BACHELOR', 'SPECIALIST', 'MASTER', 'POSTGRADUATE') NOT NULL, \`ExternalUserID\` varchar(40) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, UNIQUE INDEX \`REL_fb3eff90b11bddf7285f9b4e28\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`courses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`assignments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`course_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`submissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('NOT_SUBMITTED', 'PENDING', 'ON_REVIEW', 'PASSED', 'FAILED') NOT NULL DEFAULT 'NOT_SUBMITTED', \`comment\` varchar(255) NOT NULL DEFAULT '', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`student_id\` int NULL, \`assignment_id\` int NULL, UNIQUE INDEX \`IDX_f043d0d459a667e9396e2a9086\` (\`student_id\`, \`assignment_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`submission_id\` int NOT NULL, \`status\` enum ('PENDING', 'ON_REVIEW', 'PASSED', 'FAILED') NOT NULL DEFAULT 'PENDING', \`file_url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`answer_results\` (\`id\` int NOT NULL AUTO_INCREMENT, \`DocId\` int NOT NULL, \`Status\` enum ('None', 'InProgress', 'Ready', 'Failed') NOT NULL DEFAULT 'None', \`Plagiarism\` int NOT NULL DEFAULT '0', \`Legal\` int NOT NULL DEFAULT '0', \`SelfCite\` int NOT NULL DEFAULT '0', \`Unknown\` int NOT NULL DEFAULT '0', \`IsSuspicious\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`answer_id\` int NULL, UNIQUE INDEX \`REL_4e1d3e902fc89d1a6cfdb5bcdb\` (\`answer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`courses_students_students\` (\`coursesId\` int NOT NULL, \`studentsId\` int NOT NULL, INDEX \`IDX_dffd4341c3ac7907af894f52e1\` (\`coursesId\`), INDEX \`IDX_6240c191ac91418ffb0891e94c\` (\`studentsId\`), PRIMARY KEY (\`coursesId\`, \`studentsId\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`supervisors\` ADD CONSTRAINT \`FK_266e1d373e337927127c3f0a444\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`enrollments\` ADD CONSTRAINT \`FK_307813fe255896d6ebf3e6cd55c\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`enrollments\` ADD CONSTRAINT \`FK_b79d0bf01779fdf9cfb6b092af3\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`students\` ADD CONSTRAINT \`FK_fb3eff90b11bddf7285f9b4e281\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`assignments\` ADD CONSTRAINT \`FK_33f833f305070d2d4e6305d8a0c\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`submissions\` ADD CONSTRAINT \`FK_435def3bbd4b4bbb9de1209cdae\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`submissions\` ADD CONSTRAINT \`FK_8723840b9b0464206640c268abc\` FOREIGN KEY (\`assignment_id\`) REFERENCES \`assignments\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_0d1b656c68dd42b88b5e264e95b\` FOREIGN KEY (\`submission_id\`) REFERENCES \`submissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`answer_results\` ADD CONSTRAINT \`FK_4e1d3e902fc89d1a6cfdb5bcdba\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`courses_students_students\` ADD CONSTRAINT \`FK_dffd4341c3ac7907af894f52e16\` FOREIGN KEY (\`coursesId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`courses_students_students\` ADD CONSTRAINT \`FK_6240c191ac91418ffb0891e94c5\` FOREIGN KEY (\`studentsId\`) REFERENCES \`students\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`courses_students_students\` DROP FOREIGN KEY \`FK_6240c191ac91418ffb0891e94c5\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`courses_students_students\` DROP FOREIGN KEY \`FK_dffd4341c3ac7907af894f52e16\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`answer_results\` DROP FOREIGN KEY \`FK_4e1d3e902fc89d1a6cfdb5bcdba\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_0d1b656c68dd42b88b5e264e95b\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`submissions\` DROP FOREIGN KEY \`FK_8723840b9b0464206640c268abc\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`submissions\` DROP FOREIGN KEY \`FK_435def3bbd4b4bbb9de1209cdae\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`assignments\` DROP FOREIGN KEY \`FK_33f833f305070d2d4e6305d8a0c\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_fb3eff90b11bddf7285f9b4e281\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`enrollments\` DROP FOREIGN KEY \`FK_b79d0bf01779fdf9cfb6b092af3\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`enrollments\` DROP FOREIGN KEY \`FK_307813fe255896d6ebf3e6cd55c\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`supervisors\` DROP FOREIGN KEY \`FK_266e1d373e337927127c3f0a444\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_6240c191ac91418ffb0891e94c\` ON \`courses_students_students\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_dffd4341c3ac7907af894f52e1\` ON \`courses_students_students\``,
        );
        await queryRunner.query(`DROP TABLE \`courses_students_students\``);
        await queryRunner.query(
            `DROP INDEX \`REL_4e1d3e902fc89d1a6cfdb5bcdb\` ON \`answer_results\``,
        );
        await queryRunner.query(`DROP TABLE \`answer_results\``);
        await queryRunner.query(`DROP TABLE \`answers\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_f043d0d459a667e9396e2a9086\` ON \`submissions\``,
        );
        await queryRunner.query(`DROP TABLE \`submissions\``);
        await queryRunner.query(`DROP TABLE \`assignments\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(
            `DROP INDEX \`REL_fb3eff90b11bddf7285f9b4e28\` ON \`students\``,
        );
        await queryRunner.query(`DROP TABLE \`students\``);
        await queryRunner.query(`DROP TABLE \`enrollments\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_5230070094e8135a3d763d90e7\` ON \`users\``,
        );
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(
            `DROP INDEX \`REL_266e1d373e337927127c3f0a44\` ON \`supervisors\``,
        );
        await queryRunner.query(`DROP TABLE \`supervisors\``);
    }
}
