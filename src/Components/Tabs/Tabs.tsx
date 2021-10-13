import { CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import './styles.scss';

export type Tab = {
  title: string,
  key: string | number,
  content?: Function,
  closable?: boolean;
}

type TabsProps = {
    tabs: Tab[],
    mode: 'HORIZONTAL' | 'VERTICAL',
    showAdd?: boolean,
    onAdd?: Function,
    onRemove?: (tab: Tab) => any,
    onActiveChange?: (tab: Tab) => void,
}

export default function Tabs(props: TabsProps) {
  const { tabs, onActiveChange } = props;
  const [activeTab, setActiveTab] = useState('' as string | number);

  const removeTab = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, tab: Tab) => {    
    event.stopPropagation();
    if(activeTab === tab.key) {
      const newTab = tabs.find(elem => elem.key !== tab.key);
      setActiveTab(newTab!.key || '');
      if(onActiveChange) {
        onActiveChange(newTab!);
      }
    }
    if(props.onRemove) {
      props.onRemove(tab);
    }
  }

  const onTabClick = (tab: Tab) => {
    setActiveTab(tab.key);
    if(onActiveChange) {
      onActiveChange(tab);
    }
  }

  useEffect(() => {
    if(tabs.length > 0) {
      setActiveTab(tabs[0].key);
      if(onActiveChange) {
        onActiveChange(tabs[0]);
      }
    }
  }, [false]);

  const curTab = tabs.find(tab => tab.key === activeTab);
  return (
    <>
    <div style={{ flexDirection: props.mode === 'HORIZONTAL' ? 'row' : 'column'}} className="tabs-container">
      {tabs.map(tab => (
        <div key={tab.key} onClick={() => onTabClick(tab)} className={`tab ${activeTab === tab.key  ? 'active-tab' : ''}`}>
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
      {(curTab && curTab.content) ? curTab.content() : ''}
    </div>
    </>
  );
}