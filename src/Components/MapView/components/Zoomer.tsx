import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import './styles.scss';

type ZoomerProps = {
  incrementSize: number;
  onZoom: (zoom: number) => void;
  zoom: number;
}

export default function Zoomer(props: ZoomerProps) {
  const { zoom } = props;
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const selectorRef = React.createRef<HTMLDivElement>();
  let storedMovement = 0;

  useEffect(() => {
    if(zoom > 0 && zoom <= 200) {
      const selector = selectorRef.current!;
      const targetHeight = (zoom * (75 - 7.5))/ 100;
      selector.style.bottom = `${targetHeight}px`;
    }
  }, [zoom]);

  function changeZoom(event: any, incrementSize: number) {
    event.stopPropagation();
    const newZoom = zoom + incrementSize;
    if(newZoom > 0 && newZoom <= 200) {
      props.onZoom(newZoom);
    } 
  }

  function onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsDragging(true);
  }

  function onMouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsDragging(false);
    storedMovement = 0;
  }

  function onMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(isDragging) {
      const curBottom = Number.parseInt(selectorRef.current!.style.bottom);
      const newPosition = (curBottom || 0) + storedMovement; 
      if(Math.abs(storedMovement) < props.incrementSize || newPosition < 0 || newPosition > 135) {
        storedMovement += event.movementY;
        return;
      } else {
        changeZoom(event, (storedMovement > 0 ? - props.incrementSize : props.incrementSize));
        storedMovement = 0;
      }
    }
  }

  return (
    <div className="zoomer" onMouseLeave={() => setIsDragging(false)}>
      <div className="zoom-level">
        {zoom}%
      </div>
      <div className="zoomer-container" onMouseUp={e => onMouseUp(e)} onMouseMove={e => onMouseMove(e)}> 
        <div className="zoomer-end" onClick={e => changeZoom(e, props.incrementSize)}><PlusOutlined /></div>
        <div className="line">
          <div ref={selectorRef} className="selector" 
            onMouseDown={e => onMouseDown(e)} 
          />
        </div>
        <div className="zoomer-end" onClick={e => changeZoom(e, -props.incrementSize)}><MinusOutlined /></div>
      </div>
    </div>
  )
}