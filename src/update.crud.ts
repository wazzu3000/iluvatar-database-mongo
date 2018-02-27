import { UpdateCrud as UpdateCrudMaster } from '@wazzu/iluvatar-core';
import { Db, ObjectID } from 'mongodb';

export class UpdateCrud extends UpdateCrudMaster {
    public constructor(private db: Db, schemaName: string, values: any) {
        super(schemaName, values)
    }

    public doQuery(): Promise<any> {
        let filters: any = {};
        let valuesClean: any
        try {
            valuesClean = this.schema.cleanValues(this.values);
        } catch (err) {
            return this.sendError(err);
        }
        for (let where of this.wheres) {
            let column = where.column;
            filters[column] = column == '_id' ? new ObjectID(where.value) : where.value;
        }
        return this.db.collection(this.schemaName).update(filters, {
            $set: valuesClean
        }).then(onfullfilled => {
            if (onfullfilled.result.nModified == 0) {
                return this.sendError('None element was edited');
            }
            return this.db.collection(this.schemaName).find(filters).toArray();
        });
    }
}