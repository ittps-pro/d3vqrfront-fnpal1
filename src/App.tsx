import React, { FC, useState, useEffect, useLayoutEffect } from 'react';

import './style.css';

import { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import useSWR from 'swr';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { PrinterOutlined } from '@ant-design/icons';
let categories = [
  {
    key: 1,
    value: 'Помощь технического специалиста',
  },
];

const valueTypeArray = [
  'password',
  'money',
  'textarea',
  'option',
  'date',
  'dateWeek',
  'dateMonth',
  'dateQuarter',
  'dateYear',
  'dateRange',
  'dateTimeRange',
  'dateTime',
  'time',
  'timeRange',
  'text',
  'select',
  'checkbox',
  'rate',
  'radio',
  'radioButton',
  'index',
  'indexBorder',
  'progress',
  'percent',
  'digit',
  'second',
  'avatar',
  'code',
  'switch',
  'fromNow',
  'image',
  'jsonCode',
];

function useUser(id) {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  count?: number;
  state?: string;
  created_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(20).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `KEY-${index}`,
    decs: 'Description',
    count: 10,
    state: 'Active',
    created_at: 1590486176000,
  };
});

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id)
  );
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData
  );

  const [user, setUser] = useState(null);

  // getUser
  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Описание',
      dataIndex: 'title',

      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            message: '必须包含数字',
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },

    {
      title: '标签',
      dataIndex: 'labels',
      width: 120,
      valueEnum: valueTypeArray,
      render: (_, row) => (
        <Space>
          {row.labels.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: 'Default', status: 'Default' },
        active: {
          text: 'Active',
          status: 'Active',
          color: 'green',
        },
        paused: {
          text: 'Paused',
          status: 'paused',
        },
        open: {
          text: 'Error',
          status: 'Error',
        },
        closed: {
          text: 'Complete',
          status: 'Complete',
        },
      },
    },

    {
      title: 'Count',
      dataIndex: 'count',
      valueType: 'number',
    },
    {
      title: '描述',
      dataIndex: 'decs',
    },
    {
      title: 'Actions',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <>
      <ProCard
        title={'Printers'}
        extra={<PrinterOutlined id={'printer'} />}
      ></ProCard>

      <ProCard title={'Search'} extra={<UserOutlined id={'user'} />}>
        <ProFormField placeholder={'Search'} />
      </ProCard>

      <EditableProTable<DataSourceType>
        headerTitle="Table title"
        columns={columns}
        rowKey="id"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                console.log(dataSource);

                // axios.post()
              }}
            >
              Save
            </Button>,
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
        options
      />
      <ProCard title="Data" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
