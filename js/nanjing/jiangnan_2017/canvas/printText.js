import { param } from "../parameter.js"
import { OS } from "../../../tools.js"
import { printBranch } from "./printLogo.js"

async function printBaseText(_x, _y, _color) {
  await PIXI.Assets.loadBundle('load-font');
  const container = new PIXI.Container();
  const _param = param;

  // 南京公共交通（集团）有限公司
  const textGroup = new PIXI.Text({
    text: Data.group,
    anchor: { x: 0.5, y: 0 },
    position: { x: _param.size.textGro.x + _x, y: _param.size.textGro.y + _y },
    height: _param.size.textGro.h,
    style: {
      fill: _param.color.JN,
      fontFamily: 'FZZZHONGJW',
      fontSize: 25.5,
      fontWeight: 'bold',
      letterSpacing: 1,
      align: 'center'
    }
  });
  textGroup.style.letterSpacing = textGroup.width < _param.size.textGro.w ? (50 / 20) * (16 - textGroup.text.length) : 1;
  textGroup.width = textGroup.width < _param.size.textGro.w ? textGroup.width : _param.size.textGro.w;
  // NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD
  const textGroupEn = new PIXI.Text({
    text: Data.groupEn,
    anchor: { x: 0.5, y: 0 },
    style: {
      fill: _param.color.JN,
      fontFamily: 'FZZZHONGJW',
      fontSize: 11.1,
      fontWeight: 'bold',
      letterSpacing: 0,
      align: 'center'
    }
  });
  textGroupEn.position.set(_param.size.textGroEn.x + _x, _param.size.textGroEn.y + _y);
  textGroupEn.width = textGroupEn.width < _param.size.textGroEn.w ? textGroupEn.width : _param.size.textGroEn.w;
  // 江南公交
  const textComp = new PIXI.Text({
    text: Data.company,
    anchor: { x: 0.5, y: 0.5 },
    position: { x: _param.size.textComp.x + _x, y: _param.size.textComp.y + _y },
    style: {
      fill: '#FFF',
      fontFamily: 'FZZZHONGJW',
      fontSize: 35,
      fontWeight: 'bold',
      letterSpacing: 65,
      align: 'center'
    }
  });
  textComp.style.letterSpacing = textComp.width < _param.size.textComp.w ? textComp.style.letterSpacing : (70 / 11) * (11 - textComp.text.length);
  textComp.width = textComp.width < _param.size.textComp.w ? textComp.width : _param.size.textComp.w;
  // 首末班车服务时间
  const textTiHead = new PIXI.Text({
    text: '首末班车服务时间',
    anchor: { x: 0.5, y: 0.5 },
    position: { x: _param.size.textTiHd.x + _x, y: _param.size.textTiHd.y + _y },
    width: _param.size.textTiHd.w * 0.85,
    style: {
      fill: '#FFF',
      fontFamily: 'FZZZHONGJW',
      fontSize: 40,
      fontWeight: 'bold',
      letterSpacing: 10,
      align: 'center'
    }
  });
  // 本线路单程票价
  const textPriHead = new PIXI.Text({
    text: Data.isSel && !document.querySelector("#infoSellPri").checked ? '本线路售票方式' : '本线路单程票价',
    anchor: { x: 0.5, y: 0.5 },
    position: { x: Data.isSeg || Data.isSel ? _param.size.textPriHd.x_S + _x : _param.size.textPriHd.x + _x, y: _param.size.textPriHd.y + _y },
    width: Data.isSeg || Data.isSel ? _param.size.recNo.w * 0.85 : _param.size.textPriHd.w * 0.85,
    style: {
      fill: '#FFF',
      fontFamily: 'FZZZHONGJW',
      fontSize: 40,
      fontWeight: 'bold',
      letterSpacing: 1,
      align: 'center'
    }
  });
  container.addChild(textGroup, textGroupEn, textComp, textTiHead, textPriHead);
  return container
}

async function printNo(_x, _y, _color) {
  const _param = param.size;
  const container = new PIXI.Container();
  const lineSellPrice = document.querySelector("#infoSellPri").checked
  // container.width = sizeRecComp[2];
  // container.height = sizeRecComp[3];
  container.position.set(_param.recNo.x + _x, _param.recNo.y + _y);

  const split = (text) => {
    const match = (pattern) => {
      return text.match(pattern) ? text.match(pattern).join("") : '';
    }
    let num = match(/[0-9]/g);
    let letter = match(/[\a-zA-Z]+/g);
    let numLetter = match(/[\a-zA-Z0-9]+/g);
    let chinese = match(/[\u4e00-\u9fa5,.!"\'（）()]+/g);

    return {
      num: num,
      letter: letter,
      numLetter: numLetter,
      chinese: chinese,
    };
  }

  // 线路号sprite
  const textLine = (text) => {
    const obj = new PIXI.Text({
      text: text,
      anchor: { x: 0.5, y: 0.5 },
      style: {
        fill: '#FFF',
        fontFamily: 'YGYXSZITI, FZZZHONGJW,Times New Roman, Times, serif',
        fontSize: 180,
        align: 'center'
      }
    });
    if (text.match(/[\a-zA-Z]+/g)) { obj.width *= 0.8; obj.style.letterSpacing = 5; };
    if (text.match(/[\u4e00-\u9fa5,.!"\'（）()]+/g)) { obj.style.fontSize = 90; };
    obj.style.letterSpacing = obj.width > _param.recNo.w * 0.9 ? -5 : obj.style.letterSpacing;
    obj.width = Data.lineNo?.append ?/**长/窄类型判断 */
      obj.width > _param.recNo.w ? _param.recNo.w * 0.9 : obj.width :
      obj.width > _param.recComp.w ? _param.recComp.w * 0.9 : obj.width;
    obj.height = Data.lineNo?.type ? obj.height * 0.8 : obj.height;  // 类型附注
    obj.x = Data.lineNo?.append ? _param.recNo.w / 2 + _x : _param.recComp.w / 2;
    obj.y = Data.lineNo?.type ? _param.recNo.h / 2.6 + _y : _param.recNo.h / 2 + _y; // 类型附注偏移
    return obj
  }
  // 路号
  const lineSplit = split(Data.lineNo.main)
  let lineNo = textLine(lineSplit.numLetter);
  lineNo.label = "lineNo";
  let lineString = textLine(lineSplit.chinese);
  lineString.label = "lineString";
  // 含中文偏置
  if (lineSplit.chinese && lineSplit.numLetter) {
    lineNo.width *= 0.7;
    lineNo.x *= 0.7;
    lineString.width = /**长/窄类型判断 */Data.lineNo?.append ? (_param.recNo.w - lineNo.x - lineNo.width / 2) : (_param.recComp.w - lineNo.x - lineNo.width / 1.5);
    lineString.x = lineNo.x + lineNo.width / 2 + lineString.width / 2 + _x;
    lineString.y = Data.lineNo?.type ? _param.recNo.h / 2.2 + _y : _param.recNo.h / 1.75 + _y;
  }
  // logo
  const logo = Data.lineNo?.append && Data.lineNo?.icon ? await printBranch() : '';
  // 底部计价文字

  let lineType = null
  switch (Data.lineNo?.type) {
    case 1:
      lineType = "[分段计价]";
      break;
    case 2:
      lineType = "[大站快车]";
      break;
    case 3:
      lineType = "微循环公交";
      break;
    case 4:
      lineType = "假日旅游线";
      break;
  }
  lineType ? (() => {
    const textLineType = new PIXI.Text({
      text: lineType,
      width: _param.recNo.w * 0.85,
      style: {
        fill: '#FFF',
        fontFamily: 'MicrosoftYaHei',
        fontSize: 35,
        fontWeight: 'bold',
        letterSpacing: 3,
      },
      anchor: { x: 0.5, y: 0.5 },
    });
    switch (lineType) {
      case "假日旅游线":
      case "微循环公交":
        // textLineType.style.fontSize = 35;
        textLineType.y = _param.recNo.h * 0.83 + _y;
        break;
      default:
        textLineType.height *= 0.85;
        textLineType.y = _param.recNo.h * 0.83 + _y;
    }
    textLineType.x = Data.lineNo?.append ? _param.recNo.w / 2 + _x : _param.recComp.w / 2;
    container.addChild(textLineType);
  })() : ''
  // 右侧文字
  // const ext = Data.isSeg ? '路线路图\n及\n计价站点' : '路线路图';
  const textLineExt = new PIXI.Text({
    text: Data.lineNo?.append,
    anchor: { x: 0.5, y: 0.5 },
    position: { x: _param.recNo.w + (_param.recComp.w - _param.recNo.w) / 2 + _x, y: _param.recNo.h / 2 + _y },
    style: {
      fill: param.color.JN,
      fontFamily: 'MicrosoftYaHei',
      fontSize: 45,
      fontWeight: 'bold',
      // lineHeight: 45,
      align: 'center'
    }
  });
  textLineExt.width = textLineExt.width > (_param.recComp.w - _param.recNo.w) * 0.9 ? (_param.recComp.w - _param.recNo.w) * 0.9 : textLineExt.width;
  textLineExt.height = textLineExt.height > _param.recNo.h * 0.9 ? _param.recNo.h * 0.9 : textLineExt.height;
  Data.lineNo?.icon && Data.lineNo?.append ?
    Data.lineNo?.append.includes("\n") ?
      (() => {
        textLineExt.y = _param.recNo.h * 13 / 20 + _y;
        textLineExt.height *= 0.7;
        logo.scale.set(_param.recNo.h * 3 / 5 / logo.width);
        logo.position.set(textLineExt.x, _param.recNo.h / 10);
      })() :
      (() => {
        textLineExt.y = _param.recNo.h * 13 / 16 + _y;
        logo.scale.set(_param.recNo.h * 3 / 4 / logo.width);
        logo.position.set(textLineExt.x, _param.recNo.h * 3 / 10);
      })()
    : "";
  container.addChild(lineNo, lineString, textLineExt);
  if (Data.lineNo?.append && Data.lineNo?.icon) {
    container.addChild(logo);
  }
  return container
}

async function printService(_x, _y, _color) {
  const _param = param.size;
  // 首末班容器
  const container = new PIXI.Container({
    label: "printService",
    width: _param.recTi.w,
    height: _param.recTi.h,
    position: { x: _param.recTi.x + _x, y: _param.recTi.y + _y },
  });
  const conTime_Margin = [_param.recTi.w * 0.07, _param.recTi.h * 0.05];
  const station_NS = new PIXI.TextStyle({
    align: 'justify',
    fontFamily: 'FZHTJW',
    fontSize: 35,
    fontWeight: '600',
  });
  const station_TS = new PIXI.TextStyle({
    align: 'right',
    fontFamily: 'FZHTJW',
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 45,
  });
  // 起始站
  const conTime_Left = new PIXI.Container({
    label: "conTime_Left",
    position: { x: conTime_Margin[0], y: conTime_Margin[1] },
  });
  container.addChild(conTime_Left);
  stationName(Data.point['A'].name, conTime_Left);
  stationTime(sliceZero(Data.point['A'].startTime), sliceZero(Data.point['A'].endTime), conTime_Left);
  // 终点站
  const conTime_Right = new PIXI.Container({
    label: "conTime_Right",
    position: { x: _param.recTi.w * 0.53, y: conTime_Margin[1] },
  });
  container.addChild(conTime_Right);
  if (Data.point['Z'].name) {
    stationName(Data.point['Z'].name, conTime_Right);
    stationTime(sliceZero(Data.point['Z'].startTime), sliceZero(Data.point['Z'].endTime), conTime_Right);
  } else {
    conTime_Left.position.set(_param.recTi.w * 0.3, conTime_Margin[1]);
  }

  return container

  function stationName(name, container) {
    const text = new PIXI.Text({
      text: name,
      style: station_NS,
      anchor: { x: 0.5, y: 0 },
      position: { x: _param.recTi.w * 0.2, y: 0 },
    });
    if (Data.point['Z'].name ? text.width > _param.recTi.w * 0.4 : text.width > _param.recTi.w * 0.8) {
      text.width = Data.point['Z'].name ? _param.recTi.w * 0.4 : _param.recTi.w * 0.8;
    } else {
      const style = station_NS.clone();
      style.letterSpacing = text.width < _param.recTi.w * 0.3 && name.length ? (_param.recTi.w * 0.3 - text.width) / name.length : 0;
      text.style = style;
      text.width = Data.point['Z'].name ?
        text.width > _param.recTi.w * 0.4 ? _param.recTi.w * 0.4 : text.width :
        text.width > _param.recTi.w * 0.8 ? _param.recTi.w * 0.8 : text.width;
    }
    container.addChild(text);
  }

  function stationTime(start, end, container) {
    const style = station_TS.clone();
    style.align = 'left';
    const center = (_param.recTi.h + container.children[0].height) * 0.48; //剩余中心高度
    const S = new PIXI.Text({ text: '首班车：', style: style, anchor: { x: 0, y: 1 }, position: { x: _param.recTi.w * 0.03, y: center }, });
    S.width *= 0.8
    container.addChild(S);
    const M = new PIXI.Text({ text: '末班车：', style: style, position: { x: _param.recTi.w * 0.03, y: center }, });
    M.width *= 0.8
    container.addChild(M);
    const St = new PIXI.Text({ text: start, style: station_TS, anchor: { x: 1, y: 1 }, position: { x: _param.recTi.w * 0.37, y: center }, });
    St.width *= 0.8
    container.addChild(St);
    const Mt = new PIXI.Text({ text: end, style: station_TS, anchor: { x: 1, y: 0 }, position: { x: _param.recTi.w * 0.37, y: center }, });
    Mt.width *= 0.8
    container.addChild(Mt);
  }

  function sliceZero(time) {
    if (time.slice(0, 1) == "0") {
      return time.slice(1)
    } else {
      return time
    }
  }
}

export {
  printBaseText,
  printNo,
  printService,
}