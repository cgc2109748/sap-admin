import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Grid, Select, Button, Group } from '@mantine/core';
import { queryProductByType } from '../../features/product/productSlice';
import { showNotification } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import _ from 'lodash';
import moment from 'moment';
import { useModals } from '@mantine/modals';

const ReturnForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modals = useModals();
  const { action, data } = props;
  const form = useForm({
    initialValues: {
      user: '',
      type: '',
      num: '',
      manager: '',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        let result = _.pick(data, ['_id', 'name', 'code', 'type', 'used', 'left', 'unit', 'amountOfBrrow']);
        result.productType = result.type;
        result = { ...result, ...values };
        result.type = '2';
        if (Number(data.amountOfBrrow) > Number(values.num) || Number(data.amountOfBrrow) === Number(values.num)) {
          result.amountOfBrrow = Number(data.amountOfBrrow) - Number(values.num);
          result.used = Number(result.used) - Number(values.num);
          result.left = Number(result.left) + Number(values.num);
        } else {
          showNotification({
            title: '操作错误：',
            message: '归还数量不能大于已借取数量，请确认清楚再提交！',
            color: 'yeelow',
          });
          return;
        }
        console.log('result:', result);
        action(result);
      })}
    >
      <Grid>
        <Grid.Col span={12}>
          <NumberInput
            label="归还数量"
            placeholder={data?.amountOfBrrow}
            {...form.getInputProps('num')}
            min={0}
            max={Number(data.amountOfBrrow)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="归还人" placeholder="归还人" {...form.getInputProps('user')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="经办人" placeholder="经办人" {...form.getInputProps('manager')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <DatePicker
            placeholder="选择日期"
            label="领取日期"
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
          保存
        </Button>
      </Group>
    </form>
  );
};

export default ReturnForm;
