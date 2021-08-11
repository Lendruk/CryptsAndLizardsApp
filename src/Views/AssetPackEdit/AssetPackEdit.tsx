import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AssetPack } from '../../Types/AssetPack';
import './styles.scss';
import API from '../../Backend/API';
import { URI_ASSETS } from '../../Backend/endpoints';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import { Input, Form, Row, Col, Upload, Table, Tabs, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { InboxOutlined } from '@ant-design/icons';

type AssetTab = {
  title: string;
  key: string;
  closable: boolean;
  content: any;
}

export default function AssetPackEdit() {

  function currenciesTab() {
    const currencyCols = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Parent',
        dataIndex: 'parent',
        key: 'parent',
      },
    ]
    return (
      <div>
        <div className="asset-table-new-btn">
          <Button>New</Button>
        </div>
        <Table columns={currencyCols} dataSource={[{ name: "test", parent: "tst"}]} />
      </div>
    );
  }
  const POSSIBLE_ASSET_TABS: AssetTab[] = [
    {
      title: "Currencies",
      key: "CurrencyTab",
      closable: true,
      content: currenciesTab(),
    },
    {
      title: "Categories",
      key: "CategoryTab",
      closable: true,
      content: "aaa",
    },
    {
      title: "Item Archetypes",
      key: "ItemArchetypeTab",
      closable: true,
      content: "aaa",
    }
  ];

  const [assetPack, setAssetPack] = useState({} as AssetPack);
  const [activeKey, setActiveKey] = useState('CurrencyTab');
  const [assetTabs, setAssetTabs] = useState(POSSIBLE_ASSET_TABS);
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const getAssetPack = async () => {
    const asset = await API.get<AssetPack>(`${URI_ASSETS}${id}`); 
    setAssetPack(asset);
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onTabChange = (key: string) => {
    console.log('on change')
    setActiveKey(key);
  }

  const onTabAdd = (e: any) => {
    console.log(e);
  }

  useEffect(() => {
    getAssetPack();
  }, [])

  function Popover(availableTabs: AssetTab[], popoverVisible: boolean, pageX: number, pageY: number) {

    return (
      <div className="asset-popover">
        {availableTabs.map(tab => (
          <div>
            {tab.title}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <>
      <Breadcrumb paths={[{ text: "Assets", url: "/assets/me" }, { text: assetPack.title, url: null }]} onSaveAction={() => {}} />
        <Form className="asset-pack-edit-content" layout="vertical">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="edit-section">
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="title"
                label="Title"
              >
                <Input type="text" placeholder="title" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
              >
                <TextArea placeholder="Description" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
            <Form.Item label="Image">
              <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="edit-section">
            <Col span={24}>
            <h1>Assets</h1>
            <Tabs
                type="card"
                onChange={event => onTabChange(event)}
                activeKey={activeKey}
                // onEdit={(e) => onTabAdd(e)}
              >
                {assetTabs.map(pane => (
                  <Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                    {pane.content}
                  </Tabs.TabPane>
                ))}
                <Tabs.TabPane disabled tab="Add" />
              </Tabs>
            </Col>
            {/* <Col span={12} >
              <label className="table-header">
                Currencies
              </label>
              <Table columns={[]} dataSource={[]} />
            </Col>

            <Col span={12} >
              <label className="table-header">
                Categories
              </label>
              <Table columns={[]} dataSource={[]} />
            </Col> */}
          </Row>

          <Row  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="edit-section">
            <Col span={24}>
            <h1>Items</h1>
            <Table columns={[]} dataSource={[]} />
            </Col>
          </Row>

          {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="edit-section">
            <Col span={12} >
              <label className="table-header">
                Item archtypes
              </label>
              <Table columns={[]} dataSource={[]} />
            </Col>

            <Col span={12} >
              <label className="table-header">
                Items
              </label>
              <Table columns={[]} dataSource={[]} />
            </Col>
          </Row> */}
        </Form>
        </>
    </div>
  );
}