import './styles.scss';
import { useEffect } from "react";
import { Mosaic } from "react-mosaic-component";
import { useDispatch } from "react-redux";
import MapView from "../../Components/MapView/MapView";
import { setEditingMap } from "../../Redux/actions";
import MapEditorHeader from "./Components/MapEditorHeader/MapEditorHeader";
import { Collapse } from 'antd';
import Toolbox from './Components/Toolbox/Toolbox';

const { Panel } = Collapse;

// const ELEMENT_MAP : { [key: string]: JSX.Element } = {
//   'mapEditor': <MapEditorContent />,
//   'mapEditBar': <MapEditBar />
// }

function MapEditorContent() {
  return (
    <div className="MapEditor">
      <MapEditorHeader />
      <div style={{ display: 'flex', height: '100%' }}>
        <Toolbox />
        <div className="map-view-holder">
          <MapView style={{ background: 'transparent' }} mapId={"test"} />
        </div>
        <div className="map-editor-inspector">
        <Collapse defaultActiveKey={['1']} onChange={() => {}}>
          <Panel header="Inspector" key="1">
            <p>{"text"}</p>
          </Panel>
          <Panel header="Settings" key="2">
            <p>{"text"}</p>
          </Panel>
          <Panel header="Layers" key="3">
            <p>{"text"}</p>
          </Panel>
      </Collapse>
        </div>
      </div>
    </div>
  )
}

export default function MapEditor() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setEditingMap(true));
  }, []);


  return MapEditorContent();
  // return (
  //   <div className="MapEditor">
  //     <Mosaic<string>
  //       renderTile={(id) => ELEMENT_MAP[id]}
  //       initialValue={{
  //         direction: 'row',
  //         first: 'mapEditor',
  //         second: 'mapEditBar',
  //         splitPercentage: 80,
  //       }}  
  //     />
  //   </div>
  // )
}