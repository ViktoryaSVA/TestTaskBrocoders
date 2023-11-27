import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1701018893023 implements MigrationInterface {
    name = 'Generate1701018893023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "list_entity" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_6df517bd69f62067fcb161311a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo_item" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "isDone" boolean NOT NULL DEFAULT false, "todoListId" integer, CONSTRAINT "PK_d454c4b9eac15cc27c2ed8e4138" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "list_entity" ADD CONSTRAINT "FK_ed51907ab880859a0a8c72abfb8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD CONSTRAINT "FK_3aba7e189db12c46ca339996459" FOREIGN KEY ("todoListId") REFERENCES "list_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_item" DROP CONSTRAINT "FK_3aba7e189db12c46ca339996459"`);
        await queryRunner.query(`ALTER TABLE "list_entity" DROP CONSTRAINT "FK_ed51907ab880859a0a8c72abfb8"`);
        await queryRunner.query(`DROP TABLE "todo_item"`);
        await queryRunner.query(`DROP TABLE "list_entity"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
