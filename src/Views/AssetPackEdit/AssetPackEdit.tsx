import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AssetPack } from '../../Types/AssetPack';
import './styles.scss';
import API from '../../Backend/API';
import { URI_ASSETS, URI_ASSETS_MAPS, URI_MAPS } from '../../Backend/endpoints';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import { Input, Form, Row, Col, Upload, Table, Button, FormInstance, Drawer, Space, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { DeleteOutlined, EditOutlined, InboxOutlined } from '@ant-design/icons';
import Tabs, { Tab } from '../../Components/Tabs/Tabs';
import Tags from '../../Components/Tags/Tags';
import { Tag } from '../../Types/Tag';

type AssetTab = {
  title: string;
  key: string;
  closable: boolean;
  content: Function;
  apiGetter?: Function;
}

type TableCol = {
  title: string;
  dataIndex: string;
  key: string;
}

type FormField = {
  name: string,
  label: string,
}

type MapFormBody = {
  title: string;
  description: string;
}

type GetMapsReturns = {
  name: string;
  _id: string;
}

export default function AssetPackEdit() {
  const [assetPack, setAssetPack] = useState({} as AssetPack);
  const [assetPackMaps, setAssetMaps] = useState([] as GetMapsReturns[]);
  const [currentTab, setCurrentTab] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [drawerFormRef] = Form.useForm();
  const assetPackFormRef = React.createRef<FormInstance>();

  const POSSIBLE_ASSET_TABS: AssetTab[] = [
    {
      title: "Currencies",
      key: "CurrencyTab",
      closable: false,
      content: currenciesTab,
    },
    {
      title: "Categories",
      key: "CategoryTab",
      closable: false,
      content: categoriesTab,
    },
    {
      title: "Item Archetypes",
      key: "ItemArchetypeTab",
      closable: false,
      content: () => "aaa",
    },
    {
      title: "Maps",
      key: "MapsTab",
      closable: false,
      content: mapTab,
      apiGetter: async (packId: string) => {
        const maps = await API.get<GetMapsReturns[]>(URI_ASSETS_MAPS(packId));
        setAssetMaps(maps);
      }
    }
  ];
  useEffect(() => {
    setAssetTabs(POSSIBLE_ASSET_TABS);
  }, [assetPackMaps]);
  const [assetTabs, setAssetTabs] = useState(POSSIBLE_ASSET_TABS);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };

  function categoriesTab() {
    const categoryCols = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
    }]
    return renderAssetTab("Categories", categoryCols, [{ name: "test", parent: "tst"}]);
  }

  function currenciesTab() {
    const currencyCols = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
    ]

    return renderAssetTab("Currencies", currencyCols, [{ name: "test", parent: "tst"}]);
  }

  function mapTab() {
    const mapCols = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
    ]

    return renderAssetTab("Maps", mapCols, assetPackMaps);
  }

  async function createMap(values: MapFormBody) {
    try {
      const newMap = await API.post<{ assetPack: string} & MapFormBody, GetMapsReturns>(URI_MAPS, { ...values, assetPack: assetPack._id });
      assetPackMaps.push(newMap);
      setAssetMaps(assetPackMaps);
    } catch(error) {
      console.log(error);
    }
  }

  function renderAssetTab(title: string, cols: TableCol[], data: any[]) {
    return (
    <div>
      <div className="asset-section-header">
        <h2>{title}</h2>
        <div className="asset-table-new-btn">
          <Button onClick={() => showDrawer()}>New</Button>
        </div>
      </div>
      <Table columns={[...cols, 
      
      {
      title: 'Action',
      key: 'action',
      render: (text: any, record: AssetPack) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Link to={`/mapEditor/${record._id}`}><EditOutlined /></Link>
          </Tooltip>
          <Tooltip title="Delete">
            <a><DeleteOutlined onClick={() => {}} /></a>
          </Tooltip>
        </Space>
      ),
    }]} dataSource={data} />
    </div>
    );
  }

  function getCurrentDrawer() {
    switch(currentTab) {
      case 'MapsTab':
        return renderDrawer("Create a new map", [{ label: 'Title', name: 'title'}, { label: 'Description', name: 'description' }], createMap);
    }
  }

  function renderDrawer(title: string, fields: FormField[], onSubmit: ((values: any) => void)) {
    return (
      <Drawer
      title={title}
      width={720}
      onClose={onClose}
      visible={drawerOpen}
      getContainer={false}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={() => drawerFormRef.submit()} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form form={drawerFormRef} layout="vertical" onFinish={onSubmit} hideRequiredMark>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter the title' }]}
            >
              <Input placeholder="Please enter the title" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea rows={4} placeholder="please enter the description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
    )
  }

  async function onSaveAssetPack() {
    try {
      await API.put<AssetPack>(`${URI_ASSETS}${id}` ,{...assetPackFormRef.current?.getFieldsValue(), tags: assetPack.tags });
    } catch(error) {

    }
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onRemoveTab = (tab: Tab) => {
    const updatedTabs = assetTabs.filter(curTab => curTab.key !== tab.key);
    setAssetTabs(updatedTabs);
  }

  const onAddTag = (tag: string) => {
    if(!assetPack.tags) {
      assetPack.tags = new Array<Tag>();
    }
    assetPack.tags.push({ name: tag}); 
    setAssetPack({...assetPack, tags: assetPack.tags});
  };

  const onRemoveTag = (tag: { name: string, saved: boolean }) => {
    const index = assetPack.tags.findIndex(cur => cur.name === tag.name);
    if(index !== -1) {
      assetPack.tags.splice(index,1);
    }

    setAssetPack({...assetPack, tags: assetPack.tags });
  }

  const onTabChange = (key: string | number) => {
    setCurrentTab(key as string);
    const tab = assetTabs.find(tab => tab.key === key);

    if(tab?.apiGetter) {
      tab.apiGetter(assetPack._id);
    }
  };

  useEffect(() => {
    const getAssetPack = async () => {
      const asset = await API.get<AssetPack>(`${URI_ASSETS}${id}`); 
      assetPackFormRef.current?.setFieldsValue(asset);
      setAssetPack(asset);
    }  

    getAssetPack();
  }, []);
  return (
    <div>
      <>
      <Breadcrumb paths={[{ text: "Assets", url: "/assets/me" }, { text: assetPack.title, url: null }]} onSaveAction={() => onSaveAssetPack()} />
        <Form ref={assetPackFormRef} className="asset-pack-edit-content" layout="vertical">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="edit-section">
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="title"
                label="Title"
                initialValue={assetPack.title}
              >
                <Input type="text" onChange={val => setAssetPack({ ...assetPack, title: val.target.value })} placeholder="Title" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
              >
                <TextArea placeholder="Description" />
              </Form.Item>
              <Tags onRemoveTag={onRemoveTag} onAddTag={(tag: string) => onAddTag(tag)} tags={assetPack.tags ? assetPack.tags.map(tag => ({ name: tag.name, saved: tag._id !== undefined})) : []} />
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
            <Tabs mode="HORIZONTAL" onActiveChange={(tab) => onTabChange(tab.key)} onRemove={tab => onRemoveTab(tab)} showAdd tabs={assetTabs} />
            </Col>
          </Row>

          <Row  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="edit-section">
            <Col span={24}>
            <h1>Items</h1>
            <Table columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
            ]} dataSource={[{ name: "test", parent: "tst"}]} />
            </Col>
          </Row>
        </Form>
        {getCurrentDrawer()}
        </>
    </div>
  );
}