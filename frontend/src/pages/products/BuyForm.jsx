import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Grid, Select, Button, Group } from '@mantine/core';
import { queryProductByType } from '../../features/product/productSlice';
import { showNotification } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import _ from 'lodash';
import moment from 'moment';

const BuyForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
        let result = _.pick(data, ['_id', 'name', 'code', 'type', 'used', 'left', 'unit', 'total']);
        result.productType = result.type;
        result = { ...result, ...values };
        result.type = '3';
        result.user = '-';
        result.left = Number(result.left) + Number(values.num);
        result.total = Number(result.total) + Number(values.num);
        action(result);
      })}
    >
      <Grid>
        <Grid.Col span={12}>
          <NumberInput label="购入数量" placeholder="购入数量" {...form.getInputProps('num')} min={0} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="经办人" placeholder="经办人" {...form.getInputProps('manager')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <DatePicker
            placeholder="购入日期"
            label="购入日期"
            disabled
            inputFormat="YYYY-MM-DD"
            labelFormat="YYYY-MM-DD"
            value={moment().toDate()}
          />
        </Grid.Col>
      </Grid>
      <Group mt={8} position="right">
        <Button size="xs" variant="outline">
          取消
        </Button>
        <Button type="submit" size="xs">
          保存
        </Button>
      </Group>
    </form>
  );
};

export default BuyForm;
