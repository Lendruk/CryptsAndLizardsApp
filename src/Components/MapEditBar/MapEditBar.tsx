import { InfoCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Tabs, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../Redux/actions';
import './styles.scss';
import NavMode from './sub-components/NavMode';

export enum SidebarModes {
  NavMode,
  GameMode,
  MapEditMode,
}

export default function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutAction = () => {
    dispatch(logout())
    history.push('/');
  }

  const TabIcon = () => 
  (
    <div className="TabIcon"> 
      <UserOutlined />
    </div>
  );

  return (
    <div className="Sidebar">
      <section className="BarHeader">
        <h4>Crypts & Lizards v0.1.0</h4>
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
          <LogoutOutlined onClick={logoutAction}/>
        </Tooltip>
      </div>
    </div>
  );
}