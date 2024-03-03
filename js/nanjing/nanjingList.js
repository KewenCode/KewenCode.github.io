import { workflow } from "./jiangnan_2017/main.js"
function main(routeMap, _type) {
  console.log('加载南京模块');
  jiangnan_2017(routeMap);
}

function jiangnan_2017(routeMap) {
  // let nanjing = require.config({
  //   baseUrl: 'js/nanjing/',
  //   paths: {
  //     "Page": "../page",
  //     "param": "jiangnan_2017/parameter",
  //     "stageSetting": "jiangnan_2017/stageSetting",
  //     "drawSprite": "jiangnan_2017/drawSprite",
  //     "jiangnan_2017": "jiangnan_2017/main",
  //   },
  //   shim: {
  //     param: {
  //       init: function () {
  //         return {
  //           param: param,
  //         }
  //       }
  //     }
  //   }
  // })

  // nanjing(["Page", "jiangnan_2017", "param", "drawSprite"], function (page, jiangnan_2017) {
  //   collectBtn.copyToClipboard = function (json) { page.copyToClipboard(json) }
  //   collectBtn.clipboardToData = function (json) { page.clipboardToData(json, jiangnan_2017.pixiClear(routeMap)) }
  //   jiangnan_2017.workflow(routeMap);
  // })

  workflow(routeMap)
}

export {
  main as nanjing,
}