import {
    DatabaseModel,
    Config,
    IluvatarDatabase as IluvatarDatabaseMaster,
    FindCrud as FindCrudMaster,
    UpdateCrud as UpdateCrudMaster,
    CreateCrud as CreateCrudMaster,
    DeleteCrud as DeleteCrudMaster,
    DatabaseType
} from '@wazzu/iluvatar-core';
import { MongoClient, Db, ObjectID, Binary } from 'mongodb';
import { FindCrud } from './find.crud';
import { UpdateCrud } from './update.crud';
import { CreateCrud } from './create.crud';
import { DeleteCrud } from './delete.crud';

const databaseTypes: DatabaseType[] = [
    {
        databaseType: /^(Double|Int(eger)?|Long|Decimal)$/i,
        javascriptType: 'number'
    },
    {
        databaseType: /^String$/i,
        javascriptType: 'string'
    },
    {
        databaseType: /^Object$/i,
        javascriptType: Object
    },
    {
        databaseType: /^Array$/i,
        javascriptType: Array
    },
    {
        databaseType: /^BinData$/i,
        javascriptType: Binary
    },
    {
        databaseType: /^ObjectId$/i,
        javascriptType: ObjectID
    },
    {
        databaseType: /^Boolean$/i,
        javascriptType: 'boolean'
    },
    {
        databaseType: /^(Date|Timestamp)$/i,
        javascriptType: Date
    },
    {
        databaseType: /^RegExp$/i,
        javascriptType: RegExp
    }
];

/**
 * Clase para realizar las operaciones básicas de mongodb
 */
export class IluvatarDatabase extends IluvatarDatabaseMaster {
    private connection: MongoClient;
    private db: Db;

    public constructor();
    public constructor(_schemaName: string);
    public constructor(_schemaName?: string) {
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

    public newInstance(_schemaName?: string): IluvatarDatabase {
        return new IluvatarDatabase(_schemaName);
    }

    public getTypesSupported(): DatabaseType[] {
        return databaseTypes;
    }
}
