import { ObjectID, Binary } from 'mongodb';
import { IluvatarDatabase, DatabaseType, Schema } from '@wazzu/iluvatar-core';
import { IluvatarDatabaseInstancier } from './iluvatar-database-instancier';

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

export class IluvatarDatabaseMongo extends IluvatarDatabase {

    public getTypesSupported(): DatabaseType[] {
        return databaseTypes;
    }

    public newIluvatarDatabaseInstancier(_schemaName: string): IluvatarDatabaseInstancier {
        return new IluvatarDatabaseInstancier(_schemaName);
    }

    public createSchemaInDb(schema: Schema) {

    }

    public createUniqueKey(schemaName: string, fieldName: string) {

    }
}