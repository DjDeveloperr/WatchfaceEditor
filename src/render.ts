import { BAND_DIMS, ParsedWatchface } from "./types.ts";

export interface BandState {
  date: Date;
  steps?: number;
  goal?: number;
  battery?: number;
  calories?: number;
  lock?: boolean;
  dnd?: boolean;
  bluetooth?: boolean;
  distance?: number;
  pai?: number;
  silent?: boolean;
  weather?: number;
}

export function render(
  { band, params, resources }: ParsedWatchface,
  state: BandState = {
    date: new Date(),
    steps: 100,
    goal: 1000,
    battery: 100,
    calories: 100,
    lock: true,
    dnd: true,
    bluetooth: true,
    distance: 100,
    pai: 100,
    silent: true,
    weather: 0,
  },
) {
  const dim = BAND_DIMS[band];
  const data = new Uint8Array(dim[0] * dim[1] * 4);

  function getImage(rid: number) {
    return resources.find((e) => e.id === Number(rid))!.data;
  }

  function putImage(img: Uint8Array, x: number, y: number) {
    data.set(img, ((Number(y) * dim[0]) + Number(x)) * 4);
  }

  if (params.background) {
    if (params.background.image) {
      const { x, y, imageIndex } = params.background.image;
      const img = getImage(imageIndex);
      putImage(img, x, y);
    }
  }

  return {
    width: dim[0],
    height: dim[1],
    data,
  };
}
