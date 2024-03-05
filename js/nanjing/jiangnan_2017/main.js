import { param } from "./parameter.js"
import { reSize, loadResource } from "./stageSetting.js";
import { addLogo, drawRect, drawLine, drawPrice } from "./drawSprite.js";
import { printBaseText, printNo, printService } from "./printText.js";
import { printLogo } from "./printLogo.js";
import { printStation } from "./printStation.js";
import { LineBlank as Line_NEW, Line42, Line206, Line207, Line503, Line521, Line538, } from "./exampleData.js";



async function workflow(Map) {
  const jiangnanMap = new PIXI.Container();
  Map.stage.addChild(jiangnanMap);
  Map.view.id = "jiangnan_2017";
  reSize(Map);
  // const routeMapStage = jiangnanMap;
  console.log('加载jiangnan_2017模块');
  // console.log(Map)
  // Map.renderer.events.resolution = 2
  // Map.renderer._view.resolution = 2
  loadResource(); // 捆绑包加载 - 不能异步
  buildMap(Map, jiangnanMap); // 基本内容创建

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
      return new File([u8arr], `${Data.lineNo}-${today.getTime()}`, { type: fileType })
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
      const bgcW = new PIXI.Graphics();
      bgcW.name = 'background';
      bgcW.zIndex = -1;
      bgcW.beginFill('#FFFFFF');
      bgcW.drawRect(param.size.map.x, param.size.map.y, param.size.map.w, param.size.map.h);
      bgcW.endFill();
      routeMapStage.addChild(bgcW);
      routeMapStage.sortChildren();
    }
    addWhiteBgc(true);
    // console.log(ramp.renderer.extract.image(routeMapStage, 'image/png', 1.0));
    // console.log(ramp.renderer.extract.base64(routeMapStage, "image/png"));
    // console.log(ramp.renderer.extract.canvas(routeMapStage).toDataURL());
    buttonClick(Map.renderer.extract.canvas(routeMapStage).toDataURL())
    routeMapStage.removeChild(routeMapStage.getChildByName('background'));
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
  jiangnanMap.addChild(await addLogo(Map));
  // 绘制矩形
  const _rec = await drawRect(0, 0, "blue");
  _rec.forEach(e => jiangnanMap.addChild(e));
  // 绘制线段
  const { _line, _angle } = await drawLine(0, 0, "blue");
  // jiangnanMap.addChild(_line);
  // 添加票价
  jiangnanMap.addChild(await drawPrice(0, 0, "blue"));
  // 添加基础文本
  jiangnanMap.addChild(await printBaseText(0, 0, "blue"));
  // 添加图片
  jiangnanMap.addChild(await printLogo(0, 0, "blue"));
  jiangnanMap.addChild(printNo(0, 0, "blue"));
  jiangnanMap.addChild(await printService(0, 0, "blue"));
  jiangnanMap.addChild(await printStation(0, 0, "blue", _line, _angle));
  Map.render() // 手动渲染
}

export {
  workflow,
  pixiClear
}

// function loadData() {
//   reSet();
//   if (Data.isSeg) segmentPri();
//   // 分段计价
//   function segmentPri() {
//     sizeLineNo[1] = sizeLineNo[1] - 35;
//     sizeLineNo[3] = sizeLineNo[3] + 35;
//     sizePriHead[2] = 250;
//     sizePriLine = [sizeRecComp[0] + sizeRecComp[2], sizePriHead[1] + sizePriHead[3], (sizeRecComp[2] - sizePriHead[2]), (sizePriHead[3] / 10)];
//   }

//   function reSet() {
//     sizeLineNo = [100, 325, 295, 190]
//     sizePriHead = [100, 900, 345, 100]
//     sizePriLine = [sizeRecComp[0] + sizeRecComp[2], sizePriHead[1] + sizePriHead[3], (sizeRecComp[2] - sizePriHead[2]), (sizePriHead[3] / 10)]
//   }
// }