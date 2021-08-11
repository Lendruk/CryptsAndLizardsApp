export type TagColor = 'GREEN' | 'VULCANO' | 'GEEKBLUE';

export type Tag = {
  id: string;
  text: string;
  color?: TagColor;
}
