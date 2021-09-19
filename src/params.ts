import { decrIdent, incrIdent, trace } from "./logger.ts";
import {
  MappedParamTable,
  Param,
  ParamMap,
  ParamMapType,
  ParamTable,
  ParsedParam,
} from "./types.ts";

export const ImageMap: ParamMap = {
  name: "image",
  children: {
    1: { name: "x" },
    2: { name: "y" },
    3: { name: "imageIndex" },
  },
};

export const AmPmMap: ParamMap = {
  name: "image",
  children: {
    1: { name: "x" },
    2: { name: "y" },
    3: { name: "imageIndexAm" },
    4: { name: "imageIndexPm" },
  },
};

export const ImageSetMap: ParamMap = {
  name: "imageSet",
  children: {
    1: { name: "x" },
    2: { name: "y" },
    3: { name: "imageIndex" },
    4: { name: "imageCount" },
    5: { name: "unknown5" },
    6: { name: "unknown6" },
  },
};

export const TwoDigitsMap: ParamMap = {
  name: "twoDigits",
  children: {
    1: {
      ...ImageSetMap,
      name: "tens",
    },
    2: {
      ...ImageSetMap,
      name: "ones",
    },
  },
};

export const NumberMap: ParamMap = {
  name: "number",
  children: {
    1: { name: "topLeftX" },
    2: { name: "topLeftY" },
    3: { name: "bottomRightX" },
    4: { name: "bottomRightY" },
    5: { name: "alignment" },
    6: { name: "spacingX" },
    7: { name: "spacingY" },
    8: { name: "imageIndex" },
    9: { name: "imageCount" },
  },
};

export const OneLineMonthAndDayMap: ParamMap = {
  name: "oneLineMonthAndDayMap",
  children: {
    1: { ...NumberMap },
    2: { name: "delimiterImageIndex" },
    3: { name: "unknown3" },
  },
};

export const SeparateMonthAndDayMap: ParamMap = {
  name: "separateMonthAndDay",
  children: {
    1: { ...NumberMap, name: "month" },
    2: { ...NumberMap, name: "day" },
    4: {
      ...NumberMap,
      name: "dayNew",
    },
  },
};

export const FormattedNumberMap: ParamMap = {
  name: "formattedNumber",
  children: {
    1: { ...NumberMap },
    2: { name: "suffixImageIndex" },
    3: { name: "decimalPointImageIndex" },
    4: { name: "suffixMilesImageIndex" },
  },
};

export const DayAmPmMap: ParamMap = {
  name: "dayAmPm",
  children: {
    1: { name: "topLeftX" },
    2: { name: "topLeftY" },
    3: { name: "imageIndexAMCN" },
    4: { name: "imageIndexPMCN" },
    5: { name: "imageIndexAMEN" },
    6: { name: "imageIndexPMEN" },
  },
};

export const MonthAndDayMap: ParamMap = {
  name: "monthAndDay",
  children: {
    1: { ...SeparateMonthAndDayMap },
    2: { ...OneLineMonthAndDayMap },
    3: { name: "twoDigitsMonth" },
    4: { name: "twoDigitsDay" },
    5: { name: "twoDigitsMonthNew" },
  },
};

export const CoordinatesMap: ParamMap = {
  name: "coordinates",
  children: {
    1: { name: "x1" },
    2: { name: "y1" },
    3: { name: "x2" },
    4: { name: "y2" },
    5: { name: "x3" },
  },
};

export const WeatherIconMap: ParamMap = {
  name: "weatherIcon",
  children: {
    1: { ...CoordinatesMap },
    2: { ...ImageSetMap, name: "customIcon" },
    3: { ...CoordinatesMap, name: "coordinatesAlt" },
    4: { ...CoordinatesMap, name: "unknown4" },
  },
};

export const TemperatureNumberMap: ParamMap = {
  name: "temperatureNumber",
  children: {
    1: { ...NumberMap },
    2: { name: "minusImageIndex" },
    3: { name: "degreesImageIndex" },
  },
};

export const SeparateTemperatureMap: ParamMap = {
  name: "separateTemperature",
  children: {
    1: { ...TemperatureNumberMap, name: "day" },
    2: { ...TemperatureNumberMap, name: "night" },
    3: { ...CoordinatesMap, name: "dayAlt" },
    4: { ...CoordinatesMap, name: "nightAlt" },
  },
};

export const OneLineTemperatureMap: ParamMap = {
  name: "oneLineTemperature",
  children: {
    1: { ...NumberMap },
    2: { name: "minusSignImageIndex" },
    3: { name: "delimiterImageIndex" },
    4: { name: "appendDegreesForBoth", type: "bool" },
    5: { name: "degreesImageIndex" },
  },
};

export const TodayTemperatureMap: ParamMap = {
  name: "todayTemperature",
  children: {
    1: { ...SeparateTemperatureMap, name: "separate" },
    2: { ...OneLineTemperatureMap, name: "oneLine" },
  },
};

export const TemperatureMap: ParamMap = {
  name: "temperature",
  children: {
    1: { ...TemperatureNumberMap, name: "current" },
    2: { ...TodayTemperatureMap, name: "today" },
  },
};

export const AirPollutionMap: ParamMap = {
  name: "airPollution",
  children: {
    1: { ...NumberMap, name: "index" },
    2: { ...ImageSetMap, name: "icon" },
  },
};

export const SwitchMap: ParamMap = {
  name: "switch",
  children: {
    1: { ...CoordinatesMap },
    2: { name: "imageIndexOn" },
    3: { name: "imageIndexOff" },
  },
};

export const BatteryMap: ParamMap = {
  name: "battery",
  children: {
    1: {
      name: "text",
      children: Object.assign({}, NumberMap.children, {
        1: { name: "topLeftXModified", children: getUnknownChildren(9) },
      }),
    },
    2: { ...ImageSetMap, name: "batteryIcon" },
    3: { ...ImageSetMap, name: "icon" },
    5: { name: "unknown5" },
    6: { name: "unknown6" },
  },
};

export const ClockHandMap: ParamMap = {
  name: "clockHand",
  children: {
    1: { name: "onlyBorder", type: "bool" },
    2: { name: "color", type: "color" },
    3: { ...CoordinatesMap, name: "center" },
    4: { ...CoordinatesMap, name: "shape", type: "array" },
    5: { ...ImageMap, name: "centerImage" },
  },
};

export const XYMap: ParamMap = {
  name: "xy",
  children: {
    1: { name: "x" },
    2: { name: "y" },
  },
};

export const ScaleMap: ParamMap = {
  name: "scale",
  children: {
    1: { name: "startImageIndex" },
    2: { ...XYMap, name: "segments" },
  },
};

export const UnknownType14D6: ParamMap = {
  name: "unknown14D6",
  children: {
    1: { ...CoordinatesMap, name: "unknown1" },
    2: { ...CoordinatesMap, name: "unknown2" },
    3: { name: "unknown3" },
  },
};

export const StepsMap: ParamMap = {
  name: "steps",
  children: {
    1: { ...NumberMap, name: "step" },
    2: { name: "unknown2" },
  },
};

export const AnimationImageMap: ParamMap = {
  name: "animationImage",
  children: {
    1: { name: "x" },
    2: { name: "y" },
    3: { name: "imageIndex" },
    4: { name: "imageCount" },
    5: { name: "x3" },
  },
};

function getUnknownChildren(size: number) {
  return Object.fromEntries(
    new Array(size).fill(0).map((
      _,
      i,
    ) => [i + 1, { name: "unknown" + (i + 1) }]),
  );
}

export const ParameterMap: {
  [name: number]: ParamMap;
} = {
  2: {
    name: "background",
    children: {
      1: { ...ImageMap },
      2: { name: "unknown2" },
      3: {
        ...ImageMap,
        name: "preview1",
      },
      4: {
        ...ImageMap,
        name: "preview2",
      },
      5: {
        ...ImageMap,
        name: "preview3",
      },
    },
  },
  3: {
    name: "time",
    children: {
      1: { ...TwoDigitsMap, name: "hours" },
      2: { ...TwoDigitsMap, name: "minutes" },
      3: { ...TwoDigitsMap, name: "seconds" },
      4: { ...AmPmMap, name: "amPm" },
      5: { name: "drawingOrder" },
      6: { name: "unknown6", children: getUnknownChildren(3) },
      7: { name: "unknown7" },
      8: { name: "unknown8" },
      9: { name: "unknown9" },
      10: { name: "unknown10" },
      11: { name: "unknown11" },
    },
  },
  4: {
    name: "activity",
    children: {
      1: { ...StepsMap },
      2: { ...NumberMap, name: "stepsGoal" },
      3: { ...OneLineMonthAndDayMap, name: "calories" },
      4: { ...OneLineMonthAndDayMap, name: "pulse" },
      5: { ...FormattedNumberMap, name: "distance" },
      6: { name: "unknown6" },
      7: { name: "unknown7" },
    },
  },
  5: {
    name: "date",
    children: {
      1: { ...MonthAndDayMap },
      2: { ...ImageSetMap, name: "weekDay" },
      3: { ...DayAmPmMap },
      4: { ...ImageSetMap, name: "enWeekDays" },
      5: {
        name: "unknown5",
        children: getUnknownChildren(4),
      },
      6: {
        name: "unknown6",
        children: getUnknownChildren(4),
      },
    },
  },
  6: {
    name: "weather",
    children: {
      1: { ...WeatherIconMap, name: "icon" },
      2: { ...TemperatureMap, name: "temperature" },
      3: { ...AirPollutionMap },
    },
  },
  7: {
    name: "steps",
    children: {
      1: { ...NumberMap },
      2: { name: "prefixImageIndex" },
      3: {
        name: "unknown3",
        children: {
          1: { name: "unknown1" },
          2: { name: "unknown2", children: getUnknownChildren(2) },
          3: { name: "unknown3" },
        },
      },
    },
  },
  8: {
    name: "status",
    children: {
      1: { ...SwitchMap, name: "alarm" },
      2: { ...SwitchMap, name: "lock" },
      3: { ...SwitchMap, name: "bluetooth" },
      4: { ...BatteryMap },
    },
  },
  9: BatteryMap,
  10: {
    name: "analogDialFace",
    children: {
      1: { ...ClockHandMap, name: "hours" },
      2: { ...ClockHandMap, name: "minutes" },
      3: { ...ClockHandMap, name: "seconds" },
    },
  },
  11: {
    name: "other",
    children: {
      1: {
        name: "animation",
        children: {
          1: { ...AnimationImageMap, name: "image" },
          2: { name: "x1" },
          3: { name: "y1" },
          4: { name: "interval" },
        },
      },
    },
  },
  12: {
    name: "heart",
    children: {
      1: { ...ScaleMap },
    },
  },
  14: {
    name: "unknown14",
    children: {
      1: { ...TwoDigitsMap, name: "unknown1" },
      2: { ...TwoDigitsMap, name: "unknown2" },
      3: { name: "unknown3" },
      4: { name: "unknown4" },
      5: { name: "unknown5" },
      6: { ...UnknownType14D6, name: "unknown6" },
      7: { ...UnknownType14D6, name: "unknown7" },
      8: { ...UnknownType14D6, name: "unknown8" },
    },
  },
};

export function mapParams(params: ParamTable): MappedParamTable {
  trace("Map Params");
  const res: MappedParamTable = {};
  incrIdent();
  Object.entries(params).forEach(([k, v]) => {
    trace("Param ID:", Number(k));
    const map = ParameterMap[Number(k)];
    if (!map) throw new Error("Invalid Param ID: " + k);
    trace("Param Name:", map.name);

    function mapParamsChildren(v: Param[], _map = map) {
      trace("Map Params Children");
      const r: MappedParamTable = {};

      incrIdent();
      v.forEach((e) => {
        trace("Param Children:", e.id);
        const m = _map.children?.[e.id];
        if (!m) throw new Error("Invalid Param ID: " + e.id);
        trace("Child name:", m.name);

        if (
          e.children && e.children.length !== 0 &&
          (!m.children ||
            !e.children.every((ch) => ch.id in (m.children || {})))
        ) {
          throw new Error(
            `Param has Children but Map layout doesn't. Map: ${_map.name}.${m.name}, Element: ${
              Deno.inspect(e)
            } ${Boolean(e.children)}, ${e.children.length !== 0}, (${!m
              .children}, ${!e.children.every((ch) =>
                ch.id in (m.children || {})
              )})`,
          );
        }
        r[m.name] = e.children && m.children
          ? mapParamsChildren(e.children, m)
          : e.value;
      });
      decrIdent();
      return r;
    }

    incrIdent();
    res[map.name] = mapParamsChildren(v);
    decrIdent();
  });
  decrIdent();
  return res;
}

const converters: {
  [name in (ParamMapType | "unknown")]: {
    encode: (v: any) => any;
    decode: (v: any) => any;
  };
} = {
  array: { encode: (v) => v, decode: (v) => v },
  bool: { encode: (v) => Boolean(v), decode: (v) => BigInt(v) },
  color: { encode: (v) => v, decode: (v) => v },
  unknown: { encode: (v) => v, decode: (v) => v },
};

export function reverseMapParams(params: MappedParamTable): ParamTable {
  trace("Reverse Mapped Params");
  const table: ParamTable = {};

  function processMapped(
    name: string,
    value: any,
    into: ParamTable | Param[] = table,
    getMapEntry: (name: string) => [string, ParamMap] | undefined =
      ((name) => Object.entries(ParameterMap).find((e) => e[1].name === name)),
  ) {
    const mapEntry = getMapEntry(name);
    if (!mapEntry) {
      throw new Error(`Invalid parameter name: ${name}`);
    }

    const [id, map] = mapEntry;

    if (
      typeof value === "string" || typeof value === "number" ||
      typeof value === "bigint"
    ) {
      if (Array.isArray(into)) {
        into.push({
          id: Number(id),
          value: BigInt(
            (converters[map.type ?? "unknown"]).decode(value),
          ),
          flags: 0,
          children: [],
        });
      } else {
        throw new Error("Invalid param value at top level");
      }
    } else if (typeof value === "object") {
      const res: Param[] = [];
      Object.entries(value).forEach(([k, v]) => {
        processMapped(
          k,
          v,
          res,
          (name) =>
            Object.entries(map.children || {}).find((e) => e[1].name === name),
        );
      });
      if (Array.isArray(into)) {
        into.push({
          id: Number(id),
          value: BigInt(0),
          flags: 0,
          children: res,
        });
      } else {
        into[Number(id)] = res;
      }
    } else throw new Error("Invalid type: " + typeof value);
  }

  Object.entries(params).forEach(([k, v]) => {
    processMapped(k, v);
  });

  return table;
}

export function totalParamSize(param: ParsedParam): bigint {
  let res = 0n;
  res += BigInt(param.size);
  for (const child of param.children) {
    res += totalParamSize(child as ParsedParam);
  }
  return res;
}
