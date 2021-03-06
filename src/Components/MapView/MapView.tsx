import * as PIXI from 'pixi.js';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { GameMap } from '../../Types/TileMap';
import Zoomer from './components/Zoomer';
import './styles.scss';
import { TileMapBuilder } from './TileMapBuilder';

type MapViewProps = {
  mapId: string;
  style?: CSSProperties,
}

const MAP_PAN_SPEED = 1;
let pixiApp;


export default function MapView(props: MapViewProps) {
  const tileMap: GameMap = { size: { x: 15, y: 15, z: 0 }, tileSize: 64, assets: { props: [] }, showGrid: true, tileMap: [] };
  let canvasHolder = useRef<HTMLDivElement>(null);
  const [mapScale, setScale] = useState(1);
  const [holdingRightClick, setHoldingRightClick] = useState(false);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if(canvasHolder?.current && !canvasHolder.current.hasChildNodes()) {
      pixiApp = new PIXI.Application({ antialias: true, width: tileMap.size.x * tileMap.tileSize, height: tileMap.size.y * tileMap.tileSize });
      pixiApp.stage.interactive = true;
      TileMapBuilder(pixiApp, tileMap);
      pixiApp.view.className = 'MapView';
      canvasHolder.current.appendChild(pixiApp.view);
    }
  });

  function handleScroll(event: React.WheelEvent<HTMLDivElement>) {
    let newScale = Number.parseFloat((mapScale + (event.deltaY > 0 ? 0.1 : -0.1)).toFixed(2));
    if(newScale <= 2 && newScale > 0) {
      setScale(newScale);
    }
  }

  function handleRightClickDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(event.button === 2) {
      setHoldingRightClick(true);
    }
  }

  function handleRightClickUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(event.button === 2) {
      setHoldingRightClick(false);
    }
  }

  function handleMouseMovement(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(holdingRightClick) {
      setMapPosition({x: (mapPosition.x + event.movementX) * MAP_PAN_SPEED, y: (mapPosition.y + event.movementY)* MAP_PAN_SPEED});
    }
  }

  function preventContextMenu(event:  React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }

  return (
    <div  onContextMenu={event => preventContextMenu(event)} 
          onMouseMove={mouseEvent => handleMouseMovement(mouseEvent)} 
          onMouseDown={mouseEvent => handleRightClickDown(mouseEvent)} 
          onMouseUp={mouseEvent => handleRightClickUp(mouseEvent)}
          onWheel={scrollEvent => handleScroll(scrollEvent)} 
          className="MapContainer" style={props.style}>
      <Zoomer zoom={Math.round((mapScale * 100))} incrementSize={10} onZoom={(zoom) => setScale(zoom / 100)} />
      <div ref={canvasHolder} style={{position: 'relative', transform: `scale(${mapScale}) translate(${mapPosition.x}px, ${mapPosition.y}px)`}} id={`map_view_${props.mapId}`} />
    </div>
  )
}