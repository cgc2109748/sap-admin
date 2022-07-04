import { Text, Badge } from '@mantine/core';
const statusHandler = (status) => {
  switch (status) {
    case '0':
      return (
        <Badge color="blue" size="sm">
          领取
        </Badge>
      );
    case '1':
      return (
        <Badge color="orange" size="sm">
          借取
        </Badge>
      );
    case '2':
      return (
        <Badge color="green" size="sm">
          归还
        </Badge>
      );
    case '3':
      return (
        <Badge color="grape" size="sm">
          补货
        </Badge>
      );

    default:
  }
};

export const useProductColumns = () => {
  const columns = [
    {
      name: 'name',
      header: '资产名称',
      sortable: false,
      defaultWidth: 100,
      userSelect: true,
      render: ({ value, data }) => {
        return (
          <Text size="sm" color="#1c7ed6">
            {value}
          </Text>
        );
      },
    },
    {
      name: 'code',
      header: '资产编码',
      sortable: true,
      userSelect: true,
    },
    {
      name: 'productType',
      header: '资产类型',
      defaultWidth: 100,
      sortable: false,
      userSelect: true,
    },
    {
      name: 'user',
      header: '资产使用人',
      sortable: false,
      defaultWidth: 100,
      userSelect: true,
      render: ({ value, data }) => {
        return (
          <Text size="sm" color="#1c7ed6">
            {value}
          </Text>
        );
      },
    },
    {
      name: 'type',
      header: '使用类型',
      defaultWidth: 80,
      sortable: false,
      render: ({ value, data }) => {
        return statusHandler(value);
      },
    },
    {
      name: 'num',
      header: '数量',
      defaultWidth: 80,
      sortable: false,
    },
    {
      name: 'usage',
      header: '用途',
      defaultWidth: 80,
      sortable: false,
    },
    {
      name: 'remark',
      header: '备注',
      defaultWidth: 80,
      sortable: false,
    },
    {
      name: 'manager',
      header: '经办人',
      sortable: false,
      userSelect: true,
      defaultWidth: 100,
      render: ({ value, data }) => {
        return (
          <Text size="sm" color="#1c7ed6">
            {value}
          </Text>
        );
      },
    },
    {
      name: 'updatedDate',
      header: '操作日期',
      sortable: false,
      defaultFlex: 1,
      render: ({ value, data }) => {
        return <Text size="sm">{value}</Text>;
      },
    },
  ];
  return columns;
};
