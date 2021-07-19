import * as PIXI from 'pixi.js';
import React from 'react';
import { TileMap } from '../../Types/TileMap';

export const TileMapBuilder = (pixiApp: PIXI.Application, tileMap: TileMap): void => {
  const graphics = new PIXI.Graphics();
  console.log('Building tile map');

  for(let x = 0; x < tileMap.size.x; x++) {
    for(let y = 0; y < tileMap.size.y; y++) {
      graphics.lineStyle({ width: 1, color: 0xFFFFFF });
      // graphics.beginFill(0x650A5A);
      graphics.drawRect(x * tileMap.tileSize,y * tileMap.tileSize, tileMap.tileSize, tileMap.tileSize);
      // graphics.endFill();

    }
  }



  pixiApp.stage.addChild(graphics);
};