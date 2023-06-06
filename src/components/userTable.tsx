import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, DataTableSelectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Type } from '@/types'

interface Users {
    users: Type[] | any;
};

const UserTable: React.FC<Users> = ({ users }) => {

    const router = useRouter();
    
    const [datas, setDatas] = useState<Type[]>([]);

    const [row, setRow] = useState<Type | null>(null);

    useEffect(() => setDatas(users), []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const imageBodyTemplate = (type: Type) => {
        return <img src={``} alt={``} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (type: Type) => {
        return formatCurrency(0);
    };

    const ratingBodyTemplate = (type: Type) => {
        return <Rating value={0} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (type: Type) => {
        return <Tag value={type.is_disabled ? 'Allowed' : 'Not Allowed'} severity={getSeverity(type)}></Tag>;
    };

    const getSeverity = (type: Type) => type.is_disabled ? 'success' : 'danger';

    const selectRow = (e: DataTableSelectEvent) => router.replace(`/details/${e.data.uid}`)
    

    const header = (
        <div className="flex flex-wrap align-items-center justify-between gap-2">
            <span className="text-xl text-900 font-bold">Users</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );

    const footer = `In total there are ${datas ? datas.length : 0} users.`;

    return (
        <div className="card">
            <DataTable 
                value={datas} 
                selectionMode="single" 
                selection={row!} 
                onSelectionChange={(e) => setRow(e.value as Type)} 
                dataKey="uid"
                onRowSelect={selectRow} 
                metaKeySelection={false} 
                header={header} 
                footer={footer} 
                tableStyle={{ minWidth: '60rem' }}
            >
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