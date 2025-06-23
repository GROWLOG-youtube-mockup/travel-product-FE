export type Region = {
  regionId: number;
  name: string;
  level: number;
  children: { regionId: number; name: string; level: number }[];
};
