import { useState } from "react";
import { Mosaic } from "react-mosaic-component";
import MapView from "../../Components/MapView/MapView";

// type MapDict = {
//   [key: string]: JSX.Element
// }

export default function Game() {
  // const [curMaps, setMaps] = useState({
  //   'firstMap': <MapView mapId={"testMap1"} />,
  //   'secondMap': <MapView mapId={"testMap2"} />,
  //   'thirdMap': <MapView mapId={"testMap3"} />,
  //   'fourthMap': <MapView mapId={"testMap4"} />
  // } as MapDict)

  return (
    <div style={{ height: '100vh' }}>
      {/* {/* <MapView mapId={"testMap1"} /> */}
      <MapView mapId={"testMap2"} />

      {/* <Mosaic<string>
        renderTile={(id) => curMaps[id]}
        initialValue={{
          direction: 'row',
          first: {
            direction: 'column',
            first: 'firstMap',
            second: 'secondMap'
          },
          second: {
            direction: 'column',
            first: 'thirdMap',
            second: 'fourthMap'
          },
          splitPercentage: 50,
        }}
      /> */}
    </div>  
  )
}