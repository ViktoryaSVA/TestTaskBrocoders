import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1701022344364 implements MigrationInterface {
    name = 'Generate1701022344364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list_entity" DROP CONSTRAINT "FK_ed51907ab880859a0a8c72abfb8"`);
        await queryRunner.query(`ALTER TABLE "list_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "list_entity" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "list_entity" ADD CONSTRAINT "FK_ed51907ab880859a0a8c72abfb8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list_entity" ADD CONSTRAINT "FK_6df517bd69f62067fcb161311a5" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list_entity" DROP CONSTRAINT "FK_6df517bd69f62067fcb161311a5"`);
        await queryRunner.query(`ALTER TABLE "list_entity" DROP CONSTRAINT "FK_ed51907ab880859a0a8c72abfb8"`);
        await queryRunner.query(`ALTER TABLE "list_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "list_entity" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "list_entity" ADD CONSTRAINT "FK_ed51907ab880859a0a8c72abfb8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
