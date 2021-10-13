import { EditOutlined, RedEnvelopeOutlined, SelectOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import './styles.scss';


export default function Toolbox() {
  return (
    <div className="toolbox">
        <Tooltip placement={"right"} title="Select">
          <SelectOutlined className="tool" />
        </Tooltip>
        <Tooltip placement={"right"} title="Draw">
          <EditOutlined className="tool" />
        </Tooltip>
        <Tooltip placement={"right"} title="DM Note">
          <RedEnvelopeOutlined className="tool" />
        </Tooltip>
    </div>
  )
}