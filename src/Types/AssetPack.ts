import { Tag } from "./Tag";

export type AssetPackPrivacy = "PUBLIC" | "PRIVATE" | "TRUSTED";

export type AssetPack = {
  _id: string;
  title: string;
  description: string;
  privacy: AssetPackPrivacy;
  tags: Tag[];
  dependencies: AssetPack[];
}

export type Assets = {
  
}