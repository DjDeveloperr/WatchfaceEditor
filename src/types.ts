export const SIGN_SIZE = 0x20;
export const SIGN_STRING = "HMDIAL";

export enum ParamFlag {
  NONE = 0,
  UNKNOWN = 1,
  HAS_CHILDREN = 2,
  UNKNOWN2 = 4,
}

export enum ResourceType {
  PALETTE,
  BIT_8,
  BIT_16,
  BIT_24,
  BIT_32,
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Param {
  id: number;
  flags: number;
  value: bigint;
  children: Param[];
}

export interface ParsedParam extends Param {
  size: number;
}

export type ParamMapType = "bool" | "color" | "array";

export interface ParamMap {
  name: string;
  type?: ParamMapType;
  children?: { [key: number]: ParamMap };
}

export interface ParamTable {
  [id: number]: Param[];
}

export interface MappedParamTable {
  [name: string]: any;
}

export interface Resource {
  width: number;
  height: number;
  data: Uint8Array;
}

export interface ParsedResource extends Resource {
  id: number;
  type: ResourceType;
  rowLength: number;
  bitsPerPixel: number;
  paletteColors: number;
  palette?: Color[];
  transparency: number;
}

export interface Watchface {
  band: BandType;
  params: MappedParamTable;
  resources: Resource[];
}

export interface ParsedWatchface extends Watchface {
  resources: ParsedResource[];
}

export enum BandType {
  BAND_4 = 345,
  BAND_5 = 146,
  BAND_6 = 148,
}

export const BAND_DIMS: {
  [num in BandType]: [number, number];
} = {
  [BandType.BAND_4]: [120, 240],
  [BandType.BAND_5]: [126, 294],
  [BandType.BAND_6]: [152, 486],
};
