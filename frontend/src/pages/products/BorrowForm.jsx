import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Grid, Button, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import _ from 'lodash';
import moment from 'moment';
import { useModals } from '@mantine/modals';

const BorrowForm = (props) => {
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
        result.type = '1';
        if (Number(result.left) - Number(values.num) > 0 || Number(result.left) - Number(values.num) === 0) {
          result.used = Number(result.used) + Number(values.num);
          result.left = Number(result.left) - Number(values.num);
          result.amountOfBrrow =
            Number(values.num) + (_.isNaN(Number(data.amountOfBrrow)) ? 0 : Number(data.amountOfBrrow));
          console.log('result:', result);
          action(result);
        } else {
          showNotification({
            title: '资产借取失败',
            message: '借取数量有误，请确认后再次领取！',
            color: 'red',
          });
        }
      })}
    >
      <Grid>
        <Grid.Col span={12}>
          <NumberInput
            label="借取数量"
            placeholder="借取数量"
            {...form.getInputProps('num')}
            min={0}
            max={Number(data.left)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="借取人" placeholder="借取人" {...form.getInputProps('user')} />
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

export default BorrowForm;
