const SIGN_SIZE1 = 32;
const SIGN_STRING1 = "HMDIAL";
var ParamFlag1;
(function(ParamFlag) {
    ParamFlag[ParamFlag["NONE"] = 0] = "NONE";
    ParamFlag[ParamFlag["UNKNOWN"] = 1] = "UNKNOWN";
    ParamFlag[ParamFlag["HAS_CHILDREN"] = 2] = "HAS_CHILDREN";
    ParamFlag[ParamFlag["UNKNOWN2"] = 4] = "UNKNOWN2";
})(ParamFlag1 || (ParamFlag1 = {
}));
var ResourceType1;
(function(ResourceType) {
    ResourceType[ResourceType["PALETTE"] = 0] = "PALETTE";
    ResourceType[ResourceType["BIT_8"] = 1] = "BIT_8";
    ResourceType[ResourceType["BIT_16"] = 2] = "BIT_16";
    ResourceType[ResourceType["BIT_24"] = 3] = "BIT_24";
    ResourceType[ResourceType["BIT_32"] = 4] = "BIT_32";
})(ResourceType1 || (ResourceType1 = {
}));
var BandType1;
(function(BandType) {
    BandType[BandType["BAND_4"] = 345] = "BAND_4";
    BandType[BandType["BAND_5"] = 146] = "BAND_5";
    BandType[BandType["BAND_6"] = 148] = "BAND_6";
})(BandType1 || (BandType1 = {
}));
const BAND_DIMS1 = {
    [BandType1.BAND_4]: [
        120,
        240
    ],
    [BandType1.BAND_5]: [
        126,
        294
    ],
    [BandType1.BAND_6]: [
        152,
        486
    ]
};
export { SIGN_SIZE1 as SIGN_SIZE };
export { SIGN_STRING1 as SIGN_STRING };
export { ParamFlag1 as ParamFlag,  };
export { ResourceType1 as ResourceType,  };
export { BandType1 as BandType,  };
export { BAND_DIMS1 as BAND_DIMS };
function render1({ band , params , resources  }, state = {
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
    weather: 0
}) {
    const dim = BAND_DIMS1[band];
    const data = new Uint8Array(dim[0] * dim[1] * 4);
    function getImage(rid) {
        return resources.find((e)=>e.id === Number(rid)
        ).data;
    }
    function putImage(img, x, y) {
        data.set(img, (Number(y) * dim[0] + Number(x)) * 4);
    }
    if (params.background) {
        if (params.background.image) {
            const { x , y , imageIndex  } = params.background.image;
            const img = getImage(imageIndex);
            putImage(img, x, y);
        }
    }
    return {
        width: dim[0],
        height: dim[1],
        data
    };
}
export { render1 as render };
let ident = 0;
const hex = (n)=>"0x" + n.toString(16).padStart(2, "0").toUpperCase()
;
const trace = (...args)=>Deno.env.get("TRACE") === "1" && console.log("[Trace]" + "  ".repeat(ident), ...args.map((e)=>{
        return typeof e === "number" || typeof e === "bigint" ? `${e} (${hex(e)})` : e;
    }))
;
const incrIdent = (by = 1)=>ident += by
;
const decrIdent = (by = 1)=>ident -= by
;
const ImageMap = {
    name: "image",
    children: {
        1: {
            name: "x"
        },
        2: {
            name: "y"
        },
        3: {
            name: "imageIndex"
        }
    }
};
const AmPmMap = {
    name: "image",
    children: {
        1: {
            name: "x"
        },
        2: {
            name: "y"
        },
        3: {
            name: "imageIndexAm"
        },
        4: {
            name: "imageIndexPm"
        }
    }
};
const ImageSetMap = {
    name: "imageSet",
    children: {
        1: {
            name: "x"
        },
        2: {
            name: "y"
        },
        3: {
            name: "imageIndex"
        },
        4: {
            name: "imageCount"
        },
        5: {
            name: "unknown5"
        },
        6: {
            name: "unknown6"
        }
    }
};
const TwoDigitsMap = {
    name: "twoDigits",
    children: {
        1: {
            ...ImageSetMap,
            name: "tens"
        },
        2: {
            ...ImageSetMap,
            name: "ones"
        }
    }
};
const NumberMap = {
    name: "number",
    children: {
        1: {
            name: "topLeftX"
        },
        2: {
            name: "topLeftY"
        },
        3: {
            name: "bottomRightX"
        },
        4: {
            name: "bottomRightY"
        },
        5: {
            name: "alignment"
        },
        6: {
            name: "spacingX"
        },
        7: {
            name: "spacingY"
        },
        8: {
            name: "imageIndex"
        },
        9: {
            name: "imageCount"
        }
    }
};
const OneLineMonthAndDayMap = {
    name: "oneLineMonthAndDayMap",
    children: {
        1: {
            ...NumberMap
        },
        2: {
            name: "delimiterImageIndex"
        },
        3: {
            name: "unknown3"
        }
    }
};
const SeparateMonthAndDayMap = {
    name: "separateMonthAndDay",
    children: {
        1: {
            ...NumberMap,
            name: "month"
        },
        2: {
            ...NumberMap,
            name: "day"
        },
        4: {
            ...NumberMap,
            name: "dayNew"
        }
    }
};
const FormattedNumberMap = {
    name: "formattedNumber",
    children: {
        1: {
            ...NumberMap
        },
        2: {
            name: "suffixImageIndex"
        },
        3: {
            name: "decimalPointImageIndex"
        },
        4: {
            name: "suffixMilesImageIndex"
        }
    }
};
const DayAmPmMap = {
    name: "dayAmPm",
    children: {
        1: {
            name: "topLeftX"
        },
        2: {
            name: "topLeftY"
        },
        3: {
            name: "imageIndexAMCN"
        },
        4: {
            name: "imageIndexPMCN"
        },
        5: {
            name: "imageIndexAMEN"
        },
        6: {
            name: "imageIndexPMEN"
        }
    }
};
const MonthAndDayMap = {
    name: "monthAndDay",
    children: {
        1: {
            ...SeparateMonthAndDayMap
        },
        2: {
            ...OneLineMonthAndDayMap
        },
        3: {
            name: "twoDigitsMonth"
        },
        4: {
            name: "twoDigitsDay"
        },
        5: {
            name: "twoDigitsMonthNew"
        }
    }
};
const CoordinatesMap = {
    name: "coordinates",
    children: {
        1: {
            name: "x1"
        },
        2: {
            name: "y1"
        },
        3: {
            name: "x2"
        },
        4: {
            name: "y2"
        },
        5: {
            name: "x3"
        }
    }
};
const WeatherIconMap = {
    name: "weatherIcon",
    children: {
        1: {
            ...CoordinatesMap
        },
        2: {
            ...ImageSetMap,
            name: "customIcon"
        },
        3: {
            ...CoordinatesMap,
            name: "coordinatesAlt"
        },
        4: {
            ...CoordinatesMap,
            name: "unknown4"
        }
    }
};
const TemperatureNumberMap = {
    name: "temperatureNumber",
    children: {
        1: {
            ...NumberMap
        },
        2: {
            name: "minusImageIndex"
        },
        3: {
            name: "degreesImageIndex"
        }
    }
};
const SeparateTemperatureMap = {
    name: "separateTemperature",
    children: {
        1: {
            ...TemperatureNumberMap,
            name: "day"
        },
        2: {
            ...TemperatureNumberMap,
            name: "night"
        },
        3: {
            ...CoordinatesMap,
            name: "dayAlt"
        },
        4: {
            ...CoordinatesMap,
            name: "nightAlt"
        }
    }
};
const OneLineTemperatureMap = {
    name: "oneLineTemperature",
    children: {
        1: {
            ...NumberMap
        },
        2: {
            name: "minusSignImageIndex"
        },
        3: {
            name: "delimiterImageIndex"
        },
        4: {
            name: "appendDegreesForBoth",
            type: "bool"
        },
        5: {
            name: "degreesImageIndex"
        }
    }
};
const TodayTemperatureMap = {
    name: "todayTemperature",
    children: {
        1: {
            ...SeparateTemperatureMap,
            name: "separate"
        },
        2: {
            ...OneLineTemperatureMap,
            name: "oneLine"
        }
    }
};
const TemperatureMap = {
    name: "temperature",
    children: {
        1: {
            ...TemperatureNumberMap,
            name: "current"
        },
        2: {
            ...TodayTemperatureMap,
            name: "today"
        }
    }
};
const AirPollutionMap = {
    name: "airPollution",
    children: {
        1: {
            ...NumberMap,
            name: "index"
        },
        2: {
            ...ImageSetMap,
            name: "icon"
        }
    }
};
const SwitchMap = {
    name: "switch",
    children: {
        1: {
            ...CoordinatesMap
        },
        2: {
            name: "imageIndexOn"
        },
        3: {
            name: "imageIndexOff"
        }
    }
};
const BatteryMap = {
    name: "battery",
    children: {
        1: {
            name: "text",
            children: Object.assign({
            }, NumberMap.children, {
                1: {
                    name: "topLeftXModified",
                    children: getUnknownChildren(9)
                }
            })
        },
        2: {
            ...ImageSetMap,
            name: "batteryIcon"
        },
        3: {
            ...ImageSetMap,
            name: "icon"
        },
        5: {
            name: "unknown5"
        },
        6: {
            name: "unknown6"
        }
    }
};
const ClockHandMap = {
    name: "clockHand",
    children: {
        1: {
            name: "onlyBorder",
            type: "bool"
        },
        2: {
            name: "color",
            type: "color"
        },
        3: {
            ...CoordinatesMap,
            name: "center"
        },
        4: {
            ...CoordinatesMap,
            name: "shape",
            type: "array"
        },
        5: {
            ...ImageMap,
            name: "centerImage"
        }
    }
};
const XYMap = {
    name: "xy",
    children: {
        1: {
            name: "x"
        },
        2: {
            name: "y"
        }
    }
};
const ScaleMap = {
    name: "scale",
    children: {
        1: {
            name: "startImageIndex"
        },
        2: {
            ...XYMap,
            name: "segments"
        }
    }
};
const UnknownType14D6 = {
    name: "unknown14D6",
    children: {
        1: {
            ...CoordinatesMap,
            name: "unknown1"
        },
        2: {
            ...CoordinatesMap,
            name: "unknown2"
        },
        3: {
            name: "unknown3"
        }
    }
};
const StepsMap = {
    name: "steps",
    children: {
        1: {
            ...NumberMap,
            name: "step"
        },
        2: {
            name: "unknown2"
        }
    }
};
const AnimationImageMap = {
    name: "animationImage",
    children: {
        1: {
            name: "x"
        },
        2: {
            name: "y"
        },
        3: {
            name: "imageIndex"
        },
        4: {
            name: "imageCount"
        },
        5: {
            name: "x3"
        }
    }
};
function getUnknownChildren(size) {
    return Object.fromEntries(new Array(size).fill(0).map((_, i)=>[
            i + 1,
            {
                name: "unknown" + (i + 1)
            }
        ]
    ));
}
const ParameterMap = {
    2: {
        name: "background",
        children: {
            1: {
                ...ImageMap
            },
            2: {
                name: "unknown2"
            },
            3: {
                ...ImageMap,
                name: "preview1"
            },
            4: {
                ...ImageMap,
                name: "preview2"
            },
            5: {
                ...ImageMap,
                name: "preview3"
            }
        }
    },
    3: {
        name: "time",
        children: {
            1: {
                ...TwoDigitsMap,
                name: "hours"
            },
            2: {
                ...TwoDigitsMap,
                name: "minutes"
            },
            3: {
                ...TwoDigitsMap,
                name: "seconds"
            },
            4: {
                ...AmPmMap,
                name: "amPm"
            },
            5: {
                name: "drawingOrder"
            },
            6: {
                name: "unknown6",
                children: getUnknownChildren(3)
            },
            7: {
                name: "unknown7"
            },
            8: {
                name: "unknown8"
            },
            9: {
                name: "unknown9"
            },
            10: {
                name: "unknown10"
            },
            11: {
                name: "unknown11"
            }
        }
    },
    4: {
        name: "activity",
        children: {
            1: {
                ...StepsMap
            },
            2: {
                ...NumberMap,
                name: "stepsGoal"
            },
            3: {
                ...OneLineMonthAndDayMap,
                name: "calories"
            },
            4: {
                ...OneLineMonthAndDayMap,
                name: "pulse"
            },
            5: {
                ...FormattedNumberMap,
                name: "distance"
            },
            6: {
                name: "unknown6"
            },
            7: {
                name: "unknown7"
            }
        }
    },
    5: {
        name: "date",
        children: {
            1: {
                ...MonthAndDayMap
            },
            2: {
                ...ImageSetMap,
                name: "weekDay"
            },
            3: {
                ...DayAmPmMap
            },
            4: {
                ...ImageSetMap,
                name: "enWeekDays"
            },
            5: {
                name: "unknown5",
                children: getUnknownChildren(4)
            },
            6: {
                name: "unknown6",
                children: getUnknownChildren(4)
            }
        }
    },
    6: {
        name: "weather",
        children: {
            1: {
                ...WeatherIconMap,
                name: "icon"
            },
            2: {
                ...TemperatureMap,
                name: "temperature"
            },
            3: {
                ...AirPollutionMap
            }
        }
    },
    7: {
        name: "steps",
        children: {
            1: {
                ...NumberMap
            },
            2: {
                name: "prefixImageIndex"
            },
            3: {
                name: "unknown3",
                children: {
                    1: {
                        name: "unknown1"
                    },
                    2: {
                        name: "unknown2",
                        children: getUnknownChildren(2)
                    },
                    3: {
                        name: "unknown3"
                    }
                }
            }
        }
    },
    8: {
        name: "status",
        children: {
            1: {
                ...SwitchMap,
                name: "alarm"
            },
            2: {
                ...SwitchMap,
                name: "lock"
            },
            3: {
                ...SwitchMap,
                name: "bluetooth"
            },
            4: {
                ...BatteryMap
            }
        }
    },
    9: BatteryMap,
    10: {
        name: "analogDialFace",
        children: {
            1: {
                ...ClockHandMap,
                name: "hours"
            },
            2: {
                ...ClockHandMap,
                name: "minutes"
            },
            3: {
                ...ClockHandMap,
                name: "seconds"
            }
        }
    },
    11: {
        name: "other",
        children: {
            1: {
                name: "animation",
                children: {
                    1: {
                        ...AnimationImageMap,
                        name: "image"
                    },
                    2: {
                        name: "x1"
                    },
                    3: {
                        name: "y1"
                    },
                    4: {
                        name: "interval"
                    }
                }
            }
        }
    },
    12: {
        name: "heart",
        children: {
            1: {
                ...ScaleMap
            }
        }
    },
    14: {
        name: "unknown14",
        children: {
            1: {
                ...TwoDigitsMap,
                name: "unknown1"
            },
            2: {
                ...TwoDigitsMap,
                name: "unknown2"
            },
            3: {
                name: "unknown3"
            },
            4: {
                name: "unknown4"
            },
            5: {
                name: "unknown5"
            },
            6: {
                ...UnknownType14D6,
                name: "unknown6"
            },
            7: {
                ...UnknownType14D6,
                name: "unknown7"
            },
            8: {
                ...UnknownType14D6,
                name: "unknown8"
            }
        }
    }
};
function mapParams(params) {
    trace("Map Params");
    const res = {
    };
    incrIdent();
    Object.entries(params).forEach(([k, v])=>{
        trace("Param ID:", Number(k));
        const map = ParameterMap[Number(k)];
        if (!map) throw new Error("Invalid Param ID: " + k);
        trace("Param Name:", map.name);
        function mapParamsChildren(v, _map = map) {
            trace("Map Params Children");
            const r = {
            };
            incrIdent();
            v.forEach((e)=>{
                trace("Param Children:", e.id);
                const m = _map.children?.[e.id];
                if (!m) throw new Error("Invalid Param ID: " + e.id);
                trace("Child name:", m.name);
                if (e.children && e.children.length !== 0 && (!m.children || !e.children.every((ch)=>ch.id in (m.children || {
                    })
                ))) {
                    throw new Error(`Param has Children but Map layout doesn't. Map: ${_map.name}.${m.name}, Element: ${Deno.inspect(e)} ${Boolean(e.children)}, ${e.children.length !== 0}, (${!m.children}, ${!e.children.every((ch)=>ch.id in (m.children || {
                        })
                    )})`);
                }
                r[m.name] = e.children && m.children ? mapParamsChildren(e.children, m) : e.value;
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
const converters = {
    array: {
        encode: (v)=>v
        ,
        decode: (v)=>v
    },
    bool: {
        encode: (v)=>Boolean(v)
        ,
        decode: (v)=>BigInt(v)
    },
    color: {
        encode: (v)=>v
        ,
        decode: (v)=>v
    },
    unknown: {
        encode: (v)=>v
        ,
        decode: (v)=>v
    }
};
function reverseMapParams(params) {
    trace("Reverse Mapped Params");
    const table = {
    };
    function processMapped(name, value, into = table, getMapEntry = (name)=>Object.entries(ParameterMap).find((e)=>e[1].name === name
        )
    ) {
        const mapEntry = getMapEntry(name);
        if (!mapEntry) {
            throw new Error(`Invalid parameter name: ${name}`);
        }
        const [id, map] = mapEntry;
        if (typeof value === "string" || typeof value === "number" || typeof value === "bigint") {
            if (Array.isArray(into)) {
                into.push({
                    id: Number(id),
                    value: BigInt(converters[map.type ?? "unknown"].decode(value)),
                    flags: 0,
                    children: []
                });
            } else {
                throw new Error("Invalid param value at top level");
            }
        } else if (typeof value === "object") {
            const res = [];
            Object.entries(value).forEach(([k, v])=>{
                processMapped(k, v, res, (name)=>Object.entries(map.children || {
                    }).find((e)=>e[1].name === name
                    )
                );
            });
            if (Array.isArray(into)) {
                into.push({
                    id: Number(id),
                    value: BigInt(0),
                    flags: 0,
                    children: res
                });
            } else {
                into[Number(id)] = res;
            }
        } else throw new Error("Invalid type: " + typeof value);
    }
    Object.entries(params).forEach(([k, v])=>{
        processMapped(k, v);
    });
    return table;
}
function totalParamSize(param) {
    let res = 0n;
    res += BigInt(param.size);
    for (const child of param.children){
        res += totalParamSize(child);
    }
    return res;
}
const { Deno  } = globalThis;
const noColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : true;
let enabled = !noColor;
function code(open, close) {
    return {
        open: `\x1b[${open.join(";")}m`,
        close: `\x1b[${close}m`,
        regexp: new RegExp(`\\x1b\\[${close}m`, "g")
    };
}
function run(str, code) {
    return enabled ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}` : str;
}
function bold(str) {
    return run(str, code([
        1
    ], 22));
}
function red(str) {
    return run(str, code([
        31
    ], 39));
}
function green(str) {
    return run(str, code([
        32
    ], 39));
}
function white(str) {
    return run(str, code([
        37
    ], 39));
}
function gray(str) {
    return brightBlack(str);
}
function brightBlack(str) {
    return run(str, code([
        90
    ], 39));
}
function bgRed(str) {
    return run(str, code([
        41
    ], 49));
}
function bgGreen(str) {
    return run(str, code([
        42
    ], 49));
}
const ANSI_PATTERN = new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))", 
].join("|"), "g");
var DiffType;
(function(DiffType) {
    DiffType["removed"] = "removed";
    DiffType["common"] = "common";
    DiffType["added"] = "added";
})(DiffType || (DiffType = {
}));
const REMOVED = 1;
const COMMON = 2;
const ADDED = 3;
function createCommon(A, B, reverse) {
    const common = [];
    if (A.length === 0 || B.length === 0) return [];
    for(let i = 0; i < Math.min(A.length, B.length); i += 1){
        if (A[reverse ? A.length - i - 1 : i] === B[reverse ? B.length - i - 1 : i]) {
            common.push(A[reverse ? A.length - i - 1 : i]);
        } else {
            return common;
        }
    }
    return common;
}
function diff(A, B) {
    const prefixCommon = createCommon(A, B);
    const suffixCommon = createCommon(A.slice(prefixCommon.length), B.slice(prefixCommon.length), true).reverse();
    A = suffixCommon.length ? A.slice(prefixCommon.length, -suffixCommon.length) : A.slice(prefixCommon.length);
    B = suffixCommon.length ? B.slice(prefixCommon.length, -suffixCommon.length) : B.slice(prefixCommon.length);
    const swapped = B.length > A.length;
    [A, B] = swapped ? [
        B,
        A
    ] : [
        A,
        B
    ];
    const M = A.length;
    const N = B.length;
    if (!M && !N && !suffixCommon.length && !prefixCommon.length) return [];
    if (!N) {
        return [
            ...prefixCommon.map((c)=>({
                    type: DiffType.common,
                    value: c
                })
            ),
            ...A.map((a)=>({
                    type: swapped ? DiffType.added : DiffType.removed,
                    value: a
                })
            ),
            ...suffixCommon.map((c)=>({
                    type: DiffType.common,
                    value: c
                })
            ), 
        ];
    }
    const offset = N;
    const delta = M - N;
    const size = M + N + 1;
    const fp = new Array(size).fill({
        y: -1
    });
    const routes = new Uint32Array((M * N + size + 1) * 2);
    const diffTypesPtrOffset = routes.length / 2;
    let ptr = 0;
    let p = -1;
    function backTrace(A, B, current, swapped) {
        const M = A.length;
        const N = B.length;
        const result = [];
        let a = M - 1;
        let b = N - 1;
        let j = routes[current.id];
        let type = routes[current.id + diffTypesPtrOffset];
        while(true){
            if (!j && !type) break;
            const prev = j;
            if (type === 1) {
                result.unshift({
                    type: swapped ? DiffType.removed : DiffType.added,
                    value: B[b]
                });
                b -= 1;
            } else if (type === 3) {
                result.unshift({
                    type: swapped ? DiffType.added : DiffType.removed,
                    value: A[a]
                });
                a -= 1;
            } else {
                result.unshift({
                    type: DiffType.common,
                    value: A[a]
                });
                a -= 1;
                b -= 1;
            }
            j = routes[prev];
            type = routes[prev + diffTypesPtrOffset];
        }
        return result;
    }
    function createFP(slide, down, k, M) {
        if (slide && slide.y === -1 && down && down.y === -1) {
            return {
                y: 0,
                id: 0
            };
        }
        if (down && down.y === -1 || k === M || (slide && slide.y) > (down && down.y) + 1) {
            const prev = slide.id;
            ptr++;
            routes[ptr] = prev;
            routes[ptr + diffTypesPtrOffset] = ADDED;
            return {
                y: slide.y,
                id: ptr
            };
        } else {
            const prev = down.id;
            ptr++;
            routes[ptr] = prev;
            routes[ptr + diffTypesPtrOffset] = REMOVED;
            return {
                y: down.y + 1,
                id: ptr
            };
        }
    }
    function snake(k, slide, down, _offset, A, B) {
        const M = A.length;
        const N = B.length;
        if (k < -N || M < k) return {
            y: -1,
            id: -1
        };
        const fp = createFP(slide, down, k, M);
        while(fp.y + k < M && fp.y < N && A[fp.y + k] === B[fp.y]){
            const prev = fp.id;
            ptr++;
            fp.id = ptr;
            fp.y += 1;
            routes[ptr] = prev;
            routes[ptr + diffTypesPtrOffset] = COMMON;
        }
        return fp;
    }
    while(fp[delta + offset].y < N){
        p = p + 1;
        for(let k = -p; k < delta; ++k){
            fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
        }
        for(let k1 = delta + p; k1 > delta; --k1){
            fp[k1 + offset] = snake(k1, fp[k1 - 1 + offset], fp[k1 + 1 + offset], offset, A, B);
        }
        fp[delta + offset] = snake(delta, fp[delta - 1 + offset], fp[delta + 1 + offset], offset, A, B);
    }
    return [
        ...prefixCommon.map((c)=>({
                type: DiffType.common,
                value: c
            })
        ),
        ...backTrace(A, B, fp[delta + offset], swapped),
        ...suffixCommon.map((c)=>({
                type: DiffType.common,
                value: c
            })
        ), 
    ];
}
function diffstr(A, B) {
    function tokenize(string, { wordDiff =false  } = {
    }) {
        if (wordDiff) {
            const tokens = string.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/);
            const words = /^[a-zA-Z\u{C0}-\u{FF}\u{D8}-\u{F6}\u{F8}-\u{2C6}\u{2C8}-\u{2D7}\u{2DE}-\u{2FF}\u{1E00}-\u{1EFF}]+$/u;
            for(let i = 0; i < tokens.length - 1; i++){
                if (!tokens[i + 1] && tokens[i + 2] && words.test(tokens[i]) && words.test(tokens[i + 2])) {
                    tokens[i] += tokens[i + 2];
                    tokens.splice(i + 1, 2);
                    i--;
                }
            }
            return tokens.filter((token)=>token
            );
        } else {
            const tokens = [], lines = string.split(/(\n|\r\n)/);
            if (!lines[lines.length - 1]) {
                lines.pop();
            }
            for(let i = 0; i < lines.length; i++){
                if (i % 2) {
                    tokens[tokens.length - 1] += lines[i];
                } else {
                    tokens.push(lines[i]);
                }
            }
            return tokens;
        }
    }
    function createDetails(line, tokens) {
        return tokens.filter(({ type  })=>type === line.type || type === DiffType.common
        ).map((result, i, t)=>{
            if (result.type === DiffType.common && t[i - 1] && t[i - 1]?.type === t[i + 1]?.type && /\s+/.test(result.value)) {
                result.type = t[i - 1].type;
            }
            return result;
        });
    }
    const diffResult = diff(tokenize(`${A}\n`), tokenize(`${B}\n`));
    const added = [], removed = [];
    for (const result of diffResult){
        if (result.type === DiffType.added) {
            added.push(result);
        }
        if (result.type === DiffType.removed) {
            removed.push(result);
        }
    }
    const aLines = added.length < removed.length ? added : removed;
    const bLines = aLines === removed ? added : removed;
    for (const a of aLines){
        let tokens = [], b;
        while(bLines.length){
            b = bLines.shift();
            tokens = diff(tokenize(a.value, {
                wordDiff: true
            }), tokenize(b?.value ?? "", {
                wordDiff: true
            }));
            if (tokens.some(({ type , value  })=>type === DiffType.common && value.trim().length
            )) {
                break;
            }
        }
        a.details = createDetails(a, tokens);
        if (b) {
            b.details = createDetails(b, tokens);
        }
    }
    return diffResult;
}
const CAN_NOT_DISPLAY = "[Cannot display]";
class AssertionError extends Error {
    constructor(message){
        super(message);
        this.name = "AssertionError";
    }
}
function _format(v) {
    const { Deno  } = globalThis;
    return typeof Deno?.inspect === "function" ? Deno.inspect(v, {
        depth: Infinity,
        sorted: true,
        trailingComma: true,
        compact: false,
        iterableLimit: Infinity
    }) : `"${String(v).replace(/(?=["\\])/g, "\\")}"`;
}
function createColor(diffType, { background =false  } = {
}) {
    switch(diffType){
        case DiffType.added:
            return (s)=>background ? bgGreen(white(s)) : green(bold(s))
            ;
        case DiffType.removed:
            return (s)=>background ? bgRed(white(s)) : red(bold(s))
            ;
        default:
            return white;
    }
}
function createSign(diffType) {
    switch(diffType){
        case DiffType.added:
            return "+   ";
        case DiffType.removed:
            return "-   ";
        default:
            return "    ";
    }
}
function buildMessage(diffResult, { stringDiff =false  } = {
}) {
    const messages = [], diffMessages = [];
    messages.push("");
    messages.push("");
    messages.push(`    ${gray(bold("[Diff]"))} ${red(bold("Actual"))} / ${green(bold("Expected"))}`);
    messages.push("");
    messages.push("");
    diffResult.forEach((result)=>{
        const c = createColor(result.type);
        const line = result.details?.map((detail)=>detail.type !== DiffType.common ? createColor(detail.type, {
                background: true
            })(detail.value) : detail.value
        ).join("") ?? result.value;
        diffMessages.push(c(`${createSign(result.type)}${line}`));
    });
    messages.push(...stringDiff ? [
        diffMessages.join("")
    ] : diffMessages);
    messages.push("");
    return messages;
}
function isKeyedCollection(x) {
    return [
        Symbol.iterator,
        "size"
    ].every((k)=>k in x
    );
}
function equal(c, d) {
    const seen = new Map();
    return (function compare(a, b) {
        if (a && b && (a instanceof RegExp && b instanceof RegExp || a instanceof URL && b instanceof URL)) {
            return String(a) === String(b);
        }
        if (a instanceof Date && b instanceof Date) {
            const aTime = a.getTime();
            const bTime = b.getTime();
            if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
                return true;
            }
            return a.getTime() === b.getTime();
        }
        if (Object.is(a, b)) {
            return true;
        }
        if (a && typeof a === "object" && b && typeof b === "object") {
            if (a && b && !constructorsEqual(a, b)) {
                return false;
            }
            if (a instanceof WeakMap || b instanceof WeakMap) {
                if (!(a instanceof WeakMap && b instanceof WeakMap)) return false;
                throw new TypeError("cannot compare WeakMap instances");
            }
            if (a instanceof WeakSet || b instanceof WeakSet) {
                if (!(a instanceof WeakSet && b instanceof WeakSet)) return false;
                throw new TypeError("cannot compare WeakSet instances");
            }
            if (seen.get(a) === b) {
                return true;
            }
            if (Object.keys(a || {
            }).length !== Object.keys(b || {
            }).length) {
                return false;
            }
            if (isKeyedCollection(a) && isKeyedCollection(b)) {
                if (a.size !== b.size) {
                    return false;
                }
                let unmatchedEntries = a.size;
                for (const [aKey, aValue] of a.entries()){
                    for (const [bKey, bValue] of b.entries()){
                        if (aKey === aValue && bKey === bValue && compare(aKey, bKey) || compare(aKey, bKey) && compare(aValue, bValue)) {
                            unmatchedEntries--;
                        }
                    }
                }
                return unmatchedEntries === 0;
            }
            const merged = {
                ...a,
                ...b
            };
            for (const key of [
                ...Object.getOwnPropertyNames(merged),
                ...Object.getOwnPropertySymbols(merged), 
            ]){
                if (!compare(a && a[key], b && b[key])) {
                    return false;
                }
                if (key in a && !(key in b) || key in b && !(key in a)) {
                    return false;
                }
            }
            seen.set(a, b);
            if (a instanceof WeakRef || b instanceof WeakRef) {
                if (!(a instanceof WeakRef && b instanceof WeakRef)) return false;
                return compare(a.deref(), b.deref());
            }
            return true;
        }
        return false;
    })(c, d);
}
function constructorsEqual(a, b) {
    return a.constructor === b.constructor || a.constructor === Object && !b.constructor || !a.constructor && b.constructor === Object;
}
function assertEquals(actual, expected, msg) {
    if (equal(actual, expected)) {
        return;
    }
    let message = "";
    const actualString = _format(actual);
    const expectedString = _format(expected);
    try {
        const stringDiff = typeof actual === "string" && typeof expected === "string";
        const diffResult = stringDiff ? diffstr(actual, expected) : diff(actualString.split("\n"), expectedString.split("\n"));
        const diffMsg = buildMessage(diffResult, {
            stringDiff
        }).join("\n");
        message = `Values are not equal:\n${diffMsg}`;
    } catch  {
        message = `\n${red(CAN_NOT_DISPLAY)} + \n\n`;
    }
    if (msg) {
        message = msg;
    }
    throw new AssertionError(message);
}
function assertExists(actual, msg) {
    if (actual === undefined || actual === null) {
        if (!msg) {
            msg = `actual: "${actual}" expected to not be null or undefined`;
        }
        throw new AssertionError(msg);
    }
}
const importMeta = {
    url: "https://deno.land/x/lz4@v0.1.2/wasm.js",
    main: false
};
const source = Uint8Array.from(atob("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QcCjwAAgAjYCAEHIo8AAIAMgBmoiADYCACAAIAJBAXI2AgQgASADaiACNgIAIANBBGohACAGQQNyCyEGIAAgBjYCAAwHC0Hso8AAKAIAIgBBACAAIANNG0UEQEHso8AAIAM2AgALQfCjwABB/x82AgBB3KPAACAFNgIAQdijwAAgAzYCAEHEoMAAQbigwAA2AgBBzKDAAEHAoMAANgIAQcCgwABBuKDAADYCAEHUoMAAQcigwAA2AgBByKDAAEHAoMAANgIAQdygwABB0KDAADYCAEHQoMAAQcigwAA2AgBB5KDAAEHYoMAANgIAQdigwABB0KDAADYCAEHsoMAAQeCgwAA2AgBB4KDAAEHYoMAANgIAQfSgwABB6KDAADYCAEHooMAAQeCgwAA2AgBB/KDAAEHwoMAANgIAQfCgwABB6KDAADYCAEHko8AAQQA2AgBBhKHAAEH4oMAANgIAQfigwABB8KDAADYCAEGAocAAQfigwAA2AgBBjKHAAEGAocAANgIAQYihwABBgKHAADYCAEGUocAAQYihwAA2AgBBkKHAAEGIocAANgIAQZyhwABBkKHAADYCAEGYocAAQZChwAA2AgBBpKHAAEGYocAANgIAQaChwABBmKHAADYCAEGsocAAQaChwAA2AgBBqKHAAEGgocAANgIAQbShwABBqKHAADYCAEGwocAAQaihwAA2AgBBvKHAAEGwocAANgIAQbihwABBsKHAADYCAEHEocAAQbihwAA2AgBBzKHAAEHAocAANgIAQcChwABBuKHAADYCAEHUocAAQcihwAA2AgBByKHAAEHAocAANgIAQdyhwABB0KHAADYCAEHQocAAQcihwAA2AgBB5KHAAEHYocAANgIAQdihwABB0KHAADYCAEHsocAAQeChwAA2AgBB4KHAAEHYocAANgIAQfShwABB6KHAADYCAEHoocAAQeChwAA2AgBB/KHAAEHwocAANgIAQfChwABB6KHAADYCAEGEosAAQfihwAA2AgBB+KHAAEHwocAANgIAQYyiwABBgKLAADYCAEGAosAAQfihwAA2AgBBlKLAAEGIosAANgIAQYiiwABBgKLAADYCAEGcosAAQZCiwAA2AgBBkKLAAEGIosAANgIAQaSiwABBmKLAADYCAEGYosAAQZCiwAA2AgBBrKLAAEGgosAANgIAQaCiwABBmKLAADYCAEG0osAAQaiiwAA2AgBBqKLAAEGgosAANgIAQbyiwABBsKLAADYCAEGwosAAQaiiwAA2AgBBzKPAACADNgIAQbiiwABBsKLAADYCAEHEo8AAIAVBWGoiADYCACADIABBAXI2AgQgACADakEoNgIEQeijwABBgICAATYCAAwCCyAAQQxqKAIAIAMgBE1yIAEgBEtyDQAgACACIAVqNgIEQcyjwABBzKPAACgCACIDQQ9qQXhxIgFBeGo2AgBBxKPAAEHEo8AAKAIAIAVqIgIgAyABa2pBCGoiADYCACABQXxqIABBAXI2AgAgAiADakEoNgIEQeijwABBgICAATYCAAwBC0Hso8AAQeyjwAAoAgAiACADIAAgA0kbNgIAIAMgBWohAUHYo8AAIQACQANAIAEgACgCAEcEQCAAKAIIIgANAQwCCwsgAEEMaigCAA0AIAAgAzYCACAAIAAoAgQgBWo2AgQgAyAGQQNyNgIEIAMgBmohBCABIANrIAZrIQYCQAJAIAFBzKPAACgCAEcEQEHIo8AAKAIAIAFGDQEgAUEEaigCACIAQQNxQQFGBEAgASAAQXhxIgAQDiAAIAZqIQYgACABaiEBCyABIAEoAgRBfnE2AgQgBCAGQQFyNgIEIAQgBmogBjYCACAGQYACTwRAIARCADcCECAEAn9BACAGQQh2IgBFDQAaQR8gBkH///8HSw0AGiAGQQYgAGciAGtBH3F2QQFxIABBAXRrQT5qCyIFNgIcIAVBAnRBwKLAAGohAQJAAkACQAJAQbSgwAAoAgAiAkEBIAVBH3F0IgBxBEAgASgCACICQQRqKAIAQXhxIAZHDQEgAiEFDAILQbSgwAAgACACcjYCACABIAQ2AgAgBCABNgIYDAMLIAZBAEEZIAVBAXZrQR9xIAVBH0YbdCEBA0AgAiABQR12QQRxakEQaiIAKAIAIgVFDQIgAUEBdCEBIAUiAkEEaigCAEF4cSAGRw0ACwsgBSgCCCIAIAQ2AgwgBSAENgIIIARBADYCGCAEIAU2AgwgBCAANgIIDAULIAAgBDYCACAEIAI2AhgLIAQgBDYCDCAEIAQ2AggMAwsgBkEDdiICQQN0QbigwABqIQACf0GwoMAAKAIAIgFBASACQR9xdCICcQRAIAAoAggMAQtBsKDAACABIAJyNgIAIAALIQUgACAENgIIIAUgBDYCDCAEIAA2AgwgBCAFNgIIDAILQcyjwAAgBDYCAEHEo8AAQcSjwAAoAgAgBmoiADYCACAEIABBAXI2AgQMAQtByKPAACAENgIAQcCjwABBwKPAACgCACAGaiIANgIAIAQgAEEBcjYCBCAAIARqIAA2AgALDAULQdijwAAhAANAAkAgACgCACICIARNBEAgAiAAKAIEaiICIARLDQELIAAoAgghAAwBCwtBzKPAACADNgIAQcSjwAAgBUFYaiIANgIAIAMgAEEBcjYCBCAAIANqQSg2AgRB6KPAAEGAgIABNgIAIAQgAkFgakF4cUF4aiIAIAAgBEEQakkbIgFBGzYCBEHYo8AAKQIAIQkgAUEQakHgo8AAKQIANwIAIAEgCTcCCEHco8AAIAU2AgBB2KPAACADNgIAQeCjwAAgAUEIajYCAEHko8AAQQA2AgAgAUEcaiEAA0AgAEEHNgIAIAIgAEEEaiIASw0ACyABIARGDQAgASABKAIEQX5xNgIEIAQgASAEayIFQQFyNgIEIAEgBTYCACAFQYACTwRAIARCADcCECAEQRxqAn9BACAFQQh2IgJFDQAaQR8gBUH///8HSw0AGiAFQQYgAmciAGtBH3F2QQFxIABBAXRrQT5qCyIANgIAIABBAnRBwKLAAGohAwJAAkACQAJAQbSgwAAoAgAiAUEBIABBH3F0IgJxBEAgAygCACICQQRqKAIAQXhxIAVHDQEgAiEADAILQbSgwAAgASACcjYCACADIAQ2AgAgBEEYaiADNgIADAMLIAVBAEEZIABBAXZrQR9xIABBH0YbdCEBA0AgAiABQR12QQRxakEQaiIDKAIAIgBFDQIgAUEBdCEBIAAhAiAAQQRqKAIAQXhxIAVHDQALCyAAKAIIIgIgBDYCDCAAIAQ2AgggBEEYakEANgIAIAQgADYCDCAEIAI2AggMAwsgAyAENgIAIARBGGogAjYCAAsgBCAENgIMIAQgBDYCCAwBCyAFQQN2IgJBA3RBuKDAAGohAAJ/QbCgwAAoAgAiAUEBIAJBH3F0IgJxBEAgACgCCAwBC0GwoMAAIAEgAnI2AgAgAAshASAAIAQ2AgggASAENgIMIAQgADYCDCAEIAE2AggLQQAhBUHEo8AAKAIAIgAgBk0NAgwECyABIAc2AhggAygCECIABEAgASAANgIQIAAgATYCGAsgA0EUaigCACIARQ0AIAFBFGogADYCACAAIAE2AhgLAkAgBUEQTwRAIAMgBkEDcjYCBCADIAZqIgQgBUEBcjYCBCAEIAVqIAU2AgBBwKPAACgCACIABEAgAEEDdiICQQN0QbigwABqIQBByKPAACgCACEHAn9BsKDAACgCACIBQQEgAkEfcXQiAnEEQCAAKAIIDAELQbCgwAAgASACcjYCACAACyECIAAgBzYCCCACIAc2AgwgByAANgIMIAcgAjYCCAtByKPAACAENgIAQcCjwAAgBTYCAAwBCyADIAUgBmoiAEEDcjYCBCAAIANqIgAgACgCBEEBcjYCBAsMAQsgBQ8LIANBCGoPC0HEo8AAIAAgBmsiAjYCAEHMo8AAQcyjwAAoAgAiASAGaiIANgIAIAAgAkEBcjYCBCABIAZBA3I2AgQgAUEIaguTCAEGfyMAQfAAayIFJAAgBSADNgIMIAUgAjYCCEEBIQkgASEHAkAgAUGBAkkNAEEAIAFrIQhBgAIhBgNAAkAgBiABTw0AIAAgBmosAABBv39MDQBBACEJIAYhBwwCCyAGQX9qIQdBACEJIAZBAUYNASAGIAhqIAchBkEBRw0ACwsgBSAHNgIUIAUgADYCECAFQQBBBSAJGzYCHCAFQeSewABBgITAACAJGzYCGAJAAkACQAJAIAIgAUsiBiADIAFLckUEQCACIANLDQECQCACRSABIAJGckUEQCABIAJNDQEgACACaiwAAEFASA0BCyADIQILIAUgAjYCICACRSABIAJGcg0CIAFBAWohAwNAIAIgAUkEQCAAIAJqLAAAQUBODQQLIAJBf2ohBiACQQFGDQQgAiADRiAGIQJFDQALDAMLIAUgAiADIAYbNgIoIAVBxABqQQM2AgAgBUHcAGpBBDYCACAFQdQAakEENgIAIAVCAzcCNCAFQYiEwAA2AjAgBUECNgJMIAUgBUHIAGo2AkAgBSAFQRhqNgJYIAUgBUEQajYCUCAFIAVBKGo2AkgMAwsgBUHkAGpBBDYCACAFQdwAakEENgIAIAVB1ABqQQI2AgAgBUHEAGpBBDYCACAFQgQ3AjQgBUGghMAANgIwIAVBAjYCTCAFIAVByABqNgJAIAUgBUEYajYCYCAFIAVBEGo2AlggBSAFQQxqNgJQIAUgBUEIajYCSAwCCyACIQYLAkAgASAGRg0AQQEhBwJAAkACQCAAIAZqIggsAAAiAkF/TARAQQAhCSAAIAFqIgMhASADIAhBAWpHBEAgCC0AAUE/cSEJIAhBAmohAQsgAkEfcSEIIAJB/wFxQd8BSw0BIAkgCEEGdHIhAQwCCyAFIAJB/wFxNgIkIAVBKGohAgwCC0EAIQAgAyEHIAEgA0cEfyABQQFqIQcgAS0AAEE/cQUgAAsgCUEGdHIhACACQf8BcUHwAUkEQCAAIAhBDHRyIQEMAQtBACECIAMgB0cEfyAHLQAAQT9xBSACCyAIQRJ0QYCA8ABxIABBBnRyciIBQYCAxABGDQILIAUgATYCJEEBIQcgBUEoaiECIAFBgAFJDQBBAiEHIAFBgBBJDQBBA0EEIAFBgIAESRshBwsgBSAGNgIoIAUgBiAHajYCLCAFQcQAakEFNgIAIAVB7ABqQQQ2AgAgBUHkAGpBBDYCACAFQdwAakEFNgIAIAVB1ABqQQY2AgAgBUIFNwI0IAVBwITAADYCMCAFIAI2AlggBUECNgJMIAUgBUHIAGo2AkAgBSAFQRhqNgJoIAUgBUEQajYCYCAFIAVBJGo2AlAgBSAFQSBqNgJIDAELQbeewABBKyAEECcACyAFQTBqIAQQMAAL2wgBBX8gAEF4aiIBIABBfGooAgAiA0F4cSIAaiECAkACQAJAAkAgA0EBcQ0AIANBA3FFDQEgASgCACIDIABqIQAgASADayIBQcijwAAoAgBGBEAgAigCBEEDcUEDRw0BQcCjwAAgADYCACACIAIoAgRBfnE2AgQgASAAQQFyNgIEIAAgAWogADYCAA8LIAEgAxAOCwJAIAJBBGoiBCgCACIDQQJxBEAgBCADQX5xNgIAIAEgAEEBcjYCBCAAIAFqIAA2AgAMAQsCQCACQcyjwAAoAgBHBEBByKPAACgCACACRg0BIAIgA0F4cSICEA4gASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFByKPAACgCAEcNAkHAo8AAIAA2AgAPC0HMo8AAIAE2AgBBxKPAAEHEo8AAKAIAIABqIgA2AgAgASAAQQFyNgIEQcijwAAoAgAgAUYEQEHAo8AAQQA2AgBByKPAAEEANgIAC0Hoo8AAKAIAIgIgAE8NAkHMo8AAKAIAIgBFDQICQEHEo8AAKAIAIgNBKUkNAEHYo8AAIQEDQCABKAIAIgQgAE0EQCAEIAEoAgRqIABLDQILIAEoAggiAQ0ACwtB8KPAAAJ/Qf8fQeCjwAAoAgAiAEUNABpBACEBA0AgAUEBaiEBIAAoAggiAA0ACyABQf8fIAFB/x9LGws2AgAgAyACTQ0CQeijwABBfzYCAA8LQcijwAAgATYCAEHAo8AAQcCjwAAoAgAgAGoiADYCACABIABBAXI2AgQgACABaiAANgIADwsgAEGAAkkNASABQgA3AhAgAUEcagJ/QQAgAEEIdiIDRQ0AGkEfIABB////B0sNABogAEEGIANnIgJrQR9xdkEBcSACQQF0a0E+agsiAjYCACACQQJ0QcCiwABqIQMCQAJAAkACQAJAQbSgwAAoAgAiBEEBIAJBH3F0IgVxBEAgAygCACIDQQRqKAIAQXhxIABHDQEgAyECDAILQbSgwAAgBCAFcjYCACADIAE2AgAMAwsgAEEAQRkgAkEBdmtBH3EgAkEfRht0IQQDQCADIARBHXZBBHFqQRBqIgUoAgAiAkUNAiAEQQF0IQQgAiEDIAJBBGooAgBBeHEgAEcNAAsLIAIoAggiACABNgIMIAIgATYCCCABQRhqQQA2AgAgASACNgIMIAEgADYCCAwCCyAFIAE2AgALIAFBGGogAzYCACABIAE2AgwgASABNgIIC0Hwo8AAQfCjwAAoAgBBf2oiADYCACAARQ0CCw8LIABBA3YiAkEDdEG4oMAAaiEAAn9BsKDAACgCACIDQQEgAkEfcXQiAnEEQCAAKAIIDAELQbCgwAAgAiADcjYCACAACyECIAAgATYCCCACIAE2AgwgASAANgIMIAEgAjYCCA8LQfCjwAACf0H/H0Hgo8AAKAIAIgBFDQAaQQAhAQNAIAFBAWohASAAKAIIIgANAAsgAUH/HyABQf8fSxsLNgIAC9QIAgV/AX5BASEFIAEoAhhBJyABQRxqKAIAKAIQEQAARQRAQQIhBAJAAkACQCAAKAIAIgNBd2oiAEEeSwRAIANB3ABHDQEMAgtB9AAhAgJAAkAgAEEBaw4eAQICAAICAgICAgICAgICAgICAgICAgICAwICAgIDBAtB8gAhAgwDC0HuACECDAILAkACfgJAAkACQAJAAkACQEEAQQ8gA0GkmgRJGyIAIABBCGoiACAAQQJ0QZiRwABqKAIAQQt0IANBC3QiAEsbIgIgAkEEaiICIAJBAnRBmJHAAGooAgBBC3QgAEsbIgIgAkECaiICIAJBAnRBmJHAAGooAgBBC3QgAEsbIgIgAkEBaiICIAJBAnRBmJHAAGooAgBBC3QgAEsbIgJBAnRBmJHAAGooAgBBC3QiBCAARiAEIABJaiACaiIEQR5NBEAgBEECdCEGQbEFIQACQCAEQR5GDQAgBkGckcAAaiICRQ0AIAIoAgBBFXYhAAtBACECIARBf2oiBSAETQRAIAVBH08NBiAFQQJ0QZiRwABqKAIAQf///wBxIQILAkAgACAGQZiRwABqKAIAQRV2IgRBAWpGDQAgAyACayECIABBf2ohBUEAIQADQCAEQbAFSw0DIAAgBEGkksAAai0AAGoiACACSw0BIAUgBEEBaiIERw0ACwsgBEEBcQ0GIANBgIAESQ0CIANBgIAISQ0DIANBkPxHakGQ/AtJIANBtdlzakG12ytJciADQeKLdGpB4gtJIANBn6h0akGfGElyciADQf7//wBxQZ7wCkYgA0He4nRqQQ5JciADQaKydWpBIklycg0EIANBy5F1akEKSw0IDAQLIARBH0HYl8AAEBwACyAEQbEFQeiXwAAQHAALIANBkIbAAEEpQeKGwABBogJBhInAAEG1AhAPRQ0BDAULIANBuYvAAEEmQYWMwABBrwFBtI3AAEGjAxAPDQQLIANBAXJnQQJ2QQdzrUKAgICA0ACEDAILIAVBH0GUksAAEBwACyADQQFyZ0ECdkEHc61CgICAgNAAhAshB0EDIQQMAQtBASEECyADIQILA0AgBCEDQdwAIQBBASEFQQEhBAJAAn4CQAJAAkACQCADQQFrDgMBBQACCwJAAkACQAJAIAdCIIinQf8BcUEBaw4FAwIBAAYFC0H1ACEAIAdC/////49gg0KAgICAMIQMBgtB+wAhACAHQv////+PYINCgICAgCCEDAULIAIgB6ciA0ECdEEccXZBD3EiAEEwciAAQdcAaiAAQQpJGyEAIAdCf3xC/////w+DIAdCgICAgHCDhCADDQQaIAdC/////49gg0KAgICAEIQMBAtB/QAhACAHQv////+PYIMMAwtBACEEIAIhAAwDCyABKAIYQScgASgCHCgCEBEAAA8LIAdC/////49gg0KAgICAwACECyEHQQMhBAsgASgCGCAAIAEoAhwo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dCADakHQAGooAgAiB0F/Rg0BIANBQGsgBxAjIANBQGsQPEcNASABIAdrIgZBgIAETw0BIANBGGogAygCQCIFIAQgCkHMnMAAEC0gAygCGCEJIAMoAhwhASADQRBqIAUgBCAHQQRqQdycwAAQLSADKAIUIgUgASABIAVLGyEFQQAhASADKAIQIQQDQCABIAVPDQQgASAJai0AACABIARqLQAARw0EIAFBAWohAQwACwALIAZBgCBB7JzAABAcAAsgA0FAa0EBEBsEQCACQQFqIQIgAygCRCEEIAMoAkwhAQwBCwsgAkEEdEFwIAJBD0kbIQpBACEBIAUhBkEAIQUMAQsgA0FAayABQQRqEBsaIAJBBHRBcCACQQ9JGyEKIAZBgP4DcUEIdiEJQQEhBUEPIAFBDksNARoLIAELIQQgAygCSCIHIAQgCnIQKiACQQ9PBEAgA0FAayACQXFqEC8LIANBCGogCCACIAhqIAMoAkAgAygCRCIEQfycwAAQKCAHIAMoAgggAygCDBAxIAUEQCAHIAYQKiAHIAkQKiABQQ9PBEAgA0FAayABQXFqEC8LIAMoAkwhCCAGIQUMAQsLIANB2IABaiIBIANBOGooAgA2AgAgAyADKQMwNwPQgAEgA0EoahA0IANByABqIAEoAgA2AgAgAyADKQPQgAE3A0AgAyADQUBrECYgACADKQMANwIAIANB0IACaiQAC+MFAgN/AX4jAEHgAGsiAyQAIANBEGogASACECkgAyADKAIUIgE2AhwgAyADKAIQIgI2AhggA0EwakGAIBAhIANBADoATCADIAE2AkQgAyACNgJAIAMgA0EwajYCSANAAkACQAJAAkACQAJAAkACQAJAIAFFDQAgA0HQAGogA0FAa0EBEBggAy0AUEEBRg0BIAMoAlgEQCADIAMoAlQtAAAiAToATCABQQR2IgFBD0YEQCADQdAAaiADQUBrEBYgAykDUCIGp0H/AXFBAUYNBCAGQiCIp0EPaiEBCyADKAJIIANB0ABqIANBQGsgARAYIAMtAFBBAUYEQCADLQBRQQBHIQEMCQsgA0EIaiADKAJUIAMoAlgiASABQbiawAAQLiADKAIIIAMoAgwQMSADKAJERQ0BIANB0ABqIANBQGtBAhAYIAMtAFBBAUYNBSADKAJYQQJHDQQgAygCVC8AACEBIAMtAExB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QQBBAEGcnMAAEBwAC30BAX8jAEEQayICJAACQCAALQAAQQFGBEAgAiABKAIYQZCewABBGiABQRxqKAIAKAIMEQEAIgA6AAgMAQsgAiABKAIYQaqewABBDSABQRxqKAIAKAIMEQEAIgA6AAgLIAIgATYCACACQQA6AAkgAkEANgIEIAJBEGokACAAC4EBAgJ/An4jAEEQayIDJAAgAAJ/IAEoAgQiBCACTwRAIANBCGogASgCACAEIAJBrJzAABAuIAMpAwghBSADIAEoAgAgASgCBCACQbycwAAQLSADKQMAIQYgAEEEaiAFNwIAIAEgBjcCAEEADAELIABBADoAAUEBCzoAACADQRBqJAALdwEDfyMAQSBrIgIkAAJAIAAoAgAgARARRQRAIAFBHGooAgAhAyABKAIYIAJBHGpBADYCACACQeSewAA2AhggAkIBNwIMIAJBqIXAADYCCCADIAJBCGoQBkUNAQsgAkEgaiQAQQEPCyAAKAIEIAEQESACQSBqJAALgAEBAX8jAEFAaiIDJAAgA0ErNgIMIANByJrAADYCCCADIAE2AhQgAyAANgIQIANBLGpBAjYCACADQTxqQQM2AgAgA0ICNwIcIANB7JjAADYCGCADQQQ2AjQgAyADQTBqNgIoIAMgA0EQajYCOCADIANBCGo2AjAgA0EYaiACEDAAC3ABAn8CQANAIAEEQCAAIAAoAgwiAkEEaiAAKAIESQR/IAAQMiIDQf8fSw0DIAAgA0ECdGpBEGogAjYCACAAKAIMBSACC0EBajYCDCABQX9qIQEMAQsLIAAoAgwgACgCBE0PCyADQYAgQfCdwAAQHAALbAEBfyMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBHGpBAjYCACADQSxqQQI2AgAgA0ICNwIMIANB6IDAADYCCCADQQI2AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACEDAAC2wBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRxqQQI2AgAgA0EsakECNgIAIANCAjcCDCADQYSDwAA2AgggA0ECNgIkIAMgA0EgajYCGCADIANBBGo2AiggAyADNgIgIANBCGogAhAwAAtsAQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EcakECNgIAIANBLGpBAjYCACADQgI3AgwgA0G8g8AANgIIIANBAjYCJCADIANBIGo2AhggAyADQQRqNgIoIAMgAzYCICADQQhqIAIQMAALWQEBfyMAQSBrIgIkACACIAAoAgA2AgQgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAkEEakGImsAAIAJBCGoQBiACQSBqJAALVgEBfyMAQSBrIgIkACACIAA2AgQgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAkEEakGImsAAIAJBCGoQBiACQSBqJAALaQECfyMAQRBrIgIkAAJAIAFBf0oEQCACQQhqIAEQMyACKAIIIgNFDQEgAigCDCEBIABBADYCCCAAIAM2AgAgACABNgIEIAJBEGokAA8LEDgACyABQQFBhKTAACgCACIAQQEgABsRAgAAC2oBAn9BASEAAkACQEH4o8AAKAIAQQFHBEBB+KPAAEKBgICAEDcDAAwBC0H8o8AAQfyjwAAoAgBBAWoiADYCACAAQQJLDQELQYCkwAAoAgAiAUF/TA0AQYCkwAAgATYCACAAQQFLDQAACwALUwEBfyMAQRBrIgIkACACIAEgAUEEaiAAKAIAIAAoAgRBgJ7AABAoIAIoAgRBBEcEQCACQQhqQfSawABBgJ7AABAaAAsgAigCACgAACACQRBqJAALQwEDfwJAIAJFDQADQCAALQAAIgQgAS0AACIFRgRAIABBAWohACABQQFqIQEgAkF/aiICDQEMAgsLIAQgBWshAwsgAwtKAAJ/IAFBgIDEAEcEQEEBIAAoAhggASAAQRxqKAIAKAIQEQAADQEaCyACRQRAQQAPCyAAKAIYIAIgAyAAQRxqKAIAKAIMEQEACwtEAQF/IwBBIGsiAiQAIAJBGGogAUEIaigCADYCACACIAEpAgA3AxAgAkEIaiACQRBqEBUgACACKQMINwIAIAJBIGokAAtHAQF/IwBBIGsiAyQAIANBFGpBADYCACADQeSewAA2AhAgA0IBNwIEIAMgATYCHCADIAA2AhggAyADQRhqNgIAIAMgAhAwAAs6AAJAIAIgAU8EQCAEIAJPDQEgAiAEIAUQHQALIAEgAiAFEB4ACyAAIAIgAWs2AgQgACABIANqNgIACz8BAX8jAEEgayIDJAAgAyACNgIYIAMg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XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcbHo0LWNvbXByZXNzaW9uLTAuNy4wXHNyY1xjb21wcmVzcy5yc4wOEABkAAAAWAAAAA0AAACMDhAAZAAAAHYAAAAcAAAASW52YWxpZERlZHVwbGljYXRpb25PZmZzZXRVbmV4cGVjdGVkRW5kY2FsbGVkIGBPcHRpb246OnVud3JhcCgpYCBvbiBhIGBOb25lYCB2YWx1ZQAAdA8QABcAAACiAQAADwAAAHNyYy9saWJzdGQvcGFuaWNraW5nLnJzVHJpZWQgdG8gc2hyaW5rIHRvIGEgbGFyZ2VyIGNhcGFjaXR5AMAPEABuAAAAIgAAAAkAAABDOlxVc2Vyc1xlbGlhc1wucnVzdHVwXHRvb2xjaGFpbnNcc3RhYmxlLXg4Nl82NC1wYy13aW5kb3dzLW1zdmNcbGliL3J1c3RsaWIvc3JjL3J1c3Rcc3JjL2xpYmNvcmUvbWFjcm9zL21vZC5ycwB7CXByb2R1Y2VycwIIbGFuZ3VhZ2UBBFJ1c3QADHByb2Nlc3NlZC1ieQMFcnVzdGMdMS40NC4xIChjNzA4N2ZlMDAgMjAyMC0wNi0xNykGd2FscnVzBjAuMTcuMAx3YXNtLWJpbmRnZW4SMC4yLjY0ICgzMWMyZDZmYmUp"), (A)=>A.charCodeAt(0)
);
let A, I2 = null;
function g() {
    return null !== I2 && I2.buffer === A.memory.buffer || (I2 = new Uint8Array(A.memory.buffer)), I2;
}
let B3 = 0;
function Q(A, I) {
    const Q = I(1 * A.length);
    return g().set(A, Q / 1), B3 = A.length, Q;
}
let C = null;
function E() {
    return null !== C && C.buffer === A.memory.buffer || (C = new Int32Array(A.memory.buffer)), C;
}
function D(A, I) {
    return g().subarray(A / 1, A / 1 + I);
}
function lz4_decompress(I) {
    var g = Q(I, A.__wbindgen_malloc), C = B3;
    A.lz4_decompress(8, g, C);
    var w = E()[2], o = E()[3], i = D(w, o).slice();
    return A.__wbindgen_free(w, 1 * o), i;
}
async function w(A, I) {
    if ("function" == typeof Response && A instanceof Response) {
        if ("function" == typeof WebAssembly.instantiateStreaming) try {
            return await WebAssembly.instantiateStreaming(A, I);
        } catch (I1) {
            if ("application/wasm" == A.headers.get("Content-Type")) throw I1;
            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", I1);
        }
        const g = await A.arrayBuffer();
        return await WebAssembly.instantiate(g, I);
    }
    {
        const g = await WebAssembly.instantiate(A, I);
        return g instanceof WebAssembly.Instance ? {
            instance: g,
            module: A
        } : g;
    }
}
async function o(I) {
    void 0 === I && (I = importMeta.url.replace(/\.js$/, "_bg.wasm"));
    ("string" == typeof I || "function" == typeof Request && I instanceof Request || "function" == typeof URL && I instanceof URL) && (I = fetch(I));
    const { instance: g , module: B  } = await w(await I, {
    });
    return A = g.exports, o.__wbindgen_wasm_module = B, A;
}
await o(source);
function decompress(input) {
    return lz4_decompress(input);
}
const importMeta1 = {
    url: "https://deno.land/x/pngs@0.1.1/wasm.js",
    main: false
};
const source1 = decompress(Uint8Array.from(atob("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AjoBgdCkAWokAA8LQgsAegIQQeMKAAkAYKlpAnt/B/MvY+AAayILJHcIBgIA8RYgAy0Aww0NACADQe8HaiE3IANB0AVqISggA0HWDGohOCADQZAFYy8wQdAAzi/xEQNBQGshFSADQcgAaiENIANB2AxqITUgA0GcCGohNiADIjCgECADQQhqISQgA5kQ8AMhCSADQaANaiExIANBlA1qITJWAPAmCGohGyADQTBqISwgA0E8aiEOIARB+wFxIjlBAUchOiADQThqIR8gA0GYCGohEiADQSJqISBBAGAIaiElIAQ9ASAiOysA8Ac8IANB8AdqIh1BGGohPSADQZINaiE+YwDwbQ1qIT8gA0GODWohQCADQYwNaiFBIANBig1qIUIgA0GIDWohQyADQYYNaiFEIANBhA1qIUUgA0GCDWohRiADQYANaiFHIANB/gxqIUggA0H8DGohSSADQfoMaiFKIANB+AxqIUsgA0H2DGohTCADQfQMaiFNIANB8gxqIU6VAPBdDGohTyADQe4MaiFQIANB7AxqIVEgA0HqDGohUiADQegMaiFTIANB5gxqIVQgA0HkDGohVSADQeIMaiFWIANB4AxqIVcgA0HeDGohWCADQdwMaiFZIANB2gxqIVogA0HRBWohWyADQY8IaiFc6ADACGohXSADQY0IaiFe8ADACGohXyADQYsIaiFg+ADACGohYSADQYkIaiFiAAHACGohYyADQYcIaiFkCAHwPQhqIWUgA0GFCGohZiADQYQIaiFnIANBgwhqIWggA0GCCGohaSADQYEIaiFqIANBgAhqIWsgA0H/B2ohbCADQf4HaiFtIANB/QdqIW4wAfANB2ohbyADQfsHaiFwIANB+gdqIXEgA0H5B2ohckABwAdqIXMgA0H3B2ohdEgBwAdqIXUgA0H1B2ohdlABwAdqIXcgA0HzB2oheFgB8AUHaiF5IANB8QdqIXogA0GkDWohMy4sCgIAcCAJKAIAIgYTLCFNBOECMCUNCgcA8AMnDQFBASEhDAgLIAMoAqwNRQ10DPABAygCuA0iAUkNAiADQawNahEAQDwgAWpgFCBrEN0JMAUgA38DILgNCAAwOgDDCAAQxF4pAJMD8gAuBEAgACAuNgIEDAwLQRXDDuIBRQ0DIAFBDWpB6ezBAJYOAc0FKEHkEAAV3A0AAbEDsJcBIgJF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DQZBrIPCFwJwQYCAfHEgBMYKABMAICgCtQAAMgEQsCEAAAUAAFoAACQEUAEgAEsbGgAUqBUAAJEIYrSDwgAhAGsDIQAiTgNgBCIDaiAHpwoAtwEBSwMiDASNAQDnAQCxBgMoAkEPTQRAGAABQwEB1wABCgAAbgAFXgIxAWoin2AD5wIABwIAKQABzgEBPQACggIQBDgAAFEHASYAATgAASMAAB4AAkwAAKIIAKgEIkHIigACGANAIAdNG3ILABUAAOsGQAALQcyIACD/H2AAELgWAABbAAHpAAEgACBBoKQBAL0CAA0AEKgNAABRAwANAAAIAAUaABCwDQATpA0AAAgAAR8AAA0AELgNABOsDQAACAABHwAADQAQwA0AE7QNAAAIAAEfAAANABDIDQATvA0AAAgAAR8AAA0AENANABPEDQAACAABHwAADQAQ2A0AE8wNAAAIAAEfAAANABDA4gABCgAQ4BcAE9QXAAAIAAEpAAANABDcDQAAEgAADQAQ6A0AABIAAA0AGOQNABDwDQAAEgAADQAY7A0AEPgNAAASAAANABj0DQAygIHCEgAADQAQ/BoABA0AEIgaAAASAAANABiEDQAQkA0AABIAAA0AGIwNABCYDQAAEgAADQAYlA0AEKANAAASAAANABCoDQATnA0AAAgABRoAELANABOkDQAACAABHwAADQAQuA0AE6wNAAAIAAEfAAANABDADQATtA0AAAgAAR8AAA0AEMgNABO8DQAACAABHwAADQAQ0A0AE8QNAAAIAAEfAAANABDYDQATzA0AAAgAAR8AAA0AEOANABPUDQAACAABHwAADQAQ6A0AE9wNAAAIAAEfAAANABDwDQAT5A0AAAgAAR8AAA0AEPgNABPsDQAACAABHwAADQBjgILCAEH0DQAACAABHwAADQAQiBoAE/wNAAAIAAEfAAANABCQGgAihIINAAAIAAEfAAANABCYDQATjBoAAAgAAR8AAA0AAD0EAkcDEJQXAAAcAAANAADDBEIgBEFYfQQgIAdnCQC0A8AgACAHakEoNgIEQcS0AjCAgIAsBQE2BQCWBxAFaAegBUEBS3IgByABTawIIEtyPokAwQkgBGo4AAByAAEFABEo8wMQD48IVCIBQXhqeAABBQAwKAIAsAcQAjkEIGtqGAcA9gMgIAHcRBEEjAAALAQfAowAASECC0IAAGkEIGsiEgABbgABBQABcwAAngQBigQAKyEASgAA1gADlAQBkwQgIQFEAACBBAEFAAI1ABAH+wAgSRs4AGEEIAdqIQOCBCAhAJQVAIULA1kGA2MFAEIAAhMBAJoNAWEBEiAdCAIGAQAmUANyABAGTgAQBdgLEGtACSEGAlQGAAIAJCADtQATR5gFABYBIANGBxIA1wUAsQlAQQFHDbYAQnhxIgmwCwAcABAYLBYAQQAADQAwDCICFQ0RAyoJYgMoAhQiACUJEQEQDRACtQoRA7cAAKEFEAzZCAOCBwFADBADhQciABtVBgBtBxEibgkAjAAgIgGFBwDwCRIhrQcAhQcQAYUHEQTOBBALwB4SBIYAD4UHABEIhQcQCIUHMwNGGx8GAO4ZAGcLAY0AUQAgAg0DgAcBBQAChQcATQAChQcAjxsiQQzMAABqLwEKAAGZEAFjJABNCBACywASBKoIAQUAAkQAAPYIAkQAIQMLZQEQINULATgCAQUAAGkBAGQLAIMAAIcKAScCAEgAAIYBAiwAAPUGAQUADywAAgDFCxBqSQEAYgAAbxIALAwANg4BdQkBYwEAtQ0QApYNABgAEBReCxEAyQoAHAAALgICHAAQBqwcMAYgAwcAEAP/DQD7ATBBfnFkADMFIAZuABAFJRwQBjgAEgYGAkFBHyEBtg0yAxAgiRAAtg0gBkGDFA+2DQQQAdQMEAG2DRUBrAExIQACiwIzAkBBgQEATwopIAELCgcADAC2DRICQAMAMAAA1AsQcpYAAjQBAB8BMDYCGBIBAuUQMgFBAb0NFgG9DQCnDRUdvQ0BXwAXAb0NGAFtAAAVDBIBuwIBLA0BMw0Huw0BBQIBdQAQCHUAASYAAIYAAlsBAbQNACAAADUAAPACEAYMCxcBDAsHAgsB9wAPuw0DEgLjAA+7DQwAlxJICGoPCzgEAloAICABnAECrAlgaiIDIAFLGVEAZQABrQkTAKICEAd2AgCdAg+ZBRgQIBgDEGBjBSFBeJ8MECAzC2BJGyICQRssAACMABIpa1lSQRBqQbwPAAAzNW8CIAo3AghxCQIAJgABZA4ADQAFuwgBtlECJgQQQScAABUFUEEEaiIAPS8AJgEB0RYALgQTBL8CEAGnAzNrIgTCABECaAAlIATBAkEAIAFCdxAVBMECXwRBBiAEwQIFAGcAADpSAY4AB3oQMgICQAIAAZQCAHMBBnoQEAXQAQDKKQVXAhIExAIBSAYAMAAAJRMB4QEBVAQBzwMgBEG9Ag96EAEApwIVHb0CAcsNCXoQCGYAAL0CAeUBAVkAAHgQACcCUiABQRhqUQEBCw0A1QIiAjbAAhAFIgAB5gATGC4FEAESAAAjAAA7AADDAhAEwwIfAsMCAwB+EEACdCIC8wAAeQAFwwIFpgMAmVEDhwAQAwcAAFoAA4QAEAPDAkFBACEBgwIATwBhACAGTQ0ADwAAQQcPbAcjQA8LIAEEAABaAhAYiQERECEFAXcAACEFEQGqAxICCBAATAEAwgIGJAUBHwAA6QYwQRBPyQEFXAAD1hITA3UAEAOOBQV6DgFLAAAFAQAtAQ/8DlkAfwQBggABjAARDM0REAOqAA9GEAYA/ABjCGoL9h4CtiyR4ABrIg4kACAFDgNgACAFEHgaBwdCCGoiDTcCEABrAXB0aiEPQX8hGgAiBGojFQJyBCAgD0AIsAYgCSAALwEAIgEbvBkgQQFkBkAAQQJqdQOSIAogARshCiABzhQQB+EGYAxGBEAgDNAYYAEgDEkNBAwA8QR0IgggASAIIAFLGyIBQQQgAUEECgDQ/////wFxIAFGQQJ0IdECIAN0JBcgIAxhGiBBBNkBYA4gDEEDdCABQA4gAyjHFwBUASAgDsIAEAgIADHQAGpcANAOQQhqEFMgDigCVCEIBwAwWCEBBwASUAwtMAMgCPMAEAdlABF2HAMATgABXQAAqgAwCTsBZwQQCiQAEA2zADBqIgwMAADyHRAhDS8QC+UAAGgAArInACUBDwIAHWAgDA4CGwAuCZAoAgAvAQQiACCDJABxF3BqQQE6AAAMoAEAVQKAECAMQRVJDQKJADR2IgAoAUAARw0YiwLAdCIVQX9MDRggFUEEGS3wAhYEQCAQQXhqIRcgEEFoaiEba13wA0EAIQ0gDCELA0AgCyEHQQAhC8EdAKYBMUF/aiADAJQABAIAISAQWQAAPAMgIAdiAGAPIBBqQXAQABEi4hiiB0F+aiEIIA8gGx8cAb8FMCAIRhsAQCEIDAmkDxIBFQIBRxVAAU8gBpMAEAbUBQEbABEIXxNBIAdqIdACAkoAEAN8AFAAQQFGBDsbARkAEACCHAZIABRJSAAAhAFBByAASdkuEAwtKmAHIABrIggjARAK7wMDwwBhIQEgDyAXXAAgIAGzBhAfTAADrQYwBiAfBwARAb0LA1oAAdw1IiIKZwUAqAogACGZMjEgCEGTHwMOAAF0ABEDdAAlIQpsABIGbAAwCQNAGgAASABAC0kNBWYBICALnAAmAkmZABAiJQRBIBAgCw0AEAHeACAST6cEMTMBBKUAA1IHEALxChADOQAAmQAgIRRMBSIgBnIBAL4DEA9HABASOgKiASAKRg0GIAAgDzoAUCAPIQAgRR8AfgMAOAYgIAnsBrAAIBKtIB9CIIaEN/kCEAtgHhAKkwEUCgIBsAshACAIQQpJDQALLRxyACAHQaSvwQAbMgcgDA0AEV5RBmABaiAIQZQQABFcHQAE9QARACkAELQZAAApAADFCAENABRdLQNAIA0gEy8CEBOeAGAAIBNJDR4MAAB8FADuAXAASxsiAEEECwgBCgAT//QCARwEAIUHMAN0IRsBGBMcBBARRwUyDiATIwQAPgIKGQQAWQAIGQQQEQcAMFghAAcAAxkEANsFcSETCyARIA2YATIAIAhgBRALAAQQDa0AgQ8hDSAPQQJPrQ2RIABFDRwgESAACAQAwAICAgBgIBEgDyINDQESD0gAAFkvEA1CAIEDdCARaiIIQV4DISIHtAUxIgFNHABBAk0NBXsAEX3bBQAjADAEIgbmBiBqTU00IEEDIQAwCEFkPAABAg4hSw0NMBANIgIRAUwALCEBQgCAIQYLIAYgAUmJHTANQX7xCACjAAICADAgDSCQAyAiGN0CMA0gAGgAEBEHAcF0aiIZKAIEIh0gGShOFEEgESAYFwAQGrkAEBSRBBIABgMQGSwGUR4gECAUIAAwCCAaOQAQEjkEEAFQAgBOANEhCSAAIBRrIgcgEmsisQJCBCAWIBwAcSIBEG8iByCDAkASQQFO0BMwQQFO0BOAIAYhASAHIQB0AxEJXAMAEgAQA+wrIQFBmwoQCgcAEQYfBAAAAVMASSIcGwADUAogBiAckgYgCCD7ASMcG70EICEAViMQCe0CMAkgB0QABOsCUBggDUHEqAIAzgIAkgEU1A0AUBQgAEHkDQAABQMAKgYBDQAA3AIRFgcGEG+JFgfBAEEHIBJKwQAwCCEBogEBFywQCQ4AEAOnCACnAwezABQHswAA+gBQCGogBxv0BASXBCAIauwBUBsiBiAJ6AMhCiAcCwD+CADkAFAAa0F4cYgzQB4gEiCjN1AAIBkgFAcAMBogGjwA0A0gGEF/c2pBA3QQW0H1IDIPQQFBABAL9wAhAgs6BgDAAgCIDDNBpLPzAABcAxARszJiFUUNASAWnjYSELEEECEKABAM4AIRCg8AAFMGAPcEQQwgCiIEBDAKSQ25Mj8MIAr5BAUBOQAC+QQfDfkECwATJTAhD0H5BBYL+QQBPwEQDREBEAGdCBAFUgECOgAAHwUBIQIUf/kEEgf5BBgN+QQBVgAwCSALBwIiCyDxBQAQCQCRAAG+NzAQIAMMABIHyghBBygCCF0BAFcAIUECSQIAoQEB/wZhQQIhC0ECAgEQC1cAEQhbA0AJIAFJMwYAaR8gFCAdBQGRAwAdAhMJCwAwIgpPlwMBIwAQEkkCME8NEe0BAiwAISIK5AgA5gEQCAcAEACnBQEXBwEqADIPIAakCAC/KBAh01EIdQAQCBsBAVkAFBBQAAp8AAZ6AAAlMVMBTw0NIEgDAy8AAX8AAfQAD4AAAwBXBAMwAARUAAEuAAOPAAG6AhAhvwQAOAkgIguKAQZjARAIigQhCSAcAgA+AhILbgESDEsAALgFMAAgCT0KESBZJAAOChFq/QEQAdoAEQg5AyAiBgwAEAeQAyAgBiEAAKYREQGEABAA1wECrQFCIgFBf3wAEAicAQD5I1AKA0BBADQTUSAJQQBIYwIzAWogfAABowMSCVoAAJ8CQCALRw28EBJ4jgMB0wQAPQIiIglYAEAhBkF/7wAwCiAGRQUSDD0BAUYAAYYBAQIBAJQAA0MAEQCGAAHPBxAiNAABmwAAIwEQITMBIQF0fQgQIKkGhUEAQcIAEHgaNQEA5QADKgGAIQMgBkUNEyA/EBEDGQEBEgFQB0EhTw1DDxAIZAAARQAgIAfXCwDHAiAvAR4BIjsBigARInITEAaAASATQVwDYAJBIEcEQHsZEXQ7ABIKNgkAjQ0QLzQAArwAAGkMMEHAAPkAAqUAATEAAMoAALa8AecZAGIAEQLDCRAIEg8QA5cCMABBIZcCATEAAHoPAVMAQAIgAGsiDSEgCBEKABkAgEtrIgYNAQwV+glhIUHEssEAjARAAEECSdcDEEWyBDASC0GuAFAfcXQhDWUAAhEAKAFriwhQCiAMQYQNABBf/wNEQSFBhNcEANwIFLRYAFQJIAhBpA0AEAZBAAQNAFQBIAhBhA0AACcAI/SxDQAA4gNLIAFB5BAAFNQQAABfARjEDQAUtA0AAyoAG6QQABSUEAAALQAYhA0AIvSwDQAA3wAjQeQNACQgCP8AMCINRsQDAIEBQCAOakGxAQGuDREK+AIAhwEAPwcwAiEAGgQAywEA7QERAYECQCIHQSA2CxABGhdiAUF+aiIMagcwLwEAWxxgAAsgDEF+PQICSQBAAEEBajIAUAMgDCAMSQIQAhcAAIwAEH/yBxANKBwAAQIQIe4GALABY39qQSFB1EEBY0EhQSFB5A0AQCACRQ2DDRILogIQCr8HAMMAEWp1SSEBQUdLIANANiIQARNEYf8BcSIHIPUvUCIIS3INWAYAx54hIgxkAgBoA/AAAyAAIgtGDQQgC0F8aiINHQABTw0AowgVBK9VEHxxABABjAQAbQ4gA3GSDgGGAQArBKALIAcgCE8hASAJCQAQSZwEEAbtAhAGVgsSBNUAQyAFQZRHAiJB+NItEPTVAFBoAAsQig4BMA5B4EIm8QoLsxoBFX8jAEHQAGsiCCQAIAEtAMwCIQMCcwkPAgAjUCABQfABBQQgQQGmA1EBKAL0AYAjEfgWAADsADEBIAX+BBD0LgIR7BcAICELrgVQAUGIAmrJKAA9CgBcNmBB9AFqECpEFyEoQTMjJgFBkjpQAiAIQTQNABAhMykRMDkAEA8sADAsIRbOAhEBEgA2CUEEIhMyIAFBrjqwQQFrDgYJAQACCQO2AiAhAg8TMAMhAvoQEAJoMUQCIBNsOABAIAlBH2EUQg4JAgABAPAAAQALQQggCW4hBiAJQQhNjgQwIAZuBQBScEEAR2pPAAxTTAA8AiAhAm4AEBIMAABHBRAPLQJAIAVGBCMtEg8DASOkAlYGkAFBnAJqIAsQMxYAIKgC6gFgAUGwAmoi6AcgIgZbAXC0AiIEayALSgUAMQFJQQVyIa42UC0AjAJFShEAogpAIARJDRWAAV0AYgYgBGsiAqEB8QCoAiIFIAQgBWogAhBbIAd7EwB0AFAANgK0AjsDAIsBYCAJECQgCC0ZkApBCGopAAA3A6IEEBgQABYQEAAQHxAAERcQAGAAACAIIAoKAHADCCAILQAs1wEBygEgRg0DAnB4ag4EAwQEBRIzCEE89QARCLECcDYCOCAIQgE1OFAIQaCDwBAqICAIlAUAjQAhEDU4BlBBATYAAPEDIDoAgQ1wDGogCCkCCHcAMABBFCoAEBAdAgMkAFE2AgAMHxsDAS4AcSAIKQMINwDQGAB3ADIAQQ0yACEpA7kAA0IAoBdqKAAANgAADB4QASCwAlEAAFABAxMWAHUAATk5ACAABYkAA1EAQhBqQQ59AEAMakGoxAABDQAALgdQNgAADB1SAIwBOgCMAgsgB9EBAPADIAwDVAALaAAVGdEDMtyFwFcCYwQgBkGg7+ULAeUBEBAHAFBrIgZFDVARA8UCAAIAICAJaQAQDnocYQ0tAAAOBTtbEBiTAjECDAP6AgC5AgMIAxAECAMwC0UN5D0RpPsAICIFmwAwDiAGBwARDRcGISEKbg4AQD5QKAKcAiKFEgSQEyACQOgCgGsOBAECAwAZ7AaBA0kNFSADIQmPLCAHIbcHEQIGpSAgArdGAP8EARoDEAJhCDNqIQbACAD+BBAKPwBAcGsiAkUAgAogAiADayIUDAARGAs3AC8AERCFHQBiBkABaiER3hGACiADTQ0XIAPDERALUAABrAAAlRQFKAAAwSIBgSMwIApPKwAAHQEQBTMWACcEJCAFlwAQBpcdIWoi2BaADBcLIApFDRbpEgBOAAFVADEEIArQABEEywAkIAQ5AAA3ACYhBNcAQH9qIgZEABEWngBQSQ0SIAMtKgOEAAA3ACEgB6EEGHY/ABAHBwAAXQZQf2oiAg0ZDxAgZDawQX5qDgcGBQQBAwGzAxALIAeRAkUNFSAMQQJqUwAQBcMAEgFYAAHNAAJZABQBWQAAigUmIQVZADAMFQttASFBeG4vUQogA0F4UwAAewkA3wAwBSAGlAdgCGoiAyADVQAwBiAMYgoRCS8BALoAA2IAVQAgB0EJJgAyCUEKIQARQX8FByQAFwokAAG9SDEgB0EFBgckABcLJAABhS5AIAdBAwgAByQAFwwkABANHAAxIAdBxAEHJAAXDSQAEA4cAEAgB0EFCAAHJAAXDiQAEA8cAEAgB0EGCAAHJAAXDyQAEBAcAEAgB0EHCAAFJAAA6gEA/A0QR1MBEBPrAfABCkEGcGsiA0EGSQ0IIANBejUBWQZJDRJBWAEVBloAEAZYARICVwAMWAEVByYAMgJBCCEADVgBBqIBFAKdAQ1YAQagARUCoAEMWAEGoAEVAqABDFgBBqABFQKgAQpYATAGQQZ/AxMJ+AAQTxcBEBJoAhF8aAKgBiADQQRGDREgDBAMYgRBBCADaxcBAGMbA1wAMARBfVQACMcCAOoIQwVqIgJ0AyJBfiEACw0BEAVXAQUkABB/HAArIAUNARAFVQEEJAAABQAbBQoBMARBBDADEANzaACVAAHFAxIR2gERA9oBIANJDSAwQX1q/wwAhgUQDPUAAYUDJ0EDxgADpQAIXQAB5wAEfgAFogAMxgAH6gAABQAMwwA2BEEDogAChgABaAEQEGgBEX5oAQCqG2ECRg0PIAzOACZBAmgBFwKiAAOBAAhdAAHDAAp+AAqfAACHMgV+AACQCgB7ACEPC8EOAAQBEARPFARBABEgHgJRIhUgBCDhAlEiBiAEIEoDACMAgCAVaiAGayIMvT8QAkIM8AB1IgJqIAJzQRB0QRB1Ig5GDw8aAAIgCUp9Ej8MIBUeAALRAiAJTBsgBiACIA5MG7QAARswA9UFUCADIBFq8T8gIAURBRADCBMAUQYQB3gFExRuBgFQARUOhAci2NvbCQQQABvIEAAbuBAAG6gQABuYEAATiBAAgiALIAZBrILA1AdTCyAFQZwNAEJBAUEADQAiXQD7B0D8gcAAPQ4QQd42EIwaAAC7DA+NCAASPwoAUAxqQejbYgkADQABjQggAgBrCGABIAQgC2ryCQKOCQE5ADIIQgKECST0goQJEAFoFjEIIA0fACEgCKoJH0GZCSwQAssAQgpBqNy0DABLCCKkAm0IEAENAGCcAiANIAs8FAEPACS0AqoABykAEAJRGDY6AA00CUIUaiATCgBCEGogFgoAQAxqIBL6AQCnAAKUEhAARQAQnJ8HEjaKChDQGg0SD3cBELxQAQSEARPMDQDwBMQUAxF/A34CfCMAQYABayICJADsCABwC5AoApQCIgUCf0G+CwaqDCAAGhsAEJBlBwCiNmFBAiABQaU/A3BBAkYbCyIEAQwhBEHIJDEBQZhsCUAgA0cNuBcgQQf4CRADgQAAGyUANgrwBY0CaiEMIAFBiQJqIQ0gAkE5aiEOnw8BAwkwAUGQ/gggIAHjDTAhEgOYABACEwGgYCACQgE3A1ggApQ1AJoPcNgAahAkIALECwDwEBApqgtQACACQSAQAAXUCzACQScQAAQLCwA/AwEaABAQzAMwOCEKBwAwNyEIBwAQNqMIMC0ANVEIkS0ANCEEAkACfwQAAAYAAwIAUSACKAIwHQ4ADgACAgABdATwAQ4LAwAPDw8BDw8PDwIPCwKWBCDmAEUO8A4FQckARyAHQcQAR3IgCEHBAEdyDRAgCkHUAEYNAeAEUwdB5ABHGgABGABBR3IND3ktEFycDTAoAlggFgDrDADaNSANA3kCAgcCQAxqQRLWAAARAkFB5M7B4wAwAEEEGQMgAACkBgM2ACBGDcUOUOQAaiAQWA0QpRMA0iIFGygCACEEIBIgESAMABAHHQAwtgFF0QHBIQVBAAwNCyAEuEQAAQAwwD+i8koHDwAzmyIXDQAwAABmix8gcyARAPAB4P///+9BZUVyDQYgF6shDzE+D7MAAyS5hVkMBLMAAMwDB7MA8QM1AmAhFSABMQC0ASEUQgQhEwJyAQCuAkAtALUBoAvhBhABAAIQAwALQgEhEwwSgYATDAELQgIhE4YB8AAUIBV+IBN+QvD/////AFYDFzAoAmTzICAQO1EAAOwBEQHsAQECAAAPAEEAQQdxWgBfEQEAAhFaAAOQIBUgBK1C/wGDXQAmIhRfAKCtIBRCB3xCA4hCEgCgD4N+QiCIp0UNDEIPIPcA6hA1AkE/jgJQQfAAaiLOAhU4sQLhIAIpADAiFDcDaCAAQQY1AdQgFDcAASAAQQlqIAEp4w1CEGogBkcAAPYMJQQh+BACGwEhIgjDAFIPAQACDyYQEAMoABADMT1QC0ECIQMTABAFMAAGAgAgIAM8AJC0ASILQQdqQfj7Uh12R10wAkHEOAcAfgQAkwNDAjQgAkZdUTAgAkED6XUhQdQRABAQzgBAQRBqNlgBANI4I+TZw1BQAiEFDASOADAFDAO9ABAFnAAwBiEFnAAiCCE8OTA6AMxrBAC1AhABHwQAnAAKuQIBJgQCNAQPwQIFHwjBAityBSAXqwwGC3oPUQEgACAEkQFSQQRqIAoKAEIDaiAICgAwAmog7gRBIABBBQ13EhCoARAMDQBAABc3ADwBYCgCXEUNDAgAVVgQDgwMPAdAjIXAADwHEEF9BUAGGyEPHgEPHAADrAshDwJ/IBabIha7AAARAAW7AAADAVUWqwwBCzcAsAUgAkHqAGogAkEyvQUAqwD5BwIgAi8AMDsBaCAHIQkgBCEGQQELIQpNAhQIDQNfBwEAAgdKAgMAaQgUbDQAPyALQXASAjALbiE6FAFwEjADIATDXhIEcBIBTwBI0NjBAHASIANBlSUAbwIQMrMAIOoAtAARImsB0AIgAi8BaCIEOwEwIAFYBJCIAiABIAY2AoQIAEAJNgKACABQDzYC/AFIAjA2Avh7EzAANgKzEwA4BxDwCABwA0EBajYC7AsAoQc2AugBIA0gBDvCFBMC0wGQAUEAOgCMAiAMJgEQEBwAEAwcADACQRKMAAEiAGEoAsgCIQnJDABIACAQPgIBIAJA4QEQCPQTEAAKAGAMIgYgCUt6BIBBvAJqIAYQMzkAgOwBIglBf0wNfSNBCUUEQFgBYAELIAkQc+0KAAkFIEGgiwowKAIAWgdQKAKcAhAIBgCfJCOcAlwHYCABQaQCavUAMQAgBgcAADoQPQJBH2oELxhqaQQFHxBpBBYiCAuCFUAJQQEQyxwPiQJLEAvNA0m0ASEIkQIB3gQBkgJfBQEAAgWSAhEfCJICAxAIkgIfCJICKC8iCpQCNB8LlAIjEGgcAAGUAgCJAAIfAEACNgKUawABswlQIgQ2ApgOAAAqDEQ2ApACgwQQAQgAAIMEIAELMhEjAEHYBFEMakEdNgoATAhqQZyeBwD8APAAgAFqJAALoQ4BB38gAEF4VQIwAEF89AmCIgJBeHEiAGpNBwA0EhBxAAMhQQOfnwDkG1AiAiAAah4YABwNIAFBdidAKAIARq0F4CgCBEEDcUEDRw0BQZyDtSgA0gISBBkAE36SKkAAQQFyCgAAARsBIQABaAlSAkGAAk8iAxAYmxkAJAIADQADWy8gAUFbL4ABKAIUIgIbaoYAMAUNAVoUALkLYAEoAggiAzQWEAyVEyE2AuomAcUoQQFBEGokQoIDQCADIQcgBVsvABYcICIF1QJBAigCEMwCIBBqFwIQBYcNAqAWMAsgBq4OAYYAMxxBAusqATsAABEKgAZBEEEUIAYotDsXRlsvAHYCESCNAABbL2EBQZCAwgAFAFEoAgBBfk0AIHdx4gMAuQASQVsvEQPBIAAKABAFWwAQBcQAEAwHDgDLAEACC0GMRAAABQACRAAAKUQCRAAgAQvnETA2AhhYADAQIgPRAAA9AAA2DkECNgIYHAEQFIoEAMQBIBRqHAAUABwAEgKyAVAiAkECcb4BLyACpAEHEAxAb0IgBEGo7gEmRwQuMRAE7gEADQAQIE8IAfgBAQUAABwAEwBFLQ9SAAAhDwtNAAI1ABCgNQAABQAPNQACAV4AABoAAe4mAFwAAaEBARcAAQoAMgtBxCIAAJwCMU8NAloAAA8AZABFDQICQFoAcSIDQSlJDQBoLUAhAQNAHQFhACIFIABNdQEQAR0uADEiAJoBAFMCAPYdIAtBHDdzAn9B/x9BvEcAAFsdExpPGwAkGyAhAVEeMAgiAD0CQQFB/x8FACFLG8oeYQMgAk0NAqEAIUF/+AARIGMDEQNGAwHpAhMD/AIWBPwCATQDA/wCEQT8AhAEyQEO/AIQBHkAAdEBEgz7ARAIFQIQBOwBHwT8Ai4BhgAP/AILHwT8AhgATQACuAIAuQAF/AIfBPwCLR8E/AIEATMBD/wCAwZdAgaSAhIgxwIgKAKyHwFnAgEXABQPAwIQAnUZAaoBoEEfIQMgAUIANwJ2B0D///8HQgIwAEEGcwXAdmciAmtBH3F2QQFxQAUCOi8BCggUHIUABVMBCBsZBCoBwCIFQQEgA0EfcXQiB5kDCTwvEACDHBIC3AYAMABQIAUgB3JUABECSgMAew0AhhEQGYYGEHaHAABKAGBGG3QhBQMgATUFQR08LxAHWAAQA+gBEAUVBzgFIANmAFAACwsgA10CEABZAACSASsBNjwvAaoBEAElAQCqASAgByIAAQIDExgTAhABEgAAIwAAOwACRwEBBQAAywEATCsAJAAASD4FWQMQDTkDAEwALwBBZS8HEAPUHw9lLwMRAwsBLwALZS8LPw8LQb0DE8YLC+wNAQJ/IwBBEGtkEQ8CAAEgIAByDtABaw4KAgMEBQYHCAkKsSwAzgZQQezUwQBAT7BBHGooAgAoAgwRAPwfEwsfABD0HwAdBx8AEArfAgEhABD7IQAaBiEAMDoACB8AAO4AUAJBADoAvgoQAM4CAFMKIARq7AAAtg2RDGpBwNTBABA/GAAAlSVADEEBIUIKChoAEAEaAAIWACWE1RYAFgIWABaUFgAWAxYAEdBCABAabw8hCCEmCzAEIgNaBAPBADEADQjfBAJECzEtAAmMAwDEAQEvARAEWwgQAOMAUJ7wwQBBkwMH4wAQDQMLASwAACIALsv8IgAgIQEaDgMmAW+k1cEAQQomARgHDgECzgAPEAEDEbAWAA/kAAQQCeQAHwfkACgAwAABLAAAIgAP5AAEFQfkABCu5AAfDeQAXBAI5AAAACYP5AAlAMAAASwAACIAD+QABBUG5ABQm9bBAEHwHQchAA/kAAoJ7gIRvKgCA8oAASALEASvBwA+AzD/AXEKARANZS4AGiIAwwAPywAdAKcAASwAACIAD8sABBUFywAQ6MsAHxDLACUfzMsAAwADFATLAB8EywAoAKcAASwAACIAD8sABBUEywBQsNfBAEHxFQchAA/LABcf3MsAAxcEywAAqiQPywAlAKcAASwAACIAD8sABACABwAfABDsQwMaCckABx8AEPUfAAuzASAhAZIGAwkBEOCNBQ8JARQA2QABDQEDawMCDQEPbQMKAPsGEA3QKw9tAyUAFgkBLAAAIgAPDAEDAcwAIDoAewQwQRBqcyUBhgFzAEcL5AwBB+4GHgnuBiAgAgsmAOoIEAOmE4AEIAkgAjsBCmcJMAwiBR8OEASYGzAQIgf6HWAGOgAQIAQ0AEABcSAHzghQIAVyIgcJARAGFAAgQQ8CKvACBCgCCCEFIARBBGohCANAIAjnC0AFRgR/oRtBQQEQTiIAMQUgBc4JEwCdEwGYClAIQQFqIiYKAA0AbwxBCHYhBj8ADx8GPwABAA8AQgxBEHaeAALFACNBcMMABK0AEA0RCRIEVB8QBRkAEAS2jDELIAbbAEAHciIGPQASBS4AEE09CwfbADEHA0BiIw+cAB8AmgAB2wAPPwAjAA8AAdsAEAaeAAbbABAIwgASCK0AANsAAE8KYhZBARCXAQs80QFBDmpBqqrBACkAADeTEEgIakGkEAAVnA0AQEEMQQQ5AAABDLAgAkKWgICA4AI3AggEABQDBB8AEgHxAxALLgNQAUH0qcEjAyQgASoKUQkvAA07nmJRC2ogCUH4IADSAAKgGwDPCaCtQiCGQgKENwIEEwcgBCA4DAFZEyJBAg4BEACTDACTEiA7AEgTAA0AAcQIAPcRBbICckF/cyIFOwFbASAiB7QAAhcBISIIUAAAGQEAYgEx/wFxcxIB3AEBGQIECgIPtwKwHwm3AgUBVQAF2wAvBwO3Ao0SBLcCEJEMFABoAgkJAAA5AAD4AAIJAgJ7AAQkAlwJLwEIOycCAHgFAD0FAH4AICIHew0A1gQwASACZCYAhAAiIQYZAQD0ASEBLSYqA1wBEAOaADYEIAVZAQGWAQJiDABYAAG1ABAQ2S0wAyEGvQ4A8gABlg0P/gEODz0CCR8DPwAPHwM/AAEADwABYgEBpwAGYgEQBsgACT0CMAEgCg4OAbMAESBQAQAkARUgUAEADgAQaiUBAB0fEQMPABIgTwEAig4CvAMgAjbZHhEJbwbwAgu8DAEBfyAAIAApAwAgAq18yBYAgw1AQX9zIVZLUMAATwRAYQEgQTMFBEMgAUEjCAASEwgAAAUAAVABkHNBAnRB0J7BAN8GAWwBAhsAJgh2HgAVlh4AAasiRyADQRAeABWOHgATAx4AIhh2GgAVhhoAAWskARQAJP7AFAAVBRQAFfYUABUGFAAV7hQAFQcUABXmFAAVCBQAFd4UAAEfJQEUABXWFAABDyUBFAAVzhQAAf8kARQAFcYUABUMFAAVvhQAFQ0UABW2FAABbyYBFAAVrhQAAWcFARQAEqYUABpzAQAfIhEBARUUNQAGEQEVFRQAFfYUABUWFAAGEQEVFxQABhEBFRgUAAYRARUZFAAGEQEVGhQABhEBFRsUAAYRARUcFAAGEQEVHRQABhEBFR4UAAYRARUfFAAPEQEAIiABNhoPRQIDAB8AExEfAA+CAgAAHwATEB8ABRwAA7wCD2gBAxAkLgABFAAGaAEVJRQAFfYUABUmFAAGaAEVJxQABmgBFSgUAAZoARUpFAAGaAEVKhQABmgBFSsUAAZoARUsFAAGaAEVLRQABmgBFS4UAAZoARUvFAAPaAEDECIgAA9oAQcTIR8AD2gBBBMgHwAFHAAPaAEKEDQuAAEUAAZoARU1FAAGaAEVNhQABmgBFTcUAAZoARU4FAAGaAEVORQABmgBFToUAAZoARU7FAAGaAEVPBQABmgBFT0UAAZoARU+FAAGaAEVPxQAD2gBAxAyIAAPaAEHEzEfAA9oAQQTMB8ABRwABGgBACAVMEFAawANckFAaiICQT9NBhIC2gUBNgAQczcAATYAA5sAAWgAAjsAADYHAKwJEWoSLAC7H0ADQX9zRhRAhgwBBj4GADssAZYMEABBDQuoGgEoFBACJAAQAX4GImsiLRgvKAKoGgQBYwoSBBkAAgQZADwBAiAWEQQeAAmlGhYAqRcBuwYDqRcRAKkXEAB2Fg6pFwDiBhEifhYACg4hAza4FAAzABJqnh0PqRcqAYYAD6kXCzMARhuWFQCoCwCSAAGNAB8AqRcBAE0AAmUXALkAFEGpFwBQEgAKAA+pFyYfAKkXBAEzARED6A4AEAECJBcCHAAADBkC4QEgAnG7AQWlGhUAoQEADAIBpAEPpRoSEACTDBCcihYABQAAHAAwAWoiPgAASAAMUgAEpRoBNQAQoDUAAAUADzUABAFgAAB4ACENAlwAAaEBARUAAQoAEA9wD0F4cSIDlwIBPQITA1ACD/kZ/1oWALEBBOYBCLsBAhcCARcAADVHAqEBIEEfURgRQvAZABA3AvAZEQGVFw/wGQcAdxEDfAAUQUoBMSECAkwRHwLuGRMfAe4ZBwCuAQG3Eh9B7hkuAGoSEQskDyMIIikZEAMHAAB5RATuGRAAygAQDDQBAUEZICAHIQAB4wsE7RkBJgMAIgAAOgABPAEZA8MZHwHDGQQhASi7AgEcAADJAQHgABABwxkBjAAAwxkDWQASAQcAAOwCYQsLlQsBCNMpICABewUQIFJNAKA2APIBAbkOQAAtAAJoAwKGRxAIagBQQaG3wQCzBtAiBEEdTw0EIAcgBEGBdy5AQQF0apM5AHczEAINEBAGiwAxakGU6QsSat8NEAKdATIMIAXkDRBySg0AUxpCBEGhuVcAEWsgDiKQtg4AAIsuAeMGEBDkAwBNJBAhdRogAkFQMAFEBDBGBH8lEQG1DQAgACAFINwCAVANEAW1DQFxAAG1DQB2AQANAAH0DS8FID8AIwAPAAH0DQG5AALpACNBcN0AAqsAEw+nBwBGIzBqIgQZACECIA8OAFoCIHF0xBMBPgAQBBQAD9oAPh8E2gAPHwQ/AAEADwAP2gABAcEAAqsAAtoAIgJ/hzthA0H//wNx3gNQf0EAIQGvZUNB/31qFwBQ/gFPDQFMPsMHdkGAAmoFIAMLQdDlAWAiAUEeTw37AyABdrAwkEEAR2sLIQYgBxIAUXRqQcAESgIQCsE1AAMkQGpBoAc4AANoAVQCIAogBEsBEASvAAAPE3ABdEHQvcEAOgBAQX9zauMBAbYAD2EBIQ8iAQIAIAEPYQExAbIABmEBAdMAAqsAAmEBATsCQAZqIgEZAABsBABRAQM8AjEEciJFBAJwFgArpgBXAAfbAB8EnAANHwOcAAEAmgAQCAoRDz8AIwAPAAHbAAGcAAbbAAw8AgB4BgPkAQDgAQH6WgAqBADlARYCKgQQATcAAlUAAEUDAPkADPcAAc8XD/cAlQDjBRAEPkYSCSYGQAIQSg/FB1MdQcC5wSwxUkEeQYy+DQDaxgoBG38jAEGQAWsiA0QYAucJMARBAj0HQABBOGpEgQAHAMATIANBKGohFCADQSD2cmADQRhqIRaVDDBqIRfKBQCZMFB0akEoasYVcQwgA0FAa0L/KBITBwBCA0EwagoAEhQHABIVBwASFgcAEhcHABADBwCxCCADQcwAakEAQcQvQgBcAPAJoBtsIgtqIg1BOGoiEUEAIA0gEWtBuBBqIAAQDQkAUEEAQYAJDgBADEGhAuxCMAwEQBoAYRlqIQQgDG0HEAQaBBACMwEA9gUB60FBAnRqImcBMABBARATMCAEQbUMYCAFQX9qInQJADMJ4gMoAgwiCUEBdCICNgJUEQAwECIHUgICFAASWBQANhQiDhQAElwUADYYIg8UABJgFAA2HCIYFAASZBQANiAiGRQAEmgUADYkIhoUABJsFAA2KCIbFAAScBQAMywiHBQAQBA2AnQSABA0vTpQKAI4IQYHABA8qwQyKAJAWgQQRK1wICAQCwAxMCIQNwBACDYCeH0JECCVMwEPABB8IgQGDwAggAH1CQYQABCEEAAWBBAAEIgQADQIIAoQAPAAjAECQAJ/QRsgCEGAgARGTwUQIBHh+QcCIBAgHCAbIBogGSAYIA8gDiAHIAlqAQBAQQFNcrwlQAJAIAweCkELIBJqLkcQCqcEECGGNkEKQaACBQBASxshDhAAICILjoISCHZEIAoCyAJACyANav0BAPMBAABCciAHQRBLDQtaAgDkOAX5AQDdCQD7AQCBNgC5CxADSTJBAXEgBPMBEXINAiABdnYIAJkDAywbEkmPCyALT1IbMEH/B3UssAdBCXQgC3IhAiAPRwIwdGohNwoQB14EICIL0AkQCVsAQCACOwEkChAJQQaQBCALaiIEQYAIUABwCyAKIAxJDekccQsCfyAGIBFbABBxSwAgIgIhCRAFIzQwAiAGQgBxBiIFQX5qC/ZyMQh2QaiCICEJnU0gQQzCFiACIcIWMEELIVY3EAkIBxAJ1gAQBbsGIiIF7DYjIQb9BUBBwARPgjIAQAEgBAI6SwC6RRBqWAMRIpxCFQVSAADGAQCAABECgABAIgYhAjgABRUBEQtsAA5qABgCagAgCiCQNANhACAgC08AAfsAAP0HAL0BAYUEcAIOAwADAQO7BABcCiBBDH0AAwwAEArJARCQISsAeIcwAXIPNAwBixAQBBcxEARZOQCMAGIEQQNBvMv2BGQgAkEQQcwNAGQOQaACQdwOAFQHQRFB7A0AZAZBwARB/A4AEAIOACOMzA4AEAw3ABCsHACAXgALxQkBCn+xAA8CAA8AQgsUBElBEgD6PgD6DQBxAUAFAn8gSjhAB2oiCK8CwQpBGHRBGHUiC0F/SgkDAgIAcCAKQbijwADSAgDQPRADKTIBywcgSQ0rBjADTQ2UTCEDNjYNEAfMBBAB3QcQaxEAEAGVDADlAiAMGDoBIQJqEABAIgRBACMAwEsbIgZByKXAACAGG14AkMABcUGAAUYNAm0CQANJDQkHADBNDQqNPg84AAgAfgIAAgAAmwMAGgIBjA6QDUYEQAwCBQwD/ixwCUHgAXFBoFsAIAwXDwAB6QCxQX9KIAlBoAFPcg0xj0ALQR9qUQIgQQuFBgklABfAJQDn/gFxQe4BRyAJQb8BS3IoADByDRXlAEEDaiAH7ABRIgRqIgayAFIESxsiBbIAEAWyAAXqABMB6gAQCpk7ACcEYAIgBEkNDKUAD/EACSEGAvEAAfMAoJB+ag4FAAICAgFubgBvNAHEAEAwSQ0C/0cVBp8AQCAGQZDHABAUxwAQBr0AQiALQQ8uADcCS3IqADByDRPPCA/EABIxRw0CKwAfAysAESADIBBVQAsiAyDKTANWAxAEfUUBVUMQAE0DABEAA0gCNABBDGIOAGMeAyUAACwRADQBEgk0AQFMC1NJDQsMExgAAIQBIHxLhDMAGAASDaUvAFsADKMCEQSjAgFlABADowIQE88IA2IAcQMgAkG4pcBvAwA8BQYNAAAaABTMDQAAGgAFDQAAGgAW7A0AEgQNACBdABwbCRoARQJBjKYNABIEDQAEJwABDQACGgA2AkGcDQASBA0ABCcAAQ0AIF4A1BIxAiADCQwAKwMAxAUBOgAU/G4AAKIABA0ADS0AApkRI0HcIAABLQAFDQAwASAEKgEOOAEB2wMALAEwDGpBDBEAUAIfAWUBEAAKEAA3AACOOwALAGG8CAETfwLIAgYCAACgBQDzETECQRBgBJBBsCtJDQNBsCu4DwAXEzEgB0koHQBZCYAFQW9LDQUgBcQQQAMgAku3U1AoAgQhBmoQAfoKQCAFaiJ/CQA1QwBmBgELACAIIA4+AQsAEAmrBQILAAB7DQHPG1JqIgsgBMYbMGoiDPVaAgsAUg0gBEEHCwAgDiCgEgELAAB0BwGiGyBqIhwLEgoLAFIRIARBCwsAERLWEgELADITIAR+GyBqIi0GEg4LAEEVIARBbBsBRgYARQGABCAVIBQgEyC4OREQrwhwDSAMIAsgCkJLANEIALEICAEAICIGZgEA3T4AIAEDkQwECwEA+QUAsAFwIAZB8f8DcCoAAHAKAgwAACELMLAralYKEE04ABADKQAAMwAQIIkXEWomAAAWDACXAABRACIgARQAMDYCBCwAAn0BM0HghpwCAA4AIiACEAAARQJAAyACT9QMQyADa0HhHqAEDAQLQQAgA2shVAkQA8MBAPg/QBBqIgTDAREDZwAiIQVwABAAlysgaiL5PwCkAAC4BgELAACrCwXDARYDwwEAYAQBCwAABgQFwwEWA8MBFgPDAQCLCwELADYPIAPDARYDwwEWA8MBFgPDARYDwwEWA8MBFAPDAQBLBAAIAw/DAQwQB7cBCAEAAJcBEQQ6DnAGQXBqIgZqMAwBkQEQD0cBEANnARDwVwEAZwEADgAiIAIQAAHZAwA5AyAgBBkWAT4BAUUBIAAhbjkALwQABAAhSxtwAVMEIAZGDRUYAF0BAy8BEgW2AAA9AAAzAwHGAyACIDIDAn9AABYCFAP5AQAtOQMMAAAsBXEGIAJBgIfAqQgAiABBRQ0AAwcAEgFSAANLAgBVAAVkABED8AAPzBkAABkLUAFB8P8DSyMAuhMwj4B8QQgAgQAAOgADeADwAgQLqggBBn8jAEHwAGsiBSQAyggArQ4QBUIGkAhBASEHIAEhBgEJIEGBbQbQQQAgAWshCUGAAiEIAy8BQAggAU8XAPAFIQcgACAIaiwAAEG/f0wNACAIIQYZBQALEiEhBiAAIAhBqweRIAggCWogBiEIficQC/wCEAb1CRAFgxSgECAFQQBBBSAHG8JhEQWsBlFBnovAABIAEBiWDBACdgCAAiABSyIHIAOZZQFuF1AgA0sNARkAEEUvBRFGFQAQAYwDAD0BEQKXACBASLonEAPxChAF3gAwICACzgBAIAJHGy4AMAIhB4oDAUwBIwMDZQAAdQMHQAAQACYAUSAFQSRqgyoA2wAQB2oFIEYNcQJQA0YgByG3ARAL+QAA5xQRA7cAQCggBUELPAG5ATYFQdwLABXUCwDxB0IDNwI0IAVBpIvAADYCMCAFQQI2AkwYBDDIAGoYPGAFIAVBGGqtDgAKAFEQajYCUAoAUChqNgJIugA1BUHkTwAMZQASAgsAAIYAARwFMgVCBHAAH7xwAA4RYAoAAHAAAnoAFQx6ABEIegAA6wBQQSRqCyGILmABIAdGDQBoOACnAQALDHAgB2oiBiwAuQ8hf0wiTxADkAJAaiIBIX0BAAFKAKgGkQYtAAFBP3EhA1dEICEAXgEhH3FsFoD/AXFB3wFLDaQOYQlBBnRyIZ0ZAGUHcP8BcTYCJCAFASAhAcEXABQUEAGtBSAgAVYAAc4pUD9xIQogIBAwIQYLjUkBQwASAD4AI0Hwn1QxCUEMWQAQAUQAEAKZADBHBH+WAABAACEFQf0KoBJ0QYCA8ABxIABDAKJyIgJBgIDEAEYNjQAwNgIk+AADjQAAzAMwAUkNi1UQAwwAEBAMADADQQQMAECABEkbvRgxBSAHHQIAJwJDajYCLKEBAUQENgVB7MIBC9gBEgkLAADYAREKCwAiQgXNARTczQEiIAGuAREIqwEP2wEGEWgKADMQajblAREg0QEiAQt3AzErIATPORAFSUKRBBB0AAu1CAEIgAMEAgAAdUgQT44GsiACEC8iAg0BQQAPQQGhA0HM/3tLDQRBEP8FMEF4cQgAUEkbIQQgBjkCKxlQBkF4cSFrEAECAFAgBkEDcY0BUEF4aiEIVAVwTw0BIAEgCIYOEqg9GjRGDQJIGiAgBXYDoAUoAgQiBkECcQ0yAABRACAiAbYGQARPDQRXL1AEQYACSUwAUEEEcklyCQDBa0GBgAhPcg0HDAkLEACAIgFBEEkNCCDNaIABcSAEckECclcBEAR6AGECIAFBA3JlBSAgAh4JEAM9BQLdGqMCIAEQEgwIC0GgkgAA1gIgIAQVWw9MAAUCbwABPwABNgAAqQERAN0AAEECaQAMBwtBnE0AMUkNBFcDIARrboI0TQRAWwAUAVsAASEBEAGYDgOYACFBAN87BCkADIQAEgMmABAgfBkgIgHuBQBEAAE/ACB+cRIGAWEBAY8AAYwAASIAIAwGHUUwBGshPSowgAJPTRxCKAIYIa0REAUNACEMIlEdEQVRHRAFAhAwARtq5gEQAxcCA7QDAv8aA1EdACUVAKkAQQVBFGqIAkAgARshshUQAfgSAlEdAG8PISIDoAUxKAIQTAMwEGohyAUgDQB/DREA1AYQCmMqAYYAB1EdADsAAAUEIApBUR0gCihdBhdGUR0gBAzvBQMPAEANAkGQDR0ABQAAThQRfk0AIHdx/AAAqwMSQVEdQgEgBUFRHRACWwABxAAAoBoALQciDANhGwEFAAJEADMGQQNRHQHeLgDPCADSAjADSxvJJzAAEA5cAEACIAo26GcAlRQUAVUAEhBVABEYNAEQFNkrALIEIBRqHAAAsAECHAASCb0YIAcgTwMO7QE1ASAJvQIiCWowEwMlAgASACAQEn8ABj0AFAs9ADAIIAs9AAEUAgEuAAC/ADIDEAqHABAByABBQXxBeDkAsSIBQQNxGyABQXhxNAAC3QAA3ADxAQ8LIAIPCyAAC+YHAQt/IwD1YwFjCDBBGGooFgAKABUQCgAUCAoAAgcAEAJQBgwCAIAgAw4CAgEAC6oiA3sHIGohIRMQCPEAAPIigQQtAABLGyEIdAlQIQQgB0FdVkENAAsLIABRIgxBD0uQAjEIQQA6ABICuwkgIgdIAQAdABAEmAUA3RJgIgggCC8BOQZwOwEAIAQhCEAKAFcAAssJQCAFQTi3AhEYTVIAuQAAKAUA0gAFEAAQKBAAFQgQACEgBQoAECCHCgCmC/IBA0kgBEF/THINBSAEBEAgBAyfEAuaAhAFXwASAL4FMEBrQbt6gQVB0ABqEFMgxgUAlgoQBBsCIUQhIgIQQE0JMAQgBLwy8AILIAQQkQEAC0GcvsEAQRNBsDcYUGQAC0HAEAAwL0HwEAAA2QVjB0EQQYC/GhMAfgAANgBBIAtBAPAA4EEBdiEGIAxFBEBBASEHXQcwAiEKCwARQQZGAAQLAFwBAIMCEA0XAzAgaiBxFTFqLwFKEkAgBiAHEAQQBzEBEAZODVAEIAogBgQAAYcRQAQgBkHhEBAGyhpADSAGT2IVQAYCQCCJARAFswYwWCAFGgORVCAFIAs2AlAMKgRAADYCUAgAUEBrIA0g/xQDFQEFCgEQSBUVECgRAQBsChEGxgAA9wdBC2ogCQxSMHQiDuAAEApnCDAKIAcnAnAHIAQgDE8giCQgDEmaAYEMS3INBAwBC6shUgEgCyAGHAFTCUEQQaAyASAQimQBEAAMAQACAAAQAQA6TBUBUgIQCv4AQCAKTQ1YACABT5INAFYBYHRqIAsgCggAICIMmxWACUEBdkHVqgFcWPACAXRBqtV+cXIiCUECdkGz5gAVAGECdEHMmX8VAFAEdkGPHhQAUQR0QfBhEwDhgP4DcUEIdiAJQQh0ckGjFYAAIAprQQ9xducAIAwgZQACxAIQCyUDAucAEQjnADAIS3KuCpIgBkGAgICAeHIHAADZBDALEA5mAVDgAGokAIsaQyADQbD4AADNACRBwA0AAEIBE5ANAFCWBwEKf14MFhD/CQDxBSEMQY0JEQOTAQBzBBADrgIRAX0FEmorABAgpSUATgQwCEUEAAYAfQEABwAgA0B0AyAiB2wNAasBAA4HMAcsADwIAF4VESA4H0AhCQJ/KAARRmAKIgog/wYDUgoAogDxAAJqIgQLIQYgCUHgAUkNAC4AEgYuABILLgAD6gkQIQ0BAOIDAi4AEPAuAAIsAEF/QQAFHAAkIQQtAAAQAiMSdBQKcQpBDHRyIAsaCgMYChADLAGAB2sgBWohBSAIDSEiCIkEAKoAEA2BNBAEyQARB8kAAZMAAF0EADQDQQMhCEEPEgBgEQDMBALLADBBBnS1Azf/AXHHABIIMQASBjEAEAihABEG6wQBoQACLgACxwABDAAgIQcSGQfSAAYqAAXLABgExQAB8CVhBUUgAiAFVg0QQcELMAUgAuoCNAEgBRoNAa8BACkHUCACIAMbAQoACwYQG6oHEAz4AQCeAAAwCgFBADAEIAJKVgBnDQBbAgCDACDAAdsUEEZeAQCdEABkAAAxARAFnwJAAiAEa0oCMAwiBnlAD0AAHSEMAacDA0IAAYoAAcUAEAT3hWAGaiIEIQWDApACQEEAIAAtACCTBPEAQQNGG0EDcUEBaw4DAQABJBkRAQkeMEEBagoAABMQACW+AGwQEwtzAAEFBACaBgEwJSIAKI4nAXkAgRwoAhARAQBFLRQBnw8SBJIAIBggMQQCIgBQDBEAAA04BgBNAAEUACAhAQcAIBghCRACWQABggEAVgcAhwMEVQBQAAsLQQEVAAVQACBBHE4DAlMAoAuOCAILfwF+QQGYBQCFAXQoAhhBIiACJQAARQABkAJgAUUEQAwBXQAQARwFYAAiBiEMAzIAAfgCACYBIX8gzA0gB0HMDRAC+BggCkaSAAAYVwA6AATHDQDeBUACaiIFRwMAQhsQIQsDAR0DAocCkCINQd8BTQ0BGlIABEQAFQlEAACTAiEhCXcAAEQAIAcgYBQAtw0AvAQRC2oDEQ3WAgFBABEHQQAzIAUhBQMBKQQyBiAHSAA8CyAL2wIhIgTdAjBHDQKOBAGRABALTwcgIQblBlEFQfQAIeIZBgIA3yAEQXdqDh8FAQMDAAMBAAARBAUAcAILQfIAIQeZExDuCAAAAQQhQdxFA0AgBBAt2wQxBBAdGARAQQFyZ+QFQAdzrUJ2BXDQAIQhDkED0ktBBCEHC3QAEAiHF0AAIANFSwMBfQMgIANJBgGBCRBqeQMQvxdJMAsgCCIAEggiABQIIgAYCCIAAPMBATYAAFUAEGsPAANwAlBFDQFBATsCAGQAsCAIQYiiwAAQFwALFhbCIQtBASEJQdwAIQNBA00QfpgAAAIAMSALQRsDMQUAAqwAAAIAYCAOQiCIp00BABwA8QMFAwIBAAYFCyAOQv////+PYIPoABMw5wAgQfWmDBwHHwAUIB8AEPsfAPARBgtBMEHXACAHIA6nIgVBAnRBHHF2QQ9xIgNBCkkbIAMnA0EOQn98QwBBD4MgDkQAi3CDhCAFDQQaWwAgEIRsOwUUAANoABD9aAAASRUgIQVJx2AMAwsCf0EvDnCAAUkNABpBvRMBvQ8RGr4PADkCcQRJGwsgCGo4AAZQAAFkAELAAIQLWQADcwEQAwcABf0DIAALMwDQCCAMayAGaiEIIAYhDP4CIEcNaggE5wEA8gEAxAERArABBMQBEQKMAQBOAAPIARoByAEgDQANABAY1wMBFAAAcQBVIQkLIAncAUIBQfih3AFA2AcBA5ALYEBqIgIkADYEUAAhACABPwBQ4/HBAEFxSRIcGwQAWwAQIdwSAWEaAEgIAIIHAAkEAQYAAQIAMiADDZsUMEEEcS4JAUkAMfWhwEkAAY0AAEYAACQAAGkAAMINQAE6ABcoBrA2AhggAkG8ocAANh5PgCABKQIYNwMICgBgLQAgOgA4CgAwKAIEDBQBHgBCEDcDKAoAQAg3AyBSI2FBF2o2AhAKACAIavwQQQJBBGrFSyIQOBQBMDBB1IwAEAIMABI0jAAgIAKUGQDQAFICaiEERQcEAxQAEQIWAAD0DADEAQBNACABEIgAAR0AABsAUCEEDQELlwBwACIDQQRxBAURD9EAVRABxQAfMNEABhANogAgA2rOAAGFARK3KAAGhQEQRbsAAiwAEAySDgBbAAbfACENAT8AEAvjAQA1AAThABBBqxMP5QBXATQDHjDlADIhAAx5AQ/ZAAAAGgEAQwBUARA4IQDjABMg1gYAygAfBMoAAB8EygBlEQ1zCg/KAAUDpQACzgAAXRQBKQAT5JoDBSkAAQ8BACwAAMgBIEBryQNXC6oGAQeaAwICACAgALUEACgQAAkAIQhJ5wHwELXZc2pBtdsrSSAAQeKLdGpB4gtJciAAQZ+odGpBnxgXAIDe4nRqQQ5JchcA8QT+//8AcUGe8ApGIABBorJ1akEiLwCQy5F1akELSXJyrwRQQfCDOElwBCJBgJUMcCEGQaGNwADGCBFBfAoQA48AEAFFAxAFRwFgLQABIgRq9BUADAAhACInDEABIAZL7BWQIQIgBSIBQfON3mcQAjEBMAMgAkYOQANBogKvHHACQYSOwABqQRQACAoAewQAkg4hIQRNAALJFzABIAesDzBBACEvGwtVAAB2BQBbSHADcSEDQaaQqQASQXQMATwAAGALAtkEIiIC1B/xAiIFQQBODQAaIABB25LAAEYNuAAA/Q4w/wBxgA0AOhZAQQJqCwVpICACsxMwAEgNQwYgAXOXAAE2AACQAADOAAgmASDskn0AAI0ADyYBJCC4k1kABiYBgAYgA0GvAUsNIxEAHAAPJgEXAM4KCVUACSYBIOeUqQAPJgEWIIqYJgEQCB8ADyYBDQCXAAMmAQA2AACQAAEnCRBxRxJVIANB9I20GyKiAg4AM14AC6oWMkHckvtTDCsAIq8BDgAPKwAAH5UsAwEPAgAHAIwNMHYiC0YDAHkIEQw7EgCD5lIgBXEiBrEHAMgXICIIDADAAyAHIAxqIgogACAGDRAAHioQCc4KBi8AEQStDQAKABAFDxAfaisACDAGIAj0IxABFykQCgoACysABSkAUQggCEEDKQAwCSAKCgAHKQAQB1U9gAcgC0F/aiILVw0ArgAAjwcABwAHxgkBtzVxAWsOAwABAhcHMQVxIgobEBVFCFNPDRYMFxYAEAQPAAASMkEBTw0RFwEAlwwEcAAAnBMAJgABPAAREiMNESIrABATiCQQAhsAAUEAEglBAAArAQ9BAAMBJgAAzQEQAbseQQFPDQxWGgorABECKwABbAAAnR4BqxcQAUtuA1YAAeUeYDoAAAsPC0gDMkGcx7QQZCAIIAFBrA0AABoAFLwNAAKfASRBzBAAAB0AFNwNAAKRASRB7BAAAB0AFPwNAAKFATNBjMgQAADVAhScDQAAigkUrA0AABoAFLwNAFQHIAFBzA0AACQDFNwNAAA0ABTsDQAANAAU/A0AABoAI4zJDQAANAAUnA0AABoAFKwNAAAaABS8DQAAGgAUzA0ADCABQOsFAQodCmAgayIGJADqCQC1DwGTBDAAKAJZEAAEFgA0CnBBv6DAAEEEDAASBJMGQUUNAEHhETAGQQpcBzAGQop5CzA3AxDdHmA2AgxBACGWGBAAHi0BEgAQBDkBAHMWMgIhBFQKAFgEAJICEAgIDiEYIbIOAZYCARA0AcAEUQIgB2sh5xgAFw8gIAi7AFAgCUYNBA0QACYCEAM+BAFxEABGDaBBA2pBfHEgCGsilw++BCADIAMgBEsbIQVCADcGIAVCAKIgBSAEQXhqIgNLWgUADQAgIQMrDAD6EWGBgoQIbCEpDQBsF/AJCkEEaigCACALcyIMQX9zIAxB//37d2pxeRgBFgAQChYAEwoWAJByQYCBgoR4cUW4DpBBCGoiBSADTQ1rBVAFIARLDQYOAOAaAOYPIAVrFQURIOsgLiEItAAQAtMABbQAAIoCEAKNGADuBgB6EgCOAQHrAxEiJQAwBzYCqB0gB0VGARFJMg4xASADTAAAcAEBqw4AGgARDRkEEWuJEwFZEDAIQQFqAwBFAAA7CgAbARCEUAwQX0QCAB8AAD4CMiACC7oQA94QEQA2DhBA3AwjAiDDDgCrHwN2ADEiByzfDBFK5ggwIAJBYAAxxKDApgwgIAUkAAB6LwJbAnABQQEMBAtBCgEHGAAxDQMaEBQBJQ0QBEYAMANqISMCQANrIgIQARBBnQNgQSBqJAAPHgAApQUzAkHUZABwywUBBn8Cf980IUErFBABtgAAlBVAcSIBG00eMCAFavwBABcAcCEJQS0hCiCgERALnhggIAnyDAG7EAEgAhADoQ8AlhgBxRoCrgczQcABmRIAIgQCbAcAggUQB5wAAccBUiAGayEIqwIBSAEB3wcAUStRAiADEGcxEjIgAEF/GiEHIIRXCh4AADsAAAIAQCAJQQiPDBAAfwFQCSAAQTBgA1AALQAgIUIARwE6ACA6AAD+AjABIAcXAxAC4A8BKQB1IgcgB0EDRvsSQAIBAgMXCAMpABAH9gAAAgAELwAPKhMCEAcgEwDnABEBKhMA4xtwQQAhCCAHIfUKAQQBAOUDAAYBIAFFswwB1A4QKKwAAd0KIhARLA9AQQEPCwUGAE0AAAwGAAoAEgNNABADZAEETQACNAQDTwACMRMABQAPTwACABgAAGkJACQAMAQgBQkAExxJAhEB3AIAPCBBKAIcIZQTERhsAwLNaQDcAQBAAgRRAADoBFILIAAgC1cBIAk2eR0HYgAFaQEBUwINbgARAF8GC24AAOcTAm4AAVYCAE4ACHMAAM4CA8UAA1AACKcPMgu7BkhRQTBrIgK6BQMCAACrAQE4UTECAALeA2AALQABOgC1DAFaDDDM/MHHBScBQU0AIToA6AwSNiUjMDoAKQcAAGshATdiogJBEGpB0PzBABBkSxAoogHAKAIkIgBFDQIgAgJ/qQxQQf8BcQ3/LAB8AjBHDQApABApPAZRAigCICKUACAEcTEGAdAAL0GeaksCERpIESEgIiMAEMupAAsjAGALIgE6ACgkA0ECIABBgwUAkh0yAiABWBMyEEIA5gAQ4D0AAAcHBz0AIBuEmwYBzgAQ4h8AQAQgAkE5ZQDaABAxGABUOgAfQfgaABMf9ACRMUEUQQEQlwEi7gAQAD4AoaH8wQAoAAA2AACYKVJBmfzBALlJRiAAQZENADACQpQmEiACN0oBcCAANgIgQfxfACAHIFgBMEGE/V8AABwBAUMCIC0Aty8ZAE8BAA8BJhAiAwEAKAAAOwIQAy8AAFIBAGMFMwNB8FcOIBEAJg5RIANBquw8AQARAAEzARQEWQEAMwMAvAEACAAwABAOLgADSAEAhg4NRwEulP0pUwBHAQANDwD7AAENDwDMAAU3AUEQakGc2AAAIgBQNgIQQaxDAAC/DUEQakG0GgAI8gAAIgIO8wAfIPMANEBBMGok9QwR/41NIQ8LywEA2xtGswUBBD0DAGEAJwAhRAMBkQ1AgAFPBO4RAWICEQEXFACmAAASFAAYACAgAaQZYYABcjoADg4AQAx2QeAOAAGPAjVBBnYfAFANQQMhAaIHABgABBUAEQ8OAEASdkHwDgANNAAFUwAEEQBADUEEIYUEAKwAAKY+A7YBAT4GAL4AEAQVAwDTBBAiah4gDQMMADF0IgU5BAB5HSAEQSUfMQhLG+8REAPCAEJBKGpBjgkhIAPtAwFKADA2AiBRAQH4ABAgCAAwEGog2QFBIGoQVeoQAG4AEAOmATAUIQQHACMQQcQGEARMAACYAABPAAFVAREIaD1QIANFDQO3CAF7AQHZAAXWAAEOAEAGdkHADgBQDEECIQF9AGADIARqIAFiCAJHADBBAWrlCAD+AAL3ACEiBH8CAAoAMQNrIKkBALwAAgYBEAFsCBAFBgECgh0wIgMgdSWRBUsbIgNBCCADBgEAHlEbBAYBHwQGAQsASwgPBgEfAqcABQkBAOQJAgkBAVIeAusAAIgEISABJSIAHgoB9QAgACD1AAAwAQHGAoJBAAuvBQEJf7UCIAMkPAkTJCAiMANBA8IFEQO8A1KABDcDCOI9MCAgA8AAEhgHABIQcgsCEhohCCL9AACaABAGBwAQBMssEkF3CBAFfgpBSxsiBSUEICAGjAAxBigCghoAAQRwDQMgBkEIajEEUCgCECEJmucQAzAHMARBHFsKAYwAECAXLmApAgBCIImQABMEMwFQAUEAIQpCCQCJAACDAQIJHgawBhABpICQCWoiCygCBEEHrT8RCwgEMAAhAf8SAEUBAPUAEBSOAQB+BCEEQXhqB1EAAcUABlEAEwJRAADaEwJRAAAiFAEzAABRABAKUQAQAvMTEAN/IDAYIAlsCgFFewAzAABdAQDEYpIoAgQRAQANBCDZHQHRAjBBIGr4CgBpDwGkBAAJJwDAAWAhACADKAIjBQJBADIoAiQ5AQDUBwDFAgx3AQEDAQh3AQNaASEEIHkBAQUABn4BAOssAWUAUQUhAgNArgACpQAAcgEwKAIAqAAAqwJAf2oiArMGEAQuAAqoAACHQAFDABADqAAQCFsAAQwACKgAAV8pYAULIAcgBcELASoAAIIhABkBAEUAAEoAEAQXAAM1ADENAQuQGxBBwAMBswJQC6AFAQixAiHQALICAaABUAEtAOABHhgwQdwBrgAA7gwiQdgLAADHEkAxaiEJKQAC5wlgKALUASEFCACA0AEhByAGIATrAwBfZAJBhuABKALMASIKIAUgCiAFSeYEAYYDgAcgCCAEEG8awwMQBawBMQcgCJkCBKExENyIAiEGIEozwNgBIAEgCiAEazYCzAsAAEwlMTYCyCgCAXYAA4YAAKMMIARJUQExIAZrPwNAA0EoapsTISAHIwUQEJoNEBCBBUAJQQhqBAgQA5oBhhhqIgcgCUEQEgCBH2oiCCAJQRcSAABmDSAgCQoAALcDMC0AMI8wMCgCLA4BISgCWHcAWABAP2ogCCUAAC8Ac0E4aiAHKQNOAACvKQQNAFAgAykDCLYWAb4AMdwBIjcCcNgBIAZqIgY/AQCDIwHzAABsCDAFQQouARAAQUAAIQIQAE0EQABBBWpHABAoawBBAEENamMAAGEAARAAEBUQABY4EAAQHBAAEz/KAACDKXABQQE6AOABQygB7AFQRQ0BDAU8CwAYAABmAAGzBAFICQdKdzKGwAANADAIakEKAAD8DXIAQQBB2PTBuRBQBCAFQegNABBegg4hIAbtDACoADAINwD+DANWACAIas0AAAoAEBDGADIADzcgCAXdABELGghAA0HQAKICQ68EAQwWBQACAJAgBUGBAksEQAz/D6AgBWogAk8NACAFhg5hQQFLGyIMdQIRBh8VISIPqAMAqykwBUGCsSVwggJJGyEGQXUGMICAfoMGAXsHICEQVQIwaiEN3QswaiER1wEwACESSyAjIAw6BSASID9BAEsdIHRqYggAVyUwIgNN+DswS3IN6i4AlgJAIgVBf7EBAJMOQCIHIAXjAzAJSQ1oABACnQgATAQx2KjBJAECCQAwjwEAiCEfAz0ABBAKOxYHPQAQ6DQAAD0AAQkABT0AEAQ4AFABIAlqL0MWICAKCAAwRw0BywcQBEIAAUU0MgcgEXoHAC86gAMgBEobayEJQwQBygOgBSAJRgRAIAkhBwgHQAUgDWqEECEFIDYycEYEQEGCAiGVABABqAAxggJH6w5gCyAFIQcLvQMSTTgHEGuxI0AgByIIYQwgBiHVRiAgDjQAEQ6TASAgD8UzAJETYAAgCCAMS9QPAGc8QAAgARtJADIAIAc3AjAINgJvDTIJIAcnARNd2yQB9wAADQBQBCACQfgNAADwEABNBSKIqQ0AKMEFTR0ANAICAgAgIACdCgR1BpBB+/vBACEDQRZtCQR3Bw8CAAkAPwAQAT8A8gcRAQIDBAUGBwgJCgsMDQ4PEBIAC0HrTgCCECEEDBELQdoOAIIRIQQMEAtByA4AghIhBAwPC0G4DgAAKgBCDgtBpg4AABwAQg0LQZkOAPECDSEEDAwLQYv7wQAMCgtB9voWADAVIQQOABLrDgCCCyEEDAkLQdYOAAAcAEYIC0HBDgBCBwtBqg4AMBchBLgfEp4OAIIMIQQMBQtBlQ4AEQmGGSJBiw4AEQpuGDFB9vkOAABGAMACC0Ho+cEACyEDQQ5rNQGBCSEcII4KEBi4BxE2eQsBCQwAbQgBeAkATBQhASggABQ8uQngQgE3AiwgAkG0+cEANgLLDiACQcQFEDjqFHBBKGoQIyEAKwIAnwcBIwcAvg8vFEHWDS4AtgsB3RQzAkEkajEwAkEOxAAZAbYAMQRqNg8IApYAJhggwAARAjQAAA4yAMAAJqj8wAAA6gAIwAARILUJEAGTCUACKAIMCAAwARAOqQQD1AAClQcRAZcHUSgCIBEBw6ATAiwcFg/8DBDw9AQRI5NaEAQbACMtADYHAEEAAPsIApwPIBBAWwARArQFAF8AEAUbABOfGwAgIAHLBADsXiB/c9kEAGMaUA4gASEH0xAA2ASfIAdrIQhBACEA/gIPIANAkgMgRgRUDRED7QYgDQI6ABAM7wtBIAdqIIggAGADcCIJQfX2wQAzBCAiCqUIAAIGIWoiRBEQC1IVFQV7FABHAAC+BREGlAQCMhQgSg2sAgIYAFcCIAMhABwAAHMhECDjABAgeAsARAAyaxBAEgAG9QAAbAoJWRRQ+PDBABC9FCACIXMLUA1qIABqTykCYgARCxUAEA4VAAxlAAB5AAGcIwBlAADlAMAhByAKQaR/ag4aBAIBAFAFAgICBgkAxAICAgcCAgIIAgkDAXkAAPYAU0F/akGgfwDwAUH08MEAIApBIkYNCBoLQbCwADAoQdgeABBoWhUAcgCwBEHc6sGBAzYACiCgCEMPcUHlSwExOgAPEwAnBHYTAKAOIARBCmpBBhBA7QNA8vDBANkDEPAIAADvJAAIAEADC0HsCABAAgtB6ggAgAELQejwwQALmgoAcgDwBABBAhBADAALAAvfBAIHfwF+IwBnGBIENwUAky8AJAAgyA38ADIAQTwDWFAALQDQDeIPgARB+LgCOwEQygkAngMwAhBACQIxOgDQ+kAQEHkJIQIgvwJgwg0QBSAEig0BXSoEAgAAEwAREFwTAUAoAPMOIAMhYx0gA0mIAXAHIAEgBRAW7AUQBPlDEAVuBBAEfAQhCCA1ABADlhMVHCYEAHMPVxhqQZDyJgRVEGpBiPIZBAE2BBiAEAAk+PENAEBBDEEESQAQAQMVMAFCnEIEQAM3AgSxAyU2Ah8AEADSLbAAQQ46AAggAEHY6xAEALEGIAE2UQGgIAQvABA7AAlBAg4RUkELaiAEPlUB8giArUIYhiEKDAroBBADFggAZQIQISYBQQNrIQL6AlBBCHYhBhwBAAIAAHMIIAFx/RZQaw4CAQCbAlAtAAghBkEXUf8BcUEPHhjwCQQ1AAkgBDMADSAEMQAPQhCGhEIghoQhCk8zMAlBAmgAAe4BEQV3BCUAEQsAEARsCDEoAgBbLCAQDvABEQeFAABoCBPxaAgAXwEAlAQBAAEJCQAQICgAIpTydgcgIALYByBBA98YAHcNAP4OEK1mdNEgCkIIhoQL8gMBAX8jGg8AlgcQf98ABAIAACICAZoHcAYCAwQCBQBGAxRBngUSAYoFECx1CgCKBSFB+C4/EihUBmAcIAJBnMwRAACGJWECQRhqECMoJAF0BXA2AhQgAkELNwIGUQAAuwUgFGpEAgZbAAG9AQVRAAKlBhEYKgAADwYWKFsAAQQHAlsAAIEIHwxbAAUACgAAJQAvFCBlACAALiQFVAAGQAAPAAEFHKQAAR8CQAAbHKxAAA+AARwbtEAAANMGAV0OcOIEAgJ/D3xDAEMMuCIGbHEwwD+iTTZnKAIQuCIEFAAkByAiAGTQP6IhCSAcAAAOABUKHAAw4D+iuyoHDgAVDBwAMxDAoAoAAFAAFQ0mAAoYABUOMAAVABgAAGQAFQ8wAAoYABUQMAAk8L8YAAB4ABURMAAKGAAQEtwAIgQhWxBiIQMDQCAB7wIAMAMQSacLUCgCCCICugOAAS0AFCICQQcyDwL/DAK6BuBBAWo6ABQgByEEIAghBTwACAIAUiACDgcHhQoVAEsGI9DfSwYwDSEFAQMQDvlfICEFsQJgCiEEIA8hMkQQILEQMAshBSICcAwhBCARIQXtARASHiwQIT4PM5siBcoAkAAAZiICQQFzIBEA4OD////vQWVFcg0BIAWrPgAQAIYFEATvBQAVAhAByxQQagoAQABBDGqsEQAKACEIauEA0DoAAA8LQX9BACACGwvtHEV/IASb+gEFaAAAEQAFaAAA3QUgBKuwBgM4ADAhAkHNEwEOEABwAACqHhAMuQYhuQSsBg8CAA0FYwQRETgBBr0LERFuBABJFxDEBhcAKQkB+gICMhEAjwEAHAAQ0RwAHwgcAAMQ2RwAHxAcAAMQ6RwAHxEcAAMQ+hwAHw8cAAMvif44AAcQmhwABXYEChwAEKYcAB8JHAADEK8cAA+oAAQQvxwAHwocAAMQyRwADxgBBBDWHAAPOAAEEOAcAA+oAAQQ7BwABWYEChwAEPccAA9sAQQQ/xwAD+AABC+I/1QABxCTHAAaBRwAggv+AwIDfwF+IgAWJx0AEBDcG6MEQEH0ACEDQQIhtxQCAgACaQs/AEF3fC4VEQONCQAIAAAsCwN8LiACf7ktMSAAEIIuggAQHUUNAUEBIgAdAYcuAKMDDxgAAZALIQVBAwshAiBeAAAkAPEBIQMLA0AgAiEEQdwAIQBBAbsABiIuEAQAAzgDAQUiLlEFQiCIp0wIByIuMEH1ACIKGEJJLSAwhEUOHvsZACAghHcKMDBB19wSVgWnIgRBFi4gAEEWLiEAajUAIX98OABBD4MgBTkAi3CDhCAEDQQaUAABFi4pQf1pAADJChAAwzICcwwEsQEBvR0ArgE1DwsgLAABRQATwB4BAI0WAC4AAKAJBS4AAJcMAAQVUKADAQV/BgEQQYgDsABBpJoESRsiASAB4RcABwBSAnRB5JimWzBBC3TPCUJ0IgJLIwAfBCMAAgQeAB8CHgAKHwEeAAYbAxUAUCIBIAJG7wTwAElqIANqIgJBHk0EQEGxBdEYIEEeEg4QAjIAFOgyADAVdiGWEwBTCgByDSEDIHdQYANBH08NA4UlB10AEP9BKjAhAQsZAgJGAAUbADAVdiLQBQDuIhAAXUIAwycQsYgjULEFSxshaSJhf2ohAUEAHx8wAyAF9z0A5xRA8JnAAOwKMGoiAG8SEwEYBjAiA0cJDjABIQPgCgJAKFJBH0Gkn1pDdCAFQbEFQbQOAGIDQR9B4JkNACK/A0EfERA1CgF8AwFmCQwEHUyw18EAawRAG4Q3AywAARwcMAJBvCMAEA+zCYBqQbDWwQAQMRwAgEEEajYCDEGGmRwdBR0AEQgdABCLHQAdBh0AEQwdABDLVwAAXhAKHQAREB0AH9MdAAMAIgowDEHbHQASCR0AJeTXHQARFh0AH/QdAAMAchAwDEH9HQASCh0AJYjYHQARGR0AJpjYdAARoB0AYSIBLQAEIRIqEAVuBADuAyAhA5UIUkEBIAMNzx0A1AQEPQEAugwAzx0hASA1BwLPHUEBQfChzx0iAxGvFSMBQc8dABEAQAsiADq1FQCFGwCpAQBkAHBBAEcL7wIBYwPwACABQQlPBEBBzf97IAFBEAQAAAsDMGsgAA9EABIAACsNAJNA8AAAQQtJGyIEakEMahAKIgJEETACQXjVKgBFAALTAgGQADAAIQGGAEECQXxq+BAgIgY/AFACIANqQbQCYHFBeGoiAjoDEGodARJrcQBgIABrIgJruSswQQNx1QAAPwIQBGo9UANyQQJy0ggAkg1BIgMgAxgAARIAAj4NACUAEgIlAACACAI4AAEgAFAAIAIQEowAA58CMAEgAxcAEAEZAAAUCQBiAwAvACEiAKhfAB4BUHhxIgIgIg8gTQ0wAAFdABIEXQAAOQARBEEDcyAEayIEQQMUABACzwAYAnYAMAQQEoYBgQhqDwsgABAKXgOAC4cDAQN/IAC6ATAQIgO9TEACOgAQEQAgKAIXPxADPVEyciIDFQMApgEBsD5AACgCCPABAIEaAEksEAQwDjABRgRLAFEBQQEQTiIAIwUg5gAxaiAD0A4ADQAQCOIDEAH0DABjAF9BCHYhAj8ADx8CPwABAA8AQgxBEHaeAALEACNBcMIAAq0AUA9LDQALUQEBDwAgRQ3RCDECayI/IAFbAVAgAUEHcS0BAVAjARgAMEEISRoAB+IAEAImBw+jAA0P4gACAA8AAOQACaMAKHhqQFYRB6MAYQuZAwIEf97soEBqIgUkAEEBIQfzBzAtAASOAFAtAAUhCE4AIQAiXjcCZQMQBs0EELdoA/UBtKHAACAIG0ECQQMgCBsgBp0DEBHHGwM5AADZBhEBWEkPHgAAARkFIbSgtAMJGQUAWCUBIwAApwFgDBEBACEHvgIVCIEAELmBAB8DVgACAHsQ8AEFQQE6ABcgBUE0akG8ocAAEQMzBSAGqjFgBSAFQRdq9x1ABikCCDM4MCkCEKQnAM4ogCA6ADggBSAK/xowBSAJpSIBOgBBADcDGDoAEQiyMQAIAADZACEQH9sZIwhqyAABEAAwAyAFfl0DvAAAIQAH0jFABSgCNBkAUAAAIQcLWAPDOgAFIAAgBzoABCAFaBVVC4wDAgXsEhABEwAE0hISAdISANkREDwwLBsI1RJ0AEHEAGohBFYJANsNACQAABIPEEHYAzAFEAXrAwMzKAD3DgCoAFAAcg0BDIkIABIAQBAiAjZ+FgAMABAMRwJBGAJAAoYIA+0REAWKCUACAAEDCwcgCHabAQA1cRALHQAwQQ9H8QAwQQJJGAUAwwEAEgQD1BECCwAA1BEAGgAA1BERAn4WAEgAAFkAQAJBA0d1DlAAKAKsDVMXAdMBcMgNIABBzA3qAUFBEHRyMzAAkhCAdEGAgPwHcXIMAGB2QYD+A3HeDwF92wAfASOsDSABUQQQQEIDpQDzAq0gATUAGSABMwAdIAExAB9CiRIB/xFgIAFBIGokCQ6Q7PPBAEHJAEG4KhxAZAALyiMGAowBAYEeAXgHANwCEADABQCdBCABIc0pARoAEASoACAiBSg8EAH5AxAEIAABmQIADgYgAn82BQBdCRACGAAA818ARAAAMQhBSxsiAVUMgAhLGyEBAkAgCwcQAy4UEAHAAkEDIAU2sSAATAAwNgIQ0QAQA2wOQRALIAM3BVAQahBUIBYGACQxEUExIiAiAhEAEAD/HVEBGiAAIEoAAKQAAJ4OAAoAASYAgiECDAILQQALrFQwIAIQOxMgEIpAExABohcA8wAwBEECsQARAJkcIH9qdVkAtgAQBEMWECIkAACQACEERb4BIEEAmQQAIxAA3QoSBmwAEQNeAUQL1gIBNCUBOBgARgAhECfVAACpABCdKxAAJhcBDgARCnsAYANBkM4ASQ0BAUMBAPwFAH4DMABqIm7DAh8AgG4iAUHwsX9sGwcRBscbUEHkAG4ilEOgQY7qwQBqLwAAOywcwkF+aiAHQZx/bCAGaigACyIAMABBfA0McANB/8HXL0sTCgAtBQAhB0BB5ABIIQEgIQPsADAAQX4EBwCLAABoAgFLAABzACADQV0AHwFdAAIARwBBA0EKTkkBBz8AGwMoAAJgABh/IQBQMGo6AADFIgESABAgx0lAIABrEAwBEDBYAUDMAgEGWAESIIgKEAHXARAHtgAA1wdjBkEDdCIFqT0QB2AGBUIHQQNqIQNTAADMPAAoBhIF7wAAOwACUyIRRXoBEAQ7ABAGYipAIQVBAVcgIEEPuQsATgAAJQAgDQOHAnEDaiIEIANPTQQBeh8xpIjAJwuQIARBf0oEQCAEtg4DQwAAcQRBBCIFQRwXEAa4ESdBAXsCAW4SUAggACAGPwIQAP8CIQQgLQsQBOgDAHUBURBqKQIARAsQQcsXJUEIEAAhIAEKAABmCmAEakG0iMAkAFAIahAjRX0EAYsCkQ8LQcyIwABBMxoA8gNBgInAAEGQicAAEFgAC8UCAgOABSOAAfUDAgQFAFABALU0IBBxSQAApQIA7guAQSBxDQEgAKytH5BCP4ciBXwgBYXCAYBzQR92IAEQN+sAAS0AEwKTDAB5ASBB/2cI0EEPcSIEQTByIARB1wCMFzAKSRs/AwAAAgFcADAEdiK5FhAgjAAAYA0ggQEXGmEBQQFB4IxSBgFMACCAAVYKcABrECAMAQuKDgBBCAAZAABlABcAZQAXN2QAAIINAJ0PAGQAEABkAACBTD5qIgBkAAFLAAJkAEACaxAgewQhgAFFAQE0AFFB0IzAAGQXAKYABQ4AJMACxwYRMMZHIEEnXRlwIABCkM4AVEABIiEI0QMQBRWHAD0CMkF8ah8Az4AiCELwsX9+IAB8p9IDCj8EQX7SAwwQA9IDQAMgAELSA1BWIAghAOMCgCAIpyIEQeMAlgIQA40DALYHMAlqahgAB3AAHwRaAAgAzwMSBM8DCUIAGwQoAAA7AxADzwMGIQARMM8DAKgCBJsHABoAAGUBgicgA2sQICAF1wNAuwIBA9cDI4ABMAUARQILjgIUA44CMS0AAAkPAY4CIAKt2xgQQeEdAn8CAR4ABX8CIQRqGgIBfwIQAxoCEQN/AhQDGwIPfwIZFAQbAgZ/Ag9lAAYfN2QAMQBPBA9/AgMJDgAfvD0BGSsvAT0BKP8DPgEBHwAP2QAJDz4Bvh+3PgEZABwABz4BBzkBARoAD9QACQ85Ab4Q2TkBUCABQagBGgcQQfVNAjABILgCYgkADAAwQbQBhhKQIgNBEEYEQEEIJA5hQYGAAnEbNxMhEHFQCiBBCFMHYUEISRsgAxYAECK0ADAbIQR5BBACeAFRAS0AtQEWCQILAKAiAkEddEEddUEAqggTAhoAMEHoAIoAAHwFAgIAAJwJoGsOAwIBAwALQQQvChFFnDIgQQYMABAN5SIBOwAgQQZOERMbNSsAOgACAgDyASAEQX9qDhAGAAQBBAQEAgQBAJADBAtBAiECDAVUABACIxUwCCECVgASEGEKAekEYStB7IHAAAcaBAYBIiECvQAAnjNQACACOgCYEDABOgCiBwM0ABPcNAAQolsBA5QCD5YHBgSPBxWthgIPEAcJAH8CDxEHLwAtAQ9lAAgPdQc+AAMBBXECCg4AMKUCAV89AKMMAPwLECIDGwGkCQAdI0AAEEggFgAAKiUAmwMhIAQWYwA/K1B9ajoAAmkVMDsBAHgCALwCQAFqIgR+CTABQf3SCnABcUGht8EAtQFRIgNBgQJJNRICgwFAA0EcTWEAAMEAQHRqQQzkDDABLwFEAABRABECQQcQIcgCIX9qDAAgQYAkDiFBAAoWJP99FQAR/go9AC8HcEEHdkGAAmpGBHMBQZ4CQbioxikAHQBDC0HQuYoAUQFBHUsNPAICewARyJ0SALIFA3wAYARB//cBS2kZQ0EeQchGABKunAgAwAAZIKwDAE0CELjSRxEQjg0CpAJQIgZBEEadAxQBTQNQB0IEIQinJABCAAYCAEEgAUG1MgAAYgOABgUBAAMFCQKSELAQcSIBRSAHRXINBbUp8BEMCAtCBEIDIAVBBHYgB0EAR3EiARshCCAEIAYgARshA+dGAzUAMA0BQhokEAdqFAA6ACEGCyYAAB4AMBshAxwAUAwFC0IBPQDUIQMgAQ0EDAMLAAtCAxEAEkWPCwNLAyLMhUsDATEAMAYhAzgB8AQCrSADrX4gCH4iCELx/////wBU9gHCACAIQgd8QgOIPgIEEwsELhIzAyQAcTNwAC0ACA0AGk0CMAQhBQcAMAAiBP8AAS8SIEEBZgwDMRL5AvKhwAAgBRtBAkEBIAUbIARBvRESGu0PEAAbEAA3EQC6BBcFQwAQ80MAAJMUCzYAADQAAM4CEAMCEUcXIANB9BFCAyAEKfQRMwMgA/QRYAQpAgghBgcAMBAhByIAEi30ETADIAf0EVADIAY3A25REQRBDBEYOgAB9BEATgQBkA8EogAA9wAAUWciQdSbADMDKALaESALOnojAJsAQARBAWqxDCMDQdoRE4cADwTEJASdAyEiBrMDAAoAIgNrHRAB2gAA/h4wAn8gCwQiIgVBYG8GQQF0IgOOMgQQBmUNFEE1EDAEIAY1EBEETAADNRAQBFgNEBBEAgD5DRAQNRAAlREwIQUgBw4BgQAAEQAGNRAQBUoAAKcAADYWAAoAASYAECGMMgA1EBADyBAnIAO6DRAD9SwA2A8hbxouAACOAwHaAQBsFkAgBEEg2godiwkBAHsAAGcAAAgAEQU5AAAKAB0DDgECZAUgIgagJBAANQ4ADgEAQCwdBg4BAEMRCA4BHwUOAQ8jVSAHAQAYDwMYAQEOAQAbBA8NAQowIANFkAAPCwEeXUEAC/wBRhogIAKaABAMXAUgAkAyNgJpEhJBQjYAPRkgIQAPACCABDYGADgGQD9xQYABNREODgAvDHZJNgchDAN7DAEdAAFJABBBIgQAEwAGJgABDgBABnZBwA4ABSgAEAI0AQAaABM/KAARDw4AQBJ2QfAOAA1tAAWMAAQRAEANQQQL5RZQIAEQHyC3D0MkAAuqCwIg4NH9GAANAuACQEHo1QBBBBCXASIBBNMH8AMAQaAbEHgiAkGgG2pBAEHANhCCEiBCACyxcQFBADoAmFIBEAQSAAEkVgEKABUYCgAVIAoAFSgKABUwCgAQODIKMODRAKsBUAFBmdIAaACSzQMQeBpBgIACphAAKAkAcwFREHMiBEXzK0AAOgAkzgAAzwEBshBQICAAIARnAgEOAADYGBADAQQAGhtQQoCAhID6HQBxAAAOAkBCgIACDAABeAAB2QcD9wAQkcUmAnYAAwsAEwQLABr5KgIPJQIPAJIiDyUCMi8DQSUCEx8DJQI4GAMnAhCR2QgG+wAAJQMAxwscIGsdTJvWwQC2Ihobax0QqiMAEQSwAAj3HAJrHR/AHQADAAUGNwxBxB0AEcgdAFAiAC0ABK4AAr0cAdEZAG8QAR8HJAMNvRwGjwAAkwEQKLo9APcKEgApBwAJSQNGBiERAPwGGgC9HBgBvRwBZABWQQBHC/0OAhEBGABRyYq5ogRwAgBDBBEBHgIAXAEBBhcEFQAWBA4AAhYIEwAOAAD0F4ctAARB/wFzQQB8AIkfMQdzIrAAIQVzfAAHHgAAGwETdh4AHwYeAAofBx4ABFBBf3MiANUXNQBBCNUXABoAQEGA/gNxHSIYdtUXAOEDAbsAEQEIAVEL8gEBARwHMGsgBXQBMgRBA6YFAEAaEALwBTEQHg/NFAICADEgAyC7X0ACIAFPIgwwIAJqZQIArwkAmgsACiAwIAVxDgsBLwMA/woQBgwAADwgEAYrABYEKwARAisAEAMfADAEIAJPIQFWABwFVgAQDwUGUQFB3MnBdwoAfAAkQewNAABQChT8DQBjBiABQYzKDQAANAAUnA0AADQAE6wNACLnAS0FAukVAdYAAAEcECLMKwE8BwDnCwDKACAiASEHAJUPYAF0IgQgAW0AEEtkGAB1ABEECgAA6wkRA6++IQF03AowAnQhehgA0wcAYxURQboXAEMAMAJ0NqkqAGsAANYEAKECAXsEERCdAAA2DAA8BxFTSxUAmAMQA/UCABYDAPwCAUoIAJYBAE4AAKYAAFEAMHY2AtoAIUEg+AQCPAcYATwHEezdATEAQdSbCwDXASFB0AsAIBAOHgMQGAsAABYAMSgCFBIAoygCOBAOIABBQGsZACBBPCMAARwAIUHQbwIBFgARzAsAMBAOCzoBFEH5CwJdVxMA3gsAdgsAqwAR7A4AAAwAEgFIABGALwAEHwARhA4AAAwAAx8AIKACEQAAZwBCKAKcAhQAF6wUABOoFAAXwBQAELwUAADLAgHpHRAAFh8ABR4glAdBAlBqIgI6AEUGADkEABYAQARqLwHEAw8kHw4QAowOAGMDHwFCHh0CQB4CwwEPPwAgAA8ALgxBJB8HgR4SD4EeQfoBAQW6BgG8BgE5AlEiBkGBgDMbAdMPMAQgBAcHMGoiBQcAMBBvIQpIMICAfCoWIYGAUFgwBSAH4AZgaiAEEG8h5y9wgIACIAMgAwgAsEsbIgVqIgcgBEkNgx4BUDcSBqlGAAo3QiACIAXuBzAIaiJwAADrHSJqIn8AMCAENqECAIQGMAVrNlIFAC8AIGpB/AMBWwAQNgsrwEHEq8EAQTVB/KvBAFYNAoAAIEGkDwAQXg8AQCAHQbQNAEBdAAsgvQABDQBVXgAL2AFUHA/HAy0gIAEbDCoBT7sDAW0DAQ01D7gDBhAFmgoPuAMcIQF2FwEPuAMIJfQBlAYfAqcHCRDoSgcfEKcHChD4IwASCm0HB4oHAqcHJoLXgSQCHQAvIgCKB2cTy/YABCQeANABAskBALUBMGsgAngGEAH3IRACyL4AyQ5AAXQiARgBECCoAhEBbRAAuAwAxgEAIx8Aaw4CxgESA8YBEQNMAQPGARMDxgEQA5oDESD9HRBT+QwAcgAAxRMAxgEQAgcABcYBAcwFAJQAAdABAEIAA8MBAc0EIgIgYAoBwwEfyc0AZwLLAB9RywA2ENRGBkEjAEEwjgIAGRMCSAAAJwMBQwACagIQDZQAAxkCAa4CAFcCAL8LACACICACXDAAawAWIFIwQPnBADYbAAEKAgBtMBEAeAMgECPRAAhbAB8LWwA3AHcCARcaEKrWACACQNsCAOUJEEjdOwACAALhAgB0NFAgAQ0BQZcgALMLAAQeEQIVABBFUREgIQLcCwDSBSCXAcEmAr0OAPAIUCABEIsB+S8AEgAGIQAABQMAdQEiBEERAwB3AYAEQQEhAUEBC7sAAB0LABQAAIMBEgDOAAATAADWATAAC8jqBEAgA0EEugYAIxISISXFAWAiQAAiB0EiEQEUBBAEXgIwKAII1ikQBiYVEAbvBAEgABAE7QAAvQASAGogEAAfAAEsEgCTAgDhAAA1AAGJAgFOABADGQBQCCAHQf+gAwAWFAEkBhAI7xEQADCvgXRB4P8BcXMiPxABmwAAKhQANwAAS0MgBzu9DyIGDZsiQARqIAURABapdgEAbQEAbwEQBGcEMQBIDQIxECA/ABAi4x4AiQIgAQyWEgDWAKEDDQEgAQ0DCyACbC0BbBAApQIRi1EOEAKNAQJTAQAdADABIAJ2ARIDdQEAFgAAjRchQQH2AAFMDi9BAHUBDxCjqwACqQABoQAQBPsfAKQAALUAAKYADyQCShACDAAAuwACJAJQDAELQQAJAAq4ACQLjKUAA6MAAiUABKkAEH+UAASpABJFGhcgEJcfAAAZAAWtAAkZAAahABALogAKhgARAsYYAJsAAqcAC44AIbUB6gQEAgAARgbiAEF+ag4PAwEEAQEBBQEBABAA9gAAwAYQhZ0GFAfaAxEowAYzDwsAHgAQjB4AHAMeAAIcAB+PHAAIEJIcAADbBw8cAAAQlhwAGgUcAC8LrLcAAQB8FkYBAwQFrgAQiy4HDVgABK4AEI8eABwJHgACHAAQmBwAHwMcAAMQmxwADQQBAhwAEKIcABoOHAAiC32OBVBAaiIFJG8JEAEkBRAF8AcwCCAF3gIwFCAFnwEwECAFGQUB6QVhBUE8akEICgAgQgIjBVEFQaSgwCMFMAVBA4ZZYAUgBUEwaioFAAoAURBqNgI4CgAQCLgVICAFtBViBBB0AAt0PhoEdAkBDAZQIAEQPA3JBwGnAAMSCEIgAkEcSgMAhggT+JAFAKEFANIFIMSMfgAAVRYANwkgECMMDDAoAgRKABUgGQkCCQBAQQELk00HUUGIgMIABQABfwYApAQArgEiQdC5awGRBlFB1IPCAAUAARIAIWoigACCAEECSw0CQdgXAFEiAUF/SnsDATsAIEKBUgk1NwMAIAAgAEEOBgEPAABWARAAxEEADAAA4wIAJwSASw0AAAsAC2f/AHABIABPBEAgvQMRAzYPES2yDgBQAyBqIUcMEQFkBRBB4iUwDQALYQMBcDsyAUF/IAAAhAUBOgARAuUUE2pAAAUyADILC2zwAREwSQgA4AcQNg0XAZoAADIaA+IBFQPsARAD4gFyDCADQYiKwGQBABgAESTRCyAgaoYBEAMmAgCoFwCYBTE2AiAqCCAgAt8BD20AJi+wmG0ABwFmAAFwAA9tADQf3NoACA9tAD4U5KsCABgAD20AFBVvbQAQAmIUAm0AAZQLANsBBG0AAbkIAgoAAHpAABgDIuCibQAQAhgAESTACCAgam0AEALTAwKSQAB0ABEgOANQQYzpwQBwABJZcAAClgMAaQABGQoRBPQIPyABQeUlIBAgeQAfJFoANi3YoVoAHFZaAA9XADMSW1cACOgBEgzoAQDDARMkKgoQA4kEQhQgA0EqCjAQIAMHBRAsygEhQShgAQAKAAD9BBEoTwsC1wERa3IEA/YEAyUGMAICACEgAK8FQbrYwQC3CwEIBQKvBQTLBRDCHAANPQYCHAAQxhwAC2A3QAtDAQN6CAAuBAAgBDAtAADbCQAHABAFegshAEFaBANoBAMvBADVBAAcCSAFa5UcMgMLShkIUICAxABHkggAuAAQGLQEBGoAEBCEG0ABGgsgCggQQZEAASIAEAIxAQQkAAGOACILR1cBAs8MQyADQRTcBRMD3AUSEFMBAFMDEAH7LBADcgECJAMQGKsFECCsckF0AAtJJzsTILkRAXIuAkkAIQAoNQ8Awg9AIAAQDpkI4BAOCw8LQZj/wQBBGxCWxRcQswwAIc8ADQARQPoIAIYBEAKDBQAuDAC+BQASCwBXAQByGhURCwAQBFAAArQSAGMAEAQwEhE7QQAB5AAQALVDACMNAAwAAUoGAI0FMSAAQcRMIBAaqgEBEAASCBAAIAtDPAAGsQEgIQJeABIYwAABlAACRAAiQdhwCCICEe4BIEHdEAARCxAAD0QAFhCwHwIRBDQAAUQAELQQABEGEAAgCzhEAAAwAA/BAB0QMzkAAHwLQQAhAwPWFQN6BiEBQVICADgRAMsQAlkCcgALCyAAC0j8BwMqFwG0AAGEDhEISQoBCQJTQStBvPnIERABFgUQCG8CANoDIQEg6gRCARB3AH0AD7EAHCAtADcCMEF8TbQAAG8AIwQhJgtwAEF9SUECdEULMAANAZEJMwALK2cMYkEBEC8iAXIHEHxdBwOeMxABkCSCEHgaCyABCzTbAgNtERACwAIQDHsAAL0AMQJBmGwGFQTFCIUAIAIQcAALKjUAAAwBAKIEBKwAACMAQAEgACmnBGsAEFoACzcrACDo30gAAKgzAWMAMQFBpIQEAB0EBGMAEAFjABs+OAAPYwAEADYCUAAiAEEUGgAQGlABIAQadwAQKWUBCeIBAN8BD9gBAUAlAQF+OADwAgAiAKwiAiACQj+HIgJ8IAKFoAgEgCslCy2PABAA/gEwQcjBrAAAJzAQDr0AMQBBuBEAAFgBLXUALgAgjOUdAAAuABIxLgAg2OQRAAMuABsuLgAghO4dAAAuABHtGgFAAEGU7RIAAy8AESV+AjAALQAJApIgAUG2oMAAQQU1AiBBuw0AYQQQGgsmAOEJBGACBBcKI0UP+QkwATcDXQoTICsCAAABASoCA0oEAAsAAIMEIQscYwFAGEHJpmYAFiCyAwCBAxUUMAAAagEAqwJCDgsLGaAAAJQDAakBAYMEcCQRAQALFgAlCjEoAgjWAAAKAADWAAFGAAgsABAMLAATEBAAARwAANEACREAEggRAAUPAJAgARAbCwsAIAGIAACFAADKACAxAHUTAL4BwhEAQeeHwABBEUH4h74iEQyLAADsBUEQGAsORQCBABoDQAwACwA8ABA1OAEBPAAADgAAZwDxAQEgAhAfCw4AQbOiwABBLCBHALELACAAIwBqJAAjAPgAQiABQdxpAZAiAEEGIAAbEQNABgRDACcQJgwAF1YMABdXDAAxKwsJSgBSEAIACwgKABEvEwABKwZwCwcAIAAQA6YA8AtCyoOJi6GeycWCfwsMAEKlyKnF4svN0EMLBBMgMQMAAQQAUAuA/gEIhWXwMcAAC7gkc3VwcGxpZWQgYnVmZmVyIGlzIHRvbyBzbWFsbCB0byBob2xkIHRoZSBpbWFnZQAAbHEQAFwAAACsAQByAgUQAPIaswEAAB4AAABOZXh0IGZyYW1lIGNhbGxlZCB3aGVuIGFscmVhZHkgYXRJAKcgZW5kAFAAEAArRABchAEAACFEAPcJbiBuZXZlciBiZSBpbml0aWFsAJQAEAAfOABXgwEAACQQADlJAgAgAFcoAgAAFBAAV0ICAAAyEAAgrwJ2GAYQAFewAgAAOBAAW7sCAAAsEAAXRxAAV8ACAAAREADyNMQCAAAcAAAAaW52YWxpZCBmaWx0ZXIgbWV0aG9kICgAXAEQABcAAABLfhAAAQAAAG5vdCBlbm91Z2ggZGF0YSBmb3ImARAAFAH2BRAAGQAAAGZpbGUgdHJ1bmNhdGVkbADwF+8BAAAYAAAAQWRhbTcgaW50ZXJsYWNlZCByb3dzIGFyZSBzaG9yfwBBdGhhbsoBAuoBFi5EAFf1AQAAEsAAG/YQAFf+AQAAOxAAVwACAAAzEAAbBEABABAAFz4QADkVAgCgAQAQAAgwARsaoAHiZgEAAAkAAABFbmQgb2YLAfUUIGhhcyBiZWVuIHJlYWNoZWRJREFUIGNodW5rIG1pc3NpbmdAABtuUAAilwKcAhNJkAHyF2NvbG9yL2RlcHRoIGNvbWJpbmF0aW9uIGluIGhlYWRlcjogL+wCnAIiFwOkAep1bmV4cGVjdGVkIEVPRg4AMCBhZmEBAagABHQAIssAmAGwkAMQAFcAAACpAACABAUQABu0EADxRbgAAAAlAAAAQzpcVXNlcnNcZWxpYXNcLmNhcmdvXHJlZ2lzdHJ5XHNyY1xnaXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjNcYWRsZXIzMi0xLjIuMC4A8QtsaWIucnNjYXBhY2l0eSBvdmVyZmxvdwgEEKQCUBkCAAAFLAHwGWlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy5yc7gEEABLAAAAWgEAABPAAQDkAQMEADEWAADMAgDsAAG6AsBtYXR0aW5nIHRyYWntA3JwbGVtZW50YgHxAnJldHVybmVkIGFuIGVycm9yTAAAAQAAZAEA6AIxoAQQTAAxQQIAoAAOmAD0J2ZtdC5ycy9ydXN0Yy9jYjc1YWQ1ZGIwMjc4M2U4YjAyMjJmZWUzNjNjNWY2M2Y3ZTJjZjViL0gARGNvcmVHAPEAL21vZC5yc++/vQAAKAUQxAJASAUQAPwCCJgAERrMA3BkZXggb3V0kgJxYm91bmRzOk4DMGxlbjUFQSBidXQQAAIpAPIJaXMgAABsBRAAEAAAAHwFEAAiAAAAcmFu+gQDJQAETwACGACQZm9yIHNsaWNlEwDxCWxlbmd0aCBbLi4uXQAEBhAACwAAAA4QEHABIgR0lAKx7A8QAA4AAAD6DxCMASL+D3AABCAABDgA8AYPBhAAJgAAADUGEAAIAAAAPQYQAAYgAAMoADRieXS4AAC5AACPBGJhIGNoYXLpAFBhcnk7IMwBsHMgaW5zaWRlICAoMwAwcyApqwBQYABMBhATBNAALi4AAIYGEAAbAAAAvAQAhANiMHgAAHQGVAEKCAFTc3RhcnR3AA+eAQLxTW51bS5ycwABAwUFBgYDBwYICAkRChwLGQwUDRAODQ8EEAMSEhMJFgEXBRgCGQMaBxwCHQEfFiADKwMsAi0LLgEwAzECMgGnAqkCqgSrCPoC+wX9BP4D/wkACgwQbAMiCgBkAvE/rXh5i42iMFdYi4yQHB3dDg9LTPv8Li8/XF1fteKEjY6RkqmxurvFxsnK3uTl/wAEERIpMTQ3Ojs9SUpdhI6SqbG0urvGys7P5OUABA0OHgD1//Y6O0VGSUpeZGWEkZudyc7PDREpRUlXZGWNkam0urvFyd/k5fANEUVJZGWAhLK8vr/V1/Dxg4WLpKa+v8XHzs/a20iYvc3Gzs9JTk9XWV5fiY6Psba3v8HGx9cRFhdbXPb3/v+ADW1x3t8ODx9ubxwdX31+rq+7vPoWFx4fRkdOT1haXF5+f7XF1NXc8PH1cnOPdHWWL18mLi+nr7e/x8/X35pAl5gwjx/Awc7/Tk9aWwcIDxAnL+7vbm83PT9CRZCR/v9TZ3XIydDR2Nnn/v8AIF8igt8EgkQIGwQGEYGsDoCrNSgLgOADGQgBBC8ENAQHAwEHBgcRClAPEgdVBwMEHAoJAwgDBwMCAwMDDAQFAwsGAQ4VBToDEQcGBRAHVwcCBxUNUARDAy0DAQQRBg8MOgQdJV8gbQRqJYDIBYKwAxoGgv0DWQcVCxcJFAwUDGoGCgYaBlkHKwVGCiwEDAQBAzELLAQaBgsDgKwGCgYhP0wELQN0CDwDDwM8BzgIKwWC/xEYCC8RLQMgECEPgIwEgpcZCxWIlAUvBTsHAg4YCYCzLXQMgNYaDAWA/wWA3wzuDQOEjQM3CYFcFIC4CIDLKjgDCgY4CEYIDAZ0Cx4DWgRZCYCDGBwKFglMBICKBqukDBcEMaEEgdomBwwFBYClEYFtEHgoKgZMBICNBIC+AxsDDw1oAiEaAJpP9WUAAAYBAQMBBAIICAkCCgULAg4EEAERAhIFExEUARUCFwIZDRwFHQgkAWoDawK8AtEC1AzVCdYC1wLaAeAF4QLoAu4g8AT4AvkC+gL7AQwnOz5OT4+enp8GBwk2PT5W89DRBBQYNjdWV3+qrq+9NeASh4mOnpACAI8C8FFOT2RlXLa3GxwHCAoLFBc2OTqoqdjZCTeQkagHCjs+ZmmPkm9f7u9aYpqbJyhVnaCho6SnqK26vMQGCwwVHTo/RVGmp8zNoAcZGiIlPj/FxgQgIyUmKDM4OkhKTFBTVVZ1AvD/BmBjZWZrc3h9f4qkqq+wwNCur3nMbm+TXiJ7BQMELQNmAwEvLoCCHQMxDxwEJAkeBSsFRAQOKoCqBiQEJAQoCDQLAYCQgTcJFgoIgJg5A2MICTAWBSEDGwUBQDgESwUvBAoHCQdAICcEDAk2AzoFGgcEDAdQSTczDTMHLggKgSZSTigIKlYcFBcJTgQeD0MOGQcKBkgIJwl1Cz9BKgY7BQoGUQYBBRADBYCLYh5ICAqApl4iRQsKBg0TOQcKNiwEEIDAPGRTDEgJCkZFG0gIUx05gQdGCh0DR0k3Aw4ICgY5BwqBNhmAtwEPMg2Dm2Z1C4DEiryEL4/RgkehuYI5ByoEAmAmCkYKKAUTgrBbZUsEOQcRQOsB+5WX+AiE1ioJoveBHzEDEQQIgYyJBGsFDQMJBxCTYID2CnMIbhdGgJoUDFcJGYCHgUcDhUIPFYVQK4DVLQMaBAKBcDoFAYUAgNcpTAQKBAKDEURMPYDCPAYBBFUFGzQCgQ4sBGQMVgqArjgdDSwECQcCDgaAmoPYCA0DDQN0DFkHDBQMBDgICgYoCCJOgVQMFQMDBQcJGQcHCQMNBymAyyUKhAZsaYQF8AJ1bmljb2RlL3ByaW50YWJsZY4FIkAMhAagVgwQAA0AAABzbLIGUmluZGV40gUQc+QLECAOBzFlbmQNAPJ4AAADAACDBCAAkQVgAF0ToAASF6AeDCDgHu8sICsqMKArb6ZgLAKo4Cwe++AtAP6gNZ7/4DX9AWE2AQqhNiQNYTerDuE4LxghOTAcYUbzHqFK8GphTk9voU6dvCFPZdHhTwDaIVAA4OFRMOFhU+zioVTQ6OFUIAAuVfABv1XEDxAAKAAAAFIAlArwNABwAAcALQEBAQIBAgEBSAswFRABZQcCBgICAQQjAR4bWws6CQkBGAQBCQEDAQUrA3cPASA3AQEBBAgEAQMHCgIdATo9APALBAgBCQEKAhoBAgI5AQQCBAICAwMBHgIDAQsQAKAFAQIEARQCFgYBLgDxEQIBBAgBBwMKAh4BOwEBAQwBCQEoAQMBOQMFAwEEBwILVAAAjwBAAwEFAhAARhwCOQJkAPANHQFIAQQBAgMBAQgBUQECBwwIYgECCQsGSgIbAQEA8Dg3DgEFAQIFCwEkCQFmBAEGAQICAhkCBAMQBA0BAgIGAQ8BAAMAAx0DHQIeAkACAQcIAQILCQEtA3cCIgF2AwQCCQEGA9sCAqoAEAdQAMACCAYKAgEwET8EMAemHMEoCQwCIAQCAgEDOAGHALADOggCApgDAQ0BB28A8A4DAsY6AQUAAcMhAAONAWAgAAZpAgAEAQogAlACAPAE8AQBGQIFAZcCGhINASYIGQsuAzABMQHwDicBQwYCAgICDAEIAS8BMwEBAwICBQIBASoCCAHuNQHwLgEAAQAQEBAAAgAB4gGVBQADAQIFBCgDBAGlAgAEAAKZC7ABNg84AzEEAgJFAyQFAQg+AQwCNAkKBAIBXwNBAXEGAaABAwgVTgGgAQEWAQ4HAwXDCMMAEBdKARAGmwEAeQHA6wECBAYCAQIbAlUIEgAQagYB8RAGAQFlAwIEAQUACQEC9QEKAgEBBAGQBAICBAEgCigGngHwAgYCAy4NAQIABwEGAQFSFgIHTgAwegYDVgBABwEBSGsAwAEAAgAFOwcAAT8EUQwA8Q4BAQMEBQgIAgceBJQDADcEMggBDgEWBQEPAAcBEUIA0AUABwAEAAdtBwBggPCzAgTEAgCECwAIAAQQAAA4DACMAx9sugMFAwgAEF9WDrAucnNiZWdpbiA8PZoDICAoCQAhKSCeD0BzbGljtAtTYCBpcyCVCgH7CRBzCgAwYHh8VgoxAAA0jQHxBgAAOiBmYWxzZXRydWUgICAgAGQQEDwLAFQPNSEAABAAACQOAPgJDaAA8wFmbXQvYnVpbGRlcnMucnOUMABIWgAAAIwMBTAAAKAA8ARlL21lbWNoci5ycyB7ICwgIHsKpAsiDACIDBMbzAlxHQAAACwKAMALABgAAAQAIh4AEBAAZACxIH0oKAoKAAAYERA0AEAFCAAARAEEEAAi/gcwAA2EAAC0AMBtb2QucnNhdHRlbXD8DSR0b/oEAKEAMCB1cBIA8QJtYXhpbXVtIHVzaXplAHgREIwAZo0REAArAPQPY3NvdXJjZTkAA+4LcSgpIGRvZXOBC6RtYXRjaCBkZXN0ng4KKwAA0gIPAQBpgABB+qTAAAszwgMPAQAHABVQCAEAEAQBANEAQbilwAAL2JABLBMQsQFQggAAABliAjQAAAAUAAANAgAIAAQQAABRDABdAgQQABtqIAAbdCAAG3kgABN9EAAN2QHgc3RyL2xvc3N5LnJzRXKUDgEBAPD////wljAHdyxhDu66UQmZGcRtB4/0anA1pWPpo5VknjKI2w6kuNx5HunV4IjZ0pcrTLYJvXyxfgctuOeRHb+QZBC3HfIgsGpIcbnz3kG+hH3U2hrr5N1tUbXU9MeF04NWmGwTwKhrZHr5Yv3syWWKT1wBFNlsBmNjPQ/69Q0IjcggbjteEGlM5EFg1XJxZ6LR5AM8R9QES/2FDdJrtQql+qi1NWyYskLWybvbQPm8rONs2DJ1XN9Fzw3W3Fk90ausMNkmOgDeUYBR18gWYdC/tfS0ISPEs1aZlbrPD6W9uJ64AigIiAVfstkMxiTpC7GHfG8vEUxoWKsdYcE9LWa2kEHcdgZx2wG8INKYKhDV74mFsXEftbYGpeS/nzPUuOiiyQd4NPkAD46oCZYYmA7huw1qfy09bQiXbGSRAVxj5vRRa2tiYWwc2DBlhU4AYvLtlQZse6UBG8H0CIJXxA/1xtmwZVDptxLquL6LfIi5/N8d3WJJLdoV83zTjGVM1PtYYbJNzlG1OnQAvKPiMLvUQaXfSteV2D1txNGk+/TW02rpaUP82W40RohnrdC4YNpzLQRE5R0DM19MCqrJfA3dPHEFUKpBAicQEAu+hiAMySW1aFezhW8gCdRmuZ/kYc4O+d5emMnZKSKY0LC0qNfHFz2zWYENtC47XL23rWy6wCCDuO22s7+aDOK2A5rSsXQ5R9Xqr3fSnRUm2wSDFtxzEgtj44Q7ZJQ+am0NqFpqegvPDuSd/wmTJ64ACrGeB31Ekw/w0qMIh2jyAR7+wgZpXVdi98tnZYBxNmwZ5wZrbnYb1P7gK9OJWnraEMxK3Wdv37n5+e++jkO+txfVjrBg6KPW1n6T0aHEwtg4UvLfT/Fnu9FnV7ym3Qa1P0s2skjaKw3YTBsKr/ZKAzZgegRBw+9g31XfZ6jvjm4xeb5pRoyzYcsag2a8oNJvJTbiaFKVdwzMA0cLu7kWAiIvJgVVvju6xSgLvbKSWrQrBGqzXKf/18Ixz9C1i57ZLB2u3luwwmSbJvJj7JyjanUKk20CqQYJnD82DuuFZwdyE1cABYJKv5UUerjiriuxezgbtgybjtKSDb7V5bfv3Hwh39sL1NLThkLi1PH4s91oboPaH80WvoFbJrn24Xewb3dHtxjmWgiIcGoP/8o7BmZcCwER/55lj2muYvjT/2thRc9sFnjiCqDu0g3XVIMETsKzAzlhJmen9xZg0E1HaUnbd24+SmrRrtxa1tlmC99A8DvYN1OuvKnFnrvef8+yR+n/tTAc8r29isK6yjCTs1Omo7QkBTbQupMG180pV95Uv2fZIy56ZrO4SmHEAhtoXZQrbyo3vgu0oY4MwxvfBVqN7wItAATw////8EExGxmCYjYyw1MtKwTFbGRF9Hd9hqdaVseWQU8IitnISbvC0Yro7/rL2fTjDE+1rE1+rrWOLYOezxyYh1ESwkoQI9lT03D0eJJB72FV164uFOa1N9e1mByWhIMFWZgbghipAJvb+i2wmss2qV1dd+YcbGz/3z9B1J4OWs2iJISV4xWfjCBGsqdhd6m+puHo8efQ8+gkg97DZbLF2qquXV3rn0ZEKMxrb2n9cHauazE571oqICwJBwttOBwS8zZG37IHXcZxVHDtMGVr9PfzKru2wjGidZEciTSgB5D7vJ8Xuo2EDnneqSU477I8/3nzc75I6Gp9G8VBPCreWAVPefBEfmLphy1PwsYcVNsBihWUQLsOjYPoI6bC2Ti/DcWgOEz0uyGPp5YKzpaNEwkAzFxIMddFi2L6bspT4XdUXbu6FWygo9Y/jYiXDpaRUJjX3hGpzMfS+uHsk8v69VzXYnId5nlr3rVUQJ+ET1lYEg4WGSMVD9pwOCSbQSM9p2v9ZeZa5nwlCctXZDjQTqOukQHin4oYIcynM2D9vCqv4SSt7tA/tC2DEp9ssgmGqyRIyeoVU9ApRn77aHdl4vZ5Py+3SCQ2dBsJHTUqEgTyvFNLs41IUnDeZXkx735g/vPm57/C/f58kdDVPaDLzPo2ioO7B5GaeFS8sTllp6hLmIM7CqmYIsn6tQmIy64QT13vXw5s9EbNP9ltjA7CdEMSWvMCI0HqwXBswYBBd9hH1zaXBuYtjsW1AKWEhBu8GopBcVu7WmiY6HdD2dlsWh5PLRVffjYMnC0bJ90cAD4SAJi5UzGDoJBirovRU7WSFsX03Vf078SUp8Lv1ZbZ9um8B66ojRy3a94xnCrvKoXteWvKrEhw028bXfguKkbh4TbeZqAHxX9jVOhUImXzTeXzsgKkwqkbZ5GEMCagnym4rsXk+Z/e/TrM89Z7/ejPvGupgP1aspk+CZ+yfziEq7AkHCzxFQc1MkYqHnN3MQe04XBI9dBrUTaDRnp3sl1jTtf6yw/m4dLMtcz5jYTX4EoSlq8LI422yHCgnYlBu4RGXSMDB2w4GsQ/FTGFDg4oQphPZwOpVH7A+nlVgctiTB/FOIFe9COYnacOs9yWFaobAFTlWjFP/JliYtfYU3nOF0/hSVZ++lCVLdd71BzMYhOKjS1Su5Y0kei7H9DZoAbs835ercJlR26RSGwvoFN16DYSOqkHCSNqVCQIK2U/EeR5p5alSLyPZhuRpCcqir3gvMvyoY3Q62Le/cAj7+bZveG8FPzQpw0/g4omfrKRP7kk0HD4FctpO0bmQnp3/Vu1a2Xc9Fp+xTcJU+52OEj3sa4JuPCfEqEzzD+Kcv0kkwAE8P////A3asIBbtSEA1m+RgLcqAkH68LLBrJ8jQSFFk8FuFETDo870Q/WhZcN4e9VDGT5GglTk9gICi2eCj1HXAtwoyYcR8nkHR53oh8pHWAerAsvG5th7RrC36sY9bVpGcjyNRL/mPcTpiaxEZFMcxAUWjwVIzD+FHqOuBZN5HoX4EZNONcsjzmOksk7ufgLOjzuRD8LhIY+UjrAPGVQAj1YF142b32cNzbD2jUBqRg0hL9XMbPVlTDqa9My3QERM5DlaySnj6kl/jHvJ8lbLSZMTWIjeyegIiKZ5iAV8yQhKLR4Kh/euitGYPwpcQo+KPQccS3DdrMsmsj1Lq2iNy/AjZpw9+dYca5ZHnOZM9xyHCWTdytPUXZy8Rd0RZvVdXjciX5Ptkt/FggNfSFiz3ykdIB5kx5CeMqgBHr9ysZ7sC68bIdEfm3e+jhv6ZD6bmyGtWtb7HdqAlIxaDU482kIf69iPxVtY2arK2FRwelg1NemZeO9ZGS6AyJmjWngZyDL10gXoRVJTh9TS3l1kUr8Y95PywkcTpK3Wkyl3ZhNmJrERq/wBkf2TkBFwSSCREQyzUFzWA9AKuZJQh2Mi0NQaPFUZwIzVT68dVcJ1rdWjMD4U7uqOlLiFHxQ1X6+Ueg54lrfUyBbhu1mWbGHpFg0ketdA/spXFpFb15tL61fgBs14bdx9+Duz7Hi2aVz41yzPOZr2f7nMme45QUNeuQ4SibvDyDk7laeouxh9GDt5OIv6NOI7emKNqvrvVxp6vC4E/3H0tH8nmyX/qkGVf8sEBr6G3rY+0LEnvl1rlz4SOkA83+DwvImPYTwEVdG8ZRBCfSjK8v1+pWN983/T/ZgXXjZVze62A6J/No54z7bvPVx3oufs9/SIfXd5Us33NgMa9fvZqnWttjv1IGyLdUEpGLQM86g0Wpw5tNdGiTSEP5exSeUnMR+KtrGSUAYx8xWV8L7PJXDooLTwZXoEcCor03Ln8WPysZ7ycjxEQvJdAdEzENths0a08DPLbkCzkCWr5F3/G2QLkIrkhko6ZOcPqaWq1Rkl/LqIpXFgOCU+Me8n8+tfp6WEzicoXn6nSRvtZgTBXeZSrsxm33R85owNYmNB19LjF7hDY5pi8+P7J2Aitv3QouCSQSJtSPGiIhkmoO/DliC5rAegNHa3IFUzJOEY6ZRhToYF4cNctWGoNDiqZe6IKjOBGaq+W6kq3x4665LEimvEqxvrSXGrawYgfGnL+szpnZVdaRBP7elxCn4oPNDOqGq/XyjnZe+otBzxLXnGQa0vqdAtonNgrcM282yO7EPs2IPSbFVZYuwaCLXu19IFboG9lO4MZyRubSK3ryD4By92l5av+00mL4ABPD////wZWe8uIvICarur7USV5dijzLw3jfcX2sluTjXne8otMWKTwh9ZOC9bwGHAde4v9ZK3dhq8jN33+BWEGNYn1cZUPowpegUnxD6cfisQsjAe9+tp8dnQwhydSZvzs1wf62VFRgRLfu3pD+e0BiHJ+jPGkKPc6KsIMawyUd6CD6vMqBbyI4YtWc7CtAAh7JpOFAvDF/sl+LwWYWHl+U90YeGZbTgOt1aT4/PPygzd4YQ5Orjd1hSDdjtQGi/Ufih+CvwxJ+XSCowIlpPV57i9m9Jf5MI9cd9p0DVGMD8bU7QnzUrtyONxRiWn6B/KicZR/26fCBBApKP9BD36EioPVgUm1g/qCO2kB0x0/ehiWrPdhQPqMqs4Qd/voRgwwbScKBetxcc5lm4qfQ83xVMhefC0eCAfmkOL8t7a0h3w6IPDcvHaLFzKccEYUyguNn1mG9EkP/T/H5QZu4bN9pWTSe5DihABbbG77Cko4gMHBqw24F/12c5kXjSK/QfbpMD9yY7ZpCag4g/L5HtWJMpVGBEtDEH+AzfqE0eus/xpuzfkv6JuC5GZxebVAJwJ+y7SPBx3i9MyTCA+dtV50VjnKA/a/nHg9MXaDbBcg+Kecs3XeSuUOFcQP9UTiWY6PZziIuuFu83FvhAggSdJz68JB/pIUF4VZmv1+CLyrBcMzu2We1e0eVVsH5QR9UZ7P9sITtiCUaH2ufpMsiCjo5w1J7tKLH5UZBfVuSCOjFYOoMJj6fmbjMfCMGGDW2mOrWk4UC9wYb8BS8pSRdKTvWv83YiMpYRnop4viuYHdmXIEvJ9HgurkjAwAH90qVmQWocXpb3eTkqT5eWn13y8SPlBRlrTWB+1/WO0WLn67beX1KOCcI36bV62UYAaLwhvNDqMd+Ij1ZjMGH51iIEnmqavaa9B9jBAb82brStUwkIFZpOch3/Kc6lEYZ7t3Thxw/N2RCSqL6sKkYRGTgjdqWAdWbG2BABemD+rs9ym8lzyiLxpFdHlhjvqTmt/cxeEUUG7k12Y4nxzo0mRNzoQfhkUXkv+TQek0HasSZTv9aa6+nG+bOMoUULYg7wGQdpTKG+UZs82zYnhDWZkpZQ/i4umblUJvze6J4ScV2MdxbhNM4uNqmrSYoRReY/AyCBg7t2keDjE/ZcW/1Z6UmYPlXxIQaCbERhPtSqzovGz6k3fjhBf9ZdJsNus4l2fNbuysRv1h1ZCrGh4eQeFPOBeahL12nLE7IOd6tcocK5OcZ+AYD+qZzlmRUkCzagNm5RHI6nFmaGwnHaPizebyxJudOU8IEECZXmuLF7SQ2jHi6xG0g+0kMtWW77w/bb6aaRZ1EfqbDMes4MdJRhuWbxBgXeAATw//////////SwKWA9YFPAetB6oEfApoD1cI/gyKD1QI8Q3CCywUtwMHFiEA2hGLBKETHQdwHt8MWxxJD4Yb4wv9GXUIKCl+BgMr6AXeLEIBpS7UAnQjFglfIYAKgiYqDvkkvA0kPckFDz9fBtI49QKpOmMBeDehClM1NwmOMp0N9TALDiBC/BwbQGofxkfAG71FVhhsSJQTR0oCEJpNqBThTz4XPFZLHxdU3RzKU3cYsVHhG2BcIxBLXrUTllkfF+1biRQ4a4IaE2kUGc5uvh21bCgeZGHqFU9jfBaSZNYS6WZAETR/NRkffaMawnoJHrl4nx1odV0WQ3fLFZ5wYRHlcvcSNJWPNY+XGTZSkLMyKZIlMfif5zrTnXE5DprbPXWYTT6ogTg2g4OuNV6EBDElhpIy9ItQOd+JxjoCjmw+eYz6Pay88TOHvmcwWrnNNCG7Wzfwtpk827QPPwazpTt9sTM4oKhGMIuq0DNWrXo3La/sNPyiLj/XoLg8CqcSOHGlhDuk13Mpn9XlKkLSTy450Nkt6N0bJsPfjSUe2CchZdqxIrjDxCqTwVIpTsb4LTXEbi7kyawlz8s6JhLMkCJpzgYhvP4NL5f8myxK+zEoMfmnK+D0ZSDL9vMjFvFZJ23zzySw6rosm+gsL0bvhis97RAo7ODSI8fiRCAa5e4kYed4J7krDmsSKZhozy4ybLQspG9lIWZkTiPwZ5MkWmPoJsxgNT+5aB49L2vDOoVvuDgTbGk10WdCN0dknzDtYOQye2MxAnBtGgDmbscHTGq8BdppbQgYYkYKjmGbDSRl4A+yZj0Wx24WFFFtyxP7abARbWphHK9hSh45YpcZk2bsGwVlOWnydwJrZHTfbM5wpG5Yc3VjmnheYQx7g2amf/hkMHwlfUV0Dn/Td9N4eXOoeu9weXcte1J1u3iPchF89HCHfyFAjHEKQhpy10WwdqxHJnV9SuR+VkhyfYtP2HnwTU56LVQ7cgZWrXHbUQd1oFORdnFeU31aXMV+h1tvevxZ+XktvoFelrwXXUu7vVkwuSta4bTpUcq2f1IXsdVWbLNDVbGqNl2aqKBeR68KWjytnFntoF5SxqLIURulYlVgp/RWtZf/WJ6VaVtDksNfOJBVXOmdl1fCnwFUH5irUGSaPVO5g0hbkoHeWE+GdFw0hOJf5YkgVM6LtlcTjBxTaI6KUL38fUKG/utBW/lBRSD710bx9hVN2vSDTgfzKUp88b9JoejKQYrqXEJX7fZGLO9gRf3iok7W4DRNC+eeSXDlCEql1QNEjteVR1PQP0Mo0qlA+d9rS9Ld/UgP2ldMdNjBT6nBtEeCwyJEX8SIQCTGHkP1y9xI3slKSwPO4E94zHZMoAAAAApdNcywuhyE2ucpSGFkKRm7ORzVAd41nWuDAFHW2CU+zIUQ8nZiObocPwx2p7wMJ33hOevHBhCjrVslbxmwLWAz7RisiQox5ONXBChY1AR5gokxtThuGP1SMy0x72gIXvU1PZJP0hTaJY8hFp4MIUdEURSL/rY9w5TrCA8jYFrAeT1vDMPaRkSph3OIEgRz2chZRhVyvm9dGONakaW4f/6/5UoyBQJjem9fVrbU3FbnDoFjK7RmSmPeO3+vatB3oECNQmz6amskkDde6Cu0Xrnx6Wt1Sw5CPSFTd/GcCFKehlVnUjyyThpW73vW7Wx7hzcxTkuN1mcD54tSz1bApYD8nZBMRnq5BCwnjMiXpIyZTfm5VfcekB2dQ6XRIBiAvjpFtXKAopw66v+p9lF8qaeLIZxrMca1I1ubgO/vcIjgxS29LH/KlGQVl6GorhSh+XRJlDXOrr19pPOIsRmord4D9ZgSuRKxWtNPhJZozITHspGxCwh2mENiK62P1aD/QI/9yow1GuPEX0fWCOTE1lk+meOVhH7K3e4j/xFTeNp+SSXvsvPCxvqZn/M2IhzzZ/hBxqtCpu/jKPvaL5wQ0iC2TefsDKrOpGb3+2jddPs5BynO9b3O573Xk9Jxasj3HnCVwtLKcuuaoC/eVhus3gfB8evLexbCgxFL90+tgUsB59x+zV07V4U3ZmJJjOViGFa4V9TsX36chgJLUDtZbj8hBFvzm+Nyu/G+R3dKPUcmkGBy6iqHW6JA2m5u9DFmYd5sU61ki3rlDtZPKbVVT3hvCHq01e9T/L+yZjAC6UNfGLR2k6JTX9vIDmoXc41qRqnQX4oTN3bCeWpDDs7hEcGUvCQNLlsNRUQGOIn/hTjYJdgNFJ8/JFz1YhGQSDk0/1JkATPogyh7gt4dtzldHebjACgqWecBYjO6NK6HUTyhrQwJbRfrICV9thXpxjUVuBxoIHSmjwk8zNI88HGJGZ9r1CxT0TMFG7tuMNcA7TCG2rAFSmBXLAIKChnOu0HugREc202r+/IFwabHyXolx5igePJUGp/bHHDC7tDNmcu/18T+c20j1zsHfuL3vP3ipmag12rcR/4ithrL7gLxw+EorPYtkkvfZfgW6qlDler4mcjfNCMv9nxJcsOw9Cnm3+500xNUk/pbPs7Pl4VNz8ZfEPoK5ffTQo+q5o44IbRBYnyBjdibqMWyxp0JCUWdWNMYqJRp/4HcA6K0EL75kX+kpKSzHkON+3QeuDfPnbhmFcCNqq8npOLFepEucZGZIVvMrO3hK4Wli3awaTD1sDjqqIX0UE+svDoSmXCHSbwfnRSJ0yfzoJtNrpVX9i2VBixwoMqWl4mC/Mq8TkAATw//////////S0C3emKRGfl50a6DETJE/0py84Ujo10GOOPqfFZ07vM9NFmJVOX3Ck+lQHAnRqoMfAYddhXXs/UOlwSPbOnN5nepepweeNQfBThjZW3biRk2mz5jX0qQ4EQKJ5oqnSMVQd2UbygMOuwzTI2WW69n6gDv0JBpPn4Tcn7JaRnDm9zygyymm1KCJYASNV/o8d8js7FoWdpgxtrBIHGgr7d1L8T3wlWtJmzWtmbbrN6FMdCFxYaq7BQoKfdUn1OVKlY6jmrhQOe7T8P8+/i5lBgSxc9Ypb+miQs8vcm8RtNeuMm4Hg+z0c+hMMqPFkqibPw2+SxLTJD95c+LvVK155dQtEzX584lBklNPkb+N1alFEsN5aMxZDQNsn90usgR475HeqMJPRNyp74IMhDEYNH6uDuRTcJSQONBSQBUOyt+nVIwPiooWe+Eq0KvM9EqTNmtcQxu1xjdwFQDnXcubQpzoQZKxNtvm2pYdNvdIhw4N15HeIAkLqkupzXpmd1eVMtotRR8EtzF0pHHhWXrr2aPl/QmOO2d95ZuhrchFOggJZuDYJLh6rE8YvHxixiZEmFkwlLWHquDeJ2ww8/n0r0Gjsn9sfSgLB93u2yoDdOPQnGIz/UL4R5biPpe7PKUyeh9/4lfB5ZY8YSNGEb+5fusgr67G/jXarV7zCoCAa8uoWiEbhYS7b+4kfb/D+ueHOWXxVxS7ayN/G63zUsU2VpPm7Ia+OHby1ZiwIvhGKhoC2TzKLwemvkSnYG5pefjx2yO+Ifb9JFWdXeKFsIN4vUocbm1nwvQZDGIyySG8qWzgn3O8zUHpyKbhLxiLP7UgcaCj8Fx+OYQ33v9UGgBlu06tH2tjc4UfCNNDzyUN2fffks8n8kxVU5nsk4O0MggmdRHS9ljPSIIzb45SHrEUauQuArrJ8JjOolBeHo+OxoE91IBREAoaJXuq3PVWdEbNrOtQHYE1ymnqlQy5x0uXHAZoTcwrtte4QBYRaG3Ii1CXV52AuokH9NEpwST891oufHcw/lGpqoo6CWxaF9f2Yu1I4LLAlnrGqza8FoboJ7NHy/1jahVnFwG1occsazv/1vQtL/sqt1uQinGLvVTpFA8Or8Qi0DWwSXDzYGSuaVieMX+Is+/l/NhPIyz1kbiJNLJiWRls+C1yzD79XxKkxaWNshWIUyhh4/Pusc4tdF6agA6Ot16U+tz+UirxIMgSC7/ewiZhRLZNwYJmYB8Zw6E8wxOM4lln50Kft8qcBY8wAxNfHd2JK3Z9T/tbo9dk6fmRtMQnC8Cvh80QgllXKHjGQfhVGNuMPrgdXBNmhvnSRVwp/5vGXZQ7AI255Zq1Q3qMZW6kFhEFBNDBKNpIAAAAAngCqzH0HJULjB4+O+g5KhGQO4EiHCW/GGQnFCrUb5dMrG08fyBzAkVYcal1PFa9X0RUFmzISihWsEiDZKzG7fLUxEbBWNp4+yDY08tE/8fhPP1s0rDjUujI4fnaeKl6vACr0Y+Mte+19LdEhZCQUK/okvucZIzFphyObpVZidvnIYtw1K2VTu7Vl+XesbDx9MmyWsdFrGT9Pa7Pz43mTKn15OeaefrZoAH4cpBl32a6Hd3NiZHD87PpwViB9U82F41NnSQBU6MeeVEILh12HARldLc36WqJDZFoIj8hIKFZWSIKatU8NFCtPp9gyRmLSrEbIHk9BR5DRQe1c7cKdKXPCN+WQxbhrDsUSpxfM162JzH1hasvy7/TLWCNY2Xj6xtnSNiXeXbi73vd0otcyfjzXmLLf0Bc8QdC98MbzJlVY84yZu/QDFyX0qds8/WzRov3GHUH6SZPf+uNfc+jDhu3oaUoO7+bEkO9MCInmiQIX5iPO9OGsQGrhBoy7oOvQJaBBHManzpJYp2ReQa6hVN+uC5g8qYQWoqku2g67DgOQu6TPc7wrQe28gY30tUSHarXuS4myYcUXsssJkJFQrA6R+mDtlnXuc5bfImqfGij0n7DkF5g/aomYlaYlirV/u4ofs1iNkD3GjTrx34T/+0GEVTeig9q5PINwddqFO1NEhZGfp4IeETmCtN0gi3HXvovbG12MVJXDjP5Zb57egPGedEwSmfvCjJlRDpWQlAQLkD7I6JexRnaXG4rxtIAvb7Qq44yzpW0Ssw+hC7rKq5W6YGd2ve/p6L1FJUSvZfzar88wOahAvqeo6nK+oS94IKGFtMOmCjpdpqD2jOdNqhLn52bx4Gjob+DCJHbpBy7o6a3iC+4ibJXuiKA5/Kh5p/wCtUT7jTva+yf3w/Li/V3ySDG+9ce/IPVtc6fW9tY51lwa2tHTlETReVhd2LxSw9gWniDfmRC+3zPcEs0TBYzNuclvyjZH8cqci+jDWYF2w/NNlcR8wwvE1g83R6Z6qUcMtkpAgzjUQCn0zUns/lNJRjKwTsm8Lk5jcIJcQ6kcXOll/1tm62FbzCd4Ugkt5lKj4QVVLG+bVYajHHYdBoJ2t8phcThE/3GSiOZ4V4J4eP1Om39ywAV/2AypbfjVN21SGdRq3ZdKandbU2OyUc1jGJ0uZJcTsGQ932El0IP/JXpPHCL1wYIiXw2bK5oHBSswy+Ysv0V4LBWJ1D41UEo+n5ypORASNzm63i4wf9SwMNUYUzdals038FpKFGv/1BTBMzcTTr2pE+RxsBohey4ai7fNHQQ5Ux2u9f8PjixhDyTgggirbhwIAaIFAcSomwFuZHgG4ermBksmAATw////8EMUexeGKPYuxTyNOQxR7F1PRZdKinkac8ltYWQYoti7W7ajrJ6KLpXdnlWCFPM05lfnT/GS28LI0c+533FCwKwyVru792o2grR+TZV9EyzxPgdX5vs72t+4L6HIaeAYFyr0YwDvyO45rNyVLmWx9EompY9d45kCZKCNeXOjgvGC4JaKlSWqB6xmvny7r9Md3+zHZsgp++vxau+Q5rsgKTn4NFIuPQjfF34cpAC3ccVk9GW+czFZM0pyTUhd0sAxLpHUSjlU6McAF/y8F96R3XOdhaZkWLkrXRutUErKYumViXaSgkxKH7sPXmSsxjMFyIUnft9AG/PmAw+I8QcDkt5EF+nJgStk8MI/H+cLUn6DSEYFlI16iK3ObvO6H6FKZVy1MXKZibxL2p3HXBPwpjhQ5N0vldhQFtbMKwF2QVJyNVUpZfBppFyzfd9LehC+LzkExTj8OEgBvywzFm7jiskt9/He6Mt856vfB/BismaUIaYdg+SakLqnjuutpIFjXOeVGEsiqZVyYb3uZajQjwHrxPQWLvh5L23sAji8I7vn/zfA8DoLTcl5HzbesHJXuvNmLK02WqGUdU7ag9XDo/CW19jnU+tV3hD/LsnZkk+tmoY0ul+6uYMcrsKUzWF7S451AFxLSY1lCF32csEwlxaCJOwBRxhhOAQMGi9PAFVmDBQucckoo0iKPNhfQ1G5OwBFwizFeU8Vhm00Aleijd0UtvbK0Yp785KeAORb82GAGOcal93bl66ez+y5PkKVyn1W7t24amPk+34Y8zITeZdxBwKAtDuPufcv9K4m4E1xZfQ2ZqDIu1/j3MBIKrGhLGml2jusmVcC740sFeyCpOSvlt/zaqpSyim+Kd3g00i5o8czrmb7vpcl78WA9CB8X7c0B0hyCIpxMRzxZvhxkAK7ZesVfllmLD1NHTudwGRI3tQfXxvokmZY/OlxkZGIFdKF8wIXuX47VK0FLIVivPPGdsfkA0pK3UBeMcqJM1CuyicruQ8bpoBMD92XSAPHuAsXvK/OKzGWjT9KgURSK+UHRlDywnrdy4FuptxQoR8DE7VkFNaJ6S2VnZI6XPDzXh/kiEna2AVwmcx+ZzlBBxR6VXwDv2nxOvx9ii01EOtJdgSQXrM4HWfwLGZwIePfr2L3pLinyymB5N9Sli2yM/Jupkjlq5rF3OiOvsvrgTY6qJVNLW2pwBQuvbsD59DaZ6TEoXBh+CxJIuxXXvMj7oGwN5WWdQsYrzYfY7j/cgLcvGZ5y3la9PI6To/lmsP2ltnXjYEc6wC4X/97r5aSGsvVhmHcELrs5VOul/KCYS4twXVVOgRJ2ANHXaMUjjDCcM0kuWcIGDReSwxPSQAE8P////A+a8LvPdD1BAO7N+t6oOsJRMsp5kdwHg15G9zi9EDXE8orFfzJkCIX9/vg+I7gPBqwi/71szDJHo1bC/Hoga4n1upsyNVRWyPrOpnMkiFFLqxKh8Gv8bAqkZpyxRzBeTQiqrvbIRGMMB96Tt9mYZI9WApQ0luxZzll2qXW0ANdT+5on6Dt06hL07hqpKqjtkaUyHSpl3NDQqkYga0kQ4pcGihIsxmTf1gn+L23XuNhVWCIo7pjM5RRXVhWvjiC82gG6TGHBVIGbDs5xINCIhhhfEnajn/y7WVBmS+KzMIke/Kp5pTxEtF/z3kTkLZiz3KICQ2di7I6drXZ+JmgB7qenmx4cZ3XT5qjvI112qdRl+TMk3jnd6ST2RxmfFRHbY1qLK9iaZeYiVf8WmYu54aEEIxEaxM3c4AtXLFvSIYUuXbt1lZ1VuG9Sz0jUjIm/7AMTT1fD/YKtDGdyFu8xsOqgq0BRYEWNq6/ffRBxmYoo/gN6kz7tt2nxd0fSHAE59FObyU+TdQS1XO/0DoKpAzYNM/ONzd0+dwJHzszhEQwwrov8i25lMXGh/8HKf7k28vAjxkkwzQuz/1f7CCYhUn2pu6LGaVVvPKbPn4d4iWi/9xOYBDf9Vf74Z6VFGzFnuVSrlwKURVr4W9+qQ4WZXXsKA63Ayu1gOgV3kIHAQkF5j9ixwk82fDiArIyDXup7u9FwiwARnkb63gS2QT1SdL1yyIQGsiZJ/H28uUej+k5/LGC+xOyOcz4jFIOF+mIq8HX42ku1FhexeoznCqTKEDIrUOCJ674tcyQk3cjHch80iOjvj0gGInWHnNLOWdol9tZA1U0Wrhi32TToDDRClip72GaRuzara3SsW9Cq6qzoJXBcU+WekakqBGESyVKj7obIU1VGJp6vibxuFFf6mSzYYGmXGI6kbdcUVNYOYv2jgfgNGEEWwOKOjDBZUMrHYd9QN9ofvvog0CQKmzNyyGd86DjcvAb1JnOcBZ2t2vKlIkACHuKuz+QtND9f6EOv3ifZX2XnN5KfKK1iJPbrlRx5cWWnuZ+oXXYFWOaVU5oa2slqoRonp1vVvVfgC/ug2IRhUGNEj52ZixVtIlJjxFfd+TTsHRf5FtKNCa0My/6Vg1EOLkO/w9SMJTNvb3PxkyDpASjgB8zSL508afHby1F+QTvqvq/2EHE1BqucQ3iN09mINhM3RczcrbV3AutCT41xsvRNn38OggWPtWFTTUkuyb3y7idwCCG9gLP/+3eLcGGHMLCPSsp/FbpxpmMTBCn547/pFy5FJo3e/vjLKcZ3Udl9t78Uh3gl5DybcybA1OnWexQHG4Hbnes6BdscAopB7LlKryFDhTXR+EABPD/////////9MDfjsHBuWxYAWbimYJz2bBCrFdxQ8q16IMVOylF4cO6hT5Ne4RYr+JEhyEjx5IaCgdNlMsGK3ZSxvT4k8vE9q4LG3hvCn2a9sqiFDdJty8eiWih34gOQ0ZI0c2HjiU1FE76u9VPnFlMj0PXjQxW7KTMiWJlze+A/A0wDj3Xj5yGF1ASRxY28N7W6X4fVfxFNpUjy/eURSluVJqnr5JuXzxSsdH9U9czZJMIvaUQHYaM0MIITdGk6tQRe2QVHEtqKNyU5Ond8gZwHS2IsZ44s5he5z1ZX4HfwJ9eUQFZqqmSmXUnU5gTxcpYzEsL29lwIhsG/uMaYBx62r+Su+8ZSNYvxsYXLqAkju5/qk9tapFmrbUfp6zT/T5sDHP/qviLbGonBa1rQec0q55p9SiLUtzoVNwd6TI+hCntsEUk3b545AIwueVk0iAlu1zhpq5nyGZx6QlnFwuQp8iFUWE8fcKh4/MDoIURmmBan1vjT6RyI5AqsyL2yCriKUbrOJbUUPhJWpH5L7gIOfA2ybrlDeB6OoMhe1xhuLuD73l9dxfqvaiZK7zOe7J8EfVz/wTOWj/bQJs+vaIC/mIsw/NSIv4zjaw/MutOpvI0wGdxIftOsf51j7CYlxZwRxnXtrPhRHZsb4V3Co0ct9UD3TTAOPT0H7Y19XlUrDWm2m2fNeF3X+pvtl6MjS+eUwPuHUY4x92Ztgbc/1SfHCDaXtrUIs0aC6wMG21OlduywFRYp/t9mHh1vJkelyVZwRnkVPEX2ZQumRiVSHuBVZf1QNaCzmkWXUCoFzuiMdfkLPARENRj0c9aotCpuDsQdjb6k2MN01O8gxJS2mGLkgXvSki6ffGIZfMwiQMRqUncn2jKyaRBChYqgAtwyBnLr0bYDVu+S82EMIrM4tITDD1c0o8oZ/tP9+k6TpELo45OhWKDfotfQ6EFnkLH5weCGGnGAQ1S78HS3C7AtD63AGuwdsafSOUGQMYkByYkvcf5qnxE7JFVhDMflIVV/Q1FinPMcCypobDzJ2CxlcX5cUpLOPJfcBEygP7QM+YcSfM5kog1zWob9RLk2vR0BkM0q4iCt76zq3dhPWp2B9/ztthRMrvoXw97N9HOelEzV7qOvZY5m4a/+UQIfvgi6uc4/WQm/gmctT7WEnQ/sPDt/29+LHx6RQW8pcvEvcMpXX0cp5ynozUnZ3y75mYaWX+mxde+JdDsl+UPYlbkaYDPJLYODuJC9p0inXhcI/uaxeMkFARgMS8toO6h7KGIQ3VhV820bGfDiay4TUit3q/RbQEhEO4UGjkuy5T4L612Ye9y+KAphgAz6VmO8ug/bGso4OKqq/XZg2sqV0JqTLXbqpM7GgAAAABvTKWbn5477PDSnnd/OwYDEHejmOClPe+P6Zh0/nYMBpE6qZ1h6DfqDqSScYFNCgXuAa+eHtMx6XGflHL87RgMk6G9l2NzI+AMP4Z7g9YeD+yau5QcSCXjcwSAeAKbFApt17GRnQUv5vJJin19oBIJEuy3kuI+KeWNcox++NsxGJeXlINnRQr0CAmvb4fgNxvorJKAGH4M93cyqWwGrT0eaeGYhZkzBvL2f6NpeZY7HRbanobmCADxiUSlagQ2KRRreoyPm6gS+PTkt2N7DS8XFEGKjOSTFPuL37Fg+kAlEpUMgIll3h7+CpK7ZYV7IxHqN4aKGuUY/XWpvWbwt2Mwn/vGq28pWNwAZf1Hj4xlM+DAwKgQEl7ff177RA7BbzZhjcqtkV9U2v4T8UFx+mk1HrbMru5kUtmBKPdCDFp7PGMW3qeTxEDQ/IjlS3NhfT8cLdik7P9G04Oz40jyLHc6nWDSoW2yTNYC/ulNjRdxOeJb1KISiUrVfcXvTghsUihnIPezl/JpxPi+zF93V1QrGBvxsOjJb8eHhcpc9hpeLplW+7VphGXCBsjAWYkhWC3mbf22Fr9jwXnzxlr0gUokm83vv2sfccgEU9RTi7pMJ+T26bwUJHfLe2jSUAr3RiJlu+O5lWl9zvol2FV1zEAhGoDluupSe82FHt5W4G/HYI8jYvt/8fyMEL1ZF59UwWPwGGT4AMr6j2+GXxQeGctmcVVu/YGH8Iruy1URYSLNZQ5uaP7+vPaJkfBTEhyC32xzznr3gxzkgOxQQRtjudlvDPV89Pwn4oOTa0cY4vTTao24dvF9auiGEiZNHZ3P1Wnyg3DyAlHuhW0dSx4YtPZ4d/hT44cqzZToZmgPZ4/wewjDVeD4EcuXl11uDObC+n6Jjl/leVzBkhYQZAmZ+fx99rVZ5gZnx5FpK2IK5FnudIsVS+97x9WYFItwA5ti6Hf0Lk3sBPzTm2uwdgAaL+JydWNH6YWx2Z7q/XwFZRTkcQpYQer6it+dlcZ6BhDYpFB/lAHLj0afvOAKOidv46JTAK8HyPB9mb+fMTwk7q6oVoHiDc1xMJO6Hnw2IZGVrlX+2QvODguVuWFHMCLsNbxcg3kZx3Orh7Ac5yIrkw66X/xCH8QMkIGzY9wkKBJDsFp9DxXBjd2LtuKRLi1teLZZAjQTwvLmjbWdqigu6AOVSIdPMNN3na6kGNELP5c4k0v4dDbQCKaop2fqDTwWdZlOeTk81YnroqLmpwc5aU6fTQYCOtb20KShmZwBOhTujUR7oijfi3C2qOQ8EzNr1YtHBJku3PRLsKubBxUw6piBQoXUJNl1BrquGkofNZWjh0H67yLaCj28rWVxGTYABPD///////////////iF2ZbdS7VcYM5syr2WarnAE7MvHd3f5aBYBnN9bdMDWugKlYcmZl86o7/J5/u5upp+YCxHsAzm+jXVcCfapge0X3+RaZETW9QUys0JTMy+dMkVKKkHeeIUgqB0ybd1BO4yrJIz/MBYjnkZzlMhH70upMYr82qq4U7vc3eT9Ut+s3CS6G6+/iLTOye0DmMhx3Pm+FGuKJSbE61NDc6YmH3pHUHrNNMtIYlW9LdUDvLEKYsrUvRFR5hJwJ4OlC/teQeqNO/aZFglZ+GBs7q5h8DHPF5WGvIynKd36wp6Qj56Xcfn7IAJiyY9jFKw4NRUw51RjVVAn+Gf/Ro4CSCrkY29LkgbYOAk0d1l/UcAPfs0fbgioqB2Tmgd85f+wMZCjudDmxg6jffShwguRFpQKDcn1fGh+huda0eeRP2acTeKCfTuHNQ6gtZpv1tAtOddM8lihKUUrOhvqSkx+XQc5IlTmT0fjldR1TPSiEPuio4wkw9Xpk7BO2zzROL6Ll7a8w7bA2XTFW+vbpC2ObPIsErOTWncE4MFFq4G3IBzMwnwVLbQZol4vKw0/WU66aVjSZQgut9J7tYV9GsPgymEfPS6AaViZ8/JqNpKED4HEhZNepfP26dZoxEa3HqHx+mv9+BsdmE9ohqrgCfDPV1/xU4g+hzY/TRwEkCxqYSdFyVqoJL8/H1ckDbA2UmgHYFP02AElkW9yvqPAE8jGd169mn6/y//JzFDNZq0mqNH7JzQOmlFRuenKYxaIvAah82DbRRIWvvJhjYxdAPvp6lb6dTU3jBCCRBciLSVhR5poFBuTiWJ+JPr5TIubjyk8zY6146z40FTfY+L7vhWHTPibhQTZ7eCzqnbSHMsAt6udASt0/HdOw4/sfGzumhnbo+9F0kKZIGUxAhLKUHR3fQZ166JnA44VFJi8unXu2Q0OMgTp70RhXpzfU/H9qTZGq6iqmcrezy65Rf2B2DOYNpVGxD90MKGIB6uTJ2bd9pAw3GpPUaoP+CIxPVdDR1jgLy05x05bXHA9wG7fXLYLaAq3l7drwfIAGFrAr3kspRg0WfkR1S+cpqa0rgnHwsu+kcNXYfC1MtaDLgB54lhlzpmEuCp48t2dC2nvMmofioU8HhZaXWhz7S7zQUJPhST1AvB4/OOGHUuQHS/k8WtKU6dq1ozGHLM7tYeBlNTx5COSf+ZrswmD3MCSsXOh5NTE9+VIG5aTLazlCB8DhH56tMkLJr0ofUMKW+ZxpTqQFBJskYjNDeften5839UfCrpiZNZnhoWgAjH2OzCel01VKcFMyfagOqxB06Ge7rLX+1n/oqdQHtTC521P8EgMOZX/WjgJIDtObJdI1V44KaM7j0AAAAAduEPna3EbuHbJWF8G4+sGW1uo4S2S8L4wKrNZTYeWTNA/1aum9o30u07OE8tkfUqW3D6t4BVm8v2tJRWbDyyZhrdvfvB+NyHtxnTGnezHn8BUhHi2ndwnqyWfwNaIutVLMPkyPfmhbSBB4opQa1HTDdMSNHsaSmtmogmMNh4ZM2umWtQdbwKLANdBbHD98jUtRbHSW4zpjUY0qmo7mY9/piHMmNDolMfNUNcgvXpkeeDCJ56WC3/Bi7M8Ju0RNarwqXZNhmAuEpvYbfXr8t6stkqdS8CDxRTdO4bzoJaj5j0u4AFL57heVl/7uSZ1SOB7zQsHDQRTWBC8EL98fe5QYcWttxcM9egKtLYPep4FVicmRrFR7x7uTFddCTH6eBysQjv72otjpMczIEO3GZMa6qHQ/ZxoiKKB0MtF53LCyfrKgS6MA9lxkbualuGRKc+8KWooyuAyd9dYcZCq9VSFN00XYkGETz1cPAzaLBa/g3Gu/GQHZ6Q7Gt/n3Epj92MX27SEYRLs23yqrzwMgBxlUThfgifxB906SUQ6R+RhL9pcIsislXqXsS05cMEHiimcv8nO6naRkffO0naRbNv6jNSYHfodwELnpYOll48w/Mo3cxu8/itEoUZoo9zrTbZBUw5RN5pWDioiFelaCKawB7DlV3F5vQhswf7vOLvc4OUDnweTysdYjnKEv/5YN+aj4HQB1SksXsiRb7m1PEqsKIQJS15NURRD9RLzM9+hqm5n4k0YrroSBRb59WO08Hl+DLOeCMXrwRV9qCZlVxt/OO9YmE4mAMdTnkMgLjNmNbOLJdLFQn2N2Po+aqjQjTP1aM7Ug6GWi54Z1WzOpcXTkx2GNOXU3mv4bJ2MiEYu1dX+bTKjNzVtvo92isMiU59emhB4KFNIJzXrC8BFwbiZGHn7fm6woyFzCODGFarpSggSqq1+2/LyY2OxFRNJAkxO8UGrODgZ9CWAWhNYLX8GxZU84bNcZL6u5CdZ3s6UAIN21+f1v4+46AfMX4TGMrCZfnFX77cpCPIPau+CJdm2352aUalUwg607IHpyUGk/FT55xsiML9EP4j8o0+iT/oSGgwdZNNUQnlrF6UfyR4pAnFdznS4BZFpAEZ2GSr1L0SStsgyW+6XL+OtcFJOiGXP9suCuT+T3aSH0DrUrWNjiRUghP/ceNviZDs8stgrg+9gaGSZqTA7hBFz3PQ7wIWpg4Ni30rbPcLymNq/X73PIuf+KFQupndJluWQObxWyWQEFS4SzU1xD3UOlmnXBxp0b0T9AqYcoh8eX0VvNOwcMoyv+0RF96RZ/bRDJFCRVrno0rHPIYru0pnJCaKzelD/Czm3icJh6JR6Ig/AAAAAOjb+7mRsYaoeWp9EWNlfIqLvocz8tT6IhoPAZuHzInPbxdydhZ9D2f+pvTe5Kn1RQxyDvx1GHPtncOIVE+fYkSnRJn93i7k7Db1H1Us+h7OxCHld71LmGZVkGPfyFPriyCIEDJZ4m0jsTmWmqs2lwFD7Wy4OocRqdJc6hCePsWIduU+MQ+PQyDnVLiZ/Vu5AhWAQrts6j+qhDHEExnyTEfxKbf+iEPK72CYMVZ6lzDNkkzLdOsmtmUD/U3c0aGnzDl6XHVAECFkqMva3bLE20ZaHyD/I3Vd7suupldWbS4DvrbVusfcqKsvB1MSNQhSid3TqTCkudQhTGIvmH17+8qVoABz7Mp9YgQRhtseHodA9sV8+Y+vAehndPpR+rdyBRJsibxrBvStg90PFJnSDo9xCfU2CGOIJ+C4c54y5JmO2j9iN6NVHyZLjuSfUYHlBLlaHr3AMGOsKOuYFbUoEEFd8+v4JJmW6cxCbVDWTWzLPpaXckf86mOvJxHa40U+Qguexfty9Ljqmi9DU4AgQsho+7lxEZHEYPlKP9lkibeNjFJMNPU4MSUd48qcB+zLB+83ML6WXU2vfoa2FqzaXAZEAae/PWvartWwIRfPvyCMJ2TbNV4OpiS21V2dKxbVycPNLnC6p1NhUnyo2EhzqUOgqFL62cIv6zEZ1FK78IdOUyt89ypBAebCmvpf2JX7xDBOAH1JJH1sof+G1Tw8DoHU5/U4rY2IKUVWc5BfWXILt4KJss7o9KMmMw8a9G/lChy0HrNl3mOijQWYG5cKmYB/0WI5BrsfKO5g5JFzo2zFm3iXfOIS6m0KyRHUEMYQT/gd6/aBd5bnaaxtXiXOQsbNFbl/tH/EblykP9dGqz5MrnDF9dcauOQ/wUNdogLLCUrZMLAzs02h22i2GMFnt4MpvEw6UNYxK7gNypJqUSCCgorbO/vgpioTO12TCTRcCOHvp7GYhdqgcF4hGe2dqU0FRlL0fCwv5ZT31FyO+NXHZiMufh9JU2/3kqjWxot8hC5Qhz1XOvosv+EBlaXuAA5NNfu3NF+GptyEfR9BR/VLqZwO8tD2c+M4LYhaIiKJwcr5cnizkw9pW0j00IkUHsBhz+V5GKWYaPB+Y9HqcWJKAqqZ83vA5OKTGx9bDtiXD+YDbLafaRGnd7LqHm2964WFZhA8/AxtLRTXlpRYtbkMsG5CtckEP6Qh38QdO9DFhtMLPj+qYUMuQrq4l995MMM3ost6Tsi2a6YTTdK8HExJVMe38C2tyuHFdjFYFyrbSP/xIPGGm13gbkCmWXRPp8KclFx75f4hag0l2tOQ5lKHeD2pPgFX1C/pjC+W84MuDRtY1bRiMqiliulTHAAE9/////8+kZFormMloIfytMgph0wx1BbdWXrkaZFTdfj5/U+fE3PeDnvdLLqz9L0r21rI0yKnWUJKCav2giA6Z+qOnj4n5g+vT0j9G4dhbIrvzxlyFjKI436cele2tevG3hvRoTSVQDBcO7KElBIjFfy8Vu0FQcd8be81yKXGpFnNaH17Pxfs6le5Hl6fkI/P9z76Nw7Da6ZmbZkSrkQIg8bqMuQsZKN1RMpRwYzjwFDkTbWoHbAkOXUe1o29N0cc1ZnjRRjxctRwX4BguHYR8dDYZAkpJfWYQYsHLImilr3hDKzaC4I9S2Msz/+rBV5uw6srljpWugdS+EizmtHZIvJ/+vZ+LmtnFoCZ096pCEK2B326T/rsKydUHp/vfY8Oh9O1aW1dJPgF89ZMzdpH3aV0MiVciaO0NCdRAPwOwJGUoGTIWcj1WTFmB+35T5Z8keHjhGgcchUAsoChyJsRMKA1K1dKu7rGIhVIcuo82eOCkqwbe289ihPBzz7b6F6vs0aHjUE5Fhwpl+So4b51OYkQAMFw7ZFQGENj5NBq8nW4xMgSUkpZgzrkqzfyzTqmmmNPXmOe3s8LMCx7wxm96qu3GbNm34giDnF6lsZY6weu9p7/VwsPbj+l/dr3jGxLnyJWLHWsx70dAjUJ1SukmL2F0WBEeEDxLNayReT/I9SMUfTt/VxlfJXyl8hd2wZZNXVzocyI4jCkJhCEbA+BFQShu3LuLyrjhoHYV06oScYmBjw+3/utr7dVXxt/fM6KF9Jq09q6+0KyFAn2ej2YZxKT7Z/rbnwOg8COukvpHysjRyVMycm03aFnRmlpTtf4AeCiAPgdM5GQs8ElWJpQtDA0iZbCSxgHquXqs2LMeyIKYg7a85+fS5sxbf9TGPxuO7bGCdE4V5i5lqUscb80vRkRQUXg7NDUiEIiYEBrs/EoxReo5a2GOY0DdI1FKuUcLYSQ5NR5AXW81/PBdP5iUBxQWDf23smmnnA7ElZZqoM+9997xwpO6q+kvF5njS3PDyMOG4Nyn4rr3G0+I/X8r0tbiVeyphjG2gjqchIhe+N6j0GEkAHQFfivIqEwhrMwWCjGyKHVV1nJe6XtAVI0fGn8kCWklAG0zDrzAAQTYpFsvRdplUCG+P3udEw1x+XdXWnfurfnTivfSbyfF2AtDn/OWPaGM8ln7p070ya0qkJOGnNgvGXi8dTLEEUc4oHUdEz0LI2xZb3lH5cJLTYGmEWYPP+vFq1ux7hf2g+RzktnP7uznsIqIvZs2JY+RUkHVuvtXpuDfM/zLY57OwQf6lOqahKqV/uDwvkJNwrQmKZifqLBiPAzUOBeweQod1B1QNkljbkktBzRikaoGaPXOXENYXNzZXJ0aW9uIGZhaWxlZDogd3JpdGVyLmJ1ZmZlcl9sZW5ndGgoKSA8PSAod2luZG93X3NpemUgKiAyKQAAAOBTEABYAAAAcAIAAAkQAFcjAQAAGhAAVywBAAALEABAfAIAAKVGCBAAEESMIJ86XFVzZXJzXGUVUCLRZGVmbGF0ZS0wLjguNi4A8gJsejc3LnJzV2AQAGEAAAA7AKgABBAAAAEJABAAwJhUEABcAAAAjQAAAGlDBBAAV44AAAAQEABXQwAAAAUQAFBFAAAADhgAD7gAPdJtYXRjaGluZy5ycyEAlABQBAAAACJcAYMAAAAkAAAAJRAA8xYmAAAAJwAAAFN0b3JlZCBibG9jayB0b28gbG9uZyEAAERVEABgMAAfMKwAQXFpbnB1dF9iMgI0LnJzcAB1RwAAABEAAIAAjk4AAAANAAAAdAJTc2VsZi5AAPAEbGVuKCkgPiBXSU5ET1dfU0laRW0CB0gAEzq0AfgYWFYQAGMAAAAuAAAABgAAAFVuZGVyZmxvdyBjYWxjdWxhdGluZyBzFgECzwIWITwAb4kAAAAKABQBQHNodWZmbWFuQQNOcy5yc/cAEGxqAyBhbCQAAAQAASgAAv8A9gw8PSBOVU1fTElURVJBTFNfQU5EX0xFTkdUSFO8ACIwAYwCDlkAj2Rpc3RhbmNlVgAD10RJU1RBTkNFX0NPREVQABMyUAAEEAAiRwE0AgQQADFSAQBdRqL0VxAAbwAAABUEgAIEEABXbAMAADYQAFcxBAAAFRAAVz8EAAAeEABXSAQAABgQAFdJBAAAGRAAIkwERAQMnAHyFHJ1c3R1cFx0b29sY2hhaW5zXHN0YWJsZS14ODZfNjQtcGMtqgSwcy1tc3ZjXGxpYi80AAAIADFzcmMMAAAVAKFyYXJ5L2FsbG9jFwCjc2xpY2UucnMA6BwEQNsAAAAhCQQQAAAtNRcrEAAT33wDCBAAAPACBBAAG+MQABPngAQEEAAx6QAAuAMIEAAIMAAb7RAAE/f4AgQQABv5gAAAEAAAoAEEEABXAwEAACAQACoIAVAAAPABAOABBBAAIjoBkAEEEAAiPAGQAQQQAFeSAQAAKBAAIoYB0AMEEAAAIAAIYAATdiAAsVdyaXRlIGVycm9yQAAxCAAAzAQQKdQDEndIBVdLAAAAMRAAn0YAAAA3AAAACAEAfB8JAQBcHwcBAAQAjAAAAQDwDQBBmLbBAAu9DgEBAQECAgICAwMDAwQEBAQFBQXMAzIAQFuNARNxuQYMTQMP6QQ2AYMDAD8DcAECAwQFBgcsAfMGCgoLCwwMDAwNDQ0NDg4ODg8PDw8QAQATEQEAExIBABMTAQAbFAEAGxUBABsWAQAbFwEAHxgBAAwfGQEADB8aAQAMHxsBAAsVHAAB9QYKDA4QFBgcICgwOEBQYHCAoMDg/wCQATGcAABZCAEvAHgEBQUGBgYG2QEA/QEAAQAbCgEAGwsBAB8MAQAMAHsBDwEACQCXAQ8BACkA0wEPAQApQAAAEBH9AQTrAQDTAQABAADLAQABAACzAQgBAACjAQgBAACTAQ8BAAkAlAEPAQAJHxwBACwfHQEALP8UAAABAAIAAwAEAAYACAAMABAAGAAgADAAQABgAIAAwAAAAYAhAAYETAITu0wCo0JVRyEgRW1wdHnpCCVzIXACAF0GAL0GDi0IM21heCgIgCA8PSBNQVhfGAgwX0xFbwgFQAAT60AEBBAAIvMA3QUEEABXDwEAACoQABMGTQYEEAAiCwEtCAQQAAAwAABAALEAYBAAVwAAADMAANkKBJkLE17tBgQgAADxCi8UAMAEQBFytgQPVwA+MG91dBULA04N9gFyc2V4cGxpY2l0IHBhbmljJQdXHQAAABI1BxM1aAEPkQA+AuMBYF9lbmNvZPIAAOEHUmUQAG0AJQjiCQAAADhjEABkAAAAywTMAQQgAAAMAAAgAFcBAQEABCgAIu8EEQj1BBAREgAIBwkGCgULBAwDDQIOAQ8kABNTRQgEEAAA1QcAcAAEEABAAQUAAOEMBBAAVwcFAAAvEAAi1wEkAQQQACIPBVUKBBAAGxUQACIWBegCBBAAIikFdQoEEAAiIQVoAgQQACAjBaAAj0HgxMEAC9UdRgcFAH8D8CYFAAYABwAIAAkACgALAA0ADwARABMAFwAbAB8AIwArADMAOwBDAFMAYwBzAIMAowDDAOMAArwDAAIAAOoAEAFYAABUAADqBQDiBQDOBQKiBQAnAAJkAPAiBwAJAA0AEQAZACEAMQBBAGEAgQDBAAEBgQEBAgEDAQQBBgEIAQwBEAEYASABMAFAAScEFIDOACIaBgMKBBAAL2cGnw4yoG1pbml6X294aWRSAjEzLjcyACFpbmQChFxjb3JlLnJzdAAq8gJyAQAQABcJEAAi8wIKBAgQAAggABv0IAAAEAAIIAAb9SAAABAACCAAKgIDIAAAEAAAagQEEAAiAwM3CwgQAAggABsEIAAAEAAIIAAb/oAAABAACCAAKv8CQAAAEAAIIAAq/AKCAgAQAACkAQQQACoZA0ABABAACOAAGxrgAAAQAAggABsbIAAAEAAAIAAPBAJKA+8EA8QPAV4EBIAAMXsCAEcNBBAAInQC1w0EEAAbfCABKo8C8gMqlAIyBDGwAgAKBgQQABO7QACxdmYQABMAAABlZhCHDDFcZhD4ADE8ZhBAAPEVY29tcHJlc3NlZCBkYXRhIHN0cmVhbSBjb3JydXB0ZWRDUkMgpQzwFGludmFsaWQgc2lnbmF0dXJlbGltaXRzIGFyZSBleGNlZWRleACi4GgQAF8AAACZAdAB8A+JUE5HDQoaSURBVGZkQVRmY1RMIGNodW5rIG1pc3OLEHBiZWZvcmUgHgACGgAhLmaEB/IAIHRvIGZpbGwgd2hvbGUgRQFBAANqEPYGMSdqEN8QoC1qEAABAAAAeHzsB2AAAOJpEAA6BSLPafgAIkt+IAAxu2kQIAEEEABAn2kQAIABBBAAV4hpEAAXEAAxbmkQkAEEEABCSUhEUp8ABLkAQ3RSTlMSAEFvY2N1TxECywAGLAAGEAETLAAD8AFub3QgZW5vdWdoIHBhbGV0BA5mbnRyaWVzLAATPiwEBBAAEz8QAEJwSFlzWABgIGFwcGVhcwDAYWZ0ZXIgZmlyc3QgZQECIABRAABgaRBAAwTAAARMABNjOAIWYYkBD0wADgQ8ABMPPAAECwL0AmRpc3Bvc2Ugb3BlcmF0aW9uGQBWYmxlbmQXAARAADH/AQB0ARM/pAEMnABXzgAAADkQACLQADAAD6QDLKFwbmctMC4xNi44KwCCZGVjb2RlclzqAjcucnPJAfQHZm91bmQgZm9yIGNvbG9yIHR5cGUgKNcA1nVuaXQgKHVua25vd25sZ3YgbWV0aG9kGgAwZmlsSQEMFwATY2sDAGcKBBwABFsAD28AAbNiaXQgZGVwdGggKJ8ABaoBDWkCwFNlcXVlbmNlIGlzIGMC8gxpbiBvcmRlciwgZXhwZWN0ZWQgIyBnb3QgIy4aCBMEBAAAxggIEAAAdgkIEAAANgiAUGFydGlhbENpAPsGSW1hZ2VFbmROb3RoaW5nSGVhZGVyNAAALGkIEABBLQAAAD0AUUJlZ2luCgCJQ29tcGxldGUoAACzFAgQAADyCAgQAACnFQGAAEVEYXRhCQDwGEZsdXNoZWRTaXh0ZWVuT25lVHdvRm91ckVpZ2h0UGl4ZWxEaW1lbncBWnN4cHB1VAAA8ACIeXBwdXVuaXQYAPAKMQAAAE1ldGVyVW5zcGVjaWZpZWRBbmltYdEC8AJDb250cm9sbnVtX2ZyYW1lcwoA9Q1wbGF5c1JHQkFHcmF5c2NhbGVSR0JJbmRleGVkEwBgQWxwaGFGNAADRAATc7kB8wFfbnVtYmVyeF9vZmZzZXR5CABQZGVsYXkcAAicAAD3FQIZADNkZW6FAzlfb3DYAFAzAAAAYocDOF9vcBgA8BE0AAAAT3ZlclNvdXJjZVByZXZpb3VzTm9uZUJhY2tncgEDcGF0dGVtcHSBBfEFZGl2aWRlIGJ5IHplcm8AAAB8bBB6DBM6pgsPnAM7YGNvbW1vbioHwB5tEAAnAAAA9GwQAKQCBHgAInkBtAEBfgMybmFsnQYQOkUFEGUaA3B1bnJlYWNodxHwAyBjb2RlOiBOb3QgYSBwb3NzaRUAUWJ5dGUg5wBAZWQgcB8CoSB3aWR0aFN1YiDNAcAgaXMgb3V0LW9mLWInAG9zACEAAABrGBEiOG6kABOABg4EEAAbgRAAG4IQABuDEAAbhBAAE6D8AhFGWAQANAcRZiIHETrNAFNzIHBlcsoAcGlzIGdyZWF+BFJ0aGFuIN8MdSBvZiByb3dQADFLAACTFg+8ATsC9gQAvAEEaAAi1QC4BgQQABPW0AMEEAAb3SAAG8oQAEDLAAAAfAEEEAAAEAYIIAAfwBAAAADYAFPRcBAAVgwAAEgBBBAAAGYNCBAAAGwGCBAAIjwA4AYIEAAIIAAbTRAAG04QABtPEAAbURAAG1IQABtVcAAAEAAIIAAxigAA7AIxWHAQLg4EGAAizAAcCwQQAFe3AAAAFhAAMbYAAMwIBBAAG7UQABu0EAAq8QB4ACL4ALMWkUFkYW03IHBhcxEDAUYCVGFuZ2U6AgkEwggVQqkGQCcxNieFAgCDBhF2xQY0Zm9yJwCFZCBpbWFnZXNoAABAAwBkCQQQAABUAwDIAB//mQI7UHV0aWxzmAIibHFHF+85AwAAGQBBwOLBAAvYFO4ECQQyAB8zLgwzC5kABIoIEW1XYFPYcRAAXZ4DAPYBD2wAQ0B6bGliDAEkAABwABN7lgMEEAAihwCKB0BObyBtZQjAZm9yd2FyZCBwcm9nvwhQIG1hZGVhCAJBCSAgZFoAMGluZzQABEQAE5VUACxhc1gT8wBzdGVwICE9IDAAyHIQAH4oAA9cAQEAkRoP0Ro2QWNvcmUWAAB5EqAvYWRhcHRlcnMvjgDBX2J5LnJzY2FuJ3QgmRIiIGm1BwKvAlAgd2l0aP8CA8YCEAABAEDLcxAA1ggy+HMQGgYSdMoKQJx0EAAOCQD+DgDUACKsc0YM8AHGcxAABQAAAHdyb25nIGRhaQ03aXplngkBnQkdYS8BYGAobGVmdDEBEHLPCFApYAogIBIAYjogYGAsChUAAAwAQlplcm/IBgF8A3FhbGxvd2VkFgAgaGUlAAgXAFEAAFR0ELoGMXZ0EGwCE4jAAAOuDSMKSYMKcWNvbWJpbmGTACBvZpIKEy3pA0AnIGFuIABBbG9yLbcKNicnAAABItcKUgQP1AFTYnNsaWNlL0YD8rkwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OfoGAVwCEgBmCDEjAAAiBQA2BQAQAAR2CBF7pwIB/AEC6wEBlQGAVHlwZWJpdESuAaNsaW5lU2l6ZX1NuAUB5wIQcgUhEnfgBAC6DwAIAgQQAADmAgByBhBJVgkAZgkRYn4PUCBmdWxs6AMEKAAbmTgAIvIAwgUQRZUJUCEgVHJ5bwAgdG9ABiBwdYgJCXkgAFsDoSBmb3Jnb3R0ZW4YA9AhaWYgeW91IGVuY291fgBSIHRoaXPmCfAHLCBwbGVhc2UgZmlsZSBhbiBpc3N1ZSgBBIAAAJAXALoGBBAAIhwBySAEEAATHY0dBBAAAJEjAEoHDKgCD2wFHB1kWBYTY+wNUi5yc7B3MBYi7AVuDQxsAADUAh91FAM1AOIDEWMXAPIEdmVjLnJzOiwiiHgQAFsAAAAxCGkfEGlWAQDUARBlVAEPOgsHBDgAIjkG5AH0AVx0XHJcblxmXGJcXFwiAAAgACI7CFoJDNgAD0QBHPECc2VyZGVfanNvbi0xLjAuNjIyABFzUgryAFtdAAAAknkQAFoAAAAHAXAAIGZhIwUAXQIBzwI2IHdoJxKiJHkQAG4AAABrBUgDDJwAADQBD3QBNjFzdGQVACNpb4QEDG4ADwoBHA5OAgHhAAAJAQRYA1BoZSB3cg4QEmT9AERyIGlzlgkgLlQxA49pcyBhIGJ1ZzQDAwDEAwRQASLzAAQDBBAAItcAwg+T9XoQAHAAAADmHgqieHoQAH0AAAA2ARAADOYAABQBD1QBQQLSASBlZAkAEXJvEA9jAQAAPQAPfQBBMWltcDwK8wIwMTIzNDU2Nzg5YWJjZGVmdQEAYGJ0bnVmcgoACgEAAKMF8AVB0ffBAAsBXABB+PjBAAuKB2NhbLICMGBPcFEHQDo6dW7FAaAoKWAgb24gYSBghg9iYCB2YWx1GBEAAQAAlgcAQggweHwQDwAyAMx8uBSM7AEAAB4AAAC0AGBwYW5pY2sHApNyc290aGVyIG8+BQWPEwK6EgLfFQE+AqAgemVyb3RpbWVkqAUEfxIAjgUEDAAgaW6+BSBwYSAPJ3RlSwBDd291bM4FkGVudGl0eSBhbKUB8Ad5IGV4aXN0c2Jyb2tlbiBwaXBlYWRkEgUCiQhAdmFpbKABBBUAYGluIHVzZRsAUGNvbm5lEwkDCQAAZgBKYWJvchIAWXJlc2V0EACBZnVzZWRwZXIGA5NvbiBkZW5pZWSVAABZAAHcEyV1bnIJAaMUEWYYAwbQALZzdWNjZXNzZnVsAHQBMUB+EKcpE0uwFCQgKFQBYCApS2luZKwBABgAAAQAAKocYk9zY29kZdoKEwQEAACMDrFraW5kbWVzc2FnZcIEBN4HqjgAAABDdXN0b200AACgDgFnABoAGAAAfBEVVckAcEVvZk5vdEbeABVQ/wARRP4AFUMhARJSIAEIEQA2c2V0DwASQWIBJE5vFACwZWRBZGRySW5Vc2UJAEROb3RBtAERQtQBcFBpcGVBbHLsARFF6wEQVwsCEEIKAgM+ChBJNQIDDADQRGF0YVRpbWVkT3V0V3QCVlplcm9JiAIQT6sCcW51bGwgcG+fAhAgdw4C3wUAnAOQcmVjdXJzaXZlJwIAtwHwAGFuIG9iamVjdCBkZXRlY9EBU3doaWNokgIAWgIAPACAdW5zYWZlIGEmBACLCCFpbk8A8AoAewlwcm9kdWNlcnMCCGxhbmd1YWdlAQRSHABADHBybwUCcGVkLWJ5AwUwAPA+Yx0xLjUwLjAgKGNiNzVhZDVkYiAyMDIxLTAyLTEwKQZ3YWxydXMGMC4xOC4wDHdhc20tYmluZGdlbhIwLjIuNzAgKGI2MzU1YzI3MCk="), (A)=>A.charCodeAt(0)
));
let B1, Q1 = new TextDecoder("utf-8", {
    ignoreBOM: !0,
    fatal: !0
});
Q1.decode();
let E1 = null;
function g1() {
    return null !== E1 && E1.buffer === B1.memory.buffer || (E1 = new Uint8Array(B1.memory.buffer)), E1;
}
function I1(A, B) {
    return Q1.decode(g1().subarray(A, A + B));
}
const C1 = new Array(32).fill(void 0);
C1.push(void 0, null, !0, !1);
let w1 = C1.length;
function D1(A) {
    w1 === C1.length && C1.push(C1.length + 1);
    const B = w1;
    return w1 = C1[B], C1[B] = A, B;
}
function F(A) {
    return C1[A];
}
function M(A) {
    A < 36 || (C1[A] = w1, w1 = A);
}
function G(A) {
    const B = F(A);
    return M(A), B;
}
async function i(A, B) {
    if ("function" == typeof Response && A instanceof Response) {
        if ("function" == typeof WebAssembly.instantiateStreaming) try {
            return await WebAssembly.instantiateStreaming(A, B);
        } catch (B2) {
            if ("application/wasm" == A.headers.get("Content-Type")) throw B2;
            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", B2);
        }
        const Q = await A.arrayBuffer();
        return await WebAssembly.instantiate(Q, B);
    }
    {
        const Q = await WebAssembly.instantiate(A, B);
        return Q instanceof WebAssembly.Instance ? {
            instance: Q,
            module: A
        } : Q;
    }
}
async function o1(A) {
    void 0 === A && (A = importMeta1.url.replace(/\.js$/, "_bg.wasm"));
    const Q = {
        wbg: {
        }
    };
    Q.wbg.__wbindgen_string_new = function(A, B) {
        return D1(I1(A, B));
    }, Q.wbg.__wbindgen_json_parse = function(A, B) {
        return D1(JSON.parse(I1(A, B)));
    }, Q.wbg.__wbindgen_throw = function(A, B) {
        throw new Error(I1(A, B));
    }, Q.wbg.__wbindgen_rethrow = function(A) {
        throw G(A);
    }, ("string" == typeof A || "function" == typeof Request && A instanceof Request || "function" == typeof URL && A instanceof URL) && (A = fetch(A));
    const { instance: E , module: g  } = await i(await A, Q);
    return B1 = E.exports, o1.__wbindgen_wasm_module = g, B1;
}
await o1(source1);
class WatchfaceParser {
    #bin;
    #view;
    #offset;
    constructor(bin){
        this.#bin = bin;
        this.#view = new DataView(bin.buffer);
        this.#offset = 0;
    }
     #readCString() {
        let str = "";
        let __byte;
        while((__byte = this.#bin[this.#offset++]) != 0){
            str += String.fromCharCode(__byte);
        }
        return str;
    }
    parse() {
        trace("Start Parsing");
        const header = this.parseHeader();
        trace("Parsed Header.");
        trace("  Sign:", header.sign);
        trace("  ParamSIze:", header.paramsSize);
        trace("  Band:", BandType1[header.band]);
        trace("Parsing Param (Descriptor) List, Offset:", this.#offset);
        incrIdent();
        const params = this.parseParamList(BigInt(header.paramsSize));
        decrIdent();
        trace("Parsed! Offset:", this.#offset);
        const mainParam = params.find((e)=>e.id === 1
        );
        const paramTableLength = mainParam.children.find((e)=>e.id === 1
        ).value;
        const resourceCount = mainParam.children.find((e)=>e.id === 2
        ).value;
        trace("Param Table Length:", paramTableLength);
        trace("Resource Count:", resourceCount);
        const table = {
        };
        const storedOffset = this.#offset;
        trace("Store Offset:", storedOffset);
        const storedBin = this.#bin;
        const tableBuffer = storedBin.subarray(storedOffset, storedOffset + Number(paramTableLength));
        this.#bin = tableBuffer;
        this.#view = new DataView(storedBin.buffer, storedOffset, storedOffset + Number(paramTableLength));
        this.#offset = 0;
        for (const param of params){
            if (param.id === mainParam.id) continue;
            trace("Parse Table of Descriptor", param.id, "and Offset:", this.#offset, " and Real:", storedOffset + this.#offset);
            const offset = Number(param.children.find((e)=>e.id === 1
            ).value);
            const size = param.children.find((e)=>e.id === 2
            ).value;
            trace("  Offset:", offset);
            trace("  Size:", size);
            incrIdent();
            table[param.id] = this.parseParamList(size);
            decrIdent();
            trace("Parsed Table! Offset:", this.#offset);
        }
        this.#offset = storedOffset + Number(paramTableLength);
        this.#bin = storedBin;
        this.#view = new DataView(this.#bin.buffer);
        trace("Parsing Resource Offsets... Current Offset:", this.#offset);
        const resourceOffsets = [];
        for(let i = 0; i < resourceCount; i++){
            const offset = this.#view.getUint32(this.#offset, true);
            resourceOffsets.push(offset);
            trace("Resource Offset for", i, "is", offset);
            this.#offset += 4;
        }
        const resources = [];
        trace("Parsing Resources... Offset:", this.#offset);
        let totalSize = 0;
        for(let i1 = 0; i1 < resourceCount; i1++){
            const currOffset = this.#offset;
            resources.push(this.parseResource(i1));
            const size = this.#offset - currOffset;
            assertEquals(totalSize, resourceOffsets[i1]);
            totalSize += size;
        }
        return {
            band: header.band,
            params: mapParams(table),
            resources
        };
    }
    sign;
    paramsSize;
    band;
    parseHeader() {
        const sign = this.#readCString();
        if (sign === "UIHH\x01") {
            this.#offset = 79;
        } else {
            assertEquals(sign, SIGN_STRING1);
            const restSignAreaLength = 32 - (sign.length + 1);
            const restSignArea = new Uint8Array(this.#bin.buffer, this.#offset, restSignAreaLength);
            assertEquals(restSignArea.every((v)=>v === 255
            ), true);
            this.#offset += restSignAreaLength;
        }
        const band = this.#view.getUint32(this.#offset, true);
        this.#offset += 4;
        const paramsSize = this.#view.getUint32(this.#offset, true);
        this.#offset += 4;
        this.sign = sign;
        this.paramsSize = paramsSize;
        this.band = band;
        return {
            sign,
            band,
            paramsSize
        };
    }
    parseParam() {
        trace("Parse Param. Offset:", this.#offset);
        const __byte = this.#bin[this.#offset++];
        trace("  Raw ID:", __byte);
        const id = (__byte & 248) >> 3;
        if (id < 1) {
            throw new Error("Invalid parameter. Offset: " + this.#offset.toString(16));
        }
        trace("  ID:", id);
        const flags = __byte & 7;
        trace("  Flags:", flags);
        let size = 1;
        let value = 0n;
        let i = this.#bin[this.#offset++];
        let offset = 0;
        let children = [];
        while((i & 128) > 0){
            if (size > 9) throw new Error("Invalid parameter value");
            value |= BigInt(i & 127) << BigInt(offset);
            i = this.#bin[this.#offset++];
            offset += 7;
            size++;
        }
        value |= BigInt(i & 127) << BigInt(offset);
        size++;
        trace("  Value:", value);
        if ((flags & ParamFlag1.HAS_CHILDREN) === ParamFlag1.HAS_CHILDREN) {
            trace("Has Children. Parsing");
            incrIdent();
            children = this.parseParamList(value);
            decrIdent();
        }
        trace("Parsed Param! Offset:", this.#offset);
        return {
            id,
            flags,
            size,
            value,
            children
        };
    }
    parseParamList(size) {
        const params = [];
        let paramSizeAcum = 0n;
        while(paramSizeAcum < size){
            const param = this.parseParam();
            params.push(param);
            paramSizeAcum += totalParamSize(param);
        }
        return params;
    }
    parseResource(id) {
        const sign = new TextDecoder().decode(this.#bin.subarray(this.#offset, this.#offset + 2));
        assertEquals(sign, "BM");
        this.#offset += 2;
        this.#offset += 2;
        const header = this.parseResourceHeader();
        let palette;
        if (header.paletteColors > 0) {
            palette = [];
            for(let i = 0; i < header.paletteColors; i++){
                const r = this.#view.getUint8(this.#offset++);
                const g = this.#view.getUint8(this.#offset++);
                const b = this.#view.getUint8(this.#offset++);
                this.#offset++;
                palette.push({
                    r,
                    g,
                    b,
                    a: header.transparency > 0 && i == 0 ? 0 : 255
                });
            }
        }
        let data;
        if (header.type === ResourceType1.PALETTE) {
            assertExists(palette);
            data = new Uint8Array(header.width * header.height * 4);
            trace("Start Reading Palette Image at:", this.#offset);
            for(let y = 0; y < header.height; y++){
                for(let x = 0; x < header.width; x++){
                    const idx = this.#view.getUint8(this.#offset);
                    const color = palette[idx];
                    if (color === undefined) {
                        throw new Error(`Expected palette color at index ${idx} but palette has ${palette.length} elements. Offset: ${this.#offset}, X: ${x}, Y: ${y}`);
                    }
                    this.#offset++;
                    data.set([
                        color.r,
                        color.g,
                        color.b,
                        color.a
                    ], (y * header.width + x) * 4);
                }
            }
        } else if (header.type === ResourceType1.BIT_8) {
            data = new Uint8Array(header.width * header.height * 4);
            for(let y = 0; y < header.height; y++){
                for(let x = 0; x < header.width; x++){
                    const color = this.#view.getUint8(this.#offset++);
                    data.set([
                        color,
                        color,
                        color,
                        255
                    ], (y * header.width + x) * 4);
                }
            }
        } else if (header.type === ResourceType1.BIT_16) {
            data = new Uint8Array(header.width * header.height * 4);
            for(let y = 0; y < header.height; y++){
                for(let x = 0; x < header.width; x++){
                    const first = this.#view.getUint8(this.#offset++);
                    const second = this.#view.getUint8(this.#offset++);
                    const r = (first & 31) << 3;
                    const g = (first >> 5 & 7 | (second & 7) << 3) << 2;
                    const b = (second >> 3 & 31) << 3;
                    data.set([
                        r,
                        g,
                        b,
                        255
                    ], (y * header.width + x) * 4);
                }
            }
        } else if (header.type === ResourceType1.BIT_24) {
            data = new Uint8Array(header.width * header.height * 4);
            for(let y = 0; y < header.height; y++){
                for(let x = 0; x < header.width; x++){
                    const a = this.#view.getUint8(this.#offset++);
                    const first = this.#view.getUint8(this.#offset++).toString(2).padStart(8, "0");
                    const second = this.#view.getUint8(this.#offset++).toString(2).padStart(8, "0");
                    const bits = first + second;
                    const b = parseInt(bits.substr(0, 5), 2) << 3;
                    const g = parseInt(bits.substr(5, 6), 2) << 2;
                    const r = parseInt(bits.substr(11, 5), 2) << 3;
                    data.set([
                        r,
                        g,
                        b,
                        255 - a
                    ], (y * header.width + x) * 4);
                }
            }
        } else if (header.type === ResourceType1.BIT_32) {
            data = new Uint8Array(header.width * header.height * 4);
            for(let y = 0; y < header.height; y++){
                for(let x = 0; x < header.width; x++){
                    const a = this.#view.getUint8(this.#offset++) & 255;
                    const r = this.#view.getUint8(this.#offset++) & 255;
                    const g = this.#view.getUint8(this.#offset++) & 255;
                    const b = this.#view.getUint8(this.#offset++) & 255;
                    data.set([
                        r,
                        g,
                        b,
                        255 - a
                    ], (y * header.width + x) * 4);
                }
            }
        } else throw new Error("unreachable");
        return {
            id,
            ...header,
            palette,
            data
        };
    }
    parseResourceHeader() {
        const width = this.#view.getUint16(this.#offset, true);
        this.#offset += 2;
        const height = this.#view.getUint16(this.#offset, true);
        this.#offset += 2;
        const rowLength = this.#view.getUint16(this.#offset, true);
        this.#offset += 2;
        const bitsPerPixel = this.#view.getUint16(this.#offset, true);
        this.#offset += 2;
        const paletteColors = this.#view.getUint16(this.#offset, true);
        this.#offset += 2;
        assertEquals(paletteColors <= 256, true);
        const transparency = this.#view.getUint16(this.#offset, true);
        this.#offset += 2;
        let type;
        if (paletteColors > 0) {
            type = ResourceType1.PALETTE;
        } else {
            switch(bitsPerPixel){
                case 8:
                    type = ResourceType1.BIT_8;
                    break;
                case 16:
                    type = ResourceType1.BIT_16;
                    break;
                case 24:
                    type = ResourceType1.BIT_24;
                    break;
                case 32:
                    type = ResourceType1.BIT_32;
                    break;
                default:
                    throw new Error("Invalid resource type");
            }
        }
        trace("Parse Resource Header");
        trace("  Type:", type);
        trace("  Width:", width);
        trace("  Height:", height);
        trace("  Row Length:", rowLength);
        trace("  Bits Per Pixel:", bitsPerPixel);
        trace("  Palette Colors:", paletteColors);
        trace("  Transparency:", transparency);
        return {
            type,
            width,
            height,
            rowLength,
            bitsPerPixel,
            paletteColors,
            transparency
        };
    }
}
function parse1(buffer) {
    return new WatchfaceParser(buffer).parse();
}
export { parse1 as parse };
class Writer extends Array {
    writeCString(str) {
        this.push(...new TextEncoder().encode(str), 0);
        return str.length + 1;
    }
    writeUint32LE(value) {
        this.push(value & 255, value >> 8 & 255, value >> 16 & 255, value >> 24 & 255);
        return 4;
    }
    writeUint16LE(value) {
        this.push(value & 255, value >> 8 & 255);
        return 2;
    }
    writeHeader(paramSize, band) {
        trace("Writing Header");
        if (band === BandType1.BAND_4) {
            const written = this.writeCString(SIGN_STRING1);
            for(let i = 0; i < 32 - written; i++)this.push(255);
        } else if (band === BandType1.BAND_6 || band === BandType1.BAND_5) {
            const header = new Uint8Array([
                85,
                73,
                72,
                72,
                1,
                0,
                255,
                255,
                255,
                255,
                255,
                1,
                228,
                153,
                62,
                0,
                62,
                0,
                209,
                175,
                0,
                0,
                31,
                34,
                17,
                0,
                255,
                255,
                255,
                255,
                255,
                255,
                0,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255, 
            ]);
            if (band === BandType1.BAND_5) {
                header.set([
                    17,
                    13,
                    61,
                    0,
                    61,
                    0
                ], 12);
                const randomBytes = new Uint8Array(4);
                crypto.getRandomValues(randomBytes);
                header.set(randomBytes, 18);
                header.set([
                    224,
                    127,
                    5,
                    0
                ], 22);
            } else if (band === BandType1.BAND_6) {
                const randomBytes1 = new Uint8Array(2);
                const randomBytes2 = new Uint8Array(2);
                crypto.getRandomValues(randomBytes1);
                crypto.getRandomValues(randomBytes2);
                header.set(randomBytes1, 12);
                header.set(randomBytes2, 18);
            }
            this.push(...header);
        } else throw new Error(`Invalid Band Type: ${band}`);
        trace("  Band:", BandType1[band]);
        this.writeUint32LE(band);
        trace("  Param Size:", paramSize);
        this.writeUint32LE(paramSize);
    }
    writeParam({ id , value , children  }) {
        trace("Write Param, curent offset:", this.length);
        trace("  ID:", id);
        trace("  Value:", value);
        const flags = children && children.length ? ParamFlag1.HAS_CHILDREN : ParamFlag1.NONE;
        const rawID = id << 3 | flags;
        trace("  Raw ID:", rawID);
        this.push(rawID);
        let size = 1;
        if (children && children.length) {
            const cw = new Writer();
            trace("Writing Children");
            incrIdent();
            let childsize = 0;
            for (const child of children){
                childsize += cw.writeParam(child);
            }
            decrIdent();
            trace("Written Children! Size:", size);
            size += this.writeParamValue(BigInt(childsize));
            this.push(...cw);
            size += childsize;
        } else if (value !== undefined) {
            const valsize = this.writeParamValue(value);
            size += valsize;
            trace("  Value Size:", valsize);
        } else {
            throw new Error("Invalid param " + Deno.inspect({
                id,
                value,
                children
            }));
        }
        return size;
    }
    writeParamValue(value) {
        let size = 0;
        let __byte;
        while(value >= 128n){
            __byte = Number(value & 127n | 128n);
            this.push(__byte);
            size++;
            value >>= 7n;
        }
        __byte = Number(value & 127n);
        this.push(__byte);
        size++;
        return size;
    }
    writeResource(res) {
        trace("Write Resource");
        let size = 0;
        this.push(...new TextEncoder().encode("BM"));
        size += 2;
        this.push(100, 0);
        size += 2;
        size += this.writeUint16LE(res.width);
        size += this.writeUint16LE(res.height);
        trace("  Width:", res.width);
        trace("  Height:", res.height);
        const { type , bits , palette , transparency  } = this.getResourceInfo(res.data, res.height, res.width);
        size += this.writeUint16LE(res.width * bits / 8);
        size += this.writeUint16LE(bits);
        size += this.writeUint16LE(palette?.length ?? 0);
        size += this.writeUint16LE(transparency);
        trace("  Bits:", bits);
        trace("  Palette:", palette?.length ?? 0);
        trace("  Transparency:", transparency);
        if (palette && palette.length) {
            for(const _ in palette){
                const i = Number(_);
                const c = palette[i];
                this.push(c.r, c.g, c.b, 0);
                size += 4;
            }
        }
        switch(type){
            case ResourceType1.BIT_8:
                for(let i = 0; i < res.data.length; i += 4){
                    this.push(res.data[i]);
                    size++;
                }
                break;
            case ResourceType1.BIT_16:
                for(let i1 = 0; i1 < res.data.length; i1 += 4){
                    const r = res.data[i1];
                    const g = res.data[i1 + 1];
                    const b = res.data[i1 + 2];
                    const b1 = r >> 3 << 3;
                    const b2 = g >> 2 << 2;
                    const b3 = b >> 3 << 3;
                    const byte1 = (b3 >> 3 & 31) << 3 | b2 >> 5 & 7;
                    const byte2 = b2 << 3 | b1 >> 3 & 1;
                    this.push(byte1, byte2);
                    size += 2;
                }
                break;
            case ResourceType1.BIT_24:
                for(let i2 = 0; i2 < res.data.length; i2 += 4){
                    const r = res.data[i2];
                    const g = res.data[i2 + 1];
                    const b = res.data[i2 + 2];
                    const a = res.data[i2 + 3];
                    this.push(255 - a);
                    const byte1 = b & 248 | (g & 224) >> 5;
                    const byte2 = (g & 28) << 3 | (r & 248) >> 3;
                    this.push(byte1, byte2);
                    size += 3;
                }
                break;
            case ResourceType1.BIT_32:
                for(let i3 = 0; i3 < res.data.length; i3 += 4){
                    const r = res.data[i3];
                    const g = res.data[i3 + 1];
                    const b = res.data[i3 + 2];
                    const a = res.data[i3 + 3];
                    this.push(255 - a, r, g, b);
                    size += 4;
                }
                break;
            case ResourceType1.PALETTE:
                for(let i4 = 0; i4 < res.data.length; i4 += 4){
                    let r = res.data[i4];
                    let g = res.data[i4 + 1];
                    let b = res.data[i4 + 2];
                    const a = res.data[i4 + 3];
                    const paletteIndex = palette.findIndex((e)=>e.r === r && e.g === g && e.b === b && e.a === a
                    );
                    assertEquals(paletteIndex > -1, true);
                    this.push(paletteIndex);
                    size++;
                }
                break;
        }
        return size;
    }
    getResourceInfo(data, height, width) {
        assertEquals(data.byteLength % 4, 0);
        const res = {
            type: ResourceType1.BIT_32,
            bits: 32,
            transparency: 0,
            palette: []
        };
        function addColor(r, g, b, a) {
            const u32 = r << 24 | g << 16 | b << 8 | a;
            const u24 = r << 16 | g << 8 | b;
            const exists = res.palette.find((c)=>c.u32 === u32
            );
            const exists24 = res.palette.find((c)=>c.u24 === u24
            );
            const color = {
                r,
                g,
                b,
                a,
                u32,
                u24
            };
            if (!exists) res.palette.push(color);
            return {
                exists,
                exists24,
                ...color
            };
        }
        for(let i = 0; i < data.byteLength; i += 4){
            addColor(data[i], data[i + 1], data[i + 2], data[i + 3]);
        }
        const pixels = width * height;
        const possible = [
            {
                type: ResourceType1.BIT_32,
                bits: 32,
                size: 4 * pixels
            }, 
        ];
        const index = res.palette.findIndex((e)=>e.a !== 255
        );
        const bits = this.getPossibleBits(res.palette);
        if (bits.includes(8) && index < 0) {
            possible.push({
                type: ResourceType1.BIT_8,
                bits: 8,
                size: pixels
            });
        }
        if (bits.includes(16) && index < 0) {
            possible.push({
                type: ResourceType1.BIT_16,
                bits: 16,
                size: pixels * 2
            });
        }
        if (bits.includes(24) && index < 0) {
            possible.push({
                type: ResourceType1.BIT_24,
                bits: 24,
                size: pixels * 3
            });
        }
        if (res.palette.length <= 256 && res.palette.filter((e)=>e.a === 0
        ).length <= 1) {
            possible.push({
                type: ResourceType1.PALETTE,
                bits: 8,
                size: res.palette.length * 4 + pixels
            });
        }
        possible.sort((a, b)=>a.size - b.size
        );
        const fmt = possible[0];
        res.type = fmt.type;
        res.bits = fmt.bits;
        if (res.type === ResourceType1.PALETTE) {
            if (index > -1) {
                const [color] = res.palette.splice(index, 1);
                res.palette.unshift(color);
                res.transparency = 1;
            }
        }
        return {
            type: res.type,
            bits: res.bits,
            transparency: res.transparency,
            palette: res.type === ResourceType1.PALETTE ? res.palette.map((e)=>({
                    r: e.r,
                    g: e.g,
                    b: e.b,
                    a: e.a
                })
            ) : undefined
        };
    }
    getPossibleBits(colors) {
        let bit8 = true;
        let bit16 = true;
        let bit24 = true;
        for (const color of colors){
            if (bit8) {
                if (color.b !== color.g || color.g !== color.r) bit8 = false;
            }
            if (bit16 || bit24) {
                if (color.b != (color.b & 248) || color.r != (color.r & 248) || color.g != (color.g & 252)) {
                    bit16 = false;
                    bit24 = false;
                }
            }
        }
        const bits = [];
        if (bit8) bits.push(8);
        if (bit16) bits.push(16);
        if (bit24) bits.push(24);
        return bits;
    }
    build() {
        return new Uint8Array(this);
    }
}
function pack1({ params: mappedParams , resources , band  }) {
    const params = reverseMapParams(mappedParams);
    const data = new Writer();
    const paramDescriptors = new Writer();
    const paramTable = new Writer();
    for (const [id, value] of Object.entries(params)){
        let offset = paramTable.length;
        let size = 0;
        trace("Write Param Table for", id);
        incrIdent();
        for (const e of value){
            const psize = paramTable.writeParam(e);
            trace("Add size", psize);
            size += psize;
        }
        decrIdent();
        trace("Write Param Desc with offset:", offset, "and size:", size);
        paramDescriptors.writeParam({
            id: Number(id),
            children: [
                {
                    id: 1,
                    value: BigInt(offset)
                },
                {
                    id: 2,
                    value: BigInt(size)
                }, 
            ]
        });
    }
    const mainParam = new Writer();
    trace("Write Main Param");
    incrIdent();
    mainParam.writeParam({
        id: 1,
        children: [
            {
                id: 1,
                value: BigInt(paramTable.length)
            },
            {
                id: 2,
                value: BigInt(resources.length)
            }, 
        ]
    });
    decrIdent();
    trace("Written!");
    data.writeHeader(mainParam.length + paramDescriptors.length, band);
    data.push(...mainParam, ...paramDescriptors);
    data.push(...paramTable);
    const resourceOffsets = new Writer();
    const res = new Writer();
    let offset = 0;
    for (const resource of resources){
        resourceOffsets.writeUint32LE(offset);
        offset += res.writeResource(resource);
    }
    data.push(...resourceOffsets);
    const u8 = new Uint8Array(data.length + res.length);
    u8.set(data, 0);
    u8.set(res, data.length);
    return u8;
}
export { pack1 as pack };
