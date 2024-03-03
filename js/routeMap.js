let colorJN = '#1F2677'
let colorJNLine = '#116db0'
let sizeMap = [0, 0, 3780, 1130]
let sizeComp = [100, 210, 540, 60]
let sizeLineNo = [100, 325, 295, 190]
let sizeTiHead = [100, 535, 540, 90]
let sizeTi = [100, 625, 540, 210]
let sizePriHead = [100, 900, 345, 100]
let sizePriLine = [sizeComp[0] + sizeComp[2], sizePriHead[1] + sizePriHead[3], (sizeComp[2] - sizePriHead[2]), (sizePriHead[3] / 10)]
let lineX = [770, 1670, 2650, 3550]
let lineY = [310, 310, 500, 500]
let iconScaleSt = [300, 0.15, 0.25]
let textXY = [lineX,]
let lineAngle = 0

// let Data = {
//   group: '南京公共交通（集团）有限公司',
//   groupEn: 'NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD',
//   company: '扬子公交',
//   lineNo: 'k3',
//   price: [0, 5],
//   // isSeg: true,
//   isSeg: false,

//   point: {
//     'A': {
//       name: '仙新路地铁站',
//       startTime: '6:00',
//       endTime: '18:00',
//     },
//     'Z': {
//       name: '瓜埠客运站',
//       startTime: '6:00',
//       endTime: '18:00',
//     },
//   },
//   station: {
//     0: { name: '仙新路地铁站', isStart: true, isSingle: true, sign: { direction: 1, convert: 0, blank: false }, text: { color: '' } },
//     1: { name: '十月村', isSingle: true, sign: { direction: 1, convert: 0 } },
//     2: { name: '戴家库', isPriSec: true, priSec: { direction: 1, price: 2 }, },
//     3: { name: '栖霞山', isMetro: true, metro: ['1', '2'] },
//     4: { name: '赵庄', isEnd: true, sign: { direction: 1, convert: 0 }, isSpecial: true, special: { Up: true, Down: false }, }
//   }
// }

// 创建应用

const ramp = new PIXI.Application({
  // background: '#1099bb',
  backgroundColor: '#FFF',
  width: sizeMap[2],
  height: sizeMap[3],
  hello: true,
  // resizeTo: wrap,
  antialias: true,  //抗锯齿
  // resolution: 1 //分辨率
  sortableChildren: true,
});
// PIXI加入指定DOM
let wrap = document.querySelector("#map_wrap");
ramp.view.id = "jiangnan"
let c_s = ramp.view.style;
const routeMapStage = ramp.stage;
// 设置style宽高
// // ramp.view.style.scale = (0.5, 0.5)
// // ramp.view.style.width = map_w + 'px'

const pixiResize = (delay) => {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (window.innerWidth > window.innerHeight) {
        c_s.width = (window.innerWidth / 1.5) + 'px';
      } else {
        c_s.width = wrap.offsetWidth + 'px';
      }
    }, delay);
  }
};
// 延迟500毫秒执行
window.addEventListener('resize', pixiResize(500));

if (window.innerWidth > window.innerHeight) {
  c_s.width = (window.innerWidth / 1.5) + 'px';
} else {
  c_s.width = wrap.offsetWidth + 'px';
}

// c_s.width = (window.innerWidth > window.innerHeight) ? ((window.innerWidth / 1.5) + 'px') : ((window.innerHeight / 5) + 'px')
wrap.appendChild(ramp.view);

loadResource(); // 捆绑包加载 - 不能异步
loadData();
buildMap(); // 基本内容创建

async function loadResource() {
  const manifest = {
    bundles: [{
      name: 'load-box',
      assets: [{
        alias: 'box',
        src: './images/BoxSprite.png',
      },],
    },
    {
      name: 'load-NJGJ',
      assets: [{
        alias: 'Price',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io/images/BusPriceSprite.png',
        // src: './images/BusPriceSprite.png',
      },
      {
        alias: 'Element',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io/images/NJGJSprite.png',
        // src: './images/NJGJSprite.png',
      },
      {
        alias: 'Metro',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io/images/MetroSprite.png',
        // src: './images/MetroSprite.png',
      },
      ],
    },
    {
      name: 'load-icon',
      assets: [{
        alias: 'icon_Info',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/images/IconSprite.png',
        // src: './images/IconSprite.png',
      },
      {
        alias: 'logoSvg',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/images/Logo.svg',
        // src: './images/Logo.svg',
      },
      {
        alias: 'logoPng',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/images/Logo.png',
        // src: './images/Logo.png',
      },
      ],
    },
    {
      name: 'load-font',
      assets: [{
        alias: 'FZZZHONGJW',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/font/fzzzhongjw.woff',
        // src: './font/fzzzhongjw.woff',
      },
      // {
      //   alias: 'FZZYJW',
      //   src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io/font/fzzyjw.woff',
      //   // src: './font/fzzyjw.woff',
      // },
      {
        alias: 'FZHTJW',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/font/fzhtjw.woff',
        // src: './font/fzhtjw.woff',
      },
      // {
      //   alias: 'TNR',
      //   src: './font/TNR.ttf',
      // },
      {
        alias: 'YGYXSZITI',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/font/ygyxsziti.woff',
        // src: './font/ygyxsziti.woff',
      },
      ],
    },
    ]
  };

  // const manifest = {
  //   bundles: [{
  //     name: 'load-box',
  //     assets: [{
  //       alias: 'box',
  //       src: './images/BoxSprite.png',
  //     },],
  //   },
  //   {
  //     name: 'load-NJGJ',
  //     assets: [{
  //       alias: 'Price',
  //       src: './images/BusPriceSprite.png',
  //     },
  //     {
  //       alias: 'Element',
  //       src: './images/NJGJSprite.png',
  //     },
  //     {
  //       alias: 'Metro',
  //       src: './images/MetroSprite.png',
  //     },
  //     ],
  //   },
  //   {
  //     name: 'load-icon',
  //     assets: [{
  //       alias: 'icon_Info',
  //       src: './images/IconSprite.png',
  //     },
  //     {
  //       alias: 'logoSvg',
  //       src: './images/Logo.svg',
  //     },
  //     {
  //       alias: 'logoPng',
  //       src: './images/Logo.png',
  //     },
  //     ],
  //   },
  //   {
  //     name: 'load-font',
  //     assets: [{
  //       alias: 'FZZZHONGJW',
  //       src: './font/fzzzhongjw.woff',
  //     },
  //     // {
  //     //   alias: 'FZZYJW',
  //     //   src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io/font/fzzyjw.woff',
  //     //   // src: './font/fzzyjw.woff',
  //     // },
  //     {
  //       alias: 'FZHTJW',
  //       src: './font/fzhtjw.woff',
  //     },
  //     {
  //       alias: 'YGYXSZITI',
  //       src: './font/ygyxsziti.woff',
  //     },
  //     ],
  //   },
  //   {
  //     name: 'load-font-mobile',
  //     assets: [{
  //       alias: 'TNR',
  //       src: './font/Times New Roman.woff',
  //     },
  //     ],
  //   },
  //   ]
  // };

  await PIXI.Assets.init({
    manifest
  });
  // 加载文件
  // PIXI.Assets.add("mm", "./images/sprite.png")
  // 异步加载资源
  // const ttx = PIXI.Assets.load(['box'])
  // ttx.then((textures) => {
  //   // const sp = new PIXI.Sprite(textures.mm)
  //   // sp.x = 100
  //   let rectangle = new PIXI.Rectangle(0, 38, 58, 58) //取出对象
  //   textures.mm.frame = rectangle
  //   let rocket = new PIXI.Sprite(textures.mm)
  //   rocket.position.set(100, 30)  // 设定位置
  //   routeMapStage.addChild(rocket)
  // })
}

async function buildMap() {
  // 添加水印
  await addLogo();
  // 加载字体
  await PIXI.Assets.loadBundle('load-font');
  if (!os.isPc) {
    await PIXI.Assets.loadBundle('load-font-mobile');
  }
  // box素材 Load a bundle...
  let loadBoxAssets = await PIXI.Assets.loadBundle('load-box');
  const bosSprite = loadBoxAssets.box;
  bosSprite.frame = new PIXI.Rectangle(0, 0, 1000, 500);
  let boxComp = new PIXI.Sprite(bosSprite);
  boxComp.setTransform(sizeComp[0], sizeComp[1], sizeComp[2] / bosSprite.width, sizeComp[3] / bosSprite.height);
  let boxLineNo = new PIXI.Sprite(bosSprite);
  boxLineNo.setTransform(sizeLineNo[0], sizeLineNo[1], sizeLineNo[2] / bosSprite.width, sizeLineNo[3] / bosSprite.height);
  let boxTiHead = new PIXI.Sprite(bosSprite);
  boxTiHead.setTransform(sizeTiHead[0], sizeTiHead[1], sizeTiHead[2] / bosSprite.width, sizeTiHead[3] / bosSprite.height);
  let boxPriHead = new PIXI.Sprite(bosSprite);
  boxPriHead.setTransform(sizePriHead[0], sizePriHead[1], sizePriHead[2] / bosSprite.width, sizePriHead[3] / bosSprite.height);
  routeMapStage.addChild(boxComp, boxLineNo, boxTiHead, boxPriHead);
  const box_Slice = bosSprite.clone();
  box_Slice.frame = new PIXI.Rectangle(0, 500, 1000, 200);
  let boxPriLine = new PIXI.Sprite(box_Slice);
  boxPriLine.anchor.set(1, 1);
  boxPriLine.setTransform(sizePriLine[0], sizePriLine[1], sizePriLine[2] / bosSprite.width, sizePriLine[3] / bosSprite.height);
  sizePriLineNew = [boxPriLine.x, boxPriLine.y, boxPriLine.width, boxPriLine.height] //更新尺寸
  routeMapStage.addChild(boxPriLine);

  // #09178b - 矩形集合
  // const rectB = new PIXI.Graphics()
  // rectB.beginFill(colorJN)
  // rectB.drawRect(sizeComp[0], sizeComp[1], sizeComp[2], sizeComp[3])
  // rectB.drawRect(sizeLineNo[0], sizeLineNo[1], sizeLineNo[2], sizeLineNo[3])
  // rectB.drawRect(sizeTiHead[0], sizeTiHead[1], sizeTiHead[2], sizeTiHead[3])
  // rectB.drawRect(sizePriHead[0], sizePriHead[1], sizePriHead[2], sizePriHead[3])
  // rectB.drawRect(sizePriHead[0] + sizePriHead[2], sizePriHead[1] + sizePriHead[3] - 5, sizeComp[2] - sizePriHead[2], 5)
  // rectB.endFill()
  // routeMapStage.addChild(rectB);

  // #dedede - 矩形集合
  const rectG = new PIXI.Graphics()
  rectG.beginFill('#dedede')
  rectG.drawRect(sizeTi[0], sizeTi[1], sizeTi[2], sizeTi[3])
  rectG.endFill()
  routeMapStage.addChild(rectG)

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
  const lineB = new PIXI.Graphics()
  lineB.lineStyle(25, colorJNLine)
  lineB.moveTo(lineX[0], lineY[0])
  lineB.lineTo(lineX[1], lineY[1])
  lineB.lineTo(lineX[2], lineY[2])
  lineB.lineTo(lineX[3], lineY[3])
  routeMapStage.addChild(lineB)
  lineAngle = getAngle([lineX[1], lineY[1]], [lineX[2], lineY[2]], [lineX[1], lineY[2]])


  // 江南公交 - 旧方式，嵌入图像
  // const rectSizeComp = new PIXI.Graphics()
  // rectSizeComp.x = 100
  // rectSizeComp.y = 210
  // rectSizeComp.beginFill('#09178b')
  // rectSizeComp.drawRect(0, 0, 540, 60)
  // rectSizeComp.endFill()
  // const textComp = new PIXI.Text('江南公交', {
  //   fill: '#FFF',
  //   fontFamily: Font.FZZZHONGJW,
  //   fontSize: 36,
  //   fontWeight: 'bold',
  //   lineHeight: 95,
  //   letterSpacing: 75,
  //   align: 'center'
  // });
  // textComp.anchor.set(0.5)
  // textComp.x = rectSizeComp.width / 2
  // textComp.y = rectSizeComp.height / 2
  // rectSizeComp.addChild(textComp)
  // routeMapStage.addChild(rectSizeComp)

  routeMapStage.addChild(await printPrice()); // 票价
  routeMapStage.addChild(await printTextIcon()); // 图标
  routeMapStage.addChild(await printService()); // 服务时间

  routeMapStage.addChild(await printStation())
  // await printStation()

}

async function addLogo() {
  let logoElementAssets = await PIXI.Assets.loadBundle('load-icon');
  if (os.isPc) {
    SCBusFan = new PIXI.Sprite(logoElementAssets.logoSvg);
    // SCBusFan.tint = '0xFFFF660'
    SCBusFan.anchor.set(0.5, 0.5);
    SCBusFan.scale.set(ramp.view.height / 3300);
    SCBusFan.position.set(ramp.view.width / 2, ramp.view.height / 2);
    SCBusFan.alpha = 0.3;
    routeMapStage.addChild(SCBusFan);
  } else {
    SCBusFan = new PIXI.Sprite(logoElementAssets.logoPng);
    // SCBusFan.tint = '0xFFFF660'
    SCBusFan.anchor.set(0.5, 0.5);
    SCBusFan.scale.set(ramp.view.height / 330);
    SCBusFan.position.set(ramp.view.width / 2, ramp.view.height / 2);
    SCBusFan.alpha = 0.3;
    routeMapStage.addChild(SCBusFan);
  }
}

async function printPrice() {
  const container = new PIXI.Container();
  if (Data.isSeg) {
    P1 = [200 * Data.price[0], 0]
    P2 = [200 * Data.price[1], 0]
    Z = [300 * 2, 600]
    Y = [0, 600]
    let loadPriceAssets = await PIXI.Assets.loadBundle('load-NJGJ');
    const imagePrice1 = loadPriceAssets.Price;
    imagePrice1.frame = new PIXI.Rectangle(P1[0], P1[1], 200, 300);
    let priSpr1 = new PIXI.Sprite(imagePrice1);
    priSpr1.anchor.set(1, 1);
    const imagePrice2 = imagePrice1.clone();
    imagePrice2.frame = new PIXI.Rectangle(P2[0], P2[1], 200, 300);
    let priSpr2 = new PIXI.Sprite(imagePrice2);
    priSpr2.anchor.set(1, 1);
    const imageYuan = imagePrice1.clone();
    imageYuan.frame = new PIXI.Rectangle(Y[0], Y[1], 300, 300);
    let yuanSpr = new PIXI.Sprite(imageYuan);
    yuanSpr.anchor.set(1, 1);
    const imagZhi = imagePrice1.clone();
    imagZhi.frame = new PIXI.Rectangle(Z[0], Z[1], 300, 300);
    let zhiSpr = new PIXI.Sprite(imagZhi);
    zhiSpr.anchor.set(1, 1);
    // 设定位置
    yuanSpr.setTransform(sizeComp[0] + sizeComp[2] - 10, sizePriHead[1] + sizePriHead[3] - sizePriLineNew[3] * 1.5, (sizePriHead[3] - sizePriLineNew[3] * 8) / yuanSpr.width, (sizePriHead[3] - sizePriLineNew[3] * 9) / yuanSpr.height);
    priSpr2.setTransform(yuanSpr.position.x - yuanSpr.width, yuanSpr.position.y, yuanSpr.width / 200, yuanSpr.width / 200);
    zhiSpr.setTransform(priSpr2.position.x - priSpr2.width, priSpr2.position.y, yuanSpr.width / 300, yuanSpr.width / 210);
    priSpr1.setTransform(zhiSpr.position.x - zhiSpr.width, zhiSpr.position.y, yuanSpr.width / 200, yuanSpr.width / 200);
    container.addChild(priSpr1, priSpr2, yuanSpr, zhiSpr);
  } else {
    PO = [200 * Data.price[0], 0]
    Y = [0, 600]
    let loadPriceAssets = await PIXI.Assets.loadBundle('load-NJGJ');
    const imagePrice = loadPriceAssets.Price;
    imagePrice.frame = new PIXI.Rectangle(PO[0], PO[1], 200, 300);
    let priSpr = new PIXI.Sprite(imagePrice);
    priSpr.anchor.set(1, 1);
    const imageYuan = imagePrice.clone();
    imageYuan.frame = new PIXI.Rectangle(Y[0], Y[1], 300, 300);
    let yuanSpr = new PIXI.Sprite(imageYuan);
    yuanSpr.anchor.set(1, 1);
    // 设定位置
    yuanSpr.setTransform(sizeComp[0] + sizeComp[2] - 10, sizePriHead[1] + sizePriHead[3] - sizePriLineNew[3] * 1.5, (sizePriHead[3] - sizePriLineNew[3] * 5) / yuanSpr.width, (sizePriHead[3] - sizePriLineNew[3] * 6) / yuanSpr.height);
    priSpr.setTransform(yuanSpr.position.x - yuanSpr.width, yuanSpr.position.y, yuanSpr.width / 200, yuanSpr.width / 200);
    container.addChild(priSpr, yuanSpr);
  }
  return container
}

async function printTextIcon() {
  const container = new PIXI.Container();
  // 南京公共交通（集团）有限公司
  const textGroup = new PIXI.Text(Data.group, {
    fill: colorJN,
    fontFamily: 'FZZZHONGJW',
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 0,
    align: 'center'
  });
  textGroup.anchor.set(0.5, 0);
  textGroup.position.set(sizeComp[0] + sizeComp[2] - 230, 110);
  textGroup.style.letterSpacing = textGroup.text.length < 14 ? (50 / 12) * (14 - textGroup.text.length) : 0;
  textGroup.width = textGroup.text.length < 14 ? (textGroup.text.length < 8 ? textGroup.width : 460) : 460;
  // NANJING PUBLIC TRANSPORTATION (GROUP) CO.,LTD
  const textGroupEn = new PIXI.Text(Data.groupEn, {
    fill: colorJN,
    fontFamily: 'FZZZHONGJW',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0,
    align: 'center'
  });
  textGroupEn.anchor.set(0.5, 0);
  textGroupEn.position.set(sizeComp[0] + sizeComp[2] - 230, 110 + textGroup.height - 5);
  textGroupEn.width = textGroupEn.text.length < 45 ? textGroupEn.width : 460 - 5;
  // 江南公交
  const textComp = new PIXI.Text(Data.company, {
    fill: '#FFF',
    fontFamily: 'FZZZHONGJW',
    fontSize: 45,
    fontWeight: 'bold',
    letterSpacing: 75,
    align: 'center'
  });
  textComp.height = 60 - 4;
  textComp.style.letterSpacing = textComp.width > 500 ? (textComp.style.letterSpacing < 12 ? (75 / 11) * (11 - textComp.text.length) : 0) : (75 / 7) * (11 - textComp.text.length);
  textComp.width = textComp.width > 500 ? 500 : textComp.width;
  textComp.anchor.set(0.5);
  textComp.position.set(sizeComp[0] + sizeComp[2] / 2, sizeComp[1] + sizeComp[3] / 2);
  // 首末班车服务时间
  const textTiHead = new PIXI.Text('首末班车服务时间', {
    fill: '#FFF',
    fontFamily: 'FZZZHONGJW',
    fontSize: 50,
    fontWeight: 'bold',
    lineHeight: 95,
    letterSpacing: 27,
    align: 'center'
  });
  textTiHead._width = 460;
  textTiHead.anchor.set(0.5);
  textTiHead.position.set(sizeTiHead[0] + sizeTiHead[2] / 2, sizeTiHead[1] + sizeTiHead[3] / 2);
  // 本线路单程票价
  const textPriHead = new PIXI.Text('本线路单程票价', {
    fill: '#FFF',
    fontFamily: 'FZZZHONGJW',
    fontSize: 50,
    fontWeight: 'bold',
    lineHeight: 140,
    letterSpacing: 5,
    align: 'center'
  });
  textPriHead.width = sizePriHead[2] * 0.85;
  textPriHead.anchor.set(0.5);
  textPriHead.position.set(sizePriHead[0] + sizePriHead[2] / 2, sizePriHead[1] + sizePriHead[3] / 2);
  container.addChild(textGroup, textGroupEn, textComp, textTiHead, textPriHead);
  // 集团标志
  let loadIconAssets = await PIXI.Assets.loadBundle('load-icon');
  const icon_Main = loadIconAssets.icon_Info;
  icon_Main.frame = new PIXI.Rectangle(0, 0, 300, 300);
  let icon_Nj = new PIXI.Sprite(icon_Main);
  icon_Nj.anchor.set(0.5, 0.5);
  icon_Nj.setTransform(((textGroup.x - 230) - sizeComp[0]) / 3 + sizeComp[0], (textGroup.height + textGroupEn.height) / 2 + textGroup.y, (textGroup.height + textGroupEn.height) / 220, (textGroup.height + textGroupEn.height) / 220);
  container.addChild(icon_Nj);
  // 服务电话
  let loadElementAssets = await PIXI.Assets.loadBundle('load-NJGJ');
  const E = loadElementAssets.Element;
  E.frame = new PIXI.Rectangle(0, 0, 900, 150)
  let icon_Tel = new PIXI.Sprite(E);
  icon_Tel.anchor.set(1, 0);
  icon_Tel.setTransform(lineX[3] + 90, (textGroup.height + textGroupEn.height) / 2 + textGroup.y, 1.3, 1.3);
  container.addChild(icon_Tel);
  // 线路附加内容
  container.addChild(lineNoStyle());

  function lineNoStyle() {
    const container = new PIXI.Container();
    container.width = sizeComp[2];
    container.height = sizeComp[3];
    container.position.set(sizeLineNo[0], sizeLineNo[1]);
    // console.log(Data.lineNo.match(/[\u4e00-\u9fa5,.!"\'（）()]+/g))
    // let nums = Data.lineNo.match(/[0-9]/g).join("").length;

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

    const textLine = (text) => {
      const obj = new PIXI.Text(text, {
        fill: '#FFF',
        fontFamily: 'YGYXSZITI, FZZZHONGJW,Times New Roman, Times, serif',
        fontSize: 230,
        align: 'center'
      });
      if (text.match(/[\a-zA-Z]+/g)) { obj.width *= 0.8; obj.style.letterSpacing = 5; };
      if (text.match(/[\u4e00-\u9fa5,.!"\'（）()]+/g)) { obj.style.fontSize = 110; };
      // console.log(obj.width)
      obj.style.letterSpacing = obj.width > 260 ? -5 : obj.style.letterSpacing;
      obj.width = obj.width > 260 ? 260 : obj.width;
      obj.height = Data.isSeg ? obj.height * 0.8 : obj.height;
      obj.anchor.set(0.5);
      obj.x = sizeLineNo[2] / 2
      obj.y = Data.isSeg ? sizeLineNo[3] / 2.7 : sizeLineNo[3] / 2.1;
      return obj
    }
    // 路号
    const lineSplit = split(Data.lineNo)
    let lineNo = textLine(lineSplit.numLetter);
    let lineString = textLine(lineSplit.chinese);
    if (lineSplit.chinese && lineSplit.numLetter) {
      lineNo.width *= 0.7;
      lineNo.x = lineNo.width / 1.8;
      lineString.width = sizeLineNo[2] - lineNo.width * (1.9 / 1.8);
      lineString.x = lineString.width / 2 + lineNo.width * (1.9 / 1.8);
      lineString.y = sizeLineNo[3] / 1.75;
    }

    if (Data.isSeg) {
      const textLineAppend = new PIXI.Text('[分段计价]', {
        fill: '#FFF',
        fontFamily: 'MicrosoftYaHei',
        fontSize: 40,
        fontWeight: 'bold',
        letterSpacing: 10,
      });
      textLineAppend.anchor.set(0.5);
      textLineAppend.x = sizeLineNo[2] / 2
      textLineAppend.y = (sizeLineNo[3] / 2.7) * 2.2;
      container.addChild(textLineAppend);
    }
    ext = Data.isSeg ? '路线路图\n及\n计价站点' : '路线路图';
    const textLineExt = new PIXI.Text(ext, {
      fill: colorJN,
      fontFamily: 'MicrosoftYaHei',
      fontSize: 70,
      fontWeight: 'bold',
      lineHeight: 80,
      align: 'center'
    });
    textLineExt.width = textLineExt.width > 220 ? 220 : textLineExt.width;
    textLineExt.height = textLineExt.height > 210 ? 200 : textLineExt.height;
    textLineExt.anchor.set(0.5);
    textLineExt.position.set(sizeLineNo[2] + (sizeComp[2] - sizeLineNo[2]) / 2, sizeLineNo[3] / 2);
    container.addChild(lineNo, lineString, textLineExt);
    return container
  }

  return container
}

async function printService() {
  // 首末班容器
  const container = new PIXI.Container();
  container.width = sizeTi[2];
  container.height = sizeTi[3];
  container.position.set(sizeTi[0], sizeTi[1]);
  const conTime_Size = [240, 170];
  const conTime_Margin = [(sizeTi[2] - conTime_Size[0] * 2) / 3, (sizeTi[3] - conTime_Size[1]) / 2]
  const station_NS = new PIXI.TextStyle({
    align: 'justify',
    fontFamily: 'FZHTJW',
    fontSize: 45,
    fontWeight: '700',
    lineHeight: 50,
  });
  const station_TS = new PIXI.TextStyle({
    align: 'right',
    fontFamily: 'FZHTJW',
    fontSize: 35,
    fontWeight: '700',
    lineHeight: 55,
  });
  // 起始站
  const conTime_Left = new PIXI.Container();
  conTime_Left.position.set(conTime_Margin[0], conTime_Margin[1]);
  container.addChild(conTime_Left);

  stationName(Data.point['A'].name, conTime_Left);
  stationTime(sliceZero(Data.point['A'].startTime), sliceZero(Data.point['A'].endTime), conTime_Left);
  const conTime_Right = new PIXI.Container();
  conTime_Right.position.set(conTime_Margin[0] * 2 + conTime_Size[0], conTime_Margin[1]);
  container.addChild(conTime_Right);
  stationName(Data.point['Z'].name, conTime_Right);
  stationTime(sliceZero(Data.point['Z'].startTime), sliceZero(Data.point['Z'].endTime), conTime_Right);

  return container

  function stationName(name, container) {
    const text = new PIXI.Text(name, station_NS);
    text.anchor.set(0.5, 0)
    text.position.set(conTime_Size[0] / 2, 0);
    if (text.width > conTime_Size[0]) {
      text.width = conTime_Size[0];
    } else {
      const style = station_NS.clone();
      style.letterSpacing = (conTime_Size[0] - text.width) / text.text.length
      text.style = style;
      text.width = text.width;
    }
    container.addChild(text);
  }

  function stationTime(start, end, container) {
    const style = station_TS.clone();
    style.align = 'left';
    const center = conTime_Size[1] - container.children[0].height; //剩余中心高度
    const S = new PIXI.Text('首班车：', style);
    S.anchor.set(0, 1);
    S.position.set(conTime_Size[0] / 10, center);
    S.width *= 0.8
    container.addChild(S);
    const M = new PIXI.Text('末班车：', style);
    M.position.set(conTime_Size[0] / 10, center);
    M.width *= 0.8
    container.addChild(M);
    const St = new PIXI.Text(start, station_TS);
    St.anchor.set(1, 1);
    St.position.set(conTime_Size[0] - (conTime_Size[0] / 10), center);
    St.width *= 0.8
    container.addChild(St);
    const Mt = new PIXI.Text(end, station_TS);
    Mt.anchor.set(1, 0);
    Mt.position.set(conTime_Size[0] - (conTime_Size[0] / 10), center);
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

async function printStation() {
  const container = new PIXI.Container();
  // 加载图标
  let loadElementAssets = await PIXI.Assets.loadBundle('load-NJGJ');
  const A = loadElementAssets.Element;
  const B = loadElementAssets.Metro;

  // const a = {
  //   name: '仙新路地铁站',
  //   // isStart: true,
  //   // isSingle: true,
  //   sign: { direction: 0, convert: 0, blank: false },
  //   text: { color: 'green' },
  //   isMetro: true,
  //   metro: ['1', 'S9']
  // }

  P = appendInfo(Data); // 附注说明
  sizeP = [P.x, P.y, P.width, P.height];
  container.addChild(P)

  // 获取首末站单向及中部大图标信息，判断宽度
  let N = []
  const extWidth = (ev) => {
    let W = 0
    for (let item in ev) {
      const plus = (no, side) => {
        N.push(no)
        return side == true ? 300 * (iconScaleSt[2] - iconScaleSt[1]) / 2 : 300 * (iconScaleSt[2] - iconScaleSt[1]);
      }
      W = (Data.station[item].isStart || Data.station[item].isEnd) && Data.station[item].isSingle ? W + plus(item, true) : W;
      W = (Data.station[item].isStart || Data.station[item].isEnd) && item != 0 && item != (Object.keys(Data.station).length - 1) ? W + plus(item, false) : W;
    }
    return W
  }

  // json转map
  // const stationMap = new Map(Object.entries(Data.station))
  // c = { name: '仙新路地铁站', isStart: true, isSingle: true, }
  // console.log(stationMap.size)
  // stationMap.set("5", c)
  let x_width = (lineX[3] - lineX[0] - extWidth(Data.station)) / (stationMap.size - 1)
  // console.log(x_width);
  let y_height = lineY[2] - lineY[1]
  let shiftX = 0; //水平偏移量
  let shiftY = 0; //垂直偏移量
  // 循环遍历map
  for (let [key, val] of stationMap.entries()) {
    shiftY = 0; //重置垂直偏移量
    // console.log(val);

    S = await iconStation(val);
    S.position.set(770 + x_width * key + shiftX, lineY[0]);
    // 修正首末站单向偏移
    S.x = val.isStart && val.isSingle ? S.x + S.width / 2 : S.x;
    S.x = val.isEnd && val.isSingle ? S.x - S.width / 2 : S.x;
    shiftX = (val.isEnd || val.isStart) && N.includes(key) ? shiftX + 300 * (iconScaleSt[2] - iconScaleSt[1]) / 2 : shiftX;
    shiftX = (!val.isEnd || !val.isStart) && N.includes(key) ? shiftX + 300 * (iconScaleSt[2] - iconScaleSt[1]) : shiftX;
    // 折线偏移
    S.y = S.x > lineX[1] && S.x < lineX[2] ? (S.y + ((S.x - lineX[1]) / (lineX[2] - lineX[1])) * y_height) : S.y;
    S.y = S.x >= lineX[2] ? lineY[3] : S.y;
    // 折现段旋转
    S.angle = S.x > lineX[1] && S.x < lineX[2] ? lineAngle : S.angle;
    // 修正单向站垂直高度
    shiftY = val.isSingle ? (val.sign.direction ? 8 : -8) : 0;
    S.y += shiftY;

    T = textStation(val);
    T.position.set(S.x, S.y + 55 - shiftY);

    M = await iconMetro(val, T.width);
    // 判断存在地铁标识
    if (M) {
      // 提示框判断(高度超过&左侧超过&右侧没超)
      T.height = (T.x + (T.width / 2) > sizeP[0]) && (T.x - (T.width / 2) < sizeP[0] + sizeP[2]) ?
        (sizeP[1] - T.y - T.height - M.height < 0) ? sizeP[1] - T.y - M.height : T.height
        : T.height;
      // 底部基线判断
      T.height = (T.y + T.height + M.height) > sizePriLineNew[1] ? sizePriLineNew[1] - T.y - M.height : T.height;
      M.position.set(T.x - T.width / 2, T.y + T.height + 10)  // container can't set anchor, need to sub text width/2.
      container.addChild(M)
    } else {
      // 提示框判断(高度超过&左侧超过&右侧没超)
      T.height = (T.x + (T.width / 2) > sizeP[0]) && (T.x - (T.width / 2) < sizeP[0] + sizeP[2]) ?
        (sizeP[1] - T.y - T.height < 0) ? sizeP[1] - T.y : T.height
        : T.height;
      // 底部基线判断
      T.height = (T.y + T.height) > sizePriLineNew[1] ? sizePriLineNew[1] - T.y : T.height;
    }

    container.addChild(S, T)
  }

  // console.log(S)
  // await iconStation()

  // container.addChild(await iconMetro())
  // container.addChild(await iconStation())
  // console.log(container.children)
  return container

  async function iconMetro(e, tWidth) {
    const iconContain = new PIXI.Container();

    // const a = {
    //   isMetro: true,
    //   metro: ['7', '2']
    // }

    if (e.isMetro) {
      const I = B.clone();
      // 梅花标
      I.frame = new PIXI.Rectangle(0, 1000, 200, 200);
      icon = new PIXI.Sprite(I);
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
        icon = new PIXI.Sprite(M);
        icon.name = 'line' + line
        icon.position.set(0, iconContain.height);
        iconContain.addChild(icon);
      });

      iconContain.scale.set(tWidth / 200);  // by text width rectify icon width.
      return iconContain
    }
  }

  async function iconStation(e) {
    // isStart: true, isSingle: true, sign: { direction: 1, convert: 0, blank: false } },
    // isSingle: true, sign: { direction: 1, convert: 0 } }
    // const a = {
    //   name: '仙新路地铁站',
    //   isStart: true,
    //   // isSingle: true,
    //   sign: { direction: 0, convert: 0, blank: false }
    // }

    if (e.isSingle) {
      let PO = [0, 500, 350, 200]; // 定位
      PO[0] = e.isStart || e.sign.convert ? 350 : PO[0];
      PO[1] = e.sign.direction == 1 ? PO[1] + 200 : PO[1];
      const circular = A.clone();
      circular.frame = new PIXI.Rectangle(PO[0], PO[1], PO[2], PO[3]);
      icon = new PIXI.Sprite(circular);
      icon.anchor.set(0.5, 0);
      if (e.sign.direction == 0) {
        icon.anchor.set(0.5, 1);
      }
      icon.scale.set(0.15);
      if (e.isStart || e.isEnd) {
        icon.scale.set(0.25);
      }
      return icon
    }

    if (e.isStart || e.isEnd) {
      let PO = [0, 150, 350, 350]; // 定位
      PO[0] = typeof e.sign !== "undefined" && e.sign.convert ? 350 : PO[0];
      const circular = A.clone();
      circular.frame = new PIXI.Rectangle(PO[0], PO[1], PO[2], PO[3]);
      icon = new PIXI.Sprite(circular);
      icon.anchor.set(0.5);
      if ((typeof e.sign !== "undefined" && e.sign.direction == 0) || e.isEnd) {
        icon.angle = 180;
      }
      icon.scale.set(0.25);
      return icon
    }

    let PO = [700, 150, 350, 350];
    const circular = A.clone();
    circular.frame = new PIXI.Rectangle(PO[0], PO[1], PO[2], PO[3]);
    icon = new PIXI.Sprite(circular);
    icon.anchor.set(0.5);
    icon.scale.set(0.15);
    if (e.isStart || e.isEnd) {
      icon.scale.set(0.25);
    }
    return icon

  }

  function textStation(e) {

    const style = new PIXI.TextStyle({
      align: 'center',
      fill: colorJN,
      fontFamily: 'FZHTJW,SimHei',
      fontSize: 48,
      // fontWeight: 'bold',
      lineHeight: 48,
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
      station.style.fill = (e.text ? e.text.color : false) || 'red'
    }

    // routeMapStage.addChild(station);
    return station
  }

  function appendInfo(e) {
    const container = new PIXI.Container();
    container.position.set(900, 850)
    const style = new PIXI.TextStyle({
      align: 'center',
      fill: 'red',
      fontFamily: 'FZHTJW,SimHei',
      fontSize: 65,
    });


    const info = new PIXI.Text('说明: ', style);
    const info1 = new PIXI.Text(' 单向停靠站点', style);
    const info2 = new PIXI.Text(' 换乘地铁站点', style);

    const circular = A.clone();
    circular.frame = new PIXI.Rectangle(700, 500, 350, 200);
    icon1 = new PIXI.Sprite(circular);
    icon1.position.set(info.width, info.height / 8)
    icon1.scale.set(info.height / 300)
    const metro = B.clone();
    metro.frame = new PIXI.Rectangle(0, 1000, 200, 200);
    icon2 = new PIXI.Sprite(metro);
    icon2.anchor.set(0.5, 0)
    icon2.position.set(info.width + icon1.width / 2, info.height)
    icon2.scale.set(info.height / 200)

    info1.position.set(info.width + icon1.width, 0)
    info2.position.set(info.width + icon1.width, info.height)

    container.addChild(info, icon1, icon2, info1, info2)

    // routeMapStage.addChild(container)

    // if (e.isSeg){
    // }
    return container
  }
}

function loadData() {
  reSet();
  if (Data.isSeg) segmentPri();
  // 分段计价
  function segmentPri() {
    sizeLineNo[1] = sizeLineNo[1] - 35;
    sizeLineNo[3] = sizeLineNo[3] + 35;
    sizePriHead[2] = 250;
    sizePriLine = [sizeComp[0] + sizeComp[2], sizePriHead[1] + sizePriHead[3], (sizeComp[2] - sizePriHead[2]), (sizePriHead[3] / 10)];
  }

  function reSet() {
    sizeLineNo = [100, 325, 295, 190]
    sizePriHead = [100, 900, 345, 100]
    sizePriLine = [sizeComp[0] + sizeComp[2], sizePriHead[1] + sizePriHead[3], (sizeComp[2] - sizePriHead[2]), (sizePriHead[3] / 10)]
  }
}

function pixiClear() {
  ramp.stage.removeChildren();
  loadData();
  buildMap();
}