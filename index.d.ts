declare module '@wazzu/iluvatar-database-mongo' {
    import IluvatarDatabaseMaster = require('@wazzu/iluvatar-core');
    import Mongo = require('mongodb');

    class IluvatarDatabase extends IluvatarDatabaseMaster.IluvatarDatabase {
        private connection: Mongo.MongoClient;
        private db: Mongo.Db;
        
        public constructor();
        public constructor(_schemaName: string);
        public openConnection(): Promise<IluvatarDatabaseMaster.IluvatarDatabase>;
        public find(...fields: string[]): IluvatarDatabaseMaster.FindCrud;
        public update(values: any): IluvatarDatabaseMaster.UpdateCrud;
        public create(values: any): IluvatarDatabaseMaster.CreateCrud;
        public delete(): IluvatarDatabaseMaster.DeleteCrud;
        public closeConnection(): void;
        public newInstance(): IluvatarDatabase;
        public newInstance(_schemaName?: string): IluvatarDatabase;
        public getTypesSupported(): IluvatarDatabaseMaster.DatabaseType[];
    }
}