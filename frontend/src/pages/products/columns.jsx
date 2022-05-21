import { Text, Grid, Button } from '@mantine/core';
import { useModals } from '@mantine/modals';
import TakeForm from './TakeForm';
import BorrowForm from './BorrowForm';
import ReturnForm from './ReturnForm';
import BuyForm from './BuyForm';

const statusHandler = (status) => {
  switch (status) {
    case '0':
      return (
        <Text color="green" size="sm">
          闲置
        </Text>
      );
    case '1':
      return (
        <Text color="blue" size="sm">
          在用
        </Text>
      );
    case '2':
      return (
        <Text color="red" size="sm">
          缺货
        </Text>
      );

    default:
  }
};

function tranNumber(num, point) {
  // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
  let numStr = num.toString().split('.')[0];
  if (numStr.length < 6) {
    // 判断数字有多长,如果小于6,,表示10万以内的数字,让其直接显示
    return numStr;
  } else if (numStr.length >= 6 && numStr.length <= 8) {
    // 如果数字大于6位,小于8位,让其数字后面加单位万
    let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
    // 由千位,百位组成的一个数字
    return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
  } else if (numStr.length > 8) {
    // 如果数字大于8位,让其数字后面加单位亿
    let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
    return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
  }
}

export const useProductColumns = (createLog) => {
  const modals = useModals();
  const columns = [
    {
      name: 'name',
      header: '资产名称',
      sortable: false,
      defaultWidth: 100,
      defaultFlex: 1,
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
    },
    {
      name: 'type',
      header: '资产类型',
      defaultWidth: 100,
      sortable: false,
    },
    {
      name: 'status',
      header: '资产状态',
      sortable: false,
      defaultWidth: 80,
      render: ({ value, data }) => {
        return statusHandler(value);
      },
    },
    {
      name: 'total',
      header: '资产数量',
      defaultWidth: 80,
      sortable: false,
    },
    {
      name: 'used',
      header: '使用数量',
      defaultWidth: 80,
      sortable: false,
    },
    {
      name: 'left',
      header: '剩余数量',
      defaultWidth: 80,
      sortable: false,
    },
    {
      name: 'unit',
      header: '单位',
      defaultWidth: 50,
      sortable: false,
    },
    {
      name: 'price',
      header: '单价',
      defaultWidth: 80,
      sortable: false,
    },
    {
      name: 'totalPrice',
      header: '总价',
      defaultWidth: 80,
      sortable: false,
      render: ({ value, data }) => {
        return <Text size="sm">{tranNumber(value, 2)}</Text>;
      },
    },
    {
      name: 'updatedDate',
      header: '更新日期',
      sortable: false,
      defaultWidth: 160,
      render: ({ value, data }) => {
        return <Text size="sm">{value}</Text>;
      },
    },
    {
      name: 'manager',
      header: '管理人',
      sortable: false,
      defaultWidth: 60,
      render: ({ value, data }) => {
        return (
          <Text size="sm" color="#1c7ed6">
            {value}
          </Text>
        );
      },
    },
    {
      name: 'qrCode',
      header: '二维码',
      sortable: false,
      defaultWidth: 60,
    },
    {
      name: '_id',
      header: '操作',
      sortable: false,
      //   defaultLocked: 'end',
      //   defaultWidth: 250,
      type: 'number',
      defaultWidth: 220,
      render: ({ value, data }) => {
        // console.debug('data:', data);
        return (
          <Grid>
            {Number(data.left) > 0 && (
              <Grid.Col span={4}>
                <Button
                  size="xs"
                  onClick={() => {
                    modals.openModal({
                      id: 'take-modal',
                      title: '资产领取',
                      children: <TakeForm action={createLog} data={data} />,
                    });
                  }}
                >
                  领取
                </Button>
              </Grid.Col>
            )}
            {Number(data.left) > 0 && (
              <Grid.Col span={4}>
                <Button
                  size="xs"
                  onClick={() => {
                    modals.openModal({
                      id: 'borrow-modal',
                      title: '资产借取',
                      children: <BorrowForm action={createLog} data={data} />,
                    });
                  }}
                >
                  借取
                </Button>
              </Grid.Col>
            )}
            {Number(data.amountOfBrrow) > 0 && (
              <Grid.Col span={4}>
                <Button
                  size="xs"
                  onClick={() => {
                    modals.openModal({
                      id: 'return-modal',
                      title: '资产归还',
                      children: <ReturnForm action={createLog} data={data} />,
                    });
                  }}
                >
                  归还
                </Button>
              </Grid.Col>
            )}
            {Number(data.left) === 0 && (
              <Grid.Col span={4}>
                <Button
                  size="xs"
                  onClick={() => {
                    modals.openModal({
                      id: 'return-modal',
                      title: '资产购置',
                      children: <BuyForm action={createLog} data={data} />,
                    });
                  }}
                >
                  补货
                </Button>
              </Grid.Col>
            )}
          </Grid>
        );
      },
    },
  ];
  return columns;
};
