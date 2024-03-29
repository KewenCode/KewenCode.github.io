import { param } from "../parameter.js"
import { OS } from "../../../tools.js"
import { drawRoundLine } from "./drawSprite.js";

async function printRoundStation(_x, _y, _color, _telBounds) {
  const _param = param.size;
  const _paramR = param.size.roundLine;
  const _station = Data.station;
  // 加载图标
  let loadElementAssets = await PIXI.Assets.loadBundle('load-NJGJ');
  const A = loadElementAssets.Element;
  const B = loadElementAssets.Metro;
  const outerContainer = new PIXI.Container({ label: "roundStation" });

  const _arraySplit = (_array, _num) => {
    const obj = {}
    switch (_array.length % _num) {
      case 0:
        obj.start = ['0']
        obj.end = [`${_array.length - 1}`]
        obj.U1 = _array.slice(1, _array.length / 2)
        obj.D1 = _array.slice(_array.length / 2, _array.length - 1).reverse()
        return { _remainder: 0, _array: obj }
      case 1:
        obj.start = ['0']
        obj.end = [`${_array.length - 1}`]
        obj.middle = [`${_array.length / 2}`]
        obj.U1 = _array.slice(1, _array.length / 2)
        obj.M1 = _array.slice(_array.length / 2, _array.length / 2 + 1)
        obj.D1 = _array.slice(_array.length / 2 + 1, _array.length - 1).reverse()
        return { _remainder: 1, _array: obj }
    }
  }

  const widthSub = (A, W, B, S) => {
    W = A?.U ? W - (B - S) * A.U : W;  /* 非首末站大图标 */
    W = A?.R.length ? W - (B * 1.3 - S) * A.R.length : W;  /* 河流图标 */
    // console.log(W)
    return W
  }

  const { _remainder, _array } = _arraySplit(Object.keys(_station), 2);
  const itemWidthALL/* item间距 */ = _paramR.x[1] - _paramR.x[0] - _paramR.h * 6;
  const extWidth = { 'U': {}, 'D': {}, 'M': {} };  /* 首末站单向及中部大图标信息，判断宽度，添加河流图标 */
  const x_width = { 'U': {}, 'D': {}, 'M': {} };
  let priceSegExt = false;

  Array('U', 'D', 'M').forEach(e => {
    let [i] = [1];
    while (true) {
      let [U/* 非首末站大图标 */, P/* 分段计价点 */, R/* 河流图标 */, N/* 站点数 */] = [0, 0, [], 0];
      if (_array?.[e + String(i)]) {
        _array?.[e + String(i)].forEach(item => {
          // 单块item遍历
          // console.log(item, _station[item])
          _station[item].isStart || _station[item].isEnd ? U++ : '';
          _station[item]?.isPriSeg ? P++ : '';
          priceSegExt = _station[item]?.isPriSeg ? true : priceSegExt;
          _station[item].isRiver ? R.push(item) : '';
          N++;
        })
        Object.assign(extWidth[e], { [e + String(i)]: { U: U, R: R, P: P, N: N } });
        // 暂定写法，后期修改itemWidthALL
        const _width = widthSub(extWidth[e][e + String(i)], itemWidthALL, _param.roundDirScale.B, _param.roundDirScale.S) / (N - 1);
        Object.assign(x_width[e], { [e + String(i)]: (isFinite(_width) ? _width : 0) });
        // console.log(e, extWidth, x_width)
        i++;
      } else {
        // console.log(extWidth)
        break;
      }
    }
  });

  // 间距小于图标宽度
  let roundWB = _param.roundDirScale.B
  let roundWS = _param.roundDirScale.S
  Object.keys(x_width).forEach(e => {
    Object.keys(x_width[e]).forEach(part => {
      // 单块item遍历
      // console.log(x_width[e][part], _param.roundDirScale.S * 1.5)
      x_width[e][part] > 0 && x_width[e][part] <= _param.roundDirScale.S * 1.5 ?
        (() => {
          const subWidth = ((_param.roundDirScale.S * 1.5 - Math.abs(x_width[e][part])) / 2);
          const _newRoundWB = _param.roundDirScale.B - subWidth * (roundWB / roundWS);
          const _newRoundWS = _param.roundDirScale.S - subWidth
          roundWB = _newRoundWB < roundWB ? _newRoundWB : roundWB;
          roundWS = _newRoundWS < roundWS ? _newRoundWS : roundWS;
          // roundWB = roundWB - subWidth * (roundWB / roundWS);
          // roundWS = roundWS - subWidth;
          // console.log(subWidth, roundWB, roundWS)
          // 弥补缩小后首末站计算差距
          // let itemWidth = widthSub(extWidth[e][part], itemWidthALL, roundWB, roundWS);
          // x_width[e][part] = itemWidth / extWidth[e][part].N;
        })() : '';
    })
  })

  const point = [
    { method: 'moveTo', x: _paramR.x[0] + _paramR.h * 1.5, y: _paramR.y[0] },
    { method: 'arcTo', x1: _paramR.x[1], y1: _paramR.y[0], x2: _paramR.x[1], y2: _paramR.y[0] + _paramR.h * 1.5, radius: _paramR.r },
    { method: 'arcTo', x1: _paramR.x[1], y1: _paramR.y[1], x2: _paramR.x[1] - _paramR.h * 1.5, y2: _paramR.y[1], radius: _paramR.r },
    { method: 'arcTo', x1: _paramR.x[0], y1: _paramR.y[1], x2: _paramR.x[0], y2: _paramR.y[1] - _paramR.h * 1.5, radius: _paramR.r },
    { method: 'arcTo', x1: _paramR.x[0], y1: _paramR.y[0], x2: _paramR.x[0] + _paramR.h * 1.5, y2: _paramR.y[0], radius: _paramR.r },
    { method: 'stroke', width: _paramR.h },
  ]
  const _line = await drawRoundLine(0, 0, _color?.line, point);
  outerContainer.addChild(_line);

  const _info = appendInfo(Data, priceSegExt);
  outerContainer.addChild(_info);
  const _infoBounds = _info.getBounds();

  // 加框的
  // const aa = new PIXI.Graphics()
  //   .moveTo(_infoBounds.minX, _infoBounds.minY)
  //   .lineTo(_infoBounds.maxX, _infoBounds.minY)
  //   .lineTo(_infoBounds.maxX, _infoBounds.maxY)
  //   .lineTo(_infoBounds.minX, _infoBounds.maxY)
  //   .lineTo(_infoBounds.minX, _infoBounds.minY)
  //   .stroke({ width: 2, color: Data.compColor.main })
  // const bb = new PIXI.Graphics()
  //   .moveTo(_telBounds.minX, _telBounds.minY)
  //   .lineTo(_telBounds.maxX, _telBounds.minY)
  //   .lineTo(_telBounds.maxX, _telBounds.maxY)
  //   .lineTo(_telBounds.minX, _telBounds.maxY)
  //   .lineTo(_telBounds.minX, _telBounds.minY)
  //   .stroke({ width: 2, color: Data.compColor.main })
  // outerContainer.addChild(aa, bb)

  // 普通站名
  for (const e of ['U', 'D', 'M']) {
    const _Y /* y轴 */ = { U: _paramR.y[0], D: _paramR.y[1], M: (_paramR.y[1] + _paramR.y[0]) / 2 };
    let [_X, i] = [0, 1];
    switch (e) {
      case 'U':
      case 'D':
        _X = _paramR.x[0] + _paramR.h * 3;
        break;
      case 'M':
        _X = _paramR.x[1];
        break;
    }
    while (true) {
      if (_array?.[e + String(i)]) {
        let [_no] = [0];  /* 每块内部序号 */
        // 数据间存在【_no】依赖，无法同步执行
        for (const item of _array[e + String(i)]) {
          // 单块item遍历
          const SingleContainer = new PIXI.Container({ label: `station${item}` });
          const scale = roundWS / _param.roundDirScale.S;
          const merge = _station[item]?.metroMerge || false;
          // console.log(_station[item], merge)

          const S = iconStation(_station[item], e);
          S.position.set(x_width[e][e + String(i)] * _no + _X + _x, _Y[e] + _y);

          const T = textStation(_station[item], scale, e);
          T.anchor.set(e == 'U' || e == 'M' ? 0 : 1, e == 'M' ? 0.5 : e == 'U' ? 1 : 0)
          // T.position.set(S.x, S.y + _paramR.h * 1.5 * (e == 'U' ? -1 : 1));

          //修复单向图标位移
          switch (true) {
            case e == 'U' && _station[item].sign?.direction == 1:
            case e == 'D' && _station[item].sign?.direction == 0:
              T.position.set(S.x, S.y + _paramR.h * 1.5 * (e == 'U' ? -1 : 1));
              S.y += _paramR.h / 3;
              break;
            case e == 'U' && _station[item].sign?.direction == 0:
            case e == 'D' && _station[item].sign?.direction == 1:
              T.position.set(S.x, S.y + _paramR.h * 1.5 * (e == 'U' ? -1 : 1));
              S.y -= _paramR.h / 3;
              break;
            case e == 'U':
            case e == 'D':
              T.position.set(S.x, S.y + _paramR.h * 1.5 * (e == 'U' ? -1 : 1));
              break;
            case e == 'M':
              T.position.set(S.x + _paramR.h * 2, S.y);
              const subT = (T.height / 2 - (S.y - (_paramR.y[0] - _paramR.h * 2)));
              subT > 0 ? T.x += _paramR.h / 25 * Math.min(subT, 80) : '';
              T.height = Math.min(T.height, 340)
            // console.log(subT, T.x, T.height)
            case e == 'M' && _station[item].sign?.direction == 0:
              S.x += _paramR.h / 3;
              break;
            case e == 'M' && _station[item].sign?.direction == 1:
              S.x -= _paramR.h / 3;
              break;
          }

          SingleContainer.addChild(S, T)

          const M = await iconMetro(_station[item], T.style.fontSize, e);
          const calPT = calPos(-45, T.x, T.y, T.width, T.height, T.anchor.x, T.anchor.y);
          const calPTM = calPos(-45, T.x, T.y, T.width + (M?.width || 0), T.height, T.anchor.x, T.anchor.y);
          if (M) {
            M.angle = -45;
            SingleContainer.addChild(M)
          }

          // 图标换行代码
          const metroOverFlowUp = (T, M, calPT, subWidth, SingleContainer, hid) => {
            let metroOver = false;
            M.position.set(calPT.right.middle.x - (subWidth - T.style.fontSize * 0.8 + M.width) * Math.sin(Math.PI / 4), calPT.right.middle.y + (subWidth + T.style.fontSize * 0.8 + M.width) * Math.sin(Math.PI / 4))
            if (M.y + M.height * Math.sin(Math.PI / 4) > T.y)/* 地铁图标底部超限 */ {
              // 固定至底部
              M.position.set(T.x + T.style.fontSize * 1.3 * Math.sin(Math.PI / 4), T.y - M.height * Math.sin(Math.PI / 4));
              // 长度小于0.8width，缩小内容,或缩短线段
              if (M.width * 0.8 <= (T.y - (calPT.right.middle.y + (subWidth - 10 + T.style.fontSize * 2) * Math.sin(Math.PI / 4))) * (2 ** (1 / 2))) {
                M.width = (T.y - (calPT.right.middle.y + (subWidth - 10 + T.style.fontSize * 2) * Math.sin(Math.PI / 4))) * (2 ** (1 / 2))
              }
              else {
                metroOver = true;
                if (M.y - M.width * Math.sin(Math.PI / 4) < _telBounds.maxY) {
                  let subWidth = (_telBounds.maxY - (M.y - M.width * Math.sin(Math.PI / 4)) - 10/* 10为安全范围 */) * (2 ** (1 / 2));
                  if (hid) /* T右侧触碰logo且顶部低于底线 */ {
                    M.width = (_telBounds.minX - (M.x + M.height * Math.sin(Math.PI / 4))) * (2 ** (1 / 2));
                    subWidth = 0
                  } else if (M.y - M.width * Math.sin(Math.PI / 4) < _telBounds.minY) {
                    subWidth = (_telBounds.minY - (M.y - M.width * Math.sin(Math.PI / 4))) * (2 ** (1 / 2));
                  } else if (M.x + M.width * Math.sin(Math.PI / 4) < _telBounds.minX) /* M延长线未触及 */ {
                    const sub = ((_telBounds.minY - (M.y - M.width * Math.sin(Math.PI / 4))) * (2 ** (1 / 2)));
                    subWidth = sub > 0 ? sub : 0;
                  }
                  M.width -= subWidth
                }
              }
            }
            const graphics = new PIXI.Graphics()
              .circle(calPT.right.middle.x - (subWidth - 10) * Math.sin(Math.PI / 4), calPT.right.middle.y + (subWidth - 10) * Math.sin(Math.PI / 4), 5)
              .circle(calPT.right.middle.x - (subWidth - 10 - T.style.fontSize * (metroOver ? 0.6 : 1.3)) * Math.sin(Math.PI / 4), calPT.right.middle.y + (subWidth - 10 + T.style.fontSize * (metroOver ? 0.6 : 1.3)) * Math.sin(Math.PI / 4), 5)
              .fill(Data.compColor.main)
              .moveTo(calPT.right.middle.x - (subWidth - 10) * Math.sin(Math.PI / 4), calPT.right.middle.y + (subWidth - 10) * Math.sin(Math.PI / 4))
              .lineTo(calPT.right.middle.x - (subWidth - 10 - T.style.fontSize * (metroOver ? 0.6 : 1.3)) * Math.sin(Math.PI / 4), calPT.right.middle.y + (subWidth - 10 + T.style.fontSize * (metroOver ? 0.6 : 1.3)) * Math.sin(Math.PI / 4))
              .stroke({ width: 4, color: Data.compColor.main })
            if (!hid || calPT.right.bottom.x < _telBounds.minX - 30) /* 非隐藏或边界小于minX-20 */
              SingleContainer.addChild(graphics)
          }
          const metroOverFlowDown = (T, M, calPT, subWidth, SingleContainer, hid) => {
            let metroOver = false;
            M.position.set(calPT.left.middle.x + (subWidth + T.style.fontSize * 0.8) * Math.sin(Math.PI / 4), calPT.left.middle.y - (subWidth - T.style.fontSize * 0.8) * Math.sin(Math.PI / 4))
            if (M.y - M.width * Math.sin(Math.PI / 4) < T.y || (hid && M.y > _infoBounds.minY))/* 地铁图标顶部超限,左侧item可免于判断 */ {
              // 长度小于0.8width，缩小内容,或缩短线段
              if (M.width * 0.8 <= (T.width + T.height) && !hid) {
                M.width = T.width + T.height;
                // 固定至顶部
                M.position.set(T.x + T.style.fontSize * 1.3 * (2 ** (1 / 2)) - M.width * Math.sin(Math.PI / 4), T.y + M.width * Math.sin(Math.PI / 4));
              }
              else {
                // 固定至顶部
                M.position.set(T.x + T.style.fontSize * 1.3 * (2 ** (1 / 2)) - M.width * Math.sin(Math.PI / 4), T.y + M.width * Math.sin(Math.PI / 4));
                metroOver = true;
                if (M.y + M.height * Math.sin(Math.PI / 4) > _infoBounds.minY) {
                  let subWidth = (M.y + M.height * Math.sin(Math.PI / 4) - _infoBounds.minY) * (2 ** (1 / 2));
                  if (hid) /*  */ {
                    M.width = (_infoBounds.minY - (T.y + M.height * Math.sin(Math.PI / 4))) * (2 ** (1 / 2));
                    subWidth = 0
                  } else if (M.y + M.height * Math.sin(Math.PI / 4) > _infoBounds.maxY) {
                    subWidth = (M.y + M.height * Math.sin(Math.PI / 4) - _infoBounds.maxY) * (2 ** (1 / 2));
                  }
                  M.width -= subWidth;
                  // 固定至顶部
                  M.position.set(T.x + T.style.fontSize * 1.3 * (2 ** (1 / 2)) - M.width * Math.sin(Math.PI / 4), T.y + M.width * Math.sin(Math.PI / 4));
                }
              }
            }
            const graphics = new PIXI.Graphics()
              .circle(calPT.left.middle.x + (subWidth - 10) * Math.sin(Math.PI / 4), calPT.left.middle.y - (subWidth - 10) * Math.sin(Math.PI / 4), 5)
              .circle(calPT.left.middle.x + (subWidth - 10 + T.style.fontSize * (metroOver ? 0.6 : 1.3)) * Math.sin(Math.PI / 4), calPT.left.middle.y - (subWidth - 10 - T.style.fontSize * (metroOver ? 0.6 : 1.3)) * Math.sin(Math.PI / 4), 5)
              .fill(Data.compColor.main)
              .moveTo(calPT.left.middle.x + (subWidth - 10) * Math.sin(Math.PI / 4), calPT.left.middle.y - (subWidth - 10) * Math.sin(Math.PI / 4))
              .lineTo(calPT.left.middle.x + (subWidth - 10 + T.style.fontSize * (metroOver ? 0.6 : 1.3)) * Math.sin(Math.PI / 4), calPT.left.middle.y - (subWidth - 10 - T.style.fontSize * (metroOver ? 0.6 : 1.3)) * Math.sin(Math.PI / 4))
              .stroke({ width: 4, color: Data.compColor.main })
            if (!hid /* || calPT.right.bottom.x < _telBounds.minX - 30 */) /* 非隐藏或边界小于minX-20 */
              SingleContainer.addChild(graphics)
          }

          // 杂七杂八的算法
          if /* T顶点及X轴位于logoX轴对应区间 */ (T.x + (T.y - _telBounds.maxY) >= _telBounds.minX + 35 && T.x + (T.y - _telBounds.maxY) <= _telBounds.maxX && e == 'U') {

            let subWidth = 0;
            if (calPTM.right.top.y < _telBounds.maxY && !merge) {
              const subY = _telBounds.maxY - calPTM.right.top.y
              subWidth = subY * (2 ** (1 / 2));
              /* 压缩宽度大于100 */ subY >= 100 ? subWidth -= 20 : '';
            } else if (calPT.right.top.y < _telBounds.maxY && merge) {/* 计算文字缩短距离 */
              const subY = _telBounds.maxY - calPT.right.top.y
              subWidth = subY * (2 ** (1 / 2));
               /* 压缩宽度大于100 */ subY >= 100 ? subWidth -= 20 : '';
            }
            T.width -= subWidth;
            if (M) {
              M.position.set(calPT.right.middle.x - (M.height / 2 + subWidth) * Math.sin(Math.PI / 4), calPT.right.middle.y - (M.height / 2 - subWidth) * Math.sin(Math.PI / 4));
              if (M.y - M.width * Math.sin(Math.PI / 4) < _telBounds.maxY - 5 && merge)/* 间距不能容纳图标，5为边界安全值 */ {
                metroOverFlowUp(T, M, calPT, subWidth, SingleContainer);
              }
            }

          } else if /* T+M右侧触碰logo且顶部低于底线 */ (T.x + (T.y - _telBounds.minY) >= _telBounds.minX && calPTM.right.bottom.x >= _telBounds.minX && calPTM.right.bottom.y <= _telBounds.maxY && e == 'U') {

            let subWidth = 0;
            if (calPTM.right.bottom.x >= _telBounds.minX && calPTM.right.bottom.y <= _telBounds.maxY && !merge) {
              subWidth = (calPTM.right.bottom.x - _telBounds.minX) * (2 ** (1 / 2));
            } else if (calPT.right.bottom.x >= _telBounds.minX && calPT.right.bottom.y <= _telBounds.maxY && merge)/* T右侧触碰logo且顶部低于底线 */ {
              subWidth = (calPT.right.bottom.x - _telBounds.minX) * (2 ** (1 / 2));
            }
            T.width -= subWidth;
            if (M) {
              M.position.set(calPT.right.middle.x - (M.height / 2 + subWidth) * Math.sin(Math.PI / 4), calPT.right.middle.y - (M.height / 2 - subWidth) * Math.sin(Math.PI / 4));
              if (merge)/* 间距不能容纳图标，5为边界安全值 */ {
                metroOverFlowUp(T, M, calPT, subWidth, SingleContainer, true)
              }
            }

          } else if /* T底部延长线bottom-minX/maxX,触碰info */ ((T.x - (_infoBounds.minY - T.y) + T.height * (2 ** (1 / 2))) >= _infoBounds.minX && (T.x - (_infoBounds.minY - T.y) + T.height * (2 ** (1 / 2))) <= _infoBounds.maxX && e == 'D') {

            let subWidth = 0;
            let hid = false;
            if (calPTM.left.bottom.y > _infoBounds.minY && !merge) {
              subWidth = (calPTM.left.bottom.y - _infoBounds.minY) * (2 ** (1 / 2));
              T.width -= subWidth;
            } else if (calPT.left.bottom.y + (M?.height || 0) * Math.sin(Math.PI / 4) > _infoBounds.minY && merge) {/* 计算T+M后文字缩短距离 */
              const subY = calPT.left.bottom.y + (M?.height || 0) * Math.sin(Math.PI / 4) - _infoBounds.minY
              const _subY = calPT.left.bottom.y - _infoBounds.minY
              hid = subY - _subY > 10 ? true : false;
              subWidth = (hid ? _subY : subY) * (2 ** (1 / 2));
              T.width -= subWidth;
              subWidth = subY * (2 ** (1 / 2)); /* 赋更大值 */
            }
            if (M) {
              M.position.set(calPT.left.middle.x - (M.width + 5 + (M.height / 3) - subWidth) * Math.sin(Math.PI / 4), calPT.left.middle.y - ((M.height / 2) - (M.width + 5) + subWidth) * Math.sin(Math.PI / 4))
              if (M.y + M.width * Math.sin(Math.PI / 4) > _infoBounds.minY && merge) {
                metroOverFlowDown(T, M, calPT, subWidth, SingleContainer, hid);
              }
            }

          } else if /* 左侧超出范围*/ (calPTM.left.top.x < _param.recComp.x + _param.recComp.w && e == 'D') {
            let subWidth = 0;
            let hid = false
            if (calPTM.left.top.x < _param.recComp.x + _param.recComp.w && !merge) {
              subWidth = (_param.recComp.x + _param.recComp.w - calPTM.left.top.x) * (2 ** (1 / 2));
            } else if (calPT.left.top.x < _param.recComp.x + _param.recComp.w && merge) {
              subWidth = (_param.recComp.x + _param.recComp.w - calPT.left.top.x) * (2 ** (1 / 2));
            }
            T.width -= subWidth;

            if (M) {
              M.position.set(calPT.left.middle.x - (M.width + 5 + (M.height / 3) - subWidth) * Math.sin(Math.PI / 4), calPT.left.middle.y - ((M.height / 2) - (M.width + 5) + subWidth) * Math.sin(Math.PI / 4))
              if (merge) {
                hid = T.y + (T.width + T.height * 2) * Math.sin(Math.PI / 4) > _infoBounds.minY ? true : false;
                metroOverFlowDown(T, M, calPT, subWidth, SingleContainer, hid);
              }
            }
          } else if /* T底部延长线介于minY/maxY,触碰info */ ((T.x - (_infoBounds.minY - T.y) + T.height * (2 ** (1 / 2))) > _infoBounds.maxX && (T.x - (_infoBounds.maxY - T.y)) <= _infoBounds.maxX && e == 'D') {

            let subWidth = 0;
            let hid = false
            if (calPTM.left.top.x < _infoBounds.maxX && !merge) {
              subWidth = (_infoBounds.maxX - calPTM.left.top.x) * (2 ** (1 / 2));
            } else if (calPT.left.top.x < _infoBounds.maxX && merge) /* 顶部触线 */ {
              subWidth = (_infoBounds.maxX - calPT.left.top.x) * (2 ** (1 / 2));
            }
            if (calPTM.left.bottom.y > _infoBounds.maxY && !merge) {
              const _sub = (calPTM.left.bottom.y - _infoBounds.maxY) * (2 ** (1 / 2));
              subWidth = _sub > subWidth ? _sub : subWidth;
            } else if (calPT.left.bottom.y + (M?.height || 0) * 1.2 * Math.sin(Math.PI / 4) > _infoBounds.maxY && merge) /* 底部触线 */ {
              const _sub = ((calPT.left.bottom.y + (M?.height || 0) * 1.2 * Math.sin(Math.PI / 4)) - _infoBounds.maxY) * (2 ** (1 / 2));
              subWidth = _sub > subWidth ? _sub : subWidth;
            }
            T.width -= subWidth;
            if (M) {
              M.position.set(calPT.left.middle.x - (M.width + 5 + (M.height / 3) - subWidth) * Math.sin(Math.PI / 4), calPT.left.middle.y - ((M.height / 2) - (M.width + 5) + subWidth) * Math.sin(Math.PI / 4))
              if (calPTM.left.top.x < _infoBounds.maxX && merge)/* 间距不能容纳图标，5为边界安全值 */ {
                metroOverFlowDown(T, M, calPT, subWidth, SingleContainer, hid);
              }
            }

          } else if (e == 'M') {
            if (M) {
              M.angle = 0;
              const _MX = (T.x - _paramR.x[1] - _paramR.h) > T.width ? -T.width : T.width;
              M.position.set(T.x + _MX, T.y);
              M.height = M.x < T.x ? Math.min(M.height, T.height - T.width * 2) : Math.min(M.height, T.height + T.width * 2);
              M.y -= M.height / 2
            }

          } else /* 普通区间判断高度 */ {
            if/* 上半部分 */(T.y < _paramR.y[0]) {
              /* 计算文字缩短距离 */let subWidth = 0;
              if (calPTM.right.top.y < _telBounds.minY && !merge) {
                subWidth = (_telBounds.minY - calPTM.right.top.y) * (2 ** (1 / 2))
              } else if (calPTM.right.top.y < _telBounds.minY && merge) {
                if (calPT.right.top.y < _telBounds.minY) { subWidth = (_telBounds.minY - calPT.right.top.y) * (2 ** (1 / 2)) }
              }
              if (M) {
                M.position.set(calPT.right.middle.x - (M.height / 2 + subWidth) * Math.sin(Math.PI / 4), calPT.right.middle.y - (M.height / 2 - subWidth) * Math.sin(Math.PI / 4));
                if (M.y - M.width * Math.sin(Math.PI / 4) < _telBounds.minY - 5 && merge)/* 间距不能容纳图标，5为边界安全值 */ {
                  metroOverFlowUp(T, M, calPT, subWidth, SingleContainer);
                }
              }
              T.width -= subWidth;
            };
            if/* 下半部分 */(T.y > _paramR.y[1]) {
              /* 计算文字缩短距离 */let subWidth = 0;
              if (calPTM.left.bottom.y > _infoBounds.maxY && !merge) /* Ty轴大于底线 */ {
                subWidth = (calPTM.left.bottom.y - _infoBounds.maxY) * (2 ** (1 / 2))
              } else if (calPT.left.bottom.y > _infoBounds.maxY && merge) /* Ty轴大于底线 */ {
                subWidth = (calPT.left.bottom.y + T.height * Math.sin(Math.PI / 4) - _infoBounds.maxY) * (2 ** (1 / 2))
              }
              if (M) {
                M.position.set(calPT.left.middle.x - (M.width + 5 + (M.height / 3) - subWidth) * Math.sin(Math.PI / 4), calPT.left.middle.y - ((M.height / 2) - (M.width + 5) + subWidth) * Math.sin(Math.PI / 4));
                if (M.y + M.height * Math.sin(Math.PI / 4) > _infoBounds.maxY && merge)/* 间距不能容纳图标，5为边界安全值 */ {
                  metroOverFlowDown(T, M, calPT, subWidth, SingleContainer);
                }
              }
              T.width -= subWidth;
            }
          }
          // const A = iconStation(_station[item], (e == 'D' ? true : false));
          // A.position.set(calPTM.left.bottom.x, calPTM.left.bottom.y);
          // SingleContainer.addChild(A)
          _no++;
          outerContainer.addChild(SingleContainer)
        }
        _X += x_width[e][e + String(i)] * (_no - 1);
        i++;
      } else {
        break;
      }
    }
  };

  // 首末站
  const SE = async (start, end) => {
    const SingleContainer = new PIXI.Container({ label: `station${start}` });
    const _name = _station[start]?.name == _station[end]?.name ? [start] : [start, end];
    const _single = _station[start]?.isSingle && _station[end]?.isSingle;
    const _direction = _station[start]?.sign?.direction == _station[end]?.sign?.direction ? _station[start]?.sign?.direction : null
    // console.log(_single, _direction, _name)

    const S = iconStation({ isSingle: _single && _direction != null, sign: { direction: _direction } }, 'A');
    S.position.set(_paramR.x[0] - (S.width - _paramR.h / 1.5) / 2 + _x, (_paramR.y[1] + _paramR.y[0]) / 2 - (S.height - _paramR.h / 1.5) / 2 + _y);
    SingleContainer.addChild(S)

    _name.map(async e => {
      switch (_name.length) {
        case 1:
          const T = textStation(_station[e], 1, 'A');
          T.position.set(_paramR.x[0] - _paramR.h * 2 + _x, (_paramR.y[1] + _paramR.y[0]) / 2 + _y);
          T.height = Math.min(T.height, 360);
          T.style.fill = 'red';

          const M = await iconMetro(_station[start], T.style.fontSize, 'A');
          if (M) {
            M.angle = 0;
            M.position.set(T.x - T.width * 2, T.y);
            M.height = Math.min(M.height, 360);
            M.y -= M.height / 2
            SingleContainer.addChild(M);
          }
          SingleContainer.addChild(T);
          break;
        case 2:
          const TT = textStation(_station[e], 1, 'AP');
          TT.anchor.set(0.5, 0.5)
          TT.style.lineHeight *= 0.8;
          TT.style.fill = _name.indexOf(e) == 1 ? 0X1F2677 : 'red';
          TT.width = Math.min(TT.width, ((_paramR.x[0] - _paramR.h) - (_param.recComp.x + _param.recComp.w)) * 0.9);
          TT.position.set((_paramR.x[0] - _paramR.h) - ((_paramR.x[0] - _paramR.h) - (_param.recComp.x + _param.recComp.w)) * 0.5 + _x, (_paramR.y[1] + _paramR.y[0] - TT.height) / 2 + TT.height * _name.indexOf(e) + _y);

          const MM = await iconMetro(_station[e], TT.style.fontSize, 'AP');
          if (MM) {
            MM.width = Math.min(MM.width, ((_paramR.x[0] - _paramR.h) - (_param.recComp.x + _param.recComp.w)) * 0.9);
            MM.position.set(TT.x - MM.width / 2, TT.y + (_name.indexOf(e) == 0 ? -TT.height * 0.5 - MM.height : TT.height * 0.5));
            SingleContainer.addChild(MM);
          }
          SingleContainer.addChild(TT);
          break;
      }

    })

    if (!_single) {
      const TS = textStation({ name: '( 内 环 )' }, 0.5, 'AP')
      TS.anchor.set(0, 1)
      TS.style.fill = 'red'
      TS.position.set(_paramR.x[0] + _paramR.h * 2 - _x, (_paramR.y[1] + _paramR.y[0]) / 2 + _paramR.h / 2.5 + _y);
      const TE = textStation({ name: '( 外 环 )' }, 0.5, 'AP')
      TE.style.fill = 0X1F2677
      TE.position.set(_paramR.x[0] + _paramR.h * 2 - _x, (_paramR.y[1] + _paramR.y[0]) / 2 - _paramR.h / 2.5 + _y);
      SingleContainer.addChild(TS, TE)
    }

    // 加框的
    // const _infos = S.getBounds();
    // const cc = new PIXI.Graphics()
    //   .moveTo(_infos.minX, _infos.minY)
    //   .lineTo(_infos.maxX, _infos.minY)
    //   .lineTo(_infos.maxX, _infos.maxY)
    //   .lineTo(_infos.minX, _infos.maxY)
    //   .lineTo(_infos.minX, _infos.minY)
    //   .stroke({ width: 2, color: Data.compColor.main })
    // outerContainer.addChild(cc)

    outerContainer.addChild(SingleContainer)
  }
  SE(_array.start, _array.end);

  return outerContainer

  function calPos(angle, _X, _Y, width, height, anchorX, anchorY) {
    const rightTopX = _X + width * (1 - anchorX) * (2 ** (1 / 2) * (1 / 2)) - height * anchorY * (2 ** (1 / 2) * (1 / 2));
    const rightMiddleX = _X + width * (1 - anchorX) * (2 ** (1 / 2) * (1 / 2)) - height * (anchorY - 0.5) * (2 ** (1 / 2) * (1 / 2));
    const rightBottomX = _X + width * (1 - anchorX) * (2 ** (1 / 2) * (1 / 2)) - height * (anchorY - 1) * (2 ** (1 / 2) * (1 / 2));
    const rightTopY = _Y - width * (1 - anchorX) * (2 ** (1 / 2) * (1 / 2)) - height * anchorY * (2 ** (1 / 2) * (1 / 2));
    const rightMiddleY = _Y - width * (1 - anchorX) * (2 ** (1 / 2) * (1 / 2)) - height * (anchorY - 0.5) * (2 ** (1 / 2) * (1 / 2));
    const rightBottomY = _Y - width * (1 - anchorX) * (2 ** (1 / 2) * (1 / 2)) - height * (anchorY - 1) * (2 ** (1 / 2) * (1 / 2));
    const leftTopX = _X - width * anchorX * (2 ** (1 / 2) * (1 / 2)) - height * anchorY * (2 ** (1 / 2) * (1 / 2));
    const leftMiddleX = _X - width * anchorX * (2 ** (1 / 2) * (1 / 2)) - height * (anchorY - 0.5) * (2 ** (1 / 2) * (1 / 2));
    const leftBottomX = _X - width * anchorX * (2 ** (1 / 2) * (1 / 2)) - height * (anchorY - 1) * (2 ** (1 / 2) * (1 / 2));
    const leftTopY = _Y + width * anchorX * (2 ** (1 / 2) * (1 / 2)) - height * anchorY * (2 ** (1 / 2) * (1 / 2));
    const leftMiddleY = _Y + width * anchorX * (2 ** (1 / 2) * (1 / 2)) - height * (anchorY - 0.5) * (2 ** (1 / 2) * (1 / 2));
    const leftBottomY = _Y + width * anchorX * (2 ** (1 / 2) * (1 / 2)) - height * (anchorY - 1) * (2 ** (1 / 2) * (1 / 2));
    return {
      left: { top: { x: leftTopX, y: leftTopY }, middle: { x: leftMiddleX, y: leftMiddleY }, bottom: { x: leftBottomX, y: leftBottomY } },
      right: { top: { x: rightTopX, y: rightTopY }, middle: { x: rightMiddleX, y: rightMiddleY }, bottom: { x: rightBottomX, y: rightBottomY } },
    }
  }

  function iconStation(e, type) {
    const _scale = (e.isStart || e.isEnd) ? (roundWB / _param.roundDirScale.B) : (roundWS / _param.roundDirScale.S);
    let _angle = 0;
    switch (true) {
      case type == 'U' && e.sign?.direction == 1:
      case type == 'D' && e.sign?.direction == 0:
        _angle = 180;
        break;
      case type == 'M' && e.sign?.direction == 0:
        _angle = 90;
        break;
      case type == 'M' && e.sign?.direction == 1:
        _angle = -90;
        break;
    }

    if (e.isSingle && type != 'A') {
      const _width = (e.isStart || e.isEnd) ? roundWB : roundWS;
      const _size = (e.isStart || e.isEnd) ? 2 : 1;
      const icon = new PIXI.Graphics({ label: "iconStation", angle: _angle })
        .arc(0, 0, _width / 2 - 4, Math.PI, 0)
        .stroke({ color: Data.compColor.stroke?.B ? Data.compColor.stroke?.B : Data.compColor.stroke, width: 8 * _scale })
        .fill(Data.compColor.fill)
        .moveTo(- _width / 2 * _scale, 2 * _scale)
        .lineTo(_width / 2 * _scale, 2 * _scale)
        .stroke({ color: Data.compColor.stroke?.B ? Data.compColor.stroke?.B : Data.compColor.stroke, width: 4 * _scale })
        .moveTo(- _width * 0.02 * _scale, (- 2.5 - 2.5 * _size) * _scale)
        .lineTo(_width * 0.3 * _scale + (8 - 8 * _scale), (- 2.5 - 2.5 * _size) * _scale)
        .stroke({
          color: (e.isStart || e.isEnd || e.sign.convert) ?
            Data.compColor.stroke?.M ? Data.compColor.stroke?.M : Data.compColor.stroke
            : Data.compColor.strokeVer, width: 5 * _size * _scale
        })
        .poly([
          - _width * 0.02 * _scale, (- 2.5 - 10 * _size) * _scale,
          - _width * 0.02 * _scale, (- 2.5) * _scale,
          - _width * 0.35 * _scale - (8 - 8 * _scale), (- 2.5) * _scale])
        .fill((e.isStart || e.isEnd || e.sign.convert) ? Data.compColor.stroke?.M ? Data.compColor.stroke?.M : Data.compColor.stroke
          : Data.compColor.strokeVer)
      return icon
    }

    if ((e.isStart || e.isEnd) && type != 'A') {
      // const dir = ((typeof e.sign !== "undefined" && direction == 0) || e.isEnd) ? -1 : 1;
      // const _dir = dir * _scale;
      const icon = new PIXI.Graphics({ label: "iconStation", angle: _angle })
        .circle(0, 0, roundWB / 2 - 4)
        .stroke({ color: Data.compColor.stroke?.B ? Data.compColor.stroke?.B : Data.compColor.stroke, width: 8 * _scale })
        .fill(Data.compColor.fill)
        .moveTo(- roundWB * 0.38 * _scale - (8 - 8 * _scale), 0)
        .lineTo(- roundWB * 0.08 * _scale, 0)
        .stroke({ color: Data.compColor.stroke?.M ? Data.compColor.stroke?.M : Data.compColor.stroke, width: 15 * _scale })
        .poly([
          - roundWB * 0.08 * _scale, roundWB * 0.25,
          roundWB * 0.45 * _scale + (8 - 8 * _scale), 0,
          - roundWB * 0.08 * _scale, - roundWB * 0.25])
        .fill(Data.compColor.stroke?.M ? Data.compColor.stroke?.M : Data.compColor.stroke)
      return icon
    }

    if (type != 'A') {
      const icon = new PIXI.Graphics({ label: "iconStation" })
        .circle(0, 0, (e.isStart || e.isEnd ? roundWB : roundWS) / 2 - 4)
        .stroke({ color: Data.compColor.stroke?.B ? Data.compColor.stroke?.B : Data.compColor.stroke, width: 8 * _scale })
        .fill(Data.compColor.fill)
      return icon
    }

    if (type == 'A') {
      const icon = new PIXI.Graphics({ label: "iconStation", anchor: { x: 0.5, y: 0.5 } })
        .roundRect(0, 0, _paramR.h * 2, _paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5, _paramR.h / 2)
        .stroke({ color: Data.compColor.line, width: _paramR.h / 1.5 })
        .fill(Data.compColor.fill)
      // console.log((e.isSingle && e?.sign?.direction == 1) || !e.isSingle, e.isSingle, e?.sign?.direction == 1, !e.isSingle)
      if ((e.isSingle && e?.sign?.direction == 1) || !e.isSingle) {
        icon.moveTo(_paramR.h, (_paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5) / 2 - (e.isSingle ? -_paramR.h : _paramR.h / 6))
          .lineTo(_paramR.h, (_paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5) / 2 - _paramR.h / 3 * 2)
          .stroke({ color: 'red', width: _paramR.h * 0.9 })
          .poly([
            _paramR.h - _paramR.h * 0.8, (_paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5) / 2 - _paramR.h / 3 * 2,
            _paramR.h + _paramR.h * 0.8, (_paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5) / 2 - _paramR.h / 3 * 2,
            _paramR.h, (_paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5) / 2 - _paramR.h / 3 * 4])
          .fill('red')
      }
      // console.log((e.isSingle && e?.sign?.direction == 0) || !e.isSingle, (e.isSingle && e?.sign?.direction == 0), !e.isSingle)
      if ((e.isSingle && e?.sign?.direction == 0) || !e.isSingle) {
        icon.moveTo(_paramR.h, (_paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5) / 2 + (e.isSingle ? -_paramR.h : _paramR.h / 6))
          .lineTo(_paramR.h, (_paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5) / 2 + _paramR.h / 3 * 2)
          .stroke({ color: 0X1F2677, width: _paramR.h * 0.9 })
          .poly([
            _paramR.h - _paramR.h * 0.8, (_paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5) / 2 + _paramR.h / 3 * 2,
            _paramR.h + _paramR.h * 0.8, (_paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5) / 2 + _paramR.h / 3 * 2,
            _paramR.h, (_paramR.y[1] - _paramR.y[0] - _paramR.h * 2.5) / 2 + _paramR.h / 3 * 4])
          .fill(0X1F2677)
      }
      return icon
    }

  }

  async function iconMetro(e, tHeight, type) {
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
          position: (type == 'M' || type == 'A' ? { x: 0, y: iconContain.height } : { x: iconContain.width, y: 0 }),
        });
        iconContain.addChild(_icon);
      });

      iconContain.scale.set(tHeight / 200);  // by text width rectify icon width.
      return iconContain
    }
  }

  function textStation(e, scale, type) {

    const style = new PIXI.TextStyle({
      align: 'center',
      fill: _color?.name === 'YZ' ? 0X000000 : _color?.main,
      fontFamily: 'FZHTJW,SimHei',
      fontSize: 40 * scale,
      // fontWeight: 'bold',
      lineHeight: 40,
    });
    const addSpace = (str) => {
      str = str.replace('（', '︵').replace('）', '︶').replace('(', '︵').replace(')', '︶')
      return str.split('').join('\n');
    }
    let textStyle = {}
    switch (type) {
      case 'U':
      case 'D':
        textStyle = { text: e.name, label: "text", style: style, anchor: { x: type == 'U' ? 0 : 1, y: type == 'U' ? 1 : 0 }, angle: -45 };
        break;
      case 'M':
        textStyle = { text: addSpace(e.name), label: "text", style: style, anchor: { x: 0, y: 0.5 } };
        break;
      case 'A':
        textStyle = { text: addSpace(e.name), label: "text", style: style, anchor: { x: 1, y: 0.5 } };
        break;
      case 'AP':
        textStyle = { text: e.name, label: "text", style: style };
        break;
    }

    const station = new PIXI.Text(textStyle);
    if (e.isStart || e.isEnd || (e.text && e.text.color)) {
      station.style.fill = e.isEnd && e.isSingle ? 0X87CEEB : (Data?.compColor?.name == 'YZ' ? Data.compColor.main : 'red');
      station.style.fill = (e.text ? e.text.color : false) || station.style.fill;
    }

    // routeMapStage.addChild(station);
    return station
  }

  function appendInfo(e, num) {
    const container = new PIXI.Container();
    container.position.set(param.size.info1.x + 30 + _x, param.size.info1.y + 25 + _y)
    const style = new PIXI.TextStyle({
      align: 'center',
      fill: _color?.name === 'YZ' ? _color?.main : 'red',
      fontFamily: 'FZHTJW,SimHei',
      fontSize: 37,
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
}

export {
  printRoundStation
}