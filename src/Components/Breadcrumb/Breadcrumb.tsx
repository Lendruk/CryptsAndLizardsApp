import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb as AntBreadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import './styles.scss';

type Path = {
  text: string;
  url: string | null;
}

type BreadCrumbProps = {
  onSaveAction?: () => void;
  paths: Path[];
}

export default function Breadcrumb(props: BreadCrumbProps) {

  return (
    <div className="breadcrumb-container">
      <div>
        <AntBreadcrumb>
          <AntBreadcrumb.Item><Link to="/"><HomeOutlined /></Link></AntBreadcrumb.Item>
          {props.paths.map((path, index) => (
            <AntBreadcrumb.Item key={`bread-item-${path}`} className={index === props.paths.length -1 ? 'selected' : ''}>{path.url ? <Link to={path.url}>{path.text}</Link> : path.text }</AntBreadcrumb.Item>
          ))}
        </AntBreadcrumb>
      </div>
      <div>
        {props.onSaveAction && (
          <Button onClick={props.onSaveAction} className="save-button">
            Save
          </Button>
        )}
      </div>
    </div>
  );
}