import { FindCrud as FindCrudMaster } from '@wazzu/iluvatar-core';
import { Db, ObjectID } from 'mongodb';

export class FindCrud extends FindCrudMaster {
    public constructor(private db: Db, schemaName: string, ...fields: string[]) {
        super(schemaName, ...fields);
    }

    public doQuery(): Promise<any> {
        let filters: any = {};
        for (let where of this.wheres) {
            let column = where.column;
            filters[column] = column == '_id' ? new ObjectID(where.value) : where.value;
        }
        return this.db.collection(this.schemaName).find(filters).toArray();
    }
}