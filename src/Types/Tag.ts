export type TagColor = 'GREEN' | 'VULCANO' | 'GEEKBLUE';

export type Tag = {
  _id?: string;
  name: string;
  color?: TagColor;
}
