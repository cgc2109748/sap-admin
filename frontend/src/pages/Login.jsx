import React, { useState, useEffect } from 'react';
import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: window.innerHeight,
    minWidth: window.innerWidth,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    minHeight: window.innerHeight,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function Login() {
  const { classes } = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
            未来大厦资产管理系统
          </Title>

          <TextInput name="username" label="用户名" placeholder="用户名" size="md" onChange={onChange} />
          <PasswordInput name="password" label="密码" placeholder="请输入密码" mt="md" size="md" onChange={onChange} />
          {/* <Checkbox name="rememberme" label="记住密码" mt="xl" size="md" onChange={onChange} /> */}
          <Button fullWidth mt="xl" size="md" onClick={onSubmit} loading={isLoading}>
            登录
          </Button>

          {/* <Text align="center" mt="md">
            Don&apos;t have an account?{' '}
            <Anchor href="#" weight={700} onClick={(event) => event.preventDefault()}>
              Register
            </Anchor>
          </Text> */}
        </Paper>
      </div>
    </>
  );
}

export default Login;
