import { useDispatch } from 'react-redux';
import {
  getProductGroups,
  createProductGroup,
  deleteProductGroup,
} from '../../features/productGroup/productGroupSlice';
import { useForm } from '@mantine/form';
import {
  Card,
  TextInput,
  Grid,
  Select,
  Table,
  Button,
  Group,
  createStyles,
  Anchor,
  Text,
  Loader,
  Center,
  ActionIcon,
} from '@mantine/core';
import { useMemo, useEffect } from 'react';
import { useModals } from '@mantine/modals';
import { DatePicker } from '@mantine/dates';
import moment from 'moment';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import _ from 'lodash';
import { Trash } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  tableWrapper: {
    padding: '16px',
  },
}));

const ProductGroups = () => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modals = useModals();
  const [columns, setColumns] = useState([]);

  const rows = useMemo(() => {
    if (columns.length > 0) {
      return (
        columns.length > 0 &&
        columns.map((element, idx) => (
          <tr key={element.idx}>
            <td>
              <Anchor size="sm" onClick={(event) => event.preventDefault()}>
                {element.label}
              </Anchor>
            </td>
            <td>{element.value}</td>
            <td>{element.code}</td>
            <td>{element.createDate}</td>
            <td>
              <Grid>
                <Grid.Col span={6}>
                  <ActionIcon
                    size="xs"
                    color="red"
                    onClick={() => {
                      modals.openConfirmModal({
                        title: '警告！',
                        children: <Text>{`确认删除${element.label}类别吗？确认删除后数据将无法恢复！`}</Text>,
                        labels: { confirm: '确认删除', cancel: '取消' },
                        onConfirm: async () => {
                          console.log('element: ', element);
                          if (loading) return;
                          setLoading(true);
                          const res = await dispatch(deleteProductGroup(element._id));
                          if (!res.error) {
                            setLoading(false);
                            showNotification({
                              title: '操作成功:',
                              message: `${element.label}类别已删除！`,
                              color: 'green',
                            });
                            fetchData();
                          } else {
                            setLoading(false);
                            showNotification({
                              title: '操作失败:',
                              message: `${element.label}类别删除失败！`,
                              color: 'red',
                            });
                            fetchData();
                          }
                        },
                      });
                    }}
                  >
                    <Trash />
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            </td>
          </tr>
        ))
      );
    } else {
      return null;
    }
  }, [columns]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    const res = await dispatch(getProductGroups());
    if (!res.error) {
      setLoading(false);
      setColumns(res.payload);
    } else {
      setLoading(false);
      showNotification({
        title: '服务器错误：',
        message: '获取资产类型列表失败！',
        color: 'red',
      });
    }
  };

  const newData = async (data) => {
    if (loading) return;
    setLoading(true);
    let code = '0000';
    console.log('columns.length:', columns.length);
    if (columns.length < 10) {
      code = `000${columns.length + 1}`;
    } else if (columns.length > 10 && columns.length < 100) {
      code = `00${columns.length + 1}`;
    } else if (columns.length > 100 && columns.length < 1000) {
      code = `0${columns.length + 1}`;
    } else if (columns.length > 1000) {
      code = `${columns.length + 1}`;
    }
    const res = await dispatch(createProductGroup({ ...data, ...{ code } }));
    if (res) {
      setLoading(false);
      modals.closeModal('add-modal');
      fetchData();
      showNotification({
        title: '新增类型成功！',
        message: `新增了一个名为 ${res.payload.label} 的类型。`,
        color: 'green',
      });
    }
  };

  const p1 = {
    label: '',
    value: '',
    createDate: '',
  };

  return (
    <div className={classes.tableWrapper}>
      <Group position="right" p="16">
        <Button
          size="xs"
          onClick={() => {
            modals.openModal({
              id: 'add-modal',
              title: '新增类型',
              children: <AddForm newData={newData} />,
            });
          }}
        >
          新增类型
        </Button>
      </Group>
      <Card shadow="sm" mt={12}>
        <Table striped highlightOnHover verticalSpacing="xs">
          <thead>
            <tr>
              <th>资产类型名称</th>
              <th>资产编码</th>
              <th>资产编号</th>
              <th>创建日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        {loading ? (
          <Center style={{ paddingTop: '8px' }}>
            <Loader />
          </Center>
        ) : null}
      </Card>
    </div>
  );
};

const AddForm = (props) => {
  const { newData } = props;
  const form = useForm({
    initialValues: {
      label: '',
      value: '',
      createDate: moment().toDate(),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => newData(values))}>
      <Grid>
        <Grid.Col span={12}>
          <TextInput label="资产类型名称" placeholder="资产名称" {...form.getInputProps('label')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="编码" placeholder="资产名称" {...form.getInputProps('value')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <DatePicker
            placeholder="选择日期"
            label="入库日期"
            disabled
            inputFormat="YYYY-MM-DD"
            labelFormat="YYYY-MM-DD"
            {...form.getInputProps('createDate')}
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

export default ProductGroups;
