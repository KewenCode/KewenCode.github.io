import { param } from "../parameter.js"
import { OS } from "../../../tools.js"

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
  let box_y = _color === "blue" ? 0 : 700;
  let loadBoxAssets = await PIXI.Assets.loadBundle('load-box');
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
    .stroke({ width: _param.h, color: param.color.JNLine })

  return { _line: lineB, _angle: getAngle([_param.x[1], _param.y[1]], [_param.x[2], _param.y[2]], [_param.x[1], _param.y[2]]) }
}

async function drawPrice(_x, _y, _color) {
  // 条件判断
  const segCheck = Data.isSeg || document.querySelector("#infoSellPri").checked;
  const sellCheck = Data.isSel;
  // 基础参数
  const _param = param.size
  const container = new PIXI.Container();
  const PO = [200 * Data.price[0], 0]
  const P1 = [200 * Data.price[0], 0]
  const P2 = [200 * Data.price[1], 0]
  const F = [900 * 0, 900]
  const Y = [0, 600]
  const Z = [300 * 2, 600]
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

// async function draw(_x, _y, _color) {
//   const _param = param.size
//   // // 添加水印
//   // await addLogo();
//   // // 加载字体
//   // await PIXI.Assets.loadBundle('load-font');
//   // if (!OS.isPc) {
//   //   await PIXI.Assets.loadBundle('load-font-mobile');
//   // }
//   // box素材 Load a bundle...
//   let box_y = _color === "blue" ? 0 : 700;
//   let loadBoxAssets = await PIXI.Assets.loadBundle('load-box');
//   // blue-big
//   const bosSprite = loadBoxAssets.box;
//   bosSprite.frame = new PIXI.Rectangle(0, 0 + box_y, 2000, 500);
//   let boxComp = new PIXI.Sprite(bosSprite);
//   boxComp.setTransform(_param.recComp.x + _x, _param.recComp.y + _y, _param.recComp.w / bosSprite.width, _param.recComp.h / bosSprite.height);
//   let boxLineNo = new PIXI.Sprite(bosSprite);
//   boxLineNo.setTransform(_param.recNo.x + _x, _param.recNo.y + _y, _param.recNo.w / bosSprite.width, _param.recNo.h / bosSprite.height);
//   let boxTiHead = new PIXI.Sprite(bosSprite);
//   boxTiHead.setTransform(_param.recTiHd.x + _x, _param.recTiHd.y + _y, _param.recTiHd.w / bosSprite.width, _param.recTiHd.h / bosSprite.height);
//   let boxPriHead = new PIXI.Sprite(bosSprite);
//   boxPriHead.setTransform(_param.recPriHd.x + _x, _param.recPriHd.y + _y, _param.recPriHd.w / bosSprite.width, _param.recPriHd.h / bosSprite.height);
//   // blue-small
//   const box_Slice = bosSprite.clone();
//   box_Slice.frame = new PIXI.Rectangle(0, 500 + box_y, 2000, 200);
//   let boxPriLine = new PIXI.Sprite(box_Slice);
//   boxPriLine.setTransform(_param.recPriBt.x + _x, _param.recPriBt.y + _y, _param.recPriBt.w / box_Slice.width, _param.recPriBt.h / box_Slice.height);
//   // sizePriLineNew = [boxPriLine.x, boxPriLine.y, boxPriLine.width, boxPriLine.height] //更新尺寸
//   return [boxComp, boxLineNo, boxTiHead, boxPriHead, boxPriLine];

//   // #09178b - 矩形集合
//   // const rectB = new PIXI.Graphics()
//   // rectB.beginFill(colorJN)
//   // rectB.drawRect(sizeRecComp[0], sizeRecComp[1], sizeRecComp[2], sizeRecComp[3])
//   // rectB.drawRect(sizeLineNo[0], sizeLineNo[1], sizeLineNo[2], sizeLineNo[3])
//   // rectB.drawRect(sizeTiHead[0], sizeTiHead[1], sizeTiHead[2], sizeTiHead[3])
//   // rectB.drawRect(sizePriHead[0], sizePriHead[1], sizePriHead[2], sizePriHead[3])
//   // rectB.drawRect(sizePriHead[0] + sizePriHead[2], sizePriHead[1] + sizePriHead[3] - 5, sizeRecComp[2] - sizePriHead[2], 5)
//   // rectB.endFill()
//   // routeMapStage.addChild(rectB);

//   // #dedede - 矩形集合
//   // const rectG = new PIXI.Graphics()
//   // rectG.beginFill('#dedede')
//   // rectG.drawRect(sizeTi[0], sizeTi[1], sizeTi[2], sizeTi[3])
//   // rectG.endFill()
//   // routeMapStage.addChild(rectG)

//   // // 计算中间点角度
//   // const getAngle = (pointA, pointB, pointC) => {
//   //   const ABX = pointA[0] - pointB[0];
//   //   const ABY = pointA[1] - pointB[1];
//   //   const CBX = pointC[0] - pointB[0];
//   //   const CBY = pointC[1] - pointB[1];
//   //   const AB_MUL_CB = ABX * CBX + ABY * CBY;
//   //   const DIST_AB = Math.sqrt(ABX * ABX + ABY * ABY)
//   //   const DIST_CB = Math.sqrt(CBX * CBX + CBY * CBY)
//   //   const cosValue = AB_MUL_CB / (DIST_AB * DIST_CB);
//   //   return Math.acos(cosValue) * 180 / Math.PI;
//   // }
//   // // #116db0 - 线段
//   // const lineB = new PIXI.Graphics()
//   // lineB.lineStyle(25, colorJNLine)
//   // lineB.moveTo(lineX[0], lineY[0])
//   // lineB.lineTo(lineX[1], lineY[1])
//   // lineB.lineTo(lineX[2], lineY[2])
//   // lineB.lineTo(lineX[3], lineY[3])
//   // routeMapStage.addChild(lineB)
//   // lineAngle = getAngle([lineX[1], lineY[1]], [lineX[2], lineY[2]], [lineX[1], lineY[2]])


//   // // 江南公交 - 旧方式，嵌入图像
//   // // const rectSizeComp = new PIXI.Graphics()
//   // // rectSizeComp.x = 100
//   // // rectSizeComp.y = 210
//   // // rectSizeComp.beginFill('#09178b')
//   // // rectSizeComp.drawRect(0, 0, 540, 60)
//   // // rectSizeComp.endFill()
//   // // const textComp = new PIXI.Text('江南公交', {
//   // //   fill: '#FFF',
//   // //   fontFamily: Font.FZZZHONGJW,
//   // //   fontSize: 36,
//   // //   fontWeight: 'bold',
//   // //   lineHeight: 95,
//   // //   letterSpacing: 75,
//   // //   align: 'center'
//   // // });
//   // // textComp.anchor.set(0.5)
//   // // textComp.x = rectSizeComp.width / 2
//   // // textComp.y = rectSizeComp.height / 2
//   // // rectSizeComp.addChild(textComp)
//   // // routeMapStage.addChild(rectSizeComp)

//   // routeMapStage.addChild(await printPrice()); // 票价
//   // routeMapStage.addChild(await printTextIcon()); // 图标
//   // routeMapStage.addChild(await printService()); // 服务时间

//   // routeMapStage.addChild(await printStation())
//   // await printStation()

// }

export {
  drawRect,
  drawLine,
  addLogo,
  drawPrice,
}