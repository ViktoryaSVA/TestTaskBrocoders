import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1701021652877 implements MigrationInterface {
    name = 'Generate1701021652877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_item" ADD "user" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_item" DROP COLUMN "user"`);
    }

}
