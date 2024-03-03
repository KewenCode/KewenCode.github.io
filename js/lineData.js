let Data = {};

// const Data_jiangnan_2017 = {
//   group: '南京公共交通 (集团) 有限公司',
//   groupEn: 'NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD',
//   company: '',
//   lineNo: '503',
//   price: [],
//   isSeg: false,
//   isSel: true,

//   point: {
//     'A': {
//       name: '六合北站',
//       startTime: '04:00',
//       endTime: '20:00',
//     },
//     'Z': {
//       name: '鼓楼公交总站',
//       startTime: '06:00',
//       endTime: '22:00',
//     },
//   },
//   station: {
//     0: {
//       name: '六合北站',
//       isStart: true
//     },
//     1: {
//       name: '机场东路·站前路',
//       isSingle: true,
//       sign: { direction: 0 }
//     },
//     2: {
//       name: '六合城管局',
//       isSingle: true,
//       sign: { direction: 1 }
//     },
//     3: {
//       name: '复兴路·建设西路'
//     },
//     4: {
//       name: '复兴路·园林西路'
//     },
//     5: {
//       name: '复兴路·长江路'
//     },
//     6: {
//       name: '文博家园西'
//     },
//     7: {
//       name: '文馨花苑北'
//     },
//     8: {
//       name: '德邑花园'
//     },
//     9: {
//       name: '龙湖半岛'
//     },
//     10: {
//       name: '茉莉苑'
//     },
//     11: {
//       name: '华欧大道·通池路'
//     },
//     12: {
//       name: '华欧大道·龙群路'
//     },
//     13: {
//       name: '华欧大道·六合大道'
//     },
//     14: {
//       name: '龙池地铁站',
//       isSingle: true,
//       sign: { direction: 0 },
//       isMetro: true,
//       metro: ['S8']
//     },
//     15: {
//       name: '六合大道·龙华路'
//     },
//     16: {
//       name: '六合大道·虎跃路'
//     },
//     17: {
//       name: '六合开发区地铁站',
//       isMetro: true,
//       metro: ['S8']
//     },
//     18: {
//       name: '画家村西'
//     },
//     19: {
//       name: '沪江商贸城东'
//     },
//     20: {
//       name: '化工园地铁站',
//       isMetro: true,
//       metro: ['S8']
//     },
//     21: {
//       name: '方巷小区东'
//     },
//     22: {
//       name: '长芦地铁站南',
//       isMetro: true,
//       metro: ['S8']
//     },
//     23: {
//       name: '六合大道·马汊河'
//     },
//     24: {
//       name: '葛塘地铁站',
//       isMetro: true,
//       metro: ['S8']
//     },
//     25: {
//       name: '葛塘广场北',
//       isSingle: true,
//       sign: { direction: 0 }
//     },
//     26: {
//       name: '葛塘广场南'
//     },
//     27: {
//       name: '范旭东广场西'
//     },
//     28: {
//       name: '大厂地铁站',
//       isMetro: true,
//       metro: ['S8']
//     },
//     29: {
//       name: '六合大道·晓山路'
//     },
//     30: {
//       name: '卸甲甸地铁站',
//       isMetro: true,
//       metro: ['S8']
//     },
//     31: {
//       name: '大厂·杨庄北'
//     },
//     32: {
//       name: '南京信息工程大学',
//       isMetro: true,
//       metro: ['S8']
//     },
//     33: {
//       name: '龙王山东'
//     },
//     34: {
//       name: '龙山南路·六合大道',
//       isSingle: true,
//       sign: { direction: 1 }
//     },
//     35: {
//       name: '六合大道·何庄路',
//       isSingle: true,
//       sign: { direction: 0 }
//     },
//     36: {
//       name: '高新路·侨谊路'
//     },
//     37: {
//       name: '高新路·侨康路'
//     },
//     38: {
//       name: '高新路·兰山路'
//     },
//     39: {
//       name: '南大金陵学院南门东'
//     },
//     40: {
//       name: '高新路·新科四路'
//     },
//     41: {
//       name: '创业新村西'
//     },
//     42: {
//       name: '东大成贤地铁站',
//       isMetro: true,
//       metro: ['3']
//     },
//     43: {
//       name: '高新路·东大路'
//     },
//     44: {
//       name: '华侨绿洲东'
//     },
//     45: {
//       name: '泰山天然居西'
//     },
//     46: {
//       name: '柳洲北路·泰达路'
//     },
//     47: {
//       name: '柳洲北路·丽岛路'
//     },
//     48: {
//       name: '小柳工业园'
//     },
//     49: {
//       name: '柳洲北路南'
//     },
//     50: {
//       name: '浦珠北路·浦东路',
//       isSingle: true,
//       sign: { direction: 1 }
//     },
//     51: {
//       name: '浦珠北路·三河桥',
//       isSingle: true,
//       sign: { direction: 0 }
//     },
//     52: {
//       name: '浦珠北路·浦六路'
//     },
//     53: {
//       name: '浦厂小区'
//     },
//     54: {
//       name: '明发城市广场南'
//     },
//     55: {
//       name: '南京铁道学院'
//     },
//     56: {
//       name: '长江',
//       isRiver: true,
//       river: {
//         road: '定淮门隧道',
//         infoL: '江北',
//         infoR: '江南'
//       }
//     },
//     57: {
//       name: '佳盛花园'
//     },
//     58: {
//       name: '定淮门'
//     },
//     59: {
//       name: '古平岗西'
//     },
//     60: {
//       name: '水佐岗'
//     },
//     61: {
//       name: '三步两桥',
//       isSingle: true,
//       sign: { direction: 1 }
//     },
//     62: {
//       name: '中山北路·虹桥'
//     },
//     63: {
//       name: '山西路'
//     },
//     64: {
//       name: '中山北路·大方巷'
//     },
//     65: {
//       name: '中山北路·鼓楼',
//       isEnd: true,
//       isSingle: true,
//       sign: { direction: 1, tag: 1 },
//       isMetro: true,
//       metro: ['1', '4']
//     },
//     66: {
//       name: '鼓楼公交总站',
//       isStart: true,
//       isSingle: true,
//       sign: { direction: 0, tag: 0 }
//     }
//   }
// }

const Data_jiangnan_2017 = { "group": "公司名称为空则为新图", "groupEn": "", "company": "", "lineNo": "可以中文（括号也可）", "price": [], "isSeg": false, "isSel": false, "point": { "A": { "name": "起始站", "startTime": "06:00", "endTime": "18:00" }, "Z": { "name": "终点站", "startTime": "06:00", "endTime": "18:00" } }, "station": { "0": { "name": "起始站", "isStart": true, "isEnd": false }, "1": { "name": "添加站名步骤：" }, "2": { "name": "先在左侧“待选站点”添加" }, "3": { "name": "然后拖入此处" }, "4": { "name": "下面是范例：" }, "5": { "name": "换乘站", "isMetro": true, "metro": ["1", "10"] }, "6": { "name": "自定义哦", "river": { "road": "一般看不见", "infoL": "可以置底", "infoLD": true, "infoR": "也可以放上面", "infoRD": null }, "isRiver": true }, "7": { "name": "分段计价点", "peiSeg": { "direction": null, "price": null }, "isPriSeg": true }, "8": { "name": "下行单向站", "isSingle": true, "sign": { "direction": 0 } }, "9": { "name": "单向起点站", "isSingle": true, "sign": { "direction": 0 }, "isStart": true }, "10": { "name": "上行单向站", "isSingle": true, "sign": { "direction": 1 } }, "11": { "name": "单向终点站", "isSingle": true, "sign": { "direction": 1 }, "isEnd": true, "isStart": false } } }