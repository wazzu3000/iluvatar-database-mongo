import { UpdateCrud as UpdateCrudMaster } from '@wazzu/iluvatar-database';
import { Db, ObjectID } from 'mongodb';

export class UpdateCrud extends UpdateCrudMaster {
    public constructor(private db: Db, schemaName: string, values: any) {
        super(schemaName, values)
    }

    public doQuery(): Promise<any> {
        let filters: any = {};
        for (let where of this.wheres) {
            let column = where.column;
            filters[column] = column == '_id' ? new ObjectID(where.value) : where.value;
        }
        return this.db.collection(this.schemaName).update(filters, this.values).then(onfullfilled => {
            return this.db.collection(this.schemaName).find(filters).toArray();
        });
    }
}