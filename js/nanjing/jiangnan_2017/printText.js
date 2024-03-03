import { param } from "./parameter.js"
import { OS } from "../../tools.js"

async function printBaseText(_x, _y, _color) {
  await PIXI.Assets.loadBundle('load-font');
  const container = new PIXI.Container();
  const _param = param;

  // 南京公共交通（集团）有限公司
  const textGroup = new PIXI.Text(Data.group, {
    fill: _param.color.JN,
    fontFamily: 'FZZZHONGJW',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
    align: 'center'
  });
  textGroup.name = "textGroup";
  textGroup.anchor.set(0.5, 0);
  textGroup.position.set(_param.size.textGro.x + _x, _param.size.textGro.y + _y);
  textGroup.height = _param.size.textGro.h
  textGroup.style.letterSpacing = textGroup.width < _param.size.textGro.w ? (50 / 20) * (16 - textGroup.text.length) : 1;
  textGroup.width = textGroup.width < _param.size.textGro.w ? textGroup.width : _param.size.textGro.w;
  // NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD
  const textGroupEn = new PIXI.Text(Data.groupEn, {
    fill: _param.color.JN,
    fontFamily: 'FZZZHONGJW',
    fontSize: 11.1,
    fontWeight: 'bold',
    letterSpacing: 0,
    align: 'center'
  });
  textGroup.name = "textGroupEn";
  textGroupEn.anchor.set(0.5, 0);
  textGroupEn.position.set(_param.size.textGroEn.x + _x, _param.size.textGroEn.y + _y);
  textGroupEn.width = textGroupEn.width < _param.size.textGroEn.w ? textGroupEn.width : _param.size.textGroEn.w;
  // 江南公交
  const textComp = new PIXI.Text(Data.company, {
    fill: '#FFF',
    fontFamily: 'FZZZHONGJW',
    fontSize: 35,
    fontWeight: 'bold',
    letterSpacing: 65,
    align: 'center'
  });
  textComp.name = "textComp";
  textComp.style.letterSpacing = textComp.width < _param.size.textComp.w ? textComp.style.letterSpacing : (70 / 11) * (11 - textComp.text.length);
  textComp.width = textComp.width < _param.size.textComp.w ? textComp.width : _param.size.textComp.w;
  textComp.anchor.set(0.5);
  textComp.position.set(_param.size.textComp.x + _x, _param.size.textComp.y + _y);
  // 首末班车服务时间
  const textTiHead = new PIXI.Text('首末班车服务时间', {
    fill: '#FFF',
    fontFamily: 'FZZZHONGJW',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 10,
    align: 'center'
  });
  textTiHead.name = "textTiHead";
  textTiHead.width = _param.size.textTiHd.w * 0.85;
  textTiHead.anchor.set(0.5);
  textTiHead.position.set(_param.size.textTiHd.x + _x, _param.size.textTiHd.y + _y);
  // 本线路单程票价
  const textPriHead = new PIXI.Text(Data.isSel && !infoPrice.querySelector("#infoSellPri").checked ? '本线路售票方式' : '本线路单程票价', {
    fill: '#FFF',
    fontFamily: 'FZZZHONGJW',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 1,
    align: 'center'
  });
  textPriHead.name = "textPriHead";
  textPriHead.width = Data.isSeg || Data.isSel ? _param.size.recNo.w * 0.85 : _param.size.textPriHd.w * 0.85;
  textPriHead.anchor.set(0.5);
  textPriHead.position.set(Data.isSeg || Data.isSel ? _param.size.textPriHd.x_S + _x : _param.size.textPriHd.x + _x, _param.size.textPriHd.y + _y);
  container.addChild(textGroup, textGroupEn, textComp, textTiHead, textPriHead);
  return container
}

function printNo(_x, _y, _color) {
  const _param = param.size;
  const container = new PIXI.Container();
  const lineSellPrice = infoPrice.querySelector("#infoSellPri").checked
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
    const obj = new PIXI.Text(text, {
      fill: '#FFF',
      fontFamily: 'YGYXSZITI, FZZZHONGJW,Times New Roman, Times, serif',
      fontSize: 180,
      align: 'center'
    });
    if (text.match(/[\a-zA-Z]+/g)) { obj.width *= 0.8; obj.style.letterSpacing = 5; };
    if (text.match(/[\u4e00-\u9fa5,.!"\'（）()]+/g)) { obj.style.fontSize = 90; };
    obj.style.letterSpacing = obj.width > _param.recNo.w * 0.9 ? -5 : obj.style.letterSpacing;
    obj.width = obj.width > _param.recNo.w ? _param.recNo.w * 0.9 : obj.width;
    obj.height = Data.isSeg || lineSellPrice ? obj.height * 0.8 : obj.height;  // 分段计价
    obj.anchor.set(0.5);
    obj.x = _param.recNo.w / 2 + _x
    obj.y = Data.isSeg || lineSellPrice ? _param.recNo.h / 2.6 + _y : _param.recNo.h / 2 + _y; // 分段计价偏移
    return obj
  }
  // 路号
  const lineSplit = split(Data.lineNo)
  let lineNo = textLine(lineSplit.numLetter);
  lineNo.name = "lineNo";
  let lineString = textLine(lineSplit.chinese);
  lineString.name = "lineString";
  // 含中文偏置
  if (lineSplit.chinese && lineSplit.numLetter) {
    lineNo.width *= 0.7;
    lineNo.x *= 0.7;
    lineString.width = _param.recNo.w - lineNo.width;
    lineString.x = lineString.width / 1.8 + lineNo.width + _x;
    lineString.y = Data.isSeg || lineSellPrice ? _param.recNo.h / 2.2 + _y : _param.recNo.h / 1.75 + _y;
  }
  // 底部计价文字
  if (Data.isSeg || lineSellPrice) {
    const textLineAppend = new PIXI.Text('[ 分段计价 ]', {
      fill: '#FFF',
      fontFamily: 'MicrosoftYaHei',
      fontSize: 30,
      fontWeight: 'bold',
      letterSpacing: 3,
    });
    textLineAppend.name = "textLineAppend";
    textLineAppend.anchor.set(0.5);
    textLineAppend.width = _param.recNo.w * 0.85;
    textLineAppend.height *= 0.95;
    textLineAppend.x = _param.recNo.w / 2 + _x;
    textLineAppend.y = _param.recNo.h * 0.8 + _y;
    container.addChild(textLineAppend);
  }
  // 右侧文字
  const ext = Data.isSeg ? '路线路图\n及\n计价站点' : '路线路图';
  const textLineExt = new PIXI.Text(ext, {
    fill: param.color.JN,
    fontFamily: 'MicrosoftYaHei',
    fontSize: 45,
    fontWeight: 'bold',
    // lineHeight: 45,
    align: 'center'
  });
  textLineExt.name = "textLineExt";
  textLineExt.width = textLineExt.width > (_param.recComp.w - _param.recNo.w) * 0.9 ? (_param.recComp.w - _param.recNo.w) * 0.9 : textLineExt.width;
  textLineExt.height = textLineExt.height > _param.recNo.h * 0.9 ? _param.recNo.h * 0.9 : textLineExt.height;
  textLineExt.anchor.set(0.5);
  textLineExt.position.set(_param.recNo.w + (_param.recComp.w - _param.recNo.w) / 2 + _x, _param.recNo.h / 2 + _y);
  container.addChild(lineNo, lineString, textLineExt);
  return container
}

async function printService(_x, _y, _color) {
  const _param = param.size;
  // 首末班容器
  const container = new PIXI.Container();
  container.name = "printService";
  container.width = _param.recTi.w;
  container.height = _param.recTi.h;
  container.position.set(_param.recTi.x + _x, _param.recTi.y + _y);
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
  const conTime_Left = new PIXI.Container();
  conTime_Left.position.set(conTime_Margin[0], conTime_Margin[1]);
  container.addChild(conTime_Left);
  stationName(Data.point['A'].name, conTime_Left);
  stationTime(sliceZero(Data.point['A'].startTime), sliceZero(Data.point['A'].endTime), conTime_Left);
  const conTime_Right = new PIXI.Container();
  // 终点站
  conTime_Right.position.set(_param.recTi.w * 0.53, conTime_Margin[1]);
  container.addChild(conTime_Right);
  stationName(Data.point['Z'].name, conTime_Right);
  stationTime(sliceZero(Data.point['Z'].startTime), sliceZero(Data.point['Z'].endTime), conTime_Right);

  return container

  function stationName(name, container) {
    const text = new PIXI.Text(name, station_NS);
    text.anchor.set(0.5, 0)
    text.position.set(_param.recTi.w * 0.2, 0);
    if (text.width > _param.recTi.w * 0.4) {
      text.width = _param.recTi.w * 0.4;
    } else {
      const style = station_NS.clone();
      style.letterSpacing = text.width < _param.recTi.w * 0.3 && name.length ? (_param.recTi.w * 0.3 - text.width) / name.length : 0;
      text.style = style;
      text.width = text.width > _param.recTi.w * 0.4 ? _param.recTi.w * 0.4 : text.width;
    }
    container.addChild(text);
  }

  function stationTime(start, end, container) {
    const style = station_TS.clone();
    style.align = 'left';
    const center = (_param.recTi.h + container.children[0].height) * 0.5; //剩余中心高度
    const S = new PIXI.Text('首班车：', style);
    S.anchor.set(0, 1);
    S.position.set(_param.recTi.w * 0.03, center);
    S.width *= 0.8
    container.addChild(S);
    const M = new PIXI.Text('末班车：', style);
    M.position.set(_param.recTi.w * 0.03, center);
    M.width *= 0.8
    container.addChild(M);
    const St = new PIXI.Text(start, station_TS);
    St.anchor.set(1, 1);
    St.position.set(_param.recTi.w * 0.37, center);
    St.width *= 0.8
    container.addChild(St);
    const Mt = new PIXI.Text(end, station_TS);
    Mt.anchor.set(1, 0);
    Mt.position.set(_param.recTi.w * 0.37, center);
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