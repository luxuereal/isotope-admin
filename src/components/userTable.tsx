import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, DataTableSelectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';

import Paginator from './paginator';
import { users } from '@/types/users.type';

interface Users {
    users: users[] | any;
    selectUser: (uid: string) => void;
};

const UserTable = ({ users, selectUser }: Users) => {

    const router = useRouter();
    
    const [datas, setDatas] = useState<users[]>([]);

    const [row, setRow] = useState<users | null>(null);

    useEffect(() => setDatas(users), []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const imageBodyTemplate = (type: users) => {
        return <img src={``} alt={``} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (type: users) => {
        return formatCurrency(0);
    };

    const ratingBodyTemplate = (type: users) => {
        return <Rating value={0} readOnly cancel={false} />;
    };

    // const statusBodyTemplate = (type: User) => {
    //     return <Tag value={type.is_disabled ? 'Allowed' : 'Not Allowed'} severity={getSeverity(type)}></Tag>;
    // };

    // const statusTemplate = (type: User) => type.is_disabled ? 'success' : 'danger';

    // const selectPage = (startOffset: number, endOffset: number) => {
    //     setValue({
    //         start: startOffset,
    //         end: endOffset
    //     });
    // }

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
                // footer={footer}
            >
                <Column field="id" header="S/N"></Column>
                <Column field="uid" header="User ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="gender" header="Gender"></Column>
                <Column field="age" header="Age"></Column>
                {/* <Column header="Status" body={statusBodyTemplate}></Column> */}
            </DataTable>
        </div>
    );
};

export default UserTable;