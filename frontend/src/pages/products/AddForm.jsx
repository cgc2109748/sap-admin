import { useDispatch } from 'react-redux';
import { useState, createContext, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Grid, Select, Button, Group, Text } from '@mantine/core';
import { queryProductByType } from '../../features/product/productSlice';
import { showNotification } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import _ from 'lodash';
import moment from 'moment';
import FileUpload from '../../components/FileUpload';
import { useModals } from '@mantine/modals';
import axios from 'axios';

export const FileUploadContext = createContext({});

const AddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modals = useModals();
  const { groups, newData } = props;
  const [file, setFile] = useState(null);
  const form = useForm({
    initialValues: {
      name: '',
      img: '',
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

  const upload = (values) => {
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    console.log('file: ', file);
    axios
      .post('/api/upload', formData, {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          if (values.status === '1') {
            const left = Number(values?.total) - Number(values?.used)
            if (left > 0) {
              values['left'] = left
            } else {
              showNotification({
                title: '资产入库失败：',
                message: '使用数量不能大于资产数量',
                color: 'red',
              });
              return false
            }
          }
          newData({ ...values, ...{ img: res.data.url } });
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  const value = {
    file,
    setFile,
  };

  return (
    <FileUploadContext.Provider value={value}>
      <form onSubmit={form.onSubmit((values) => {
        if (!_.isEmpty(file)) {
          upload(values)
        } else {
          if (values.status === '1') {
            const left = Number(values?.total) - Number(values?.used)
            if (left > 0) {
              values['left'] = left
            } else {
              showNotification({
                title: '资产入库失败：',
                message: '使用数量不能大于资产数量',
                color: 'red',
              });
              return false
            }
          }
          newData(values)
        }
      })}>
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
                    const length = res.payload.length + 1
                    if (length > 0 && length < 10) {
                      num = `000${length}`
                    } else if (length > 10 && length < 100) {
                      num = `00${length}`
                    } else if (length > 100 && length < 1000) {
                      num = `0${length}`
                    } else {
                      num = length
                    }
                    form.setValues({
                      ...form.values,
                      type: type,
                      code: `${value.slice(0, value.length - 4)}${moment().format('YYYY')}${value.slice(
                        value.length - 4
                      )}${num}`,
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
                // { value: '2', label: '缺货' },
              ]}
              {...form.getInputProps('status')}
            />
          </Grid.Col>
          {form.values?.status === '1' ? (
            <Grid.Col span={12}>
              <NumberInput
                label="使用数量"
                placeholder="使用数量"
                min={0}
                {...form.getInputProps('used')}
                onChange={(value) => {
                  form.setValues({
                    ...form.values,
                    used: value,
                  });
                }}
              />
            </Grid.Col>
          ) : null}
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
