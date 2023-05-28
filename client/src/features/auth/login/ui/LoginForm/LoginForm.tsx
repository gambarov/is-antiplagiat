import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import { useAppDispatch } from '@/shared/model/hooks';
import { RequestSigninBody } from '@/entities/session';
import { useCallback } from 'react';
import { loginThunk } from '../../model/login';

type Props = {
    onComplete?: () => void;
};

export const LoginForm = ({ onComplete }: Props) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const dispatch = useAppDispatch();

    const onErrorMessage = (content: string) => {
        messageApi.open({
          type: 'error',
          content,
        });
      };

    const onFinish = useCallback(
        (body: RequestSigninBody) => {
            dispatch(loginThunk(body))
                .unwrap()
                .then(() => {
                    onComplete?.();
                })
                .catch((error) => {
                    onErrorMessage(error.data.message);
                    form.resetFields();
                });
        },
        [dispatch],
    );

    return (
        <Card>
            {contextHolder}
            <Form
                name="signin"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Логин"
                    name="login"
                    rules={[
                        {
                            required: true,
                            message: 'Поле обязательно для заполнения!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Поле обязательно для заполнения!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Вход
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
