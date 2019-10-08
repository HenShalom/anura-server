import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from './MaterialIcons';

export default function GlobalConfigTable({ columns, data, isSaved, updateData, isLoading }) {
  return (
    <div className="config-table">
      <MaterialTable
        icons={tableIcons}
        isLoading={isLoading}
        title="Global Configs"
        columns={columns}
        data={data}
        options={{
          rowStyle: isSaved
        }}
        editable={{
          onRowAdd: async row => {
            updateData([...data, { ...row, count: 'UnKnown' }]);
          },
          onRowUpdate: async (row, { tableData: { id } }) => {
            const newData = [...data];
            newData[id] = row;
            updateData(newData);
          },
          onRowDelete: async ({ tableData: { id } }) => {
            const newData = [...data];
            newData[id].splice(id, 1);
            updateData(newData);
          }
        }}
      />
    </div>
  );
}
