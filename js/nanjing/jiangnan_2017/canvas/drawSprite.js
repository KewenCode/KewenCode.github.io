import { param } from "../parameter.js"
import { OS, progressBar } from "../../../tools.js"

async function addLogo(Map, jiangnanMap) {
  let logoElementAssets = await PIXI.Assets.loadBundle('load-icon');
  const SCBusFan = new PIXI.Sprite({
    texture: OS.isPc ? logoElementAssets.logoSvg : logoElementAssets.logoPng,
    label: "SCBusFan",
    alpha: 0.15,
    anchor: { x: 0.5, y: 0.5 },
    position: { x: Map.canvas.width / 2, y: Map.canvas.height / 2 },
    scale: { x: Map.canvas.height / (OS.isPc ? 3300 : 330), y: Map.canvas.height / (OS.isPc ? 3300 : 330) },
  });
  // SCBusFan.tint = '0xFFFF660'
  return SCBusFan

}

async function drawRect(_x, _y, _color) {
  const _param = param.size
  let box_y = 700 * _color;
  let loadBoxAssets = await PIXI.Assets.loadBundle('load-box', (pro) => progressBar(pro, 'bg-sprite'));
  // blue-big
  const boxFrame1 = new PIXI.Rectangle(0, 0 + box_y, 2000, 500);
  const bosSprite = new PIXI.Texture({ source: loadBoxAssets.box, frame: boxFrame1 });
  const boxComp = new PIXI.Sprite({
    texture: bosSprite,
    label: "boxComp",
    position: { x: _param.recComp.x + _x, y: _param.recComp.y + _y },
    scale: { x: _param.recComp.w / bosSprite.width, y: _param.recComp.h / bosSprite.height },
  });
  !Data.company ? boxComp.height = boxComp.height / 2 : "";
  const boxLineNo = new PIXI.Sprite({
    texture: bosSprite,
    label: "boxLineNo",
    position: { x: _param.recNo.x + _x, y: _param.recNo.y + _y },
    scale: { x: (Data.lineNo.append ? _param.recNo.w : _param.recComp.w) / bosSprite.width, y: _param.recNo.h / bosSprite.height },
  });
  const boxTiHead = new PIXI.Sprite({
    texture: bosSprite,
    label: "boxTiHead",
    position: { x: _param.recTiHd.x + _x, y: _param.recTiHd.y + _y },
    scale: { x: _param.recTiHd.w / bosSprite.width, y: _param.recTiHd.h / bosSprite.height },
  });
  const boxPriHead = new PIXI.Sprite({
    texture: bosSprite,
    label: "boxPriHead",
    position: { x: _param.recPriHd.x + _x, y: _param.recPriHd.y + _y },
    scale: Data.isSeg || Data.isSel ?
      { x: _param.recNo.w / bosSprite.width, y: _param.recPriHd.h / bosSprite.height } :
      { x: _param.recPriHd.w / bosSprite.width, y: _param.recPriHd.h / bosSprite.height },
  });
  // blue-small
  const boxFrame2 = new PIXI.Rectangle(0, 500 + box_y, 2000, 200);
  const box_Slice = new PIXI.Texture({ source: loadBoxAssets.box, frame: boxFrame2 });
  const boxPriLine = new PIXI.Sprite({
    texture: box_Slice,
    label: "boxPriLine",
    position: Data.isSeg || Data.isSel ?
      { x: _param.recPriHd.x + boxPriHead.width + _x, y: _param.recPriBt.y + _y } :
      { x: _param.recPriBt.x + _x, y: _param.recPriBt.y + _y },
    scale: Data.isSeg || Data.isSel ?
      { x: (_param.recComp.w - _param.recNo.w) / box_Slice.width, y: _param.recPriBt.h / box_Slice.height } :
      { x: _param.recPriBt.w / box_Slice.width, y: _param.recPriBt.h / box_Slice.height },
  });
  // gray
  const boxGray = new PIXI.Graphics({ label: "boxGray" })
    .rect(_param.recTi.x + _x, _param.recTi.y + _y, _param.recTi.w, _param.recTi.h)
    .fill(0Xdedede)
  if (!Data.company) {
    boxGray.rect(_param.recComp.x + _x, _param.recComp.y + _param.recComp.h / 2 + _y, _param.recComp.w, _param.recComp.h / 2)
      .fill(0Xdedede);
  }
  // sizePriLineNew = [boxPriLine.x, boxPriLine.y, boxPriLine.width, boxPriLine.height] //更新尺寸
  return [boxComp, boxLineNo, boxTiHead, boxPriHead, boxPriLine, boxGray];
}

async function drawLine(_x, _y, _color) {
  // 计算中间点角度
  const getAngle = (pointA, pointB, pointC) => {
    const ABX = pointA[0] - pointB[0];
    const ABY = pointA[1] - pointB[1];
    const CBX = pointC[0] - pointB[0];
    const CBY = pointC[1] - pointB[1];
    const AB_MUL_CB = ABX * CBX + ABY * CBY;
    const DIST_AB = Math.sqrt(ABX * ABX + ABY * ABY)
    const DIST_CB = Math.sqrt(CBX * CBX + CBY * CBY)
    const cosValue = AB_MUL_CB / (DIST_AB * DIST_CB);
    return Math.acos(cosValue) * 180 / Math.PI;
  }
  // #116db0 - 线段
  const _param = param.size.line;
  const lineB = new PIXI.Graphics({ label: "lineB" })
    .moveTo(_param.x[0], _param.y[0])
    .lineTo(_param.x[1], _param.y[1])
    .lineTo(_param.x[2], _param.y[2])
    .lineTo(_param.x[3], _param.y[3])
    .stroke({ width: _param.h, color: _color })

  return { _line: lineB, _angle: getAngle([_param.x[1], _param.y[1]], [_param.x[2], _param.y[2]], [_param.x[1], _param.y[2]]) }
}

async function drawRoundLine(_x, _y, _color, _point) {
  const _param = param.size.roundLine;
  // const point = [
  //   { method: 'moveTo', x: _param.x[0] + _param.h, y: _param.y[0] + _param.h },
  //   { method: 'lineTo', x: 900, y: _param.y[0] + _param.h },
  //   { method: 'bezierCurveTo', cp1x: 920, cp1y: _param.y[0] + _param.h, cp2x: 920, cp2y: _param.y[0], x: 940, y: _param.y[0] },
  //   { method: 'arcTo', x1: _param.x[1], y1: _param.y[0], x2: _param.x[1], y2: _param.y[0] + _param.h, radius: _param.r },
  //   { method: 'arcTo', x1: _param.x[1], y1: _param.y[1], x2: _param.x[1] - _param.h, y2: _param.y[1], radius: _param.r },
  //   { method: 'lineTo', x: 940, y: _param.y[1] },
  //   { method: 'bezierCurveTo', cp1x: 920, cp1y: _param.y[1], cp2x: 920, cp2y: _param.y[1] - _param.h, x: 900, y: _param.y[1] - _param.h },
  //   { method: 'arcTo', x1: _param.x[0], y1: _param.y[1] - _param.h, x2: _param.x[0], y2: _param.y[1] - _param.h * 2, radius: _param.r },
  //   { method: 'arcTo', x1: _param.x[0], y1: _param.y[0] + _param.h, x2: _param.x[0] + _param.h, y2: _param.y[0] + _param.h, radius: _param.r },
  //   { method: 'stroke', width: _param.h, color: _color },
  // ]
  const lineB = new PIXI.Graphics({ label: "lineB" })
  _point?.forEach(e => {
    // console.log(e)
    switch (e.method) {
      case 'moveTo':
        lineB.moveTo(e.x, e.y);
        break;
      case 'lineTo':
        lineB.lineTo(e.x, e.y);
        break;
      case 'arcTo':
        lineB.arcTo(e.x1, e.y1, e.x2, e.y2, e.radius);
        break;
      case 'bezierCurveTo':
        lineB.bezierCurveTo(e.cp1x, e.cp1y, e.cp2x, e.cp2y, e.x, e.y, e?.smoothness)
        break;
      case 'stroke':
        lineB.stroke({ width: e.width, color: e.color || _color })
        break;
    }
  })

  return lineB
}

async function drawPrice(_x, _y, _color) {
  // 条件判断
  const segCheck = Data.isSeg || document.querySelector("#infoSellPri").checked;
  const sellCheck = Data.isSel;
  // 基础参数
  const _param = param.size
  const container = new PIXI.Container();
  const PO = [200 * Data.price[0], 300 * _color]
  const P1 = [200 * Data.price[0], 300 * _color]
  const P2 = [200 * Data.price[1], 300 * _color]
  const F = [900 * _color, 900]
  const Y = [300 * _color, 600]
  const Z = [300 * (_color ? 3 : 2), 600]
  // 加载资源
  let loadPriceAssets = await PIXI.Assets.loadBundle('load-NJGJ');
  // 构建内容
  const yuanSpr = !sellCheck || segCheck ? (() => {
    const imageFrame3 = segCheck ? new PIXI.Rectangle(Y[0], Y[1], 300, 300) : new PIXI.Rectangle(Y[0], Y[1], 300, 300);
    const imageYuan = new PIXI.Texture({ source: loadPriceAssets.Price, frame: imageFrame3 });
    return new PIXI.Sprite({
      texture: imageYuan,
      label: "yuanSpr",
      anchor: { x: 1, y: 1 },
      position: { x: segCheck ? _param.textYuan.x * 0.1 : _param.recComp.x + _param.recComp.w + _param.textYuan.x, y: _param.recPriBt.y + _param.textYuan.y },
      scale: { x: (segCheck ? _param.textYuan.w * 0.9 : _param.textYuan.w) / imageYuan.width, y: (segCheck ? _param.textYuan.h * 0.9 : _param.textYuan.h) / imageYuan.height },
    });
  })() : ''
  const priSpr2 = !sellCheck || segCheck ? (() => {
    const imageFrame2 = segCheck ? new PIXI.Rectangle(P2[0], P2[1], 200, 300) : new PIXI.Rectangle(PO[0], PO[1], 200, 300);
    const imagePrice2 = new PIXI.Texture({ source: loadPriceAssets.Price, frame: imageFrame2 });
    return new PIXI.Sprite({
      texture: imagePrice2,
      label: "priSpr2",
      anchor: { x: 1, y: 1 },
      position: { x: yuanSpr.position.x - yuanSpr.width, y: yuanSpr.position.y },
      scale: { x: (segCheck ? _param.textPri2.w : _param.textPri2.w * 1.1) / imagePrice2.width, y: (segCheck ? _param.textPri2.h : _param.textPri2.h * 1.1) / imagePrice2.height },
    });
  })() : ''
  const zhiSpr = !sellCheck || segCheck ? (() => {
    const imageFrame4 = new PIXI.Rectangle(Z[0], Z[1], 300, 300);
    const imagZhi = new PIXI.Texture({ source: loadPriceAssets.Price, frame: imageFrame4 });
    return new PIXI.Sprite({
      texture: imagZhi,
      label: "zhiSpr",
      anchor: { x: 1, y: 1 },
      position: { x: priSpr2.position.x - priSpr2.width, y: yuanSpr.position.y },
      scale: { x: _param.textZhi.w * 0.9 / imagZhi.width, y: _param.textZhi.h * 0.9 / imagZhi.height },
    });
  })() : ''
  const priSpr1 = !sellCheck || segCheck ? (() => {
    const imageFrame1 = new PIXI.Rectangle(P1[0], P1[1], 200, 300);
    const imagePrice1 = new PIXI.Texture({ source: loadPriceAssets.Price, frame: imageFrame1 });
    return new PIXI.Sprite({
      texture: imagePrice1,
      label: "priSpr1",
      anchor: { x: 1, y: 1 },
      position: { x: zhiSpr.position.x - zhiSpr.width, y: yuanSpr.position.y },
      scale: { x: _param.textPri1.w / imagePrice1.width, y: _param.textPri1.h / imagePrice1.height },
    });
  })() : ''
  const priSell = sellCheck ? (() => {
    const imageFrame5 = new PIXI.Rectangle(F[0], F[1], 900, 250);
    const imageSell = new PIXI.Texture({ source: loadPriceAssets.Price, frame: imageFrame5 });
    return new PIXI.Sprite({
      texture: imageSell,
      label: "priSell",
      anchor: { x: 0.5, y: 1 },
      position: { x: _param.recNo.x + _param.recNo.w + (_param.recComp.w - _param.recNo.w) / 2, y: _param.recPriBt.y + _param.textYuan.y },
      scale: { x: (_param.recComp.w - _param.recNo.w) * 0.85 / imageSell.width, y: (_param.recPriHd.h - _param.recPriBt.h) * 0.9 / imageSell.height },
    });
  })() : ''
  if (segCheck) {
    // 设定位置
    container.addChild(priSpr1, priSpr2, yuanSpr, zhiSpr);
    container.position.x = _param.recComp.x + _param.recComp.w;
    container.width = (_param.recComp.w - _param.recNo.w) * 0.95;
  } else if (sellCheck) {
    container.addChild(priSell);
  } else {
    container.addChild(priSpr2, yuanSpr);
  }
  return container
}

export {
  drawRect,
  drawLine,
  drawRoundLine,
  addLogo,
  drawPrice,
}