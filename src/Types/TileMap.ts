import { Vector3 } from "./Vector3"

export type Tile = {
  solid: boolean;
  speed: number;
}

export type TileAtlas = {

}

export type Asset = {
  _id: string;
  position: Vector3;
}

type TileMap = Tile[][][];

export type GameMap = {
  showGrid: boolean;
  assets: {
    props: Asset[];
  };
  tileMap: TileMap;
  tileSize: number;
  size: {
    x: number;
    y: number;
    z: number;
  }
}