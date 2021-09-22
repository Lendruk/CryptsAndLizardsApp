import { CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import './styles.scss';

export type Tab = {
  title: string,
  key: string | number,
  content?: any,
  closable?: boolean;
}

type TabsProps = {
    tabs: Tab[],
    mode: 'HORIZONTAL' | 'VERTICAL',
    showAdd?: boolean,
    onAdd?: Function,
    onRemove?: (tab: Tab) => any,
}

export default function Tabs(props: TabsProps) {
  const { tabs } = props;
  const [activeTab, setActiveTab] = useState('' as string | number);

  const removeTab = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, tab: Tab) => {    
    event.stopPropagation();
    if(activeTab === tab.key) {
      setActiveTab(tabs.find(elem => elem.key !== tab.key)!.key || '');
    }
    if(props.onRemove) {
      props.onRemove(tab);
    }
  }

  useEffect(() => {
    if(tabs.length > 0) {
      setActiveTab(tabs[0].key);
    }
  }, [false]);

  return (
    <>
    <div style={{ flexDirection: props.mode === 'HORIZONTAL' ? 'row' : 'column'}} className="tabs-container">
      {tabs.map(tab => (
        <div key={tab.key} onClick={() => setActiveTab(tab.key)} className={`tab ${activeTab === tab.key  ? 'active-tab' : ''}`}>
          <span className="tab-title">{tab.title}</span>
          {tab.closable && <CloseOutlined onClick={e => removeTab(e, tab)} />}
        </div>
      ))}
      {props.showAdd && (
        <div key={"tab-add"} className="tab add-btn">
          +
        </div>
      )}
    </div>
    <div className="tabs-content">
      {tabs.find(tab => tab.key === activeTab)?.content}
    </div>
    </>
  );
}