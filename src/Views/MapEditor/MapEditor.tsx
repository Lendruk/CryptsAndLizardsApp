import { Mosaic } from "react-mosaic-component";
import Sidebar from "../../Components/MapEditBar/MapEditBar";
import MapView from "../../Components/MapView/MapView";
import './styles.scss';

// const ELEMENT_MAP : { [key: string]: JSX.Element } = {
//   'mapEditor': <MapEditorContent />,
//   'mapEditBar': <MapEditBar />
// }

function MapEditorContent() {
  return (
    <div className="MapEditorContent">
      <MapView style={{ background: 'transparent' }} mapId={"test"} />
    </div>
  )
}

export default function MapEditor() {
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