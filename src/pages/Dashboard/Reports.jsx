import React, { useState } from 'react';
import { Table, Card, DatePicker, Select, Input, Button } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

const mockData = [
  {
    key: '1',
    title: 'Monthly Sales',
    date: '2025-04-01',
    status: 'Completed',
    amount: '$5,000',
  },
  {
    key: '2',
    title: 'Website Analytics',
    date: '2025-04-15',
    status: 'Pending',
    amount: '$3,200',
  },
  {
    key: '3',
    title: 'Customer Feedback',
    date: '2025-04-18',
    status: 'Completed',
    amount: '$0',
  },
];

const columns = [
  {
    title: 'Report Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Generated Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => (
      <span style={{ color: text === 'Completed' ? 'green' : 'orange' }}>{text}</span>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];

const Report = () => {
  const [filteredData, setFilteredData] = useState(mockData);

  const handleFilter = () => {
    // You can add real filtering logic here
    setFilteredData(mockData); // keeping mock data static for now
  };

  return (
    <Card title="Reports Overview" bordered={false}>
      <div style={{ marginBottom: 16, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <RangePicker />
        <Select placeholder="Select Status" style={{ width: 150 }}>
          <Option value="Completed">Completed</Option>
          <Option value="Pending">Pending</Option>
        </Select>
        <Input placeholder="Search title..." style={{ width: 200 }} />
        <Button type="primary" onClick={handleFilter}>Apply Filters</Button>
      </div>
      <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 5 }} />
    </Card>
  );
};

export default Report;
