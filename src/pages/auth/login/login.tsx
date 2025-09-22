import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import LoginIcon from '../../../assets/icons/login-icon';
import PasswordIcon from '../../../assets/icons/password-icon';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import React from 'react';
import logo from '../../../assets/images/LOGO.png';
import { toast } from 'react-toastify';
import { request } from '../../../config/data/request';

type FieldType = {
  username?: string;
  password?: string;
};

const inputSchema = z.object({
  username: z
    .string()
    .min(4, 'Login kamida 4 ta belgi bo‘lishi kerak')
    .max(12, 'Login 12 ta belgidan oshmasligi kerak'),
  password: z
    .string()
    .min(6, 'Parol kamida 6 ta belgi bo‘lishi kerak')
    .max(12, 'Parol 12 ta belgidan oshmasligi kerak'),
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<{
    username?: string;
    password?: string;
  }>({});

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const result = inputSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setError(fieldErrors);
      return;
    }
    setError({});

    try {
      const res = await request.post('/admin/signin', {
        username: values.username,
        password: values.password,
      });
      const token = res.data?.data?.token;
      if (!token) {
        toast.error('Token Topilmadi', { autoClose: 1500 });
        return;
      }
      localStorage.setItem('token', token);
      toast.success('Tizimga muvaffaqiyatli kirdingiz!', { autoClose: 1500 });

      const role = res.data?.role;

      if (role === 'admin') {
        toast.success('Tizimga muvaffaqiyatli kirdingiz!', { autoClose: 1500 });
        return navigate('/admin/dashboard', { replace: true });
      } else if (role === 'seller') {
        toast.success('Tizimga muvaffaqiyatli kirdingiz!', { autoClose: 1500 });
        return navigate('/seller', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.log('role error', err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen sm:py-[20px] md:py-[30px]">
        <div className="flex flex-col items-center justify-center text-center">
          <img className="sm:mb-[20px]" src={logo} alt="img" />
          <h1 className="font-[700] text-[24px] text-#000">Dasturga kirish</h1>
          <p className="font-[500] text-[16px] leading-[140$] text-gray-600 sm:mb-[30px]">
            Iltimos, tizimga kirish uchun login va parolingizni kiriting.
          </p>
        </div>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          className="w-[300px]"
        >
          <Form.Item<FieldType>
            name="username"
            validateStatus={error.username ? 'error' : ''}
            help={error.username}
          >
            <Input prefix={<LoginIcon />} placeholder="Login" size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            validateStatus={error.password ? 'error' : ''}
            help={error.password}
          >
            <Input.Password
              prefix={<PasswordIcon />}
              placeholder="Parol"
              size="large"
            />
          </Form.Item>

          <p className="text-right underline mb-3 font-medium text-sm text-primary -mt-3 cursor-pointer">
            Parolni unutdingizmi?
          </p>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full sm:w-[300px] md:w-[250px]"
              size="large"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4 max-w-md">
          <p className="text-sm leading-[140%] text-gray-600">
            Hisobingiz yo'q bo'lsa, tizimga kirish huquqini olish uchun
            <a className="underline text-primary ml-1 mr-1" href="#">
              do'kon administratori
            </a>
            bilan bog'laning.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
