declare module '@wazzu/iluvatar-database-mongo' {
    import IluvatarDatabase = require('@wazzu/iluvatar-core');
    import Mongo = require('mongodb');

    export class IluvatarDatabaseInstancier extends IluvatarDatabase.IluvatarDatabaseInstancier {
        private connection: Mongo.MongoClient;
        private db: Mongo.Db;
    
        public constructor(_schemaName: string);
        public openConnection(): Promise<IluvatarDatabaseInstancier>;
        public find(...fields: string[]): IluvatarDatabase.FindCrud;
        public update(values: any): IluvatarDatabase.UpdateCrud;
        public create(values: any): IluvatarDatabase.CreateCrud;
        public delete(): IluvatarDatabase.DeleteCrud;
        public closeConnection(): void;
    }

    export class IluvatarDatabaseMongo extends IluvatarDatabase.IluvatarDatabase {
        getTypesSupported(): IluvatarDatabase.DatabaseType[];
        newIluvatarDatabaseInstancier(_schemaName: string): IluvatarDatabaseInstancier;
    }
}