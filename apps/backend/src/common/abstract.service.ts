import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';

export abstract class AbstractService {
  @InjectDataSource()
  private _dataSource: DataSource;

  @InjectEntityManager()
  private _entityManager: EntityManager;

  protected get dataSource() {
    return this._dataSource;
  }

  protected get entityManager() {
    return this._entityManager;
  }

  /**
   * Get entity table name in the database
   */
  protected getTableName(target: any): string {
    // typeorm will check target and throw error
    const meta = this.dataSource.getMetadata(target);
    return meta.tableName;
  }
}
