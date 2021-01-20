import { Connection } from 'typeorm';

export default async (connection: Connection, units: Array<any>): Promise<boolean> => {
  let res = true;

  const queryRunner = connection.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    for await (const unit of units) {
      await queryRunner.manager.save(unit);
    }

    await queryRunner.commitTransaction();
  } catch (err) {
    // since we have errors lets rollback the changes we made
    await queryRunner.rollbackTransaction();
    res = false;
  } finally {
    // you need to release a queryRunner which was manually instantiated
    await queryRunner.release();
  }

  return res;
}