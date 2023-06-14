import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Disputes } from '@/types/disputes.type';

interface disputes {
    users: Disputes[] | any;
};

const DisputesTable = ({ users }: disputes) => {
    
    const [datas, setDatas] = useState<Disputes[]>([]);

    const [row, setRow] = useState<Disputes | null>(null);

    useEffect(() => setDatas(users), []);

    return (
      <div className="card usertable">
        <DataTable 
          value={datas} 
          selectionMode="single" 
          selection={row!} 
          onSelectionChange={(e) => setRow(e.value as Disputes)} 
          dataKey="uid"
          metaKeySelection={false} 
          tableStyle={{ minWidth: '60rem' }}
        >
          <Column field="id" header="S/N"></Column>
          <Column field="uid" header="User ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="gender" header="Gender"></Column>
          <Column field="reporter" header="Flagged by"></Column>
          <Column field="reason" header="Reason"></Column>
        </DataTable>
      </div>
    );
};

export default DisputesTable;