import { CreateCrud as CreateCrudMaster } from '@wazzu/iluvatar-database';
import { Db } from 'mongodb';

export class CreateCrud extends CreateCrudMaster {

    public constructor(private db: Db, schemaName: string, values: any) {
        super(schemaName, values);
    }

    public doQuery(): Promise<any> {
        return this.db.collection(this.schemaName).insert(this.values).then(value => {
            return value.ops[0]
        });
    }
}
