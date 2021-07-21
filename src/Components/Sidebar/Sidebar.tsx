import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LaptopOutlined from '@ant-design/icons/LaptopOutlined';
import './styles.scss';
import { Link } from 'react-router-dom';

export default function Sidebar() {

  return (
    <Sider width={200} className="site-layout-background">
    <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="Sections">
          <Menu.Item key="1"><Link to="/mapEditor">Map Editor</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/campaigns">Campaigns</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
          <Menu.Item key="3">option5</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}