import { param } from "../parameter.js"
import { OS } from "../../../tools.js"

async function printStation(_x, _y, _color, _line, _angle) {
  const _param = param.size;
  const _station = Data.station;
  const outerContainer = new PIXI.Container();
  outerContainer.name = "printStation";
  // 加载图标
  let loadElementAssets = await PIXI.Assets.loadBundle('load-NJGJ');
  const A = loadElementAssets.Element;
  const B = loadElementAssets.Metro;

  const widthSub = (A, W, B, S) => {
    // 首条item
    W = A.S.single_B ? W - B / 2.05 - (B - S) / 1.95 : W;
    W = A.S.single_S ? W - S / 2 : W;
    W = A.S.normal_B ? W - (B - S) / 1.95 : W;
    // 末尾item
    W = A.E.single_B ? W - B / 2.05 - (B - S) / 1.95 : W;
    W = A.E.single_S ? W - S / 2 : W;
    W = A.E.normal_B ? W - (B - S) / 1.95 : W;
    // 非首末站大图
    W = A.U ? W - (B - S) * A.U : W;
    // 河流图标宽度
    W = A.R.length ? W - (B * 1.3 - S) * A.R.length : W;
    return W
  }

  // 获取首末站单向及中部大图标信息，判断宽度，添加河流图标
  const extWidth = (data) => {
    let S = { "single_S": false, "normal_S": false, "single_B": false, "normal_B": false }; // 首个图标
    let E = { "single_S": false, "normal_S": false, "single_B": false, "normal_B": false };  // 末尾图标
    let U = 0;  // 非首末站位置大图标数
    let P = 0;  //分段计价点数量
    let R = []; // 河流图形
    let i = 0;
    for (let key in data) {
      data[i].isPriSeg ? P++ : P; // 计价点
      // 首末站单向
      if (i == 0) {
        data[i].isSingle
          ?
          data[i].isEnd || data[i].isStart ? S.single_B = true : S.single_S = true
          :
          data[i].isEnd || data[i].isStart ? S.normal_B = true : S.normal_S = true
      } else if (i == Object.keys(data).length - 1) {
        data[i].isSingle
          ?
          data[i].isEnd || data[i].isStart ? E.single_B = true : E.single_S = true
          :
          data[i].isEnd || data[i].isStart ? E.normal_B = true : E.normal_S = true
      } else {
        U = data[i].isStart || data[i].isEnd ? U += 1 : U;
        data[i].isRiver ? R.push(key) : '';
      }
      i++;
    }
    return {
      S: S,
      E: E,
      U: U,
      R: R,
      P: P,
    }
  }
  // item间距
  let itemWidthALL = _param.line.x[3] - _param.line.x[0];
  let itemWidth = widthSub(extWidth(_station), itemWidthALL, _param.roundDirScale.B, _param.roundDirScale.S);

  // console.log(extWidth(_station).R)
  let x_width = itemWidth / (Object.keys(_station).length - 1);
  let y_height = _param.line.y[2] - _param.line.y[1];

  // 间距小于图标宽度
  let roundWB = _param.roundDirScale.B
  let roundWS = _param.roundDirScale.S
  x_width <= _param.roundDirScale.S ?
    (() => {
      const subWidth = (roundWS - Math.abs(x_width)) / 2;
      roundWB = roundWB - (subWidth + 10) * (roundWB / roundWS);
      roundWS = roundWS - subWidth - 10;
      // 弥补缩小后首末站计算差距
      itemWidth = widthSub(extWidth(_station), itemWidthALL, roundWB, roundWS);
      x_width = itemWidth / (Object.keys(_station).length - 1);
    })() : '';

  let shiftX = 0; //水平偏移量
  let shiftY = 0; //垂直偏移量

  // 附注说明
  const P = appendInfo(Data, extWidth(_station).P);
  const sizeP = [P.x, P.y, P.width, P.height];
  outerContainer.addChild(P)

  // 循环遍历json
  const stationContainer = new PIXI.Container();
  for (let key in _station) {
    shiftY = 0; //重置垂直偏移量
    // console.log(val);

    // 河流图形处理-完成后跳跃
    if (_station[key].isRiver) {
      const { R, RW } = await iconRiver(key, _station[key]);
      R.position.set(_param.line.x[0] + x_width * Number(key) + shiftX + _x, _param.line.y[0] + _y);
      // 基础位置
      R.x = R.x + (roundWB * 1.3 - roundWS) / 2;
      // 折线偏移
      R.y = R.x > _param.line.x[1] && R.x < _param.line.x[2] ? (R.y + ((R.x - _param.line.x[1]) / (_param.line.x[2] - _param.line.x[1])) * y_height) : R.y;
      R.y = R.x >= _param.line.x[2] ? _param.line.y[3] : R.y;
      const centerPosition = [R.x, R.y];
      shiftX += (roundWB * 1.3 - roundWS);
      // 修正图标偏移位置
      R.x -= RW / 2;
      R.y -= R.height / 6;
      // 添加路名
      const riverRoad = new PIXI.Text(_station[key].river.road, {
        align: 'center',
        fill: 0XFFFFFF,
        fontFamily: 'FZZZHONGJW',
        fontSize: 15,
      });
      riverRoad.anchor.set(0.5, 0.5);
      riverRoad.position.set(centerPosition[0], centerPosition[1]);
      riverRoad.angle = riverRoad.x > _param.line.x[1] && riverRoad.x < _param.line.x[2] ? _angle : riverRoad.angle;
      riverRoad.width = riverRoad.width > roundWB * 1.3 ? roundWB * 1.3 : riverRoad.width;
      stationContainer.addChild(riverRoad);

      outerContainer.addChild(R)
      continue;
    }

    const S = await iconStation(_station[key]);
    S.position.set(_param.line.x[0] + x_width * Number(key) + shiftX + _x, _param.line.y[0] + _y);
    // 0-item
    if (key == 0) {
      // 单向图标偏移
      _station[key].isSingle ?
        _station[key].isStart || _station[key].isEnd ?
          // 大图标
          (() => {
            S.x += roundWB / 2.05;
            shiftX += (roundWB / 2.05) + (roundWB - roundWS) / 2;
          })() :
          // 小图标
          (() => {
            S.x += roundWS / 2.05;
            shiftX += (roundWS / 2.05);
          })()
        :
        _station[key].isStart || _station[key].isEnd ?
           /**大图标**/ shiftX += (roundWB - roundWS) / 2 :/**小图标**/ '';
    } else if (key == Object.keys(_station).length - 1) {
      // 单向图标偏移
      _station[key].isStart || _station[key].isEnd ?/**大图标**/ S.x += (roundWB - roundWS) / 2 :/**小图标**/ '';
    } else {
      _station[key].isStart || _station[key].isEnd ?
        (() => {
          S.x += (roundWB - roundWS) / 2;
          shiftX += (roundWB - roundWS);
        })() : ''
    }
    // shiftX = (!val.isEnd || !val.isStart) && N.includes(key) ? shiftX + 300 * (iconScaleSt[2] - iconScaleSt[1]) : shiftX;
    // 折线偏移
    S.y = S.x > _param.line.x[1] && S.x < _param.line.x[2] ? (S.y + ((S.x - _param.line.x[1]) / (_param.line.x[2] - _param.line.x[1])) * y_height) : S.y;
    S.y = S.x >= _param.line.x[2] ? _param.line.y[3] : S.y;
    // 折现段旋转
    S.angle = S.x > _param.line.x[1] && S.x < _param.line.x[2] ? _angle : S.angle;
    // 修正单向站垂直高度
    shiftY = _station[key].isSingle ? (Number(_station[key].sign.direction) ? 4 : -4) : 0;
    S.y += shiftY;

    // 站名
    const T = textStation(_station[key]);
    // 修改宽度
    x_width <= _param.roundDirScale.S ? (() => {
      _station[key].isStart || _station[key].isEnd ? T.scale.set(roundWS * 1.1 / T.width) : T.scale.set(roundWS / T.width);
    })() : '';
    T.position.set(S.x, S.y + 37 - shiftY);

    // 分段计价图标
    const P = iconPriceSplit(_station[key], T.width, shiftX);
    P.then(result => {
      // console.log(result)
      if (result) {
        result.position.set(S.x, _station[key].isSingle ? (_station[key].sign.direction ? S.y - _param.line.h / 1.5 : S.y - S.height / 2 - 10) : S.y - S.height / 2);
        stationContainer.addChild(result);
      }
    });

    // 上下客图标
    let UP, UD
    if (_station[key].sign && _station[key].sign.tag == 1) {
      UP = iconUDTag(_station[key].isSingle && _station[key].isStart, _station[key].isSingle && _station[key].isEnd, T.width)
      if (UP) {
        UP.position.set(S.x - T.width / 2, _station[key].isSingle ? (_station[key].sign.direction ? S.y - _param.line.h / 1.5 - UP.height * 1.1 : S.y - S.height / 2 - 10 - UP.height * 1.1) : S.y - S.height / 2 - UP.height * 1.1);
        stationContainer.addChild(UP)
      }

    } else if (_station[key].sign && _station[key].sign.tag == 0) {
      UD = iconUDTag(_station[key].isSingle && _station[key].isStart, _station[key].isSingle && _station[key].isEnd, T.width)
    }
    // 地铁图标
    const M = await iconMetro(_station[key], T.width);
    // 判断存在地铁标识
    if (M || UD) {
      let plusHeight = 0;
      M ? plusHeight += M.height : '';
      UD ? plusHeight += UD.height : '';
      M && UD ? plusHeight += 5 : '';
      // 提示框判断(高度超过&左侧超过&右侧没超)
      T.height = (T.x + (T.width / 2) > sizeP[0]) && (T.x - (T.width / 2) < sizeP[0] + sizeP[2]) ?
        (sizeP[1] - T.y - T.height - plusHeight < 0) ? sizeP[1] - T.y - plusHeight : T.height
        : T.height;
      // 底部基线判断
      T.height = (T.y + T.height + plusHeight) > _param.recPriBt.y ? _param.recPriBt.y - T.y - plusHeight : T.height;
      if (M && UD) {
        UD.position.set(T.x - T.width / 2, T.y + T.height + 5)  // container can't set anchor, need to sub text width/2.
        M.position.set(UD.x, UD.y + UD.height + 5)  // container can't set anchor, need to sub text width/2.
        stationContainer.addChild(UD, M)
      } else if (M) {
        M.position.set(T.x - T.width / 2, T.y + T.height + 5)  // container can't set anchor, need to sub text width/2.
        stationContainer.addChild(M)
      } else if (UD) {
        UD.position.set(T.x - T.width / 2, T.y + T.height + 5)  // container can't set anchor, need to sub text width/2.
        stationContainer.addChild(UD)
      }
    } else {
      // 提示框判断(高度超过&左侧超过&右侧没超)
      T.height = (T.x + (T.width / 2) > sizeP[0]) && (T.x - (T.width / 2) < sizeP[0] + sizeP[2]) ?
        (sizeP[1] - T.y - T.height < 0) ? sizeP[1] - T.y : T.height
        : T.height;
      // 底部基线判断
      T.height = (T.y + T.height) > _param.recPriBt.y ? _param.recPriBt.y - T.y : T.height;
    }



    // container.addChild(S)
    stationContainer.addChild(S, T)
  }

  // console.log(S)
  // await iconStation()

  // container.addChild(await iconMetro())
  // container.addChild(await iconStation())
  // console.log(container.children)
  outerContainer.addChild(_line, stationContainer)
  return outerContainer

  async function iconMetro(e, tWidth) {
    const iconContain = new PIXI.Container();

    if (e.isMetro) {
      const I = B.clone();
      // 梅花标
      I.frame = new PIXI.Rectangle(0, 1000, 200, 200);
      const icon = new PIXI.Sprite(I);
      icon.name = 'metroIcon'
      iconContain.addChild(icon);

      e.metro.forEach((line) => {
        // container赋名
        iconContain.name = iconContain.name ? iconContain.name + '/' + line : line
        const M = B.clone();
        switch (String(line)) {
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
            M.frame = new PIXI.Rectangle(200 * (Number(line) - 1), 0, 200, 200);
            // console.log(M.frame)
            break;
          case 'S1':
          case 'S2':
          case 'S3':
          case 'S4':
          case 'S5':
          case 'S6':
            M.frame = new PIXI.Rectangle(200 * (Number(line.replace('S', '')) - 1), 600, 200, 200);
            // console.log(M.frame)
            break;
          case 'S7':
          case 'S8':
          case 'S9':
            M.frame = new PIXI.Rectangle(200 * (Number(line.replace('S', '')) - 7), 800, 200, 200);
            // console.log(M.frame)
            break;
          case '7':
          case '8':
          case '9':
          case '10':
          case '11':
          case '12':
            M.frame = new PIXI.Rectangle(200 * (Number(line) - 7), 200, 200, 200);
            // console.log(M.frame)
            break;
          case '13':
          case '14':
          case '15':
          case '16':
          case '17':
          case '18':
            M.frame = new PIXI.Rectangle(200 * (Number(line) - 13), 400, 200, 200);
            // console.log(M.frame)
            break;
        }
        const _icon = new PIXI.Sprite(M);
        _icon.name = 'line' + line
        _icon.position.set(0, iconContain.height);
        iconContain.addChild(_icon);
      });

      iconContain.scale.set(tWidth / 200);  // by text width rectify icon width.
      return iconContain
    }
  }

  async function iconStation(e) {
    if (e.isSingle) {
      let PO = [0, 500, 350, 200]; // 定位
      PO[0] = e.isStart || e.sign.convert ? 350 : PO[0];
      PO[1] = e.sign.direction == 1 ? PO[1] + 200 : PO[1];
      const circular = A.clone();
      circular.frame = new PIXI.Rectangle(PO[0], PO[1], PO[2], PO[3]);
      const icon = new PIXI.Sprite(circular);
      icon.anchor.set(0.5, 0);
      if (e.sign.direction == 0) {
        icon.anchor.set(0.5, 1);
      }
      if (e.isStart || e.isEnd) {
        icon.scale.set(roundWB / icon.width);
      } else {
        icon.scale.set(roundWS / icon.width);
      }
      return icon
    }

    if (e.isStart || e.isEnd) {
      let PO = [0, 150, 350, 350]; // 定位
      PO[0] = typeof e.sign !== "undefined" && e.sign.convert ? 350 : PO[0];
      const circular = A.clone();
      circular.frame = new PIXI.Rectangle(PO[0], PO[1], PO[2], PO[3]);
      let icon = new PIXI.Sprite(circular);
      icon.anchor.set(0.5);
      if ((typeof e.sign !== "undefined" && e.sign.direction == 0) || e.isEnd) {
        icon.angle = 180;
      }
      icon.scale.set(roundWB / icon.width);
      return icon
    }

    let PO = [700, 150, 350, 350];
    const circular = A.clone();
    circular.frame = new PIXI.Rectangle(PO[0], PO[1], PO[2], PO[3]);
    let icon = new PIXI.Sprite(circular);
    icon.anchor.set(0.5);
    icon.scale.set(roundWS / icon.width);
    if (e.isStart || e.isEnd) {
      icon.scale.set(roundWB / icon.width);
    }
    return icon

  }

  async function iconPriceSplit(e, tWidth) {
    if (!e.isPriSeg) { return false }
    let PO = [300 * (e.peiSeg.price - 2), 900 + (e.peiSeg.direction * 550), 300, 550]; // 定位
    const priceSeg = A.clone();
    priceSeg.frame = new PIXI.Rectangle(PO[0], PO[1], PO[2], PO[3]);
    const icon = new PIXI.Sprite(priceSeg);
    icon.anchor.set(0.5, 1);
    icon.scale.set(tWidth / 200);
    return icon
  }

  async function iconRiver(key, e) {
    const riverContain = new PIXI.Container();
    let riverAssets = await PIXI.Assets.loadBundle('load-NJGJ');
    const roundBox = riverAssets.Element.clone(); // 克隆texture，避免冲突
    roundBox.frame = new PIXI.Rectangle(1050, 0, 200, 800);
    let river = new PIXI.Sprite(roundBox);
    river.name = `river${key}`;
    river.width = roundWB * 1.3;
    river.height = 400;
    // 名称
    const addSpace = (str) => {
      str = str.replace('（', '︵').replace('）', '︶').replace('(', '︵').replace(')', '︶')
      return str.split('').join('\n');
    }
    const riverName = new PIXI.Text(addSpace(e.name), {
      align: 'center',
      fill: 0XFFFFFF,
      fontFamily: 'FZZZHONGJW',
      fontSize: 35,
      // fontWeight: 'bold',
      // lineHeight: 120,
    });
    riverName.anchor.set(0.5, 0.5)
    riverName.position.set(river.width / 2, river.height * 0.55)
    riverName.height = 250;
    riverName.width = river.width / 2;
    riverName.style.lineHeight = e.name.length <= 5 ? 24 * (7 - e.name.length) : 0;
    const riverInfoL = new PIXI.Text(e.river.infoL || '', {
      align: 'center',
      fontFamily: 'FZZZHONGJW',
      fontSize: 20,
    });
    riverInfoL.anchor.set(1, 1)
    riverInfoL.position.set(0, e.river.infoLD ? river.height + riverInfoL.height : 0)
    const riverInfoR = new PIXI.Text(e.river.infoR || '', {
      align: 'center',
      fontFamily: 'FZZZHONGJW',
      fontSize: 20,
    });
    riverInfoR.anchor.set(0, 1)
    riverInfoR.position.set(river.width, e.river.infoRD ? river.height + riverInfoR.height : 0)

    // console.log(riverName.height)
    // console.log(riverName.style.lineHeight)

    riverContain.addChild(river, riverName, riverInfoL, riverInfoR)
    return { R: riverContain, RW: river.width }
  }

  function iconUDTag(U, D, tWidth, text, textColor) {
    if (!U && !D) { return }
    const iconUDTagContain = new PIXI.Container();
    const UDTag = new PIXI.Graphics();
    UDTag.name = "UDTag";
    UDTag.beginFill(U ? 'red' : D ? 0X87CEEB : textColor)
    UDTag.drawRoundedRect(0, 0, 50, 175, 25)
    UDTag.endFill()
    iconUDTagContain.addChild(UDTag);
    const tagName = new PIXI.Text(U ? '上\n客\n站' : D ? '下\n客\n站' : text, {
      align: 'center',
      fill: 0XFFFFFF,
      fontFamily: 'FZZZHONGJW',
      fontSize: 35,
      // fontWeight: 'bold',
      // lineHeight: 120,
    });
    tagName.anchor.set(0.5, 0.5)
    tagName.position.set(UDTag.width / 2, UDTag.height * 0.5)
    iconUDTagContain.addChild(tagName);
    iconUDTagContain.scale.set(tWidth / UDTag.width)
    return iconUDTagContain

  }

  function textStation(e) {

    const style = new PIXI.TextStyle({
      align: 'center',
      fill: param.color.JN,
      fontFamily: 'FZHTJW,SimHei',
      fontSize: 40,
      // fontWeight: 'bold',
      lineHeight: 40,
    });
    const addSpace = (str) => {
      str = str.replace('（', '︵').replace('）', '︶').replace('(', '︵').replace(')', '︶')
      return str.split('').join('\n');
    }
    // text = "仙\n尧\n路\n·\n白\n金\n汉\n爵";
    // text = '西\n善\n花\n苑\n总\n站'
    // text = '赛\n虹\n桥\n立\n交\n西\n︵\n长\n江\n装\n饰\n城\n︶'
    const station = new PIXI.Text(addSpace(e.name), style);
    station.anchor.set(0.5, 0)
    if (e.isStart || e.isEnd || (e.text && e.text.color)) {
      station.style.fill = e.isEnd && e.isSingle ? 0X87CEEB : 'red';
      station.style.fill = (e.text ? e.text.color : false) || station.style.fill;
    }

    // routeMapStage.addChild(station);
    return station
  }

  function appendInfo(e, num) {
    const container = new PIXI.Container();
    container.position.set(param.size.info1.x + _x, param.size.info1.y + _y)
    const style = new PIXI.TextStyle({
      align: 'center',
      fill: 'red',
      fontFamily: 'FZHTJW,SimHei',
      fontSize: 48,
    });
    const style_B = style.clone();
    style_B.fontWeight = '700';


    const info = new PIXI.Text('说明: ', style);
    const info1 = new PIXI.Text(' 单向停靠站点', style);
    const info2 = new PIXI.Text(' 换乘地铁站点', style);

    const circular = A.clone();
    circular.frame = new PIXI.Rectangle(700, 500, 350, 200);
    const icon1 = new PIXI.Sprite(circular);
    icon1.position.set(info.width, info.height / 8)
    icon1.scale.set(info.height / 300)
    const metro = B.clone();
    metro.frame = new PIXI.Rectangle(0, 1000, 200, 200);
    const icon2 = new PIXI.Sprite(metro);
    icon2.anchor.set(0.5, 0)
    icon2.position.set(info.width + icon1.width / 2, info.height)
    icon2.scale.set(info.height / 200)

    info1.position.set(info.width + icon1.width, 0)
    info2.position.set(info.width + icon1.width, info.height)

    container.addChild(info, icon1, icon2, info1, info2)

    if (e.isSeg && num) {
      let PO = [300, 1450, 300, 497]; // 定位-3
      const priceSeg = A.clone();
      priceSeg.frame = new PIXI.Rectangle(PO[0], PO[1], PO[2], PO[3]);
      const icon3 = new PIXI.Sprite(priceSeg);
      icon3.anchor.set(0, 0.5);
      icon3.position.set(info.width + icon1.width * 1.5 + info1.width, icon2.y * 1.08)
      icon3.scale.set((icon1.height + icon2.height) / icon3.height);
      // 文字部分
      const info3 = new PIXI.Text('上车站票价区间提示', style_B);
      info3.anchor.set(0, 0.5);
      info3.position.set(icon3.x + icon3.width * 1.2, icon3.y)
      container.addChild(icon3, info3)
    }

    // routeMapStage.addChild(container)

    // if (e.isSeg){
    // }
    return container
  }
}

export {
  printStation,
}