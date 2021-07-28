import { InfoCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Tabs, Tooltip } from 'antd';
import './styles.scss';
import NavMode from './sub-components/NavMode';

export enum SidebarModes {
  NavMode,
  GameMode,
  MapEditMode,
}

export default function Sidebar() {

  const TabIcon = () => 
  (
    <div className="TabIcon"> 
      <UserOutlined />
    </div>
  );

  return (
    <div className="Sidebar">
      <section className="BarHeader">
        <h4>Crypts & Lizards v0.0.1</h4>
      </section>
      <div className="BarContent">
        <NavMode />
        {/* <Tabs defaultActiveKey="1" tabPosition={'top'} style={{ width: 300, height: '100%' }}>
          {[...Array.from({ length: 5 }, (v, i) => i)].map(i => (
            <Tabs.TabPane tab={<TabIcon />} key={i} disabled={i === 28}>
              Content of tab {i}
            </Tabs.TabPane>
          ))}
        </Tabs> */}
      </div>
      <div className="BarFooter">
        <Tooltip title="Build Info">
          <InfoCircleOutlined />
        </Tooltip>
        <Tooltip title="Logout">
          <LogoutOutlined />
        </Tooltip>
      </div>
    </div>
  );
}