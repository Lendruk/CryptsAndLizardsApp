import { Category } from "./Category";
import { Tag } from "./Tag";

export type Item = {
  name: string;
  description?: string;
  tags: Tag[];
  weight: number;
  value: number;
  image?: string;
  rolls?: Rolls;
  archetype: ItemArchetype;
  categories: Category[];
}

export type Rolls = {
  dice: [{ amt: number, die: number }],
  base: number;
}

export type ItemAttributeType = Number | String;

export type ItemArchetype = {
  attributes: ItemAttribute[];
  name: string;
}

export type ItemAttribute = {
  value: any;
  default: any;
  type: ItemAttributeType;
  name: string;
  required: boolean;
}