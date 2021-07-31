import './styles.scss';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Drawer, Form, Button, Col, Row, Input, Modal, Table, Tag, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { AssetPack, AssetPackPrivacy } from '../../Types/AssetPack';
import { useState } from 'react';
import API from '../../Backend/API';
import { URI_ASSETS, URI_LIST_MY_ASSETS } from '../../Backend/endpoints';
import { useEffect } from 'react';

type AssetPackCreationParams = {
  title: string;
  description?: string;
}

const renderPrivacyTag = (privacy: AssetPackPrivacy) => {
  let color = 'green';
  switch(privacy) {
    case 'PRIVATE':
      color = 'volcano';
      break;
    case 'TRUSTED':
      color = 'geekblue';
      break;
  }

  return (
    <Tag color={color} key={privacy}>
        {privacy.toLocaleLowerCase()}
    </Tag>
  );
}

export default function MyAssets() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myAssets, setMyAssets] = useState<AssetPack[]>([]);
  const [form] = Form.useForm();

  const getAssets = async () => {
    try{
      const assets = await API.get<AssetPack[]>(URI_LIST_MY_ASSETS);
      if(assets) {
        setMyAssets(assets);
        setLoading(false);
      }
    } catch(error) {
      console.error(error);
    }
  }

  const createNewAssetPack = async (params: AssetPackCreationParams) => {
    try {
    const asset = await API.post<AssetPackCreationParams, AssetPack>(URI_ASSETS, params);
    setMyAssets(myAssets.concat(asset));

    } catch(error) {
      console.error(error);
    }
  }

  const deleteAssetPack = async (id: string) => {
    try {
      await API.delete(`${URI_ASSETS}${id}`);
      setMyAssets(myAssets.filter(pack => pack._id !== id));
  
      } catch(error) {
        console.error(error);
      }
  }

  const deletionModal = async (id:string, name: string) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: `You are about to delete ${name} are you sure?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => deleteAssetPack(id),
    });
  }

  useEffect(() => {
    getAssets();
  }, []);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };

  const onSubmit = async (postBody: AssetPackCreationParams) => {
    await createNewAssetPack(postBody)
    form.resetFields();
    setDrawerOpen(false);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Privacy',
      dataIndex: 'privacy',
      key: 'privacy',
      render: (privacy: string) => renderPrivacyTag(privacy as AssetPackPrivacy),
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any) => (
        <>
          {tags && tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: AssetPack) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Link to={`/assets/edit/${record._id}`}><EditOutlined /></Link>
          </Tooltip>
          <Tooltip title="Delete">
            <a><DeleteOutlined onClick={() => deletionModal(record._id, record.title)} /></a>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="PaddedContainer">
      <div className="ListPageHeader">
        <h2>My Assets</h2>
        <Button onClick={showDrawer}>New</Button>
      </div>
      <Table columns={columns} loading={loading} dataSource={myAssets} />
      <Drawer
          title="Create a new asset pack"
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
              <Button onClick={() => form.submit()} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form form={form} layout="vertical" onFinish={onSubmit} hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                >
                  <Input.TextArea rows={4} placeholder="please enter url description" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
    </div>
  )
}