const LineBlank = {
  group: '',
  groupEn: '',
  company: '',
  compColor: { name: 'JN', main: 0X1F2677, line: 0X116DB0, stroke: 0X003F97, fill: 0XFFFFFF, strokeVer: 0XFF0000 },
  lineNo: { main: "", append: "路线路图", "type": null, "icon": 0 },
  price: [],
  isSeg: false,
  isSel: false,
  point: {
    'A': {
      name: '',
      startTime: '',
      endTime: '',
    },
    'Z': {
      name: '',
      startTime: '',
      endTime: '',
    },
  },
  station: {}
}

const Line18 = {
  group: '南京公共交通 (集团) 有限公司',
  groupEn: 'NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD',
  company: '江南公交',
  compColor: { name: 'JN', main: 0X1F2677, line: 0X116DB0, stroke: 0X003F97, fill: 0XFFFFFF, strokeVer: 0XFF0000 },
  lineNo: { main: '18', append: "路线路图", "type": null, "icon": 0 },
  price: [2, 2],
  isSeg: false,
  isSel: false,

  point: {
    'A': {
      name: '金域中央总站',
      startTime: '05:30',
      endTime: '22:30',
    },
    'Z': {
      name: '新街口·石鼓路',
      startTime: '05:30',
      endTime: '23:00',
    },
  },
  station: {
    0: {
      name: '金域中央总站',
      isStart: true
    },
    1: {
      name: '戎军路南'
    },
    2: {
      name: '孙家洼路西'
    },
    3: {
      name: '幕府南路北'
    },
    4: {
      name: '大庙村'
    },
    5: {
      name: '水关桥'
    },
    6: {
      name: '水关桥西'
    },
    7: {
      name: '机务段'
    },
    8: {
      name: '南京西站'
    },
    9: {
      name: '热河路'
    },
    10: {
      name: '热河南路'
    },
    11: {
      name: '南医大二附院'
    },
    12: {
      name: '农贸中心'
    },
    13: {
      name: '江东北路·三汊河'
    },
    14: {
      name: '江东北路·定淮门大街'
    },
    15: {
      name: '江东北路·龙园北路'
    },
    16: {
      name: '省妇幼保健院',
      isMetro: true,
      metroMerge: true,
      metro: ['4'],
      isSingle: true,
      sign: {
        direction: 0
      }
    },
    17: {
      name: '江东北路·草场门大街',
      isMetro: true,
      metroMerge: true,
      metro: ['4']
    },
    18: {
      name: '江东北路·闽江路'
    },
    19: {
      name: '江东北路·清凉门大街'
    },
    20: {
      name: '中心南村(江苏省国医馆)'
    },
    21: {
      name: '凤凰花园城'
    },
    22: {
      name: '凤凰三村'
    },
    23: {
      name: '鱼苗塘'
    },
    24: {
      name: '凤凰西街'
    },
    25: {
      name: '凤凰街'
    },
    26: {
      name: '汉中路·汉中门',
      isMetro: true,
      metroMerge: true,
      metro: ['2']
    },
    27: {
      name: '汉中路·莫愁路',
      isMetro: true,
      metroMerge: true,
      metro: ['2']
    },
    28: {
      name: '新街口西',
      isMetro: true,
      metroMerge: true,
      metro: ['1', '2']
    },
    29: {
      name: '新街口·石鼓路',
      isMetro: true,
      metroMerge: true,
      metro: ['1', '2'],
      isEnd: true
    },
  }
}

const Line42 = {
  group: '南京公共交通 (集团) 有限公司',
  groupEn: 'NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD',
  company: '江南公交',
  compColor: { name: 'JN', main: 0X1F2677, line: 0X116DB0, stroke: 0X003F97, fill: 0XFFFFFF, strokeVer: 0XFF0000 },
  lineNo: { main: '42', append: "路线路图", "type": null, "icon": 0 },
  price: [2, 2],
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

const Line206 = {
  group: '南京公共交通 (集团) 有限公司',
  groupEn: 'NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD',
  company: '',
  compColor: { name: 'JN', main: 0X1F2677, line: 0X116DB0, stroke: 0X003F97, fill: 0XFFFFFF, strokeVer: 0XFF0000 },
  lineNo: { main: '206', append: "路线路图\n及\n计价站点", "type": 1, "icon": 0 },
  price: [3, 2],
  isSeg: true,
  isSel: false,

  point: {
    'A': {
      name: '南京站·北广场东',
      startTime: '05:30',
      endTime: '22:00',
    },
    'Z': {
      name: '栖霞(五福家园)',
      startTime: '05:30',
      endTime: '21:15',
    },
  },
  station: {
    0: {
      name: '南京站·北广场东',
      isStart: true,
      isMetro: true,
      metro: ['1', '3'],
      isPriSeg: true,
      peiSeg: { "direction": 1, "price": 3 }
    },
    1: {
      name: '曹后村西',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    2: {
      name: '新庄广场东',
      isMetro: true,
      metro: ['3']
    },
    3: {
      name: '玄武大道·长途东站'
    },
    4: {
      name: '樱铁村'
    },
    5: {
      name: '伊刘邨'
    },
    6: {
      name: '王家湾',
      isPriSeg: true,
      peiSeg: { "direction": 1, "price": 2 }
    },
    7: {
      name: '环陵路·岔路口',
      isMetro: true,
      metro: ['4']
    },
    8: {
      name: '外贸仓库'
    },
    9: {
      name: '三元祠'
    },
    10: {
      name: '尧化门市民广场'
    },
    11: {
      name: '尧化新村西',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    12: {
      name: '尧化新村'
    },
    13: {
      name: '省人民医院栖霞分院'
    },
    14: {
      name: '尧化门总站',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    15: {
      name: '尧化门地铁站西',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    16: {
      name: '尧化门总站东',
      isSingle: true,
      sign: {
        direction: 0
      }
    },
    17: {
      name: '前新塘'
    },
    18: {
      name: '尧顺家园南'
    },
    19: {
      name: '仙新路地铁站'
    },
    20: {
      name: '仙新中路南'
    },
    21: {
      name: '十月村',
      isPriSeg: true,
      peiSeg: { "direction": 0, "price": 2 }
    },
    22: {
      name: '十月村东'
    },
    23: {
      name: '南京炼油厂'
    },
    24: {
      name: '戴家库'
    },
    25: {
      name: '南象山'
    },
    26: {
      name: '栖霞山'
    },
    27: {
      name: '栖霞寺'
    },
    28: {
      name: '栖霞（五福家园）',
      isEnd: true,
      isPriSeg: true,
      peiSeg: { "direction": 0, "price": 3 }
    },
  }
}

const Line207 = {
  group: '南京公共交通 (集团) 有限公司',
  groupEn: 'NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD',
  company: '江南公交',
  compColor: { name: 'JN', main: 0X1F2677, line: 0X116DB0, stroke: 0X003F97, fill: 0XFFFFFF, strokeVer: 0XFF0000 },
  lineNo: { main: '207', append: "路线路图", "type": 1, "icon": 0 },
  price: [7, 2],
  isSeg: false,
  isSel: true,

  point: {
    'A': {
      name: '南京站·北广场东',
      startTime: '05:30',
      endTime: '20:30',
    },
    'Z': {
      name: '上坝',
      startTime: '04:40',
      endTime: '18:00',
    },
  },
  station: {
    0: {
      name: '南京站·北广场东',
      isStart: true,
      isMetro: true,
      metro: ['1', '3'],
    },
    1: {
      name: '曹后村西',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    2: {
      name: '新庄广场东',
      isMetro: true,
      metro: ['3']
    },
    3: {
      name: '玄武大道·长途东站'
    },
    4: {
      name: '环陵路·岔路口'
    },
    5: {
      name: '尧化门西'
    },
    6: {
      name: '尧化新村'
    },
    7: {
      name: '尧辰村'
    },
    8: {
      name: '尧化门'
    },
    9: {
      name: '新城金郡'
    },
    10: {
      name: '仙新中路'
    },
    11: {
      name: '南京炼油厂'
    },
    12: {
      name: '栖霞寺'
    },
    13: {
      name: '栖霞山'
    },
    14: {
      name: '栖霞山东'
    },
    15: {
      name: '南水新村'
    },
    16: {
      name: '梅墓'
    },
    17: {
      name: '中梅墓'
    },
    18: {
      name: '下梅墓'
    },
    19: {
      name: '摄山'
    },
    20: {
      name: '赵庄东'
    },
    21: {
      name: '润阳路西'
    },
    22: {
      name: '润阳路'
    },
    23: {
      name: '润阳路东'
    },
    24: {
      name: '小圩'
    },
    25: {
      name: '小农场'
    },
    26: {
      name: '兴隆村'
    },
    27: {
      name: '三兴村'
    },
    28: {
      name: '龙岸花园'
    },
    29: {
      name: '新桥'
    },
    30: {
      name: '油坊'
    },
    31: {
      name: '顾家村'
    },
    32: {
      name: '花园'
    },
    33: {
      name: '南京综保区'
    },
    34: {
      name: '叶庄'
    },
    35: {
      name: '严庄'
    },
    36: {
      name: '营防'
    },
    37: {
      name: '营防东'
    },
    38: {
      name: '官州路'
    },
    39: {
      name: '新圩路'
    },
    40: {
      name: '天界村'
    },
    41: {
      name: '同心路'
    },
    42: {
      name: '块子村'
    },
    43: {
      name: '块子桥'
    },
    44: {
      name: '老滩路'
    },
    45: {
      name: '上坝',
      isEnd: true
    },
    // 46: {
    //   name: '栖霞寺'
    // },
    // 47: {
    //   name: '栖霞寺'
    // },
    // 48: {
    //   name: '栖霞寺'
    // },
    // 49: {
    //   name: '栖霞寺'
    // },
    // 50: {
    //   name: '栖霞寺'
    // },
    // 51: {
    //   name: '栖霞寺'
    // },
    // 52: {
    //   name: '栖霞寺'
    // },
    // 53: {
    //   name: '栖霞寺'
    // },
    // 54: {
    //   name: '栖霞寺'
    // },
    // 55: {
    //   name: '栖霞寺'
    // },
    // 56: {
    //   name: '栖霞寺'
    // },
    // 57: {
    //   name: '栖霞寺'
    // },
    // 58: {
    //   name: '栖霞寺'
    // },
    // 59: {
    //   name: '栖霞寺'
    // },
    // 60: {
    //   name: '栖霞寺'
    // },
    // 61: {
    //   name: '栖霞寺'
    // },
    // 62: {
    //   name: '栖霞寺'
    // },
    // 63: {
    //   name: '栖霞寺'
    // },
    // 64: {
    //   name: '栖霞寺'
    // },
    // 65: {
    //   name: '栖霞寺'
    // },
    // 66: {
    //   name: '栖霞寺'
    // },
    // 67: {
    //   name: '栖霞寺'
    // },
    // 68: {
    //   name: '栖霞寺'
    // },
    // 69: {
    //   name: '栖霞寺'
    // },
    // 70: {
    //   name: '栖霞寺'
    // },
    // 71: {
    //   name: '栖霞寺'
    // },
    // 72: {
    //   name: '栖霞寺'
    // },
  }
}

const Line503 = {
  group: '南京公共交通 (集团) 有限公司',
  groupEn: 'NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD',
  company: '南京扬子公交客运有限公司',
  compColor: { name: 'YZ', main: 0XAF0909, line: 0XAF0909, stroke: { M: 0X1F2677, B: 0XAF0909 }, fill: 0XFFFFFF, strokeVer: 0X1F2677 },
  lineNo: { main: '503', append: "路线路图", "type": null, "icon": 0 },
  price: [],
  isSeg: false,
  isSel: true,

  point: {
    'A': {
      name: '六合北站',
      startTime: '04:00',
      endTime: '20:00',
    },
    'Z': {
      name: '鼓楼公交总站',
      startTime: '06:00',
      endTime: '22:00',
    },
  },
  station: {
    0: {
      name: '六合北站',
      isStart: true
    },
    1: {
      name: '机场东路·站前路',
      isSingle: true,
      sign: { direction: 0 }
    },
    2: {
      name: '六合城管局',
      isSingle: true,
      sign: { direction: 1 }
    },
    3: {
      name: '复兴路·建设西路'
    },
    4: {
      name: '复兴路·园林西路'
    },
    5: {
      name: '复兴路·长江路'
    },
    6: {
      name: '文博家园西'
    },
    7: {
      name: '文馨花苑北'
    },
    8: {
      name: '德邑花园'
    },
    9: {
      name: '龙湖半岛'
    },
    10: {
      name: '茉莉苑'
    },
    11: {
      name: '华欧大道·通池路'
    },
    12: {
      name: '华欧大道·龙群路'
    },
    13: {
      name: '华欧大道·六合大道'
    },
    14: {
      name: '龙池地铁站',
      isSingle: true,
      sign: { direction: 0 },
      isMetro: true,
      metro: ['S8']
    },
    15: {
      name: '六合大道·龙华路'
    },
    16: {
      name: '六合大道·虎跃路'
    },
    17: {
      name: '六合开发区地铁站',
      isMetro: true,
      metro: ['S8']
    },
    18: {
      name: '画家村西'
    },
    19: {
      name: '沪江商贸城东'
    },
    20: {
      name: '化工园地铁站',
      isMetro: true,
      metro: ['S8']
    },
    21: {
      name: '方巷小区东'
    },
    22: {
      name: '长芦地铁站南',
      isMetro: true,
      metro: ['S8']
    },
    23: {
      name: '六合大道·马汊河'
    },
    24: {
      name: '葛塘地铁站',
      isMetro: true,
      metro: ['S8']
    },
    25: {
      name: '葛塘广场北',
      isSingle: true,
      sign: { direction: 0 }
    },
    26: {
      name: '葛塘广场南'
    },
    27: {
      name: '范旭东广场西'
    },
    28: {
      name: '大厂地铁站',
      isMetro: true,
      metro: ['S8']
    },
    29: {
      name: '六合大道·晓山路'
    },
    30: {
      name: '卸甲甸地铁站',
      isMetro: true,
      metro: ['S8']
    },
    31: {
      name: '大厂·杨庄北'
    },
    32: {
      name: '南京信息工程大学',
      isMetro: true,
      metro: ['S8']
    },
    33: {
      name: '龙王山东'
    },
    34: {
      name: '龙山南路·六合大道',
      isSingle: true,
      sign: { direction: 1 }
    },
    35: {
      name: '六合大道·何庄路',
      isSingle: true,
      sign: { direction: 0 }
    },
    36: {
      name: '高新路·侨谊路'
    },
    37: {
      name: '高新路·侨康路'
    },
    38: {
      name: '高新路·兰山路'
    },
    39: {
      name: '南大金陵学院南门东'
    },
    40: {
      name: '高新路·新科四路'
    },
    41: {
      name: '创业新村西'
    },
    42: {
      name: '东大成贤地铁站',
      isMetro: true,
      metro: ['3']
    },
    43: {
      name: '高新路·东大路'
    },
    44: {
      name: '华侨绿洲东'
    },
    45: {
      name: '泰山天然居西'
    },
    46: {
      name: '柳洲北路·泰达路'
    },
    47: {
      name: '柳洲北路·丽岛路'
    },
    48: {
      name: '小柳工业园'
    },
    49: {
      name: '柳洲北路南'
    },
    50: {
      name: '浦珠北路·浦东路',
      isSingle: true,
      sign: { direction: 1 }
    },
    51: {
      name: '浦珠北路·三河桥',
      isSingle: true,
      sign: { direction: 0 }
    },
    52: {
      name: '浦珠北路·浦六路'
    },
    53: {
      name: '浦厂小区'
    },
    54: {
      name: '明发城市广场南'
    },
    55: {
      name: '南京铁道学院'
    },
    56: {
      name: '长江',
      isRiver: true,
      river: {
        road: '定淮门隧道',
        infoL: '江北',
        infoR: '江南'
      }
    },
    57: {
      name: '佳盛花园'
    },
    58: {
      name: '定淮门'
    },
    59: {
      name: '古平岗西'
    },
    60: {
      name: '水佐岗'
    },
    61: {
      name: '三步两桥',
      isSingle: true,
      sign: { direction: 1 }
    },
    62: {
      name: '中山北路·虹桥'
    },
    63: {
      name: '山西路'
    },
    64: {
      name: '中山北路·大方巷'
    },
    65: {
      name: '中山北路·鼓楼',
      isEnd: true,
      isSingle: true,
      sign: { direction: 1, tag: 1 },
      isMetro: true,
      metro: ['1', '4']
    },
    66: {
      name: '鼓楼公交总站',
      isStart: true,
      isSingle: true,
      sign: { direction: 0, tag: 0 }
    }
  }
}

const Line521 = {
  group: '南京公共交通 (集团) 有限公司',
  groupEn: 'NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD',
  company: '',
  compColor: { name: 'JN', main: 0X1F2677, line: 0X116DB0, stroke: 0X003F97, fill: 0XFFFFFF, strokeVer: 0XFF0000 },
  lineNo: { main: '521', append: "路线路图\n及\n计价站点", "type": 1, "icon": 0 },
  price: [4, 2],
  isSeg: true,
  isSel: false,

  point: {
    'A': {
      name: '和旭路总站',
      startTime: '05:30',
      endTime: '21:15',
    },
    'Z': {
      name: '幕府创新小镇',
      startTime: '06:30',
      endTime: '22:15',
    },
  },
  station: {
    0: {
      name: '和旭路总站',
      isStart: true,
      isPriSeg: true,
      peiSeg: { "direction": 1, "price": 4 }
    },
    1: {
      name: '文承楠苑东',
    },
    2: {
      name: '文承熙苑南'
    },
    3: {
      name: '彩苑小区南'
    },
    4: {
      name: '葛中路中'
    },
    5: {
      name: '葛塘市民广场北',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    6: {
      name: '葛塘广场西',
      isSingle: true,
      sign: {
        direction: 0
      }
    },
    7: {
      name: '葛塘广场北',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    8: {
      name: '葛塘地铁站',
      isMetro: true,
      metro: ['S8'],
    },
    9: {
      name: '夹江',
      isRiver: true,
      river: {
        road: '北汊大桥',
        infoL: '江北新区',
        infoR: '八卦洲',
        infoRD: true,
      }
    },
    10: {
      name: '八卦洲服务区',
      isPriSeg: true,
      peiSeg: { "direction": 1, "price": 2 }
    },
    11: {
      name: '小城镇东',
    },
    12: {
      name: '小城镇'
    },
    13: {
      name: '小城镇西'
    },
    14: {
      name: '八卦洲总站东',
      isPriSeg: true,
      peiSeg: { "direction": 0, "price": 2 }
    },
    15: {
      name: '长江',
      isRiver: true,
      river: {
        road: '燕子矶长江隧道',
        infoL: '八卦洲',
        infoLD: true,
        infoR: '江南主城区'
      }
    },
    16: {
      name: '吉祥庵地铁站',
      isMetro: true,
      metro: ['1']
    },
    17: {
      name: '城市绿洲'
    },
    18: {
      name: '晓庄地铁站北',
      isMetro: true,
      metro: ['1', '7']
    },
    19: {
      name: '晓庄村'
    },
    20: {
      name: '幕府东路',
      isMetro: true,
      metro: ['7']
    },
    21: {
      name: '幕府创新小镇',
      isEnd: true,
      isPriSeg: true,
      peiSeg: { "direction": 0, "price": 4 }
    },
  }
}

const Line538 = {
  group: '南京公共交通 (集团) 有限公司',
  groupEn: 'NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD',
  company: '',
  compColor: { name: 'JN', main: 0X1F2677, line: 0X116DB0, stroke: 0X003F97, fill: 0XFFFFFF, strokeVer: 0XFF0000 },
  lineNo: { main: '538', append: "路线路图", "type": null, "icon": 0 },
  price: [2, 2],
  isSeg: false,
  isSel: false,

  point: {
    'A': {
      name: '鼎泰家园西门',
      startTime: '05:10',
      endTime: '21:00',
    },
    'Z': {
      name: '南京站·北广场西',
      startTime: '06:10',
      endTime: '22:00',
    },
  },
  station: {
    0: {
      name: '鼎泰家园西门',
      isStart: true
    },
    1: {
      name: '澳林广场西',
    },
    2: {
      name: '新马路·浦珠北路'
    },
    3: {
      name: '浦欣家园'
    },
    4: {
      name: '锦嘉路·新马路'
    },
    5: {
      name: '锦汇苑'
    },
    6: {
      name: '浦东路·浦东村',
    },
    7: {
      name: '浦东路4号院西门'
    },
    8: {
      name: '浦园北路·浦东路'
    },
    9: {
      name: '香邑美颂'
    },
    10: {
      name: '香榭美颂东'
    },
    11: {
      name: '榴美颂',
    },
    12: {
      name: '柳洲南路·浦珠北路'
    },
    13: {
      name: '浦珠北路·乐华路'
    },
    14: {
      name: '浦珠北路·大桥北路'
    },
    15: {
      name: '长江大桥北',
      isSingle: true,
      sign: {
        direction: 0
      }
    },
    16: {
      name: '长江',
      isRiver: true,
      river: {
        road: '长江大桥',
        infoL: '江北',
        infoR: '江南'
      }
    },
    17: {
      name: '大桥饭店',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    18: {
      name: '水关桥西',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    19: {
      name: '水关桥',
      isSingle: true,
      sign: {
        direction: 1
      }
    },
    20: {
      name: '水关桥东',
      isSingle: true,
      sign: {
        direction: 0
      }
    },
    21: {
      name: '大庙村'
    },
    22: {
      name: '幕府南路北'
    },
    23: {
      name: '孙家洼路西'
    },
    24: {
      name: '孙家洼路'
    },
    25: {
      name: '张王庙'
    },
    26: {
      name: '郭家山路东'
    },
    27: {
      name: '河路道'
    },
    28: {
      name: '安怀村'
    },
    29: {
      name: '安怀村东'
    },
    30: {
      name: '黄家圩'
    },
    31: {
      name: '南京站·北广场西',
      isEnd: true,
      isMetro: true,
      metro: ['1', '3']
    },
  }
}

export {
  LineBlank,
  Line18,
  Line42,
  Line206,
  Line207,
  Line503,
  Line521,
  Line538,
}