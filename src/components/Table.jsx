import React, { useState } from 'react';
import DropdownCheckbox from './DropdownCheckbox';

const Table = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const data = [
    { policy: 'Policy A', claim: 'Claim 1', dateReceived: '2023-08-01' },
    { policy: 'Policy B', claim: 'Claim 2', dateReceived: '2023-07-15' },
    { policy: 'Policy C', claim: 'Claim 3', dateReceived: '2023-06-20' },
    // Add more data as needed
  ];

  const sortedData = React.useMemo(() => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b text-left font-medium text-gray-700">
                <DropdownCheckbox
                  label="Status"
                  options={['All', 'Pending', 'Paid']}
                />
              </th>
              <th className="px-4 py-2 border-b text-left font-medium text-gray-700">
                <DropdownCheckbox
                  label="Claim Type"
                  options={['All', 'Death', 'Disability']}
                />
              </th>
              <th
                className="px-4 py-2 border-b text-left font-medium text-gray-700 cursor-pointer"
              >
                Policy#
              </th>
              <th
                className="px-4 py-2 border-b text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort('claim')}
              >
                Claim#
                {sortConfig.key === 'claim' && (
                  <span>{sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}</span>
                )}
              </th>
              <th
                className="px-4 py-2 border-b text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort('dateReceived')}
              >
                Date Received
                {sortConfig.key === 'dateReceived' && (
                  <span>{sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <td className="px-4 py-2 border-b text-left">Data 1</td>
                <td className="px-4 py-2 border-b text-left">Data 2</td>
                <td className="px-4 py-2 border-b text-left">{item.policy}</td>
                <td className="px-4 py-2 border-b text-left">{item.claim}</td>
                <td className="px-4 py-2 border-b text-left">{item.dateReceived}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
