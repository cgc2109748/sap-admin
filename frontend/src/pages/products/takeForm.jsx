import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Grid, Button, Group, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import _ from 'lodash';
import moment from 'moment';
import { useModals } from '@mantine/modals';

const TakeForm = (props) => {
  const modals = useModals();
  const { action, data } = props;
  const form = useForm({
    initialValues: {
      user: '',
      type: '',
      num: '',
      manager: '',
      usage: '',
      remark: '',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        let result = _.pick(data, ['_id', 'name', 'code', 'type', 'used', 'left', 'unit', 'usage', 'remark']);
        result.productType = result.type;
        result = { ...result, ...values };
        result.type = '0';
        if (Number(result.left) - Number(values.num) > 0 || Number(result.left) - Number(values.num) === 0) {
          result.used = Number(result.used) + Number(values.num);
          result.left = Number(result.left) - Number(values.num);
          console.log('result:', result);
          action(result);
        } else {
          showNotification({
            title: '资产领取失败',
            message: '领取数量有误，请确认后再次领取！',
            color: 'red',
          });
        }
      })}
    >
      <Grid>
        <Grid.Col span={12}>
          <NumberInput
            label="领取数量"
            placeholder={data?.left}
            {...form.getInputProps('num')}
            min={0}
            max={Number(data.left)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="领取人" placeholder="领取人" {...form.getInputProps('user')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="经办人" placeholder="经办人" {...form.getInputProps('manager')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea label="用途" placeholder="用途" {...form.getInputProps('usage')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea label="备注" placeholder="备注" {...form.getInputProps('remark')} />
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

export default TakeForm;
