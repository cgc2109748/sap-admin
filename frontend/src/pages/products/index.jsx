import { useDispatch } from 'react-redux';
import { getProducts, createProduct, queryProductByType } from '../../features/product/productSlice';
import { getProductGroups } from '../../features/productGroup/productGroupSlice';
import { useForm } from '@mantine/form';
import { Card, TextInput, Grid, Select, Button, Group, createStyles } from '@mantine/core';
import { useMemo, useEffect } from 'react';
import { useModals } from '@mantine/modals';
import moment from 'moment';
import { useState, useRef } from 'react';
import { showNotification } from '@mantine/notifications';
import _ from 'lodash';
import AddForm from './AddForm';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { useProductColumns } from './columns';
import { matches } from '../../utils/tableFilter';

const useStyles = createStyles((theme) => ({
  tableWrapper: {
    padding: '16px',
  },
}));

const statusList = [
  { value: '0', label: '闲置' },
  { value: '1', label: '在用' },
  { value: '2', label: '缺货' },
];

const Products = () => {
  const { classes } = useStyles();
  const gridRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      name: '',
      code: '',
      type: '',
      status: '',
      total: '',
      used: '',
      left: '',
      unit: '',
      price: '',
      totalPrice: '',
      createDate: '',
      updatedDate: '',
      manager: '',
      qrCode: '',
    },
  });
  const [filterValue, setFilterValue] = useState({
    name: '',
    code: '',
    type: '',
    status: '',
  });
  const [dataJson, setDataJson] = useState([]);
  const [groups, setGroups] = useState([]);

  const filteredData = useMemo(() => {
    const { name, code, type, status } = filterValue;
    console.log('filterValue:', filterValue);
    return _.chain(dataJson)
      .unionBy('_id')
      .filter((item) => {
        return _.isEmpty(name) || item.name.indexOf(name) >= 0;
      })
      .filter((item) => {
        return _.isEmpty(code) || item.code.indexOf(code) >= 0;
      })
      .filter((item) => {
        return _.isEmpty(type) || item.type.indexOf(type) >= 0;
      })
      .filter((item) => {
        return _.isEmpty(status) || item.status.indexOf(status) >= 0;
      })
      .value();
    // return dataJson;
  }, [dataJson, filterValue]);

  const tableHeight = useMemo(() => {
    return `${window.innerHeight - 58 - 48 - 220}px`;
  }, [window.innerHeight]);

  const columns = useProductColumns();

  const modals = useModals();

  useEffect(() => {
    fetchData();
    fetchProductGroups();
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        const temp = _.pick(form.values, ['name', 'code', 'type', 'status']);
        temp.type = !_.isEmpty(form.values.type) ? _.filter(groups, (item) => item.value === temp.type)[0].label : '';
        setFilterValue(temp);
      }
    });
    // console.log('products: ', dispatch(getProducts));
  }, []);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    const res = await dispatch(getProducts());
    if (res) {
      setLoading(false);
      setDataJson(res.payload);
    }
  };

  const fetchProductGroups = async () => {
    if (loading) return;
    setLoading(true);
    const res = await dispatch(getProductGroups());
    if (res) {
      setLoading(false);
      setGroups(res.payload);
    }
  };

  const newData = async (data) => {
    if (loading) return;
    setLoading(true);
    data['createDate'] = moment().format('YYYY-MM-DD HH:mm:ss');
    data['updatedDate'] = moment().format('YYYY-MM-DD HH:mm:ss');
    const res = await dispatch(createProduct(data));
    if (!res.error && !res.payload.stack) {
      setLoading(false);
      modals.closeModal('add-modal');
      fetchData();
      showNotification({
        title: '资产入库成功：',
        message: `${data.name}已入库`,
        color: 'green',
      });
    } else {
      setLoading(false);
      modals.closeModal('add-modal');
      fetchData();
      showNotification({
        title: '资产入库失败：',
        message: res.payload.stack,
        color: 'red',
      });
    }
  };
  return (
    <div className={classes.tableWrapper}>
      <Card shadow="sm" p="lg">
        <Group>
          <form>
            <Group mb={16}>
              <TextInput
                label="资产名称"
                placeholder="资产名称"
                {...form.getInputProps('name')}
                style={{ width: '250px' }}
              />
              <TextInput
                label="资产编码"
                placeholder="资产编码"
                {...form.getInputProps('code')}
                style={{ width: '250px' }}
              />
              {groups && (
                <Select
                  label="资产类型"
                  placeholder="请选择"
                  data={groups}
                  {...form.getInputProps('type')}
                  style={{ width: '250px' }}
                />
              )}
              <Select
                label="资产状态"
                placeholder="请选择"
                data={statusList}
                {...form.getInputProps('status')}
                style={{ width: '250px' }}
              />
            </Group>
          </form>
        </Group>
        <Group position="right">
          <Button
            size="xs"
            loading={loading}
            onClick={() => {
              const temp = _.pick(form.values, ['name', 'code', 'type', 'status']);
              temp.type = !_.isEmpty(form.values.type)
                ? _.filter(groups, (item) => item.value === temp.type)[0].label
                : '';
              setFilterValue(temp);
            }}
          >
            查询
          </Button>
          <Button
            size="xs"
            loading={loading}
            onClick={() => {
              form.setValues({
                name: '',
                code: '',
                type: '',
                status: '',
              });
              setFilterValue({
                name: '',
                code: '',
                type: '',
                status: '',
              });
            }}
          >
            重置
          </Button>
          <Button
            size="xs"
            onClick={() => {
              modals.openModal({
                id: 'add-modal',
                title: '资产入库',
                children: (
                  <AddForm
                    newData={newData}
                    groups={groups.map((item) => {
                      return { label: item.label, value: `${item.value}${item.code}` };
                    })}
                  />
                ),
              });
            }}
            loading={loading}
          >
            入库
          </Button>
          {/* <Button onClick={() => newData()}>add data</Button> */}
        </Group>
      </Card>
      <Card shadow="sm" mt={12} p={0}>
        <ReactDataGrid
          onReady={(ref) => (gridRef.current = ref.current)}
          loading={loading}
          scrollProps={{
            autoHide: false,
          }}
          dataSource={filteredData}
          columns={columns}
          defaultSortInfo={undefined}
          showColumnMenuTool={false}
          defaultFilterValue={undefined}
          enableColumnFilterContextMenu={false}
          pagination={true}
          pageSizes={[10, 50, 100, 500, 1000]}
          style={{
            height: tableHeight,
          }}
        />
      </Card>
    </div>
  );
};

export default Products;