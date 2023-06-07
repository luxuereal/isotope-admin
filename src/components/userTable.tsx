import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, DataTableSelectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { User } from '@/types'

interface Users {
    users: User[] | any;
    selectUser: (uid: string) => void;
};

const UserTable = ({ users, selectUser }: Users) => {

    const router = useRouter();
    
    const [datas, setDatas] = useState<User[]>([]);

    const [row, setRow] = useState<User | null>(null);

    useEffect(() => setDatas(users), []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const imageBodyTemplate = (type: User) => {
        return <img src={``} alt={``} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (type: User) => {
        return formatCurrency(0);
    };

    const ratingBodyTemplate = (type: User) => {
        return <Rating value={0} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (type: User) => {
        return <Tag value={type.is_disabled ? 'Allowed' : 'Not Allowed'} severity={getSeverity(type)}></Tag>;
    };

    const getSeverity = (type: User) => type.is_disabled ? 'success' : 'danger';


    const footer = 'Showing 4 of 10'

    return (
        <div className="card usertable">
            <DataTable 
                value={datas} 
                selectionMode="single" 
                selection={row!} 
                onSelectionChange={(e) => setRow(e.value as User)} 
                dataKey="uid"
                onRowSelect={(e: DataTableSelectEvent) => selectUser(e.data.uid)} 
                metaKeySelection={false} 
                tableStyle={{ minWidth: '60rem' }}
                footer={footer}
            >
                <Column field="id" header="S/N"></Column>
                <Column field="uid" header="User ID"></Column>
                <Column field="created_at" header="Created At"></Column>
                <Column field="phone_number" header="Phone"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="provider" header="Provider"></Column>
                <Column header="Status" body={statusBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default UserTable;