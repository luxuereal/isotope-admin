import React, { useState, useEffect } from 'react';
import { DataTable, DataTableSelectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Disputes } from '@/types/disputes.type';

interface disputes {
    users: Disputes[] | any;
    selectUser: (uid: string) => void;
};

const DisputesTable = ({ users, selectUser }: disputes) => {
    
    const [datas, setDatas] = useState<Disputes[]>([]);

    const [row, setRow] = useState<Disputes | null>(null);

    useEffect(() => setDatas(users), [users]);

    return (
      <div className="card usertable">
        <DataTable 
          value={datas} 
          selectionMode="single" 
          selection={row!} 
          onSelectionChange={(e) => setRow(e.value as Disputes)} 
          dataKey="id"
          onRowSelect={(e: DataTableSelectEvent) => selectUser(e.data.uid)} 
          metaKeySelection={false} 
          tableStyle={{ minWidth: '60rem' }}
        >
          <Column field="id" header="S/N"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone Number"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="gender" header="Gender"></Column>
          <Column field="by_info" header="Flagged by"></Column>
          <Column field="reason" header="Reason"></Column>
        </DataTable>
      </div>
    );
};

export default DisputesTable;