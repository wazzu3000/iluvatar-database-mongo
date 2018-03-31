import { CreateCrud as CreateCrudMaster, Dictionary, Schema } from '@wazzu/iluvatar-core';
import { Db } from 'mongodb';

export class CreateCrud extends CreateCrudMaster {

    private static uniqueIndexFromCollection: Dictionary<string, boolean> = {};

    public constructor(private db: Db, schemaName: string, values: any) {
        super(schemaName, values);
    }

    public async doQuery(): Promise<any> {
        debugger;
        let valuesClean: any
        await CreateCrud.createUniqueIndexToCollection(this.db, this.schema);
        try {
            valuesClean = this.schema.cleanAndVerifyValues(this.values);
        } catch (err) {
            return this.sendError(err);
        }
        return this.db.collection(this.schemaName).insert(valuesClean).then(value => {
            return value.ops[0]
        });
    }

    private static async createUniqueIndexToCollection(db: Db, schema: Schema) {
        let schemaName = schema.name as any;
        if (CreateCrud.uniqueIndexFromCollection[schemaName]) {
            return;
        }

        let collections = await db.collections();
        let uniqueIndexes = schema.getUniqueIndexes();
        if (collections.indexOf(schemaName) == -1) {
            await db.createCollection(schemaName);
        } else {
            let indexesByCollection = await db.collection(schemaName).indexes() as any[];
            uniqueIndexes = uniqueIndexes.filter(index => indexesByCollection.indexOf(index) == -1);
        }
        for (let uniqueIndex of uniqueIndexes) {
            let index: any = {};
            index[uniqueIndex] = 1;
            await db.createIndex(schemaName, index);
        }
    }
}
