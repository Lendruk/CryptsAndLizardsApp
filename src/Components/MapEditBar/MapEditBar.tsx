import UserOutlined from '@ant-design/icons/UserOutlined';
import { Tabs } from 'antd';
import './styles.scss';

export default function MapEditBar() {

  const TabIcon = () => 
  (
    <div className="TabIcon"> 
      <UserOutlined />
    </div>
  );

  return (
    <div className="MapEditBar">
      <section className="MapEditBarHeader">
        <h4>Map Tools</h4>
      </section>
      <div className="BarContent">
        <Tabs defaultActiveKey="1" tabPosition={'top'} style={{ height: '100%' }}>
          {[...Array.from({ length: 10 }, (v, i) => i)].map(i => (
            <Tabs.TabPane tab={<TabIcon />} key={i} disabled={i === 28}>
              Content of tab {i}
            </Tabs.TabPane>
          ))}
        </Tabs>

      </div>
    </div>
  );
}