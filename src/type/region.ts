export type Region = {
  region_id: number;
  name: string;
  level: number;
  children: { region_id: number; name: string; level: number }[];
};
