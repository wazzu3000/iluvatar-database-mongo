import { DeleteCrud as DeleteCrudMaster } from '@wazzu/iluvatar-database';
import { Db, ObjectID } from 'mongodb';

export class DeleteCrud extends DeleteCrudMaster {

    public constructor(private db: Db, schemaName: string) {
        super(schemaName);
    }

    public doQuery(): Promise<any> {
        let filters: any = {};
        for (let where of this.wheres) {
            let column = where.column;
            filters[column] = column == '_id' ? new ObjectID(where.value) : where.value;
        }
        let elementsDeleted = this.db.collection(this.schemaName).find(filters).toArray();
        return this.db.collection(this.schemaName).deleteMany(filters).then(() => {
            return elementsDeleted;
        });
    }
}