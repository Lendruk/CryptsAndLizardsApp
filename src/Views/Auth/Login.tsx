import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../../Backend/API';
import { URI_LOGIN } from '../../Backend/entrypoints';
import { setSession } from '../../Redux/actions';
import { User } from '../../Types/User';
import './styles.scss';

type LoginBody = {
  username: string;
  password: string;
}

type LoginReturns = {
  accessToken: string;
  user: User;
}

export default function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values: LoginBody) => {
    console.log('Received values of form: ', values);
    try {
      const res = await API.post<LoginBody, LoginReturns>(URI_LOGIN, { username: values.username, password: values.password });
      dispatch(setSession({ accessToken: res.accessToken, user: res.user }))
      console.log("Logged In");
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox value={false}>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
}