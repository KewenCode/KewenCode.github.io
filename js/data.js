let Data = {
  group: '南京公共交通（集团）有限公司',
  groupEn: 'NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD',
  company: '江南公交',
  lineNo: '42',
  price: [2, 0],
  isSeg: false,
  isSel: false,

  point: {
    'A': {
      name: '金域中央总站',
      startTime: '06:00',
      endTime: '22:30',
    },
    'Z': {
      name: '银城花园',
      startTime: '05:30',
      endTime: '21:45',
    },
  },
  station: {
    0: {
      name: '金域中央总站',
      isStart: true,
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    1: {
      name: '纬一路（金域中央）',
      isSingle: true,
      sign: {
        direction: 0
      }
    },
    2: {
      name: '纬一路',
      isSingle: true,
      sign: {
        direction: 0
      }
    },
    3: {
      name: '幕府新村'
    },
    4: {
      name: '五塘村',
      isMetro: true,
      metro: ['3']
    },
    5: {
      name: '五佰村路'
    },
    6: {
      name: '干休所'
    },
    7: {
      name: '河路道'
    },
    8: {
      name: '中央门北',
      isMetro: true,
      metro: ['3']
    },
    9: {
      name: '中央门西',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    10: {
      name: '金桥市场'
    },
    11: {
      name: '钟阜路·城河村'
    },
    12: {
      name: '钟阜路(市第二医院)'
    },
    13: {
      name: '新门口(新亚苑)'
    },
    14: {
      name: '福建路'
    },
    15: {
      name: '三牌楼大街北'
    },
    16: {
      name: '和会街'
    },
    17: {
      name: '新模范马路·虹桥'
    },
    18: {
      name: '西流湾公园',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    19: {
      name: '中山北路·虹桥',
      isSingle: true,
      sign: {
        direction: 0
      }
    },
    20: {
      name: '傅佐路'
    },
    21: {
      name: '江苏路'
    },
    22: {
      name: '莫干路'
    },
    23: {
      name: '玉泉路'
    },
    24: {
      name: '江苏省委'
    },
    25: {
      name: '北京西路·草场门',
      isMetro: true,
      metro: ['4']
    },
    26: {
      name: '草场门大桥东',
      isMetro: true,
      metro: ['4']
    },
    27: {
      name: '龙江小区(龙江宾馆)'
    },
    28: {
      name: '江东北路·草场门大街',
      isSingle: true,
      sign: {
        direction: 1
      },
      isMetro: true,
      metro: ['4']
    },
    29: {
      name: '江东北路·闽江路',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    30: {
      name: '中保村',
      isSingle: true,
      sign: {
        direction: 0
      }
    },
    31: {
      name: '漓江路',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    32: {
      name: '银城街'
    },
    33: {
      name: '银城花园',
      isEnd: true
    },
  }
}