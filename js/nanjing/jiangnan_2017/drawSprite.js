import { param } from "./parameter.js"
import { OS } from "../../tools.js"

async function addLogo(jiangnanMap) {
  let logoElementAssets = await PIXI.Assets.loadBundle('load-icon');
  if (OS.isPc) {
    const SCBusFan = new PIXI.Sprite(logoElementAssets.logoSvg);
    // SCBusFan.tint = '0xFFFF660'
    SCBusFan.anchor.set(0.5, 0.5);
    SCBusFan.scale.set(jiangnanMap.view.height / 3300);
    SCBusFan.position.set(jiangnanMap.view.width / 2, jiangnanMap.view.height / 2);
    SCBusFan.name = "SCBusFan";
    SCBusFan.alpha = 0.15;
    return SCBusFan
  } else {
    const SCBusFan = new PIXI.Sprite(logoElementAssets.logoPng);
    // SCBusFan.tint = '0xFFFF660'
    SCBusFan.anchor.set(0.5, 0.5);
    SCBusFan.scale.set(jiangnanMap.view.height / 330);
    SCBusFan.position.set(jiangnanMap.view.width / 2, jiangnanMap.view.height / 2);
    SCBusFan.name = "SCBusFan";
    SCBusFan.alpha = 0.15;
    return SCBusFan
  }
}

async function drawRect(_x, _y, _color) {
  const _param = param.size
  let box_y = _color === "blue" ? 0 : 700;
  let loadBoxAssets = await PIXI.Assets.loadBundle('load-box');
  // blue-big
  const bosSprite = loadBoxAssets.box;
  bosSprite.frame = new PIXI.Rectangle(0, 0 + box_y, 2000, 500);
  let boxComp = new PIXI.Sprite(bosSprite);
  boxComp.name = "boxComp";
  boxComp.setTransform(_param.recComp.x + _x, _param.recComp.y + _y, _param.recComp.w / bosSprite.width, _param.recComp.h / bosSprite.height);
  !Data.company ? boxComp.height = boxComp.height / 2 : "";
  let boxLineNo = new PIXI.Sprite(bosSprite);
  boxLineNo.name = "boxLineNo";
  boxLineNo.setTransform(_param.recNo.x + _x, _param.recNo.y + _y, _param.recNo.w / bosSprite.width, _param.recNo.h / bosSprite.height);
  let boxTiHead = new PIXI.Sprite(bosSprite);
  boxTiHead.name = "boxTiHead";
  boxTiHead.setTransform(_param.recTiHd.x + _x, _param.recTiHd.y + _y, _param.recTiHd.w / bosSprite.width, _param.recTiHd.h / bosSprite.height);
  let boxPriHead = new PIXI.Sprite(bosSprite);
  Data.isSeg || Data.isSel ?
    boxPriHead.setTransform(_param.recPriHd.x + _x, _param.recPriHd.y + _y, _param.recNo.w / bosSprite.width, _param.recPriHd.h / bosSprite.height) :
    boxPriHead.setTransform(_param.recPriHd.x + _x, _param.recPriHd.y + _y, _param.recPriHd.w / bosSprite.width, _param.recPriHd.h / bosSprite.height)
    ;
  // blue-small
  const box_Slice = bosSprite.clone();
  box_Slice.frame = new PIXI.Rectangle(0, 500 + box_y, 2000, 200);
  let boxPriLine = new PIXI.Sprite(box_Slice);
  boxPriLine.name = "boxPriLine";
  Data.isSeg || Data.isSel ?
    boxPriLine.setTransform(_param.recPriHd.x + boxPriHead.width + _x, _param.recPriBt.y + _y, (_param.recComp.w - _param.recNo.w) / box_Slice.width, _param.recPriBt.h / box_Slice.height) :
    boxPriLine.setTransform(_param.recPriBt.x + _x, _param.recPriBt.y + _y, _param.recPriBt.w / box_Slice.width, _param.recPriBt.h / box_Slice.height)
    ;
  // gray
  const boxGray = new PIXI.Graphics();
  boxGray.name = "boxGray";
  boxGray.beginFill('#dedede')
  boxGray.drawRect(_param.recTi.x + _x, _param.recTi.y + _y, _param.recTi.w, _param.recTi.h)
  boxGray.endFill()
  if (!Data.company) {
    // boxCompB.name = "boxCompB";
    boxGray.beginFill('#dedede')
    boxGray.drawRect(_param.recComp.x + _x, _param.recComp.y + _param.recComp.h / 2 + _y, _param.recComp.w, _param.recComp.h / 2)
    boxGray.endFill()
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
  const lineB = new PIXI.Graphics();
  lineB.name = "lineB";
  lineB.lineStyle(_param.h, param.color.JNLine);
  lineB.moveTo(_param.x[0], _param.y[0]);
  lineB.lineTo(_param.x[1], _param.y[1]);
  lineB.lineTo(_param.x[2], _param.y[2]);
  lineB.lineTo(_param.x[3], _param.y[3]);

  return { _line: lineB, _angle: getAngle([_param.x[1], _param.y[1]], [_param.x[2], _param.y[2]], [_param.x[1], _param.y[2]]) }
}

async function drawPrice(_x, _y, _color) {
  const _param = param.size
  const container = new PIXI.Container();
  if (Data.isSeg || document.querySelector("#infoSellPri").checked) {
    const P1 = [200 * Data.price[0], 0]
    const P2 = [200 * Data.price[1], 0]
    const Z = [300 * 2, 600]
    const Y = [0, 600]
    let loadPriceAssets = await PIXI.Assets.loadBundle('load-NJGJ');
    const imagePrice1 = loadPriceAssets.Price;
    imagePrice1.frame = new PIXI.Rectangle(P1[0], P1[1], 200, 300);
    let priSpr1 = new PIXI.Sprite(imagePrice1);
    priSpr1.name = "priSpr1";
    priSpr1.anchor.set(1, 1);
    const imagePrice2 = imagePrice1.clone();
    imagePrice2.frame = new PIXI.Rectangle(P2[0], P2[1], 200, 300);
    let priSpr2 = new PIXI.Sprite(imagePrice2);
    priSpr2.name = "priSpr2";
    priSpr2.anchor.set(1, 1);
    const imageYuan = imagePrice1.clone();
    imageYuan.frame = new PIXI.Rectangle(Y[0], Y[1], 300, 300);
    let yuanSpr = new PIXI.Sprite(imageYuan);
    yuanSpr.name = "yuanSpr";
    yuanSpr.anchor.set(1, 1);
    const imagZhi = imagePrice1.clone();
    imagZhi.frame = new PIXI.Rectangle(Z[0], Z[1], 300, 300);
    let zhiSpr = new PIXI.Sprite(imagZhi);
    zhiSpr.name = "zhiSpr";
    zhiSpr.anchor.set(1, 1);
    // 设定位置
    yuanSpr.setTransform(_param.textYuan.x * 0.1, _param.recPriBt.y + _param.textYuan.y, _param.textYuan.w * 0.9 / yuanSpr.width, _param.textYuan.h * 0.9 / yuanSpr.height);
    priSpr2.setTransform(yuanSpr.position.x - yuanSpr.width, yuanSpr.position.y, _param.textPri2.w / priSpr2.width, _param.textPri2.h / priSpr2.height);
    zhiSpr.setTransform(priSpr2.position.x - priSpr2.width, yuanSpr.position.y, _param.textZhi.w * 0.9 / zhiSpr.width, _param.textZhi.h * 0.9 / zhiSpr.height);
    priSpr1.setTransform(zhiSpr.position.x - zhiSpr.width, yuanSpr.position.y, _param.textPri1.w / priSpr1.width, _param.textPri1.h / priSpr1.height);
    container.addChild(priSpr1, priSpr2, yuanSpr, zhiSpr);
    container.position.x = _param.recComp.x + _param.recComp.w;
    container.width = (_param.recComp.w - _param.recNo.w) * 0.95;
  } else if (Data.isSel) {
    const F = [900 * 0, 900]
    let loadPriceAssets = await PIXI.Assets.loadBundle('load-NJGJ');
    const imageSell = loadPriceAssets.Price;
    imageSell.frame = new PIXI.Rectangle(F[0], F[1], 900, 250);
    let sell = new PIXI.Sprite(imageSell);
    sell.name = "priSell";
    sell.anchor.set(0.5, 1);
    sell.setTransform(_param.recNo.x + _param.recNo.w + (_param.recComp.w - _param.recNo.w) / 2, _param.recPriBt.y + _param.textYuan.y, (_param.recComp.w - _param.recNo.w) * 0.85 / sell.width, (_param.recPriHd.h - _param.recPriBt.h) * 0.9 / sell.height);
    container.addChild(sell);
  } else {
    const PO = [200 * Data.price[0], 0]
    const Y = [0, 600]
    let loadPriceAssets = await PIXI.Assets.loadBundle('load-NJGJ');
    const imagePrice = loadPriceAssets.Price;
    imagePrice.frame = new PIXI.Rectangle(PO[0], PO[1], 200, 300);
    let priSpr2 = new PIXI.Sprite(imagePrice);
    priSpr2.name = "priSpr2";
    priSpr2.anchor.set(1, 1);
    const imageYuan = imagePrice.clone();
    imageYuan.frame = new PIXI.Rectangle(Y[0], Y[1], 300, 300);
    let yuanSpr = new PIXI.Sprite(imageYuan);
    yuanSpr.name = "yuanSpr";
    yuanSpr.anchor.set(1, 1);
    // 设定位置
    yuanSpr.setTransform(_param.recComp.x + _param.recComp.w + _param.textYuan.x, _param.recPriBt.y + _param.textYuan.y, _param.textYuan.w / yuanSpr.width, _param.textYuan.h / yuanSpr.height);
    priSpr2.setTransform(yuanSpr.position.x - yuanSpr.width, yuanSpr.position.y, _param.textPri2.w * 1.1 / priSpr2.width, _param.textPri2.h * 1.1 / priSpr2.height);
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