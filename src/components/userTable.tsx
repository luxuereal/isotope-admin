import React, { useState, useEffect } from 'react';
import { DataTable, DataTableSelectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { users } from '@/types/users.type';

interface Users {
    users: users[] | any;
    selectUser: (uid: string) => void;
};

const UserTable = ({ users, selectUser }: Users) => {
    
    const [datas, setDatas] = useState<users[]>([]);

    const [row, setRow] = useState<users | null>(null);

    useEffect(() => setDatas(users), []);

    return (
        <div className="card usertable">
            <DataTable 
                value={datas} 
                selectionMode="single" 
                selection={row!} 
                onSelectionChange={(e) => setRow(e.value as users)} 
                dataKey="uid"
                onRowSelect={(e: DataTableSelectEvent) => selectUser(e.data.uid)} 
                metaKeySelection={false} 
                tableStyle={{ minWidth: '60rem' }}
            >
                <Column field="id" header="S/N"></Column>
                <Column field="uid" header="User ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="gender" header="Gender"></Column>
                <Column field="age" header="Age"></Column>
            </DataTable>
        </div>
    );
};

export default UserTable;