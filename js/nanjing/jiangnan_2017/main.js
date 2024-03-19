import { param } from "./parameter.js"
import { reSize, loadResource } from "./stageSetting.js";
import { addLogo, drawRect, drawLine, drawPrice } from "./canvas/drawSprite.js";
import { printBaseText, printNo, printService } from "./canvas/printText.js";
import { printLogo } from "./canvas/printLogo.js";
import { printLineStation } from "./canvas/printLineStation.js";
import { LineBlank as Line_NEW, Line18, Line42, Line206, Line207, Line503, Line521, Line538, } from "./exampleData.js";
import { copyToClipboard, clipboardToData } from "../../pageBtn.js"
import { createList, countList, removeItemStation } from "./operate/liItemStation.js";
import { stationClick } from "./operate/liItemOpera.js";
import { buildLineInfo, updateLineInfo } from "./operate/lineInfo.js";
import { OS, progressBar } from "../../tools.js";



async function workflow(Map) {
  const jiangnanMap = new PIXI.Container();
  Map.stage.addChild(jiangnanMap);
  // Map.view.id = "jiangnan_2017";
  reSize(Map);
  // const routeMapStage = jiangnanMap;
  console.log('加载jiangnan_2017模块');
  progressBar(1, 'js');
  // console.log(Map)
  // Map.renderer.events.resolution = 2
  // Map.renderer._view.resolution = 2
  loadResource(); // 捆绑包加载 - 不能异步
  buildMap(Map, jiangnanMap); // 基本内容创建
  createList();// 创建站名列表
  buildLineInfo();

  // 生成按钮
  const update = document.querySelector('[id="update"]');
  update.addEventListener("click", () => {
    console.log(Data.station);
    pixiClear(Map);
  });
  // 下载
  const output = document.querySelector('[id="download"]');
  output.addEventListener("click", () => {
    const routeMapStage = Map.stage;

    const dataURLtoFile = base64 => {
      let fileArray = base64.split(','),
        // 过滤出文件类型
        fileType = fileArray[0].match(/:(.*?);/)[1],
        // atob 是对经过 base-64 编码的字符串进行解码
        bstr = atob(fileArray[1]),
        n = bstr.length,
        //Uint8Array 数组类型表示一个 8 位无符号整型数组
        u8arr = new Uint8Array(n)
      while (n--) {
        // 返回字符串n个字符的 Unicode 编码
        u8arr[n] = bstr.charCodeAt(n)
      }
      // return new Blob([u8arr], { type: fileType })
      const today = new Date();
      return new File([u8arr], `${Data.lineNo.main}-${today.getTime()}`, { type: fileType })
    }

    const buttonClick = (base64) => {
      //拿到转码后的 file 格式
      let file = dataURLtoFile(base64)
      // 动态创建 a 标签
      const node = document.createElement('a')
      // 静态方法会创建一个 DOMString
      node.href = URL.createObjectURL(file)
      // 下载的文件名
      node.download = file.name
      // 模拟点击下载
      node.click()
      // 释放刚刚创建的 DOMString
      URL.revokeObjectURL(node.href)
      //这里我吧它插入到了 body 里因为不查vue里面会报错，说子节点中不存在
      document.body.appendChild(node)
      // 删除 a 标签
      document.body.removeChild(node)
    }
    // 白色背景
    const addWhiteBgc = (boolean) => {
      const bgcW = new PIXI.Graphics({ label: 'background', zIndex: -1 })
        .rect(param.size.map.x, param.size.map.y, param.size.map.w, param.size.map.h)
        .fill('#FFFFFF')
      routeMapStage.addChild(bgcW);
      routeMapStage.sortChildren();
    }
    addWhiteBgc(true);
    // console.log(ramp.renderer.extract.image(routeMapStage, 'image/png', 1.0));
    // console.log(ramp.renderer.extract.base64(routeMapStage, "image/png"));
    // console.log(ramp.renderer.extract.canvas(routeMapStage).toDataURL());
    buttonClick(Map.renderer.extract.canvas(routeMapStage).toDataURL())
    routeMapStage.removeChild(routeMapStage.getChildByLabel('background'));
    console.log("图像成功导出！");
  });
  // 新建线路
  const newLine = document.querySelector('[id="exampleLines"]');
  newLine.addEventListener("click", (e) => {
    // 获取监听对象
    e.target.dataset.line ? (() => {
      // console.log(e.target.dataset.line)
      switch (confirm(e.target.dataset.line == '_NEW' ? `是否新建空白线路？\n当前数据将不会存储！` : `是否载入线路-${e.target.dataset.line}？\n当前数据将不会存储！`) && e.target.dataset.line) {
        case '_NEW':
          Data = Object.assign({}, Line_NEW);
          break;
        case '18':
          Data = Object.assign({}, Line18);
          break;
        case '42':
          Data = Object.assign({}, Line42);
          break;
        case '206':
          Data = Object.assign({}, Line206);
          break;
        case '207':
          Data = Object.assign({}, Line207);
          break;
        case '503':
          Data = Object.assign({}, Line503);
          break;
        case '521':
          Data = Object.assign({}, Line521);
          break;
        case '538':
          Data = Object.assign({}, Line538);
          break;
      }
      pixiClear(Map);
      createList();
      countList();
      updateLineInfo();
    })() : "";
  })
  // 清空
  const stationClear = document.querySelector("#stationClear");
  stationClear.addEventListener("click", e => {
    removeItemStation(0, Object.keys(Data.station).length - 1);
  })
  // 导出
  const stationOutput = document.querySelector("#stationOutput");
  stationOutput.addEventListener("click", e => {
    copyToClipboard(JSON.stringify(Data));
  })
  // 导入
  const stationInput = document.querySelector("#stationInput");
  stationInput.addEventListener("click", e => {
    const obj = clipboardToData(prompt("请输入JSON", ""));
    if (obj) {
      removeItemStation(0, Object.keys(Data.station).length - 1, '', true);
      Data = obj;
      pixiClear(Map);
      createList();
      updateLineInfo();
    }
  })
  // 点击站点
  const mapStation = document.querySelector("#mapStation");
  mapStation.addEventListener("click", e => {
    e.target.className.includes("icon-setting") ? stationClick(e.target) : '';
  })

}

function pixiClear(Map) {
  Map.stage.removeChildren().forEach(e => {
    e.destroy({
      children: true,
      texture: false,
      baseTexture: false,
    })
  })
  // loadData();
  const jiangnanMap = new PIXI.Container();
  Map.stage.addChild(jiangnanMap);
  // const routeMapStage = jiangnanMap.stage;
  buildMap(Map, jiangnanMap);
}

async function buildMap(Map, jiangnanMap) {
  // const _color = Data.compColor.main === 0XAF0909 ? 1 : 0;
  const _color = Data?.compColor;

  jiangnanMap.addChild(await addLogo(Map));
  // 绘制矩形
  const _rec = await drawRect(0, 0, (_color?.name == 'YZ' ? 1 : 0));
  _rec.forEach(e => { e.zIndex = 10; jiangnanMap.addChild(e); });
  // 绘制线段
  const { _line, _angle } = await drawLine(0, 0, _color?.line);
  // _line.zIndex = 20;
  jiangnanMap.addChild(_line);
  // 添加票价
  const _price = await drawPrice(0, 0, (_color?.name == 'YZ' ? 1 : 0));
  _price.zIndex = 30;
  jiangnanMap.addChild(_price);
  // 添加基础文本
  const _baseText = await printBaseText(0, 0, "blue");
  _baseText.zIndex = 40;
  jiangnanMap.addChild(_baseText);
  // 添加图片
  const _logo = await printLogo(0, 0, _color?.main);
  _logo.zIndex = 50;
  jiangnanMap.addChild(_logo);
  // 添加路号
  const _lineNo = await printNo(0, 0, _color?.main);
  _lineNo.zIndex = 60;
  jiangnanMap.addChild(_lineNo);
  // 添加服务时间
  const _serveText = await printService(0, 0, "blue");
  _serveText.zIndex = 70;
  jiangnanMap.addChild(_serveText);
  // 添加站点
  const _station = await printLineStation(0, 0, _color, _line, _angle);
  _station.zIndex = 80;
  jiangnanMap.addChild(_station);
  Map.render() // 手动渲染
  progressBar(1, 'canvas');
}

export {
  workflow,
  pixiClear
}