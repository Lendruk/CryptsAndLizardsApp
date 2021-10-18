import { FileOutlined, FilterOutlined, FolderOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Tree, Switch } from 'antd';

const MOCK_DATA = [
  { icon: <FolderOutlined />, title: "test", key: "0", children: [{ isLeaf: true, icon: <FileOutlined /> , title: "sub test", key: "1"}] },
  { icon: <FolderOutlined />, title: "images", key: "2", children: [{ icon: <FileOutlined />, title: "img0", key:"3"}]},
  { icon: <FolderOutlined />, title: "etc", key:"4"},
]

export default function MapEditMode() {
  return (
    <div className="MapEditMode">
      <div className="search-input">
        <Input placeholder={"Search Assets"} />
        <FilterOutlined className="filter-button" />
      </div>
      <div className="filter-container">

      </div>
      <div className="asset-container">
        <Tree 
              showIcon={true} 
              treeData={MOCK_DATA} 
              blockNode
        />
      </div>
    </div>
  )
};