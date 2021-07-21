type PlayerInfo = {
  name: string;
  avatar: string;
}

export type Campaign = {
  _id: string;
  title: string;
  description: string;
  image: string;
  players: PlayerInfo[];
}