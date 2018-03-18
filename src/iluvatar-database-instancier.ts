import {
    DatabaseModel,
    Config,
    IluvatarDatabaseInstancier as IluvatarDatabaseMaster,
    FindCrud as FindCrudMaster,
    UpdateCrud as UpdateCrudMaster,
    CreateCrud as CreateCrudMaster,
    DeleteCrud as DeleteCrudMaster,
    DatabaseType
} from '@wazzu/iluvatar-core';
import { MongoClient, Db } from 'mongodb';
import { FindCrud } from './find.crud';
import { UpdateCrud } from './update.crud';
import { CreateCrud } from './create.crud';
import { DeleteCrud } from './delete.crud';

/**
 * Clase para realizar las operaciones básicas de mongodb
 */
export class IluvatarDatabaseInstancier extends IluvatarDatabaseMaster {
    private connection: MongoClient;
    private db: Db;

    public constructor(_schemaName: string) {
        super(_schemaName);
        this._defaultId = '_id';
    }
    
    public openConnection(): Promise<IluvatarDatabaseMaster> {
        let configInstance = Config.getInstance();
        let config = configInstance.getConfig('database') as DatabaseModel;
        return MongoClient.connect(`mongodb://${config.host}:${(config.port || 27017)}/${config.database}`).then(conn => {
            this.connection = conn;
            this.db = conn.db(config.database);
            return this;
        });
    }

    public find(...fields: string[]): FindCrudMaster {
        return new FindCrud(this.db, this.schemaName, ...fields);
    }
    
    public update(values: any): UpdateCrudMaster {
        return new UpdateCrud(this.db, this.schemaName, values);
    }
    
    public create(values: any): CreateCrudMaster {
        return new CreateCrud(this.db, this.schemaName, values);
    }
    
    public delete(): DeleteCrudMaster {
        return new DeleteCrud(this.db, this.schemaName);
    }

    public closeConnection(): void {
        if (!this.connection) {
            throw '';
        }
        this.connection.close();
    }
}
