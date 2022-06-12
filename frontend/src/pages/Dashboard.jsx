import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, Navbar, Group, Code, Box, Avatar, Header } from '@mantine/core';
import { Home as HomeIcon, Table as TableIcon, Logout } from 'tabler-icons-react';
import Home from './home/Home';
import Products from './products';
import ProductLogs from './productLogs';
import ProductGroups from './productGroups';

const data = [
  { page: 'home', label: '首页', icon: HomeIcon, active: true },
  { page: 'products', label: '资产台账', icon: TableIcon },
  { page: 'productLogs', label: '资产使用台账', icon: TableIcon },
  { page: 'productsGroups', label: '资产类型', icon: TableIcon },
];

const Dashboard = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('home');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nav, setNav] = useState('home');

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message } = useSelector((state) => state.product);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  // if (isLoading) {
  //   return <Spinner />;
  // }
  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.page === active })}
      href={item.link}
      key={item.page}
      onClick={(event) => {
        setNav(item.page);
        setActive(item.page);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  const logout = () => {
    localStorage.removeItem('user');
    // navigate('/login');
    window.location = '/';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar height={window.innerHeight} width={{ sm: 270 }} p="md">
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            未来大厦资产管理系统
            <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
          </Group>
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <a className={classes.link} onClick={logout}>
            <Logout className={classes.linkIcon} />
            <span>登出</span>
          </a>
        </Navbar.Section>
      </Navbar>

      <Box sx={{ width: '100%' }}>
        <Header
          height="58px"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '16px',
          }}
        >
          <Avatar src="https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4" />
        </Header>
        {/* {indexPage} */}
        {nav === 'home' ? <Home /> : null}
        {nav === 'products' ? <Products /> : null}
        {nav === 'productLogs' ? <ProductLogs /> : null}
        {nav === 'productsGroups' ? <ProductGroups /> : null}
      </Box>
    </Box>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
        },
      },
    },
  };
});

export default Dashboard;
