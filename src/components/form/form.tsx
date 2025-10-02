import { Form, Input, Button } from 'antd';
import { useForm } from 'antd/es/form/Form';
import type { customeFormT } from '../../types/types';

const CustomeForm = ({
  onSubmit,
  loading,
  extraFields,
  isDebtor = false,
}: customeFormT) => {
  const [form] = useForm();
  return (
    <div>
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          label="Ism"
          name="fullName"
          rules={[
            { required: true, message: 'Ism kiritilishi shart' },
            { min: 4, message: 'Login kamida 4 ta belgi bo‘lishi kerak' },
          ]}
        >
          <Input placeholder="Ismingizni Kiriting" />
        </Form.Item>

        {!isDebtor && (
          <>
            <Form.Item
              label="Parol"
              name="password"
              rules={[
                { required: true, message: 'Parol kiritish shart' },
                {
                  min: 6,
                  message:
                    'Parol kamida 6 ta belgi 1 ta raqam va " ! " bo‘lishi kerak',
                },
              ]}
            >
              <Input.Password placeholder="Parol Kiriting" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email kiritilishi shart' },
                { type: 'email', message: "To'g'ri email kiriting" },
              ]}
            >
              <Input placeholder="Email Kiriting" />
            </Form.Item>
            <Form.Item
              label="Telefon raqam"
              name="phoneNumber"
              rules={[
                { required: true, message: 'Telefon raqam kiritilishi shart' },
                {
                  pattern: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
                  message: 'Telefon raqam noto‘g‘ri formatda',
                },
              ]}
            >
              <Input
                maxLength={12}
                addonBefore="+998"
                placeholder="90-123-45-67"
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  let formatted = '';

                  if (value.length > 0) formatted += value.slice(0, 2);
                  if (value.length >= 3) formatted += '-' + value.slice(2, 5);
                  if (value.length >= 6) formatted += '-' + value.slice(5, 7);
                  if (value.length >= 8) formatted += '-' + value.slice(7, 9);

                  form.setFieldsValue({ phoneNumber: formatted });
                }}
              />
            </Form.Item>
          </>
        )}

        {extraFields}

        {/* <Form.Item
          label="Telefon raqam"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Telefon raqam kiritilishi shart' },
            {
              pattern: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
              message: 'Telefon raqam noto‘g‘ri formatda',
            },
          ]}
        >
          <Input
            maxLength={12}
            addonBefore="+998"
            placeholder="90-123-45-67"
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              let formatted = '';

              if (value.length > 0) formatted += value.slice(0, 2);
              if (value.length >= 3) formatted += '-' + value.slice(2, 5);
              if (value.length >= 6) formatted += '-' + value.slice(5, 7);
              if (value.length >= 8) formatted += '-' + value.slice(7, 9);

              form.setFieldsValue({ phoneNumber: formatted });
            }}
          />
        </Form.Item> */}

        {!isDebtor && (
          <Form.Item name="role" initialValue="STORE" hidden>
            <Input value={'STORE'} type="hidden" />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Qo'shish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CustomeForm;
