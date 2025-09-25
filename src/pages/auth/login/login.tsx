import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import LoginIcon from '../../../assets/icons/login-icon';
import PasswordIcon from '../../../assets/icons/password-icon';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import logo from '../../../assets/images/LOGO.png';
import { toast } from 'react-toastify';
import { request } from '../../../config/data/request';
import type { FieldType } from '../../../types/types';
import { useForm } from 'antd/es/form/Form';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setloading] = React.useState(false);
  const [form] = useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setloading(true);

    try {
      const res = await request.post('/admin/signin', {
        username: values.username,
        password: values.password,
      });
      console.log('backend', res.data);

      const token = res.data.data.token;

      if (!token) {
        toast.error('Token Topilmadi');
        return;
      }

      const role = res.data.data.role?.toUpperCase();
      console.log('roleee', role);

      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('role', role);

      toast.success('Tizimga muvaffaqiyatli kirdingiz!');

      if (role == 'SUPER ADMIN') {
        return navigate('/super-admin', { replace: true });
      } else if (role == 'ADMIN') {
        return navigate('/admin');
      }
    } catch (err: any) {
      console.log('role error', err);
      form.setFields([
        {
          name: 'username',
          errors: ['Login yoki parol noto‘g‘ri'],
        },
        {
          name: 'password',
          errors: [''],
        },
      ]);
    } finally {
      setloading(false);
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
            rules={[
              { required: true, message: 'Loginni kiriting!' },
              { min: 4, message: 'Login kamida 4 ta belgi bo‘lishi kerak' },
            ]}
          >
            <Input prefix={<LoginIcon />} placeholder="Login" size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[
              { required: true, message: 'Parolni kiriting!' },
              { min: 6, message: 'Parol kamida 6 ta belgi bo‘lishi kerak' },
            ]}
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
              loading={loading}
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
