import { CreateCrud as CreateCrudMaster } from '@wazzu/iluvatar-core';
import { Db } from 'mongodb';

export class CreateCrud extends CreateCrudMaster {

    public constructor(private db: Db, schemaName: string, values: any) {
        super(schemaName, values);
    }

    public doQuery(): Promise<any> {
        let valuesClean: any
        try {
            valuesClean = this.schema.cleanAndVerifyValues(this.values);
        } catch (err) {
            return this.sendError(err);
        }
        return this.db.collection(this.schemaName).insert(valuesClean).then(value => {
            return value.ops[0]
        });
    }
}
