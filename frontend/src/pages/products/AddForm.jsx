import { useDispatch } from 'react-redux';
import { useState, createContext } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Grid, Select, Button, Group, Text } from '@mantine/core';
import { queryProductByType } from '../../features/product/productSlice';
import { showNotification } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import _ from 'lodash';
import moment from 'moment';
import FileUpload from '../../components/FileUpload';
import { useModals } from '@mantine/modals';

const FileUploadContext = createContext({});

const AddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [batchItems, setBatchItems] = useState([]);
  const dispatch = useDispatch();
  const modals = useModals();
  const { groups, newData } = props;
  const form = useForm({
    initialValues: {
      name: '',
      type: '',
      code: '',
      total: '',
      price: '',
      totalPrice: '',
      unit: '',
      manager: '',
      createDate: '',
    },
  });

  const calc = (num, price) => {
    if (typeof num === 'number' && typeof price === 'number') {
      form.setValues({
        ...form.values,
        total: num,
        price: price,
        totalPrice: num * price,
      });
    }
  };

  const value = {
    batchItems,
    setBatchItems,
  };

  return (
    <FileUploadContext.Provider value={value}>
      <form onSubmit={form.onSubmit((values) => newData(values))}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput label="资产名称" placeholder="资产名称" {...form.getInputProps('name')} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Text mb={4}>产品图片</Text>
            <FileUpload />
          </Grid.Col>
          <Grid.Col span={12}>
            {/* <TextInput label="资产类型" placeholder="资产类型" {...form.getInputProps('type')} disabled /> */}
            {groups && (
              <Select
                label="资产类型"
                placeholder="请选择"
                data={groups}
                onChange={async (value) => {
                  if (loading) return;
                  setLoading(true);
                  const type = _.filter(groups, { value: value })[0].label;

                  const res = await dispatch(queryProductByType({ type: type }));
                  if (!res.error) {
                    let num = '';
                    switch (res.payload.length) {
                      case 1:
                        num = '000' + Number(res.payload.length) + 1;
                        break;
                      case 2:
                        num = '00' + Number(res.payload.length) + 1;
                        break;
                      case 3:
                        num = '0' + Number(res.payload.length) + 1;
                        break;
                      case 4:
                        num = Number(res.payload.length) + 1;
                        break;
                      default:
                        num = '0000';
                        break;
                    }
                    form.setValues({
                      ...form.values,
                      type: type,
                      code: `${value.slice(0, 2)}${moment().format('YYYY')}${value.slice(2)}${num}`,
                    });
                    setLoading(false);
                  } else {
                    setLoading(true);
                    showNotification({
                      title: '获取编码错误：',
                      message: res.payload,
                      color: 'red',
                    });
                  }
                }}
              />
            )}
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput label="资产编码" placeholder="资产编码" {...form.getInputProps('code')} disabled />
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              label="资产状态"
              placeholder="请选择"
              data={[
                { value: '0', label: '闲置' },
                { value: '1', label: '在用' },
                { value: '2', label: '缺货' },
              ]}
              {...form.getInputProps('status')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <NumberInput
              label="资产数量"
              placeholder="资产数量"
              min={0}
              {...form.getInputProps('total')}
              onChange={(value) => {
                form.setValues({
                  ...form.values,
                  total: value,
                });
                calc(value, form.values.price);
              }}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <NumberInput
              label="单价"
              placeholder="单价"
              min={0}
              {...form.getInputProps('price')}
              onChange={(value) => {
                form.setValues({
                  ...form.values,
                  price: value,
                });
                calc(form.values.total, value);
              }}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <NumberInput
              label="总价"
              placeholder="总价"
              formatter={(value) =>
                !Number.isNaN(parseFloat(value)) ? `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '¥ '
              }
              {...form.getInputProps('totalPrice')}
              disabled
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput label="单位" placeholder="单位" {...form.getInputProps('unit')} />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput label="管理人" placeholder="管理人" {...form.getInputProps('manager')} />
          </Grid.Col>
          <Grid.Col span={12}>
            <DatePicker
              placeholder="选择日期"
              label="入库日期"
              disabled
              inputFormat="YYYY-MM-DD"
              labelFormat="YYYY-MM-DD"
              value={moment().toDate()}
            />
          </Grid.Col>
        </Grid>
        <Group mt={8} position="right">
          <Button size="xs" variant="outline" onClick={() => modals.closeAll()}>
            取消
          </Button>
          <Button type="submit" size="xs">
            入库
          </Button>
        </Group>
      </form>
    </FileUploadContext.Provider>
  );
};

export default AddForm;
