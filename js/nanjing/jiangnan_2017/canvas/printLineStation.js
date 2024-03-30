import { param } from "../parameter.js"
import { OS } from "../../../tools.js"
import { drawLine } from "./drawSprite.js";

async function printLineStation(_x, _y, _color) {
  const _param = param.size;
  const _station = Data.station;
  const outerContainer = new PIXI.Container({ label: "lineStation" });
  // 加载图标
  let loadElementAssets = await PIXI.Assets.loadBundle('load-NJGJ');
  const A = loadElementAssets.Element;
  const B = loadElementAssets.Metro;
  const { _line, _angle } = await drawLine(0, 0, _color?.line);

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
      data[i]?.isPriSeg ? P++ : P; // 计价点
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
  let metroMerge = false;
  for (let key in _station) {
    const SingleContainer = new PIXI.Container({ label: `station${key}` });
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
      SingleContainer.addChild(riverRoad);

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
    shiftY = _station[key].isSingle ? (Number(_station[key].sign.direction) ? 7 : -7) : 0;
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
        SingleContainer.addChild(result);
      }
    });

    // 上下客图标
    let UP, UD
    if (_station[key].sign && _station[key].sign.tag == 1) {
      /**上侧图标 */
      UP = iconUDTag(_station[key].isSingle && _station[key].isStart, _station[key].isSingle && _station[key].isEnd, T.width)
      if (UP) {
        UP.position.set(S.x - T.width / 2, _station[key].isSingle ? (_station[key].sign.direction ? S.y - _param.line.h / 1.5 - UP.height * 1.1 : S.y - S.height / 2 - 10 - UP.height * 1.1) : S.y - S.height / 2 - UP.height * 1.1);
        SingleContainer.addChild(UP)
      }

    } else if (_station[key].sign && _station[key].sign.tag == 0) {
      /**下侧图标 */
      UD = iconUDTag(_station[key].isSingle && _station[key].isStart, _station[key].isSingle && _station[key].isEnd, T.width)
    }

    // 地铁图标
    const M = await iconMetro(_station[key], T.width);
    const ML = metroMerge;/**左侧存在 */
    const MT = _station[key]?.metroMerge && _station[key]?.isMetro;/**当前存在 */
    const MR = !metroMerge && _station[key]?.metroMerge && _station[Number(key) + 1]?.metroMerge && _station[Number(key) + 1]?.metro?.toString() == _station[key]?.metro?.toString() && (_station[key]?.isMetro && _station[Number(key) + 1]?.isMetro);/**右侧存在 */
    const MM = MR || ML;
    // console.log(ML, MT, MR)
    // 判断存在地铁标识
    if (M || UD) {
      let plusHeight = 0;
      M && !MM ? plusHeight += M.height : '';
      UD ? plusHeight += UD.height : '';
      M && !MM && UD ? plusHeight += 5 : '';
      // 提示框判断(高度超过&左侧超过&右侧没超)
      T.height = (T.x + (T.width / 2) > sizeP[0]) && (T.x - (T.width / 2) < sizeP[0] + sizeP[2]) ?
        (sizeP[1] - T.y - T.height - plusHeight < 0) ? sizeP[1] - T.y - plusHeight : T.height
        : T.height;
      // 底部基线判断
      T.height = (T.y + T.height + plusHeight) > _param.recPriBt.y ? _param.recPriBt.y - T.y - plusHeight : T.height;
      if (M && !MM && UD) {
        UD.position.set(T.x - T.width / 2, T.y + T.height + 5)  // container can't set anchor, need to sub text width/2.
        M.position.set(UD.x, UD.y + UD.height + 5)  // container can't set anchor, need to sub text width/2.
        SingleContainer.addChild(UD, M)
      } else if (M && !MM) {
        M.position.set(T.x - T.width / 2, T.y + T.height + 5)  // container can't set anchor, need to sub text width/2.
        SingleContainer.addChild(M)
      } else if (UD) {
        UD.position.set(T.x - T.width / 2, T.y + T.height + 5)  // container can't set anchor, need to sub text width/2.
        SingleContainer.addChild(UD)
      }

      MM ? SingleContainer.addChild(M)/**后处理位置 */ : '';

    } else {
      // 提示框判断(高度超过&左侧超过&右侧没超)
      T.height = (T.x + (T.width / 2) > sizeP[0]) && (T.x - (T.width / 2) < sizeP[0] + sizeP[2]) ?
        (sizeP[1] - T.y - T.height < 0) ? sizeP[1] - T.y : T.height
        : T.height;
      // 底部基线判断
      T.height = (T.y + T.height) > _param.recPriBt.y ? _param.recPriBt.y - T.y : T.height;
    }

    metroMerge =/**传递为负且当前及后一位存在，两两配对*/MR ? true : false;

    // container.addChild(S)
    SingleContainer.addChild(S, T)
    ML && MT ? mergeMetro(stationContainer.getChildByLabel(`station${key - 1}`), SingleContainer, x_width <= _param.roundDirScale.S) : ''
    stationContainer.addChild(SingleContainer)
  }

  // console.log(S)
  // await iconStation()

  // container.addChild(await iconMetro())
  // container.addChild(await iconStation())
  // console.log(container.children)
  outerContainer.addChild(_line, stationContainer)
  return outerContainer

  async function iconMetro(e, tWidth) {
    const iconContain = new PIXI.Container({ label: "metro" });

    if (e.isMetro) {
      // 梅花标
      const frame1 = new PIXI.Rectangle(0, 1000, 200, 200);
      const I = new PIXI.Texture({ source: B, frame: frame1 });
      const icon = new PIXI.Sprite({
        texture: I,
        label: "metroIcon",
      });
      iconContain.addChild(icon);

      e.metro.forEach((line) => {
        // container赋名
        // iconContain.label = iconContain.label ? iconContain.label + '/' + line : line
        let M
        switch (String(line)) {
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
            const frame1 = new PIXI.Rectangle(200 * (Number(line) - 1), 0, 200, 200);
            M = new PIXI.Texture({ source: B, frame: frame1 });
            // console.log(M.frame)
            break;
          case 'S1':
          case 'S2':
          case 'S3':
          case 'S4':
          case 'S5':
          case 'S6':
            const frame2 = new PIXI.Rectangle(200 * (Number(line.replace('S', '')) - 1), 600, 200, 200);
            M = new PIXI.Texture({ source: B, frame: frame2 });
            // console.log(M.frame)
            break;
          case 'S7':
          case 'S8':
          case 'S9':
            const frame3 = new PIXI.Rectangle(200 * (Number(line.replace('S', '')) - 7), 800, 200, 200);
            M = new PIXI.Texture({ source: B, frame: frame3 });
            // console.log(M.frame)
            break;
          case '7':
          case '8':
          case '9':
          case '10':
          case '11':
          case '12':
            const frame4 = new PIXI.Rectangle(200 * (Number(line) - 7), 200, 200, 200);
            M = new PIXI.Texture({ source: B, frame: frame4 });
            // console.log(M.frame)
            break;
          case '13':
          case '14':
          case '15':
          case '16':
          case '17':
          case '18':
            const frame5 = new PIXI.Rectangle(200 * (Number(line) - 13), 400, 200, 200);
            M = new PIXI.Texture({ source: B, frame: frame5 });
            // console.log(M.frame)
            break;
        }
        const _icon = new PIXI.Sprite({
          texture: M,
          label: 'line' + line,
          position: { x: 0, y: iconContain.height },
        });
        iconContain.addChild(_icon);
      });

      iconContain.scale.set(tWidth / 200);  // by text width rectify icon width.
      return iconContain
    }
  }

  async function iconStation(e) {
    const _scale = (e.isStart || e.isEnd) ? (roundWB / _param.roundDirScale.B) : (roundWS / _param.roundDirScale.S);
    if (e.isSingle) {
      const _width = (e.isStart || e.isEnd) ? roundWB : roundWS;
      const _size = (e.isStart || e.isEnd) ? 2 : 1;
      const dir = e.sign.direction == 1 ? -1 : 1;
      const _dir = dir * _scale;
      const icon = new PIXI.Graphics({ label: "iconStation" })
        .arc(0, 0, _width / 2 - 4, e.sign.direction == 1 ? 0 : Math.PI, e.sign.direction == 1 ? Math.PI : 0)
        .stroke({ color: Data.compColor.stroke?.B ? Data.compColor.stroke?.B : Data.compColor.stroke, width: 8 * _scale })
        .fill(Data.compColor.fill)
        .moveTo(- _width / 2 * _dir, 2 * _dir)
        .lineTo(_width / 2 * _dir, 2 * _dir)
        .stroke({ color: Data.compColor.stroke?.B ? Data.compColor.stroke?.B : Data.compColor.stroke, width: 4 * _scale })
        .moveTo(- _width * 0.02 * _dir, (- 2.5 - 2.5 * _size) * _dir)
        .lineTo(_width * 0.3 * _dir + (8 - 8 * _scale) * dir, (- 2.5 - 2.5 * _size) * _dir)
        .stroke({
          color: (e.isStart || e.isEnd || e.sign.convert) ?
            Data.compColor.stroke?.M ? Data.compColor.stroke?.M : Data.compColor.stroke
            : Data.compColor.strokeVer, width: 5 * _size * _scale
        })
        .poly([
          - _width * 0.02 * _dir, (- 2.5 - 10 * _size) * _dir,
          - _width * 0.02 * _dir, (- 2.5) * _dir,
          - _width * 0.35 * _dir - (8 - 8 * _scale) * dir, (- 2.5) * _dir])
        .fill((e.isStart || e.isEnd || e.sign.convert) ? Data.compColor.stroke?.M ? Data.compColor.stroke?.M : Data.compColor.stroke
          : Data.compColor.strokeVer)
      return icon
    }

    if (e.isStart || e.isEnd) {
      const dir = ((typeof e.sign !== "undefined" && e.sign.direction == 0) || e.isEnd) ? -1 : 1;
      const _dir = dir * _scale;
      const icon = new PIXI.Graphics({ label: "iconStation" })
        .circle(0, 0, roundWB / 2 - 4)
        .stroke({ color: Data.compColor.stroke?.B ? Data.compColor.stroke?.B : Data.compColor.stroke, width: 8 * _scale })
        .fill(Data.compColor.fill)
        .moveTo(- roundWB * 0.38 * _dir - (8 - 8 * _scale) * dir, 0)
        .lineTo(- roundWB * 0.08 * _dir, 0)
        .stroke({ color: Data.compColor.stroke?.M ? Data.compColor.stroke?.M : Data.compColor.stroke, width: 15 * _scale })
        .poly([
          - roundWB * 0.08 * _dir, roundWB * 0.25,
          roundWB * 0.45 * _dir + (8 - 8 * _scale) * dir, 0,
          - roundWB * 0.08 * _dir, - roundWB * 0.25])
        .fill(Data.compColor.stroke?.M ? Data.compColor.stroke?.M : Data.compColor.stroke)
      return icon
    }

    const icon = new PIXI.Graphics({ label: "iconStation" })
      .circle(0, 0, (e.isStart || e.isEnd ? roundWB : roundWS) / 2 - 4)
      .stroke({ color: Data.compColor.stroke?.B ? Data.compColor.stroke?.B : Data.compColor.stroke, width: 8 * _scale })
      .fill(Data.compColor.fill)
    return icon

  }

  async function iconPriceSplit(e, tWidth) {
    if (!e.isPriSeg) { return false }
    let PO = [300 * (e.peiSeg.price - 2), 350 + (e.peiSeg.direction * 550), 300, 550]; // 定位
    const frame = new PIXI.Rectangle(PO[0], PO[1], PO[2], PO[3]);
    const priceSeg = new PIXI.Texture({ source: A, frame: frame });
    const icon = new PIXI.Sprite({
      texture: priceSeg,
      label: "icon",
      anchor: { x: 0.5, y: 1 },
      scale: { x: tWidth / 200, y: tWidth / 200 },
    });
    return icon
  }

  async function iconRiver(key, e) {
    const riverContain = new PIXI.Container();
    let riverAssets = await PIXI.Assets.loadBundle('load-NJGJ');
    const frame = new PIXI.Rectangle(0, 125, 900, 200);
    const roundBox = new PIXI.Texture({ source: riverAssets.Element, frame: frame });
    const river = new PIXI.Sprite({
      texture: roundBox,
      label: `river${key}`,
      height: roundWB * 1.3,
      width: 400,
      anchor: { x: 0, y: 1 },
      angle: 90
    });
    // 名称
    const addSpace = (str) => {
      str = str.replace('（', '︵').replace('）', '︶').replace('(', '︵').replace(')', '︶')
      return str.split('').join('\n');
    }
    const riverName = new PIXI.Text({
      text: addSpace(e.name),
      anchor: { x: 0.5, y: 0.5 },
      position: { x: river.height / 2, y: river.width * 0.55 },
      width: river.height / 2,
      style: {
        align: 'center',
        fill: 0XFFFFFF,
        fontFamily: 'FZZZHONGJW',
        fontSize: 35,
        // fontWeight: 'bold',
        // lineHeight: 120,
      }
    });
    riverName.style.lineHeight = e.name.length <= 5 ? 24 * (7 - e.name.length) : 0;
    riverName.height = riverName.height > 250 ? 250 : riverName.height;
    const riverInfoL = new PIXI.Text({
      text: e.river.infoL || '',
      anchor: { x: 1, y: 1 },
      style: {
        align: 'center',
        fontFamily: 'FZZZHONGJW',
        fontSize: 20,
      }
    });
    riverInfoL.position.set(0, e.river.infoLD ? river.width + riverInfoL.height : 0);
    const riverInfoR = new PIXI.Text({
      text: e.river.infoR || '',
      anchor: { x: 0, y: 1 },
      style: {
        align: 'center',
        fontFamily: 'FZZZHONGJW',
        fontSize: 20,
      }
    });
    riverInfoR.position.set(river.height, e.river.infoRD ? river.width + riverInfoR.height : 0)

    // console.log(riverName.height)
    // console.log(riverName.style.lineHeight)

    riverContain.addChild(river, riverName, riverInfoL, riverInfoR)
    return { R: riverContain, RW: river.height }
  }

  function iconUDTag(U, D, tWidth, text, textColor) {
    if (!U && !D) { return }
    const iconUDTagContain = new PIXI.Container({ label: "UDTag" });
    const UDTag = new PIXI.Graphics()
      .roundRect(0, 0, 50, 175, 25)
      .fill(U ? 'red' : D ? 0X87CEEB : textColor)
    iconUDTagContain.addChild(UDTag);
    const tagName = new PIXI.Text({
      text: U ? '上\n客\n站' : D ? '下\n客\n站' : text,
      anchor: { x: 0.5, y: 0.5 },
      position: { x: UDTag.width / 2, y: UDTag.height * 0.5 },
      style: {
        align: 'center',
        fill: 0XFFFFFF,
        fontFamily: 'FZZZHONGJW',
        fontSize: 35,
        // fontWeight: 'bold',
        // lineHeight: 120,
      }
    });
    iconUDTagContain.addChild(tagName);
    iconUDTagContain.scale.set(tWidth / UDTag.width)
    iconUDTagContain.label = `${U ? 'U' : 'D'}Tag`;
    return iconUDTagContain

  }

  function textStation(e) {

    const style = new PIXI.TextStyle({
      align: 'center',
      fill: _color?.name === 'YZ' ? 0X000000 : _color?.main,
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
    const station = new PIXI.Text({ text: addSpace(e.name), label: "text", style: style, anchor: { x: 0.5, y: 0 } });
    if (e.isStart || e.isEnd || (e.text && e.text.color)) {
      station.style.fill = e.isEnd && e.isSingle ? 0X87CEEB : (Data?.compColor?.name == 'YZ' ? Data.compColor.main : 'red');
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
      fill: _color?.name === 'YZ' ? _color?.main : 'red',
      fontFamily: 'FZHTJW,SimHei',
      fontSize: 48,
    });
    const style_B = style.clone();
    style_B.fontWeight = '700';


    const info = new PIXI.Text({ text: '说明: ', style: style });
    const info1 = new PIXI.Text({ text: ' 单向停靠站点', style: style });
    const info2 = new PIXI.Text({ text: ' 换乘地铁站点', style: style });

    const icon1 = new PIXI.Graphics({ label: "icon1" })
      .arc(5 / 4 * info.width, info.height * 6 / 8, info.height / 2 - 4, Math.PI, 0)
      .stroke({ color: Data.compColor.stroke?.B ? Data.compColor.stroke?.B : Data.compColor.stroke, width: 8 })
      .fill(Data.compColor.fill)
      .moveTo(5 / 4 * info.width - info.height / 2, info.height * 6 / 8 + 2)
      .lineTo(5 / 4 * info.width + info.height / 2, info.height * 6 / 8 + 2)
      .stroke({ color: Data.compColor.stroke?.B ? Data.compColor.stroke?.B : Data.compColor.stroke, width: 4 })

    const frame2 = new PIXI.Rectangle(0, 1000, 200, 200);
    const metro = new PIXI.Texture({ source: B, frame: frame2 });
    const icon2 = new PIXI.Sprite({
      texture: metro,
      label: "icon2",
      anchor: { x: 0.5, y: 0 },
      position: { x: info.width + icon1.width / 2, y: info.height },
      scale: { x: info.height / 200, y: info.height / 200 },
    });

    info1.position.set(info.width + icon1.width, 0)
    info2.position.set(info.width + icon1.width, info.height)

    container.addChild(info, icon1, icon2, info1, info2)

    if (e.isSeg && num) {
      let PO = [300, 900, 300, 497]; // 定位-3
      const frame3 = new PIXI.Rectangle(PO[0], PO[1], PO[2], PO[3]);
      const priceSeg = new PIXI.Texture({ source: A, frame: frame3 });
      const icon3 = new PIXI.Sprite({
        texture: priceSeg,
        label: "icon3",
        anchor: { x: 0, y: 0.5 },
        position: { x: info.width + icon1.width * 1.5 + info1.width, y: icon2.y * 1.08 },
        scale: { x: (icon1.height + icon2.height) / priceSeg.height, y: (icon1.height + icon2.height) / priceSeg.height },
      });
      // 文字部分
      const info3 = new PIXI.Text({ text: '上车站票价区间提示', style: style_B, anchor: { x: 0, y: 0.5 }, position: { x: icon3.x + icon3.width * 1.2, y: icon3.y } });
      container.addChild(icon3, info3)
    }

    // routeMapStage.addChild(container)

    // if (e.isSeg){
    // }
    return container
  }

  function mergeMetro(left, right, smaller) {
    // console.log(left, right)
    const LT = left.getChildByLabel("text");
    const LM = left.getChildByLabel("metro");
    const LI = left.getChildByLabel("DTag");
    const RT = right.getChildByLabel("text");
    const RM = right.getChildByLabel("metro");
    const RI = right.getChildByLabel("DTag");
    const minY = () => { return { L: LT.y, R: RT.y } }
    const middleY = () => { return { L: LI ? LI.y + LI.height : LT.y + LT.height, R: RI ? RI.y + RI.height : RT.y + RT.height } }
    const maxY = () => {
      const max = (x, width) => { return ((x > sizeP[0]) && (x < sizeP[0] + sizeP[2] + width/**避免右侧压线导致长的输出短 */) ? sizeP[1] : _param.recPriBt.y) };
      return { L: max(LT.x + (LT.width / 2), LT.width), R: max(RT.x + (RT.width / 2), RT.width) }
    }
    if /**长度一致*/(LT.text.length == RT.text.length && Math.abs(middleY().L - middleY().R) <= 15) {
      // console.log(x_width, LM.width, RM.width)
      right.removeChild(RM);/**清除右侧多余图标 */
      LM.position.set(LT.x + (RT.x - LT.x) / 2 - LM.width / 2, middleY().R + 5/**取右侧文字方便折线偏移 */ + (smaller ? 5 : 0));
      // 测量底线
      LM.y + LM.height > Math.min(maxY().L, maxY().R) ? (() => {
        const subT = LM.y + LM.height - Math.min(maxY().L, maxY().R);
        LT.height -= subT;
        RT.height -= subT;
        LM.y -= subT;
      })() : '';
      // 画线
      const graphics = new PIXI.Graphics()
        .circle(LT.x, middleY().L + 5 + (smaller ? Math.abs(LT.y - RT.y) : 0)/**折线误差*/, 5)
        .circle(RT.x, middleY().R + 5, 5)
        .fill(Data.compColor.main)
        .moveTo(LT.x, middleY().L + 5)
        .lineTo(LT.x, middleY().L + 5 + LT.width / 2 + Math.abs(middleY().L - middleY().R))
        .lineTo(LT.x + (RT.x - LT.x - LM.width) / 2 - 5, middleY().L + 5 + LT.width / 2 + Math.abs(middleY().L - middleY().R))
        .moveTo(RT.x, middleY().R + 5)
        .lineTo(RT.x, middleY().R + 5 + RT.width / 2)
        .lineTo(RT.x - (RT.x - LT.x - LM.width) / 2 + 5, middleY().R + 5 + RT.width / 2)
        .stroke({ width: (smaller ? 0 : 4), color: Data.compColor.main })
        .moveTo(LT.x, middleY().L + 5 + (smaller ? Math.abs(LT.y - RT.y) : 0))
        .lineTo(RT.x, middleY().R + 5)
        .stroke({ width: (smaller ? 4 : 0), color: Data.compColor.main })
      left.addChild(graphics);
    } else /**长度不一致*/ {
      if (maxY().L - middleY().L > maxY().R - middleY().R - (minY().R - minY().L)) {
        // 左侧空白大于右侧
        right.removeChild(RM);/**清除右侧多余图标 */
        // 空白高度容纳图标
        if (middleY().L + 15 + LM.height < middleY().R) {
          LM.position.set(LT.x - LT.width / 2, middleY().R - LM.height);
          // 画线
          const LLine = (LM.y - 5) - (middleY().L + 5) < LT.width / 2 ? true : false;/**间距小于字宽一半自动忽略布置 */
          LLine ? LM.y -= ((LM.y - 5) - (middleY().L + 5)) / 1.5 : '';/**地铁图标上移 */
          const graphics = new PIXI.Graphics()
            .circle(LT.x, middleY().L + 5, LLine ? 0 : 5)
            .circle(LT.x, middleY().R - LM.height - 10, LLine ? 0 : 5)
            .circle(LT.x, middleY().R + 10, 5)
            .circle(RT.x, middleY().R + 10, 5)
            .fill(Data.compColor.main)
            .moveTo(LT.x, middleY().L + 5)
            .lineTo(LT.x, LLine ? middleY().L + 5 : LM.y - 5)
            .moveTo(LT.x, middleY().R + 10)
            .lineTo(RT.x, middleY().R + 10)
            .stroke({ width: 4, color: Data.compColor.main })
          left.addChild(graphics);
        } else {
          // 空白高度无法容纳图标
          LM.position.set(LT.x - LT.width / 2, middleY().R + 5);
          // 测量底线
          // 左侧图标底线大于底线
          LM.y + LM.height > maxY().L ? (() => {
            const subT = LM.y + LM.height - maxY().L;
            LM.y -= subT;
            LT.height = LM.y - 20 < middleY().L ? LT.height - (middleY().L - (LM.y - 20)) : LT.height;
            RT.height = middleY().R + RT.width / 2 + 5 > maxY().L ? RT.height - (maxY().L - (middleY().R - RT.width - 5)) : RT.height;
          })() : '';
          // 画线
          const LLine = (LM.y - 5) - (middleY().L + 5) < LT.width / 2 ? true : false;/**间距小于字宽一半自动忽略布置 */
          LLine ? LT.height += (LM.y - 5) - (middleY().L + 5) : '';/**字体放款 */
          const LIcon =/**间距大于字宽缩回&图标底部不超过线段 */
            (LM.y - 5) - (middleY().L + 5) > LT.width / 2 && (LM.y + LM.height - LT.width / 2) > middleY().R + 5 ?
              (LM.y + LM.height - LT.width / 2) - ((LM.y - 5) - (middleY().L + 5) - LT.width / 2 - 5) < middleY().R + 5 + LT.width / 2 - Math.abs(LT.y - RT.y)/**消除y轴误差 */ ?
                LM.y - 5 - middleY().R + LM.height - LT.width
                : ((LM.y - 5) - (middleY().L + 5) - LT.width / 2 - 5)
              : 0;
          // console.log(LIcon, LM.y - 5 - LT.width - middleY().R + LM.height + RT.width / 2, ((LM.y - 5) - (middleY().L + 5) - LT.width / 2 - 5))
          const graphics = new PIXI.Graphics()
            .circle(LT.x, middleY().L + 5, LLine ? 0 : 5)
            .circle(RT.x, middleY().R + 5, 5)
            .fill(Data.compColor.main)
            .moveTo(LT.x, middleY().L + 5)
            .lineTo(LT.x, LLine ? middleY().L + 5 : LM.y - 5 - LIcon)
            .moveTo(RT.x, middleY().R + 5)
            .lineTo(RT.x, middleY().R + 5 + RT.width / 2)
            .lineTo(LT.x + LT.width / 2 + 5, middleY().R + 5 + RT.width / 2)
            .stroke({ width: 4, color: Data.compColor.main })
          LIcon ? LM.y -= LIcon : '';
          left.addChild(graphics);
        }
      } else {
        // 右侧空白大于左侧
        left.removeChild(LM);/**清除左侧多余图标 */
        // 空白高度容纳图标
        if (middleY().R + 15 + RM.height < middleY().L) {
          RM.position.set(RT.x - RT.width / 2, middleY().L - RM.height);
          // 画线
          const RLine = (RM.y - 5) - (middleY().R + 5) < RT.width / 2 ? true : false;/**间距小于字宽一半自动忽略布置 */
          RLine ? RM.y -= ((RM.y - 5) - (middleY().R + 5)) / 1.5 : '';/**地铁图标上移 */
          const graphics = new PIXI.Graphics()
            .circle(RT.x, middleY().R + 5, RLine ? 0 : 5)
            .circle(RT.x, middleY().L - RM.height - 10, RLine ? 0 : 5)
            .circle(RT.x, middleY().L + 10, 5)
            .circle(LT.x, middleY().L + 10, 5)
            .fill(Data.compColor.main)
            .moveTo(RT.x, middleY().R + 5)
            .lineTo(RT.x, RLine ? middleY().R + 5 : RM.y - 5)
            .moveTo(RT.x, middleY().L + 10)
            .lineTo(LT.x, middleY().L + 10)
            .stroke({ width: 4, color: Data.compColor.main })
          right.addChild(graphics);
        } else {
          // 空白高度无法容纳图标
          RM.position.set(RT.x - RT.width / 2, middleY().L + 5);
          // 测量底线
          // 右侧图标底线大于底线
          RM.y + RM.height > maxY().R ? (() => {
            const subT = RM.y + RM.height - maxY().R;
            RM.y -= subT;
            LT.height = middleY().L + LT.width / 2 + 5 > maxY().R ? LT.height - (maxY().R - (middleY().L - LT.width - 5)) : LT.height;
            RT.height = RM.y - 20 < middleY().R ? RT.height - (middleY().R - (RM.y - 20)) : RT.height;
          })() : '';
          // 画线
          const RLine = (RM.y - 5) - (middleY().R + 5) < RT.width / 2 ? true : false;/**间距小于字宽一半自动忽略布置 */
          RLine ? RT.height += (RM.y - 5) - (middleY().R + 5) : '';/**字体放款 */
          const RIcon =/**间距大于字宽缩回&图标底部不超过线段 */
            (RM.y - 5) - (middleY().R + 5) > RT.width / 2 && (RM.y + RM.height - RT.width / 2) > middleY().L + 5 ?
              (RM.y + RM.height - RT.width / 2) - ((RM.y - 5) - (middleY().R + 5) - RT.width / 2 - 5) < middleY().L + 5 + RT.width / 2 - Math.abs(LT.y - RT.y)/**消除y轴误差 */ ?
                RM.y - 5 - middleY().L + RM.height - RT.width
                : ((RM.y - 5) - (middleY().R + 5) - RT.width / 2 - 5)
              : 0;
          // console.log(RIcon, RM.y - 5 - middleY().L + RM.height - RT.width / 2 - Math.abs(LT.y - RT.y), ((RM.y - 5) - (middleY().R + 5) - RT.width / 2 - 5))
          const graphics = new PIXI.Graphics()
            .circle(RT.x, middleY().R + 5, RLine ? 0 : 5)
            .circle(LT.x, middleY().L + 5, 5)
            .fill(Data.compColor.main)
            .moveTo(RT.x, middleY().R + 5)
            .lineTo(RT.x, RLine ? middleY().R + 5 : RM.y - 5 - RIcon)
            .moveTo(LT.x, middleY().L + 5)
            .lineTo(LT.x, middleY().L + 5 + LT.width / 2)
            .lineTo(RT.x - RT.width / 2 - 4, middleY().L + 5 + LT.width / 2)
            .stroke({ width: 4, color: Data.compColor.main })
          RIcon ? RM.y -= RIcon : '';
          right.addChild(graphics);
        }
      }
    }

  }

}

export {
  printLineStation,
}