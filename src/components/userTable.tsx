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

    useEffect(() => setDatas(users), [users]);

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
                tableStyle={{ minWidth: '16rem' }}
            >
                <Column field="id" header="S/N" className='sm:text-base text-sm sm:py-2 sm:px-4'></Column>
                <Column field="email" header="Email" className='sm:text-base text-sm sm:py-2 sm:px-4'></Column>
                <Column field="phone" header="Phone Number" className='sm:text-base text-sm sm:py-2 sm:px-4'></Column>
                <Column field="name" header="Name" className='sm:text-base text-sm sm:py-2 sm:px-4'></Column>
                <Column field="gender" header="Gender" className='sm:text-base text-sm sm:py-2 sm:px-4'></Column>
                <Column field="age" header="Age" className='sm:text-base text-sm sm:py-2 sm:px-4'></Column>
            </DataTable>
        </div>
    );
};

export default UserTable;