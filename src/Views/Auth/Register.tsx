import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import API from '../../Backend/API';
import { URI_REGISTER } from '../../Backend/endpoints';
import './styles.scss';

type RegisterBody = {
  username: string;
  email?: string;
  password: string;
}

export default function Register() {
  const history = useHistory();
  const onFinish = async (values: RegisterBody) => {
    console.log('Received values of form: ', values);
    try {
      await API.post<RegisterBody>(URI_REGISTER, values);
      history.push('/');
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className="FormContainer">
      <div className="FormBackground">
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email (Optional)" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
          Or <Link to="/">login now!</Link>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
}