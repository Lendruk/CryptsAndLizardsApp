import { FolderOutlined } from '@ant-design/icons';
import { Tree, Switch } from 'antd';
import './styles.scss';

export type AssetFile = {
  name: string;
  icon?: string;
  subAssets?: AssetFile[];
}

type AssetStructureProps = {
  files: AssetFile[];
}

export default function AssetStructure(props: AssetStructureProps) {
  const { files } = props;
  return (
    <div>
      {files.map(file => (
        <div>
            <FolderOutlined />
        </div>
      ))}
    </div>
  )
}