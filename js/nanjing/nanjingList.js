function main(routeMap, _type) {
  console.log('加载南京模块');

  import('./jiangnan_2017/operate/buildHtml.js')
    .then(module => {
      // 使用模块中导出的功能
      module.lineStation() ?
        import('./jiangnan_2017/main.js')
          .then(module => {
            module.workflow(routeMap);
          })
          .catch(error => {
            // 处理模块加载失败的情况
            console.error('jiangnan_2017模块加载失败:', error);
          })
        : '';
    })
    .catch(error => {
      // 处理模块加载失败的情况
      console.error('jiangnan_2017模块加载失败:', error);
    })
}

// function jiangnan_2017(routeMap) {
//   // let nanjing = require.config({
//   //   baseUrl: 'js/nanjing/',
//   //   paths: {
//   //     "Page": "../page",
//   //     "param": "jiangnan_2017/parameter",
//   //     "stageSetting": "jiangnan_2017/stageSetting",
//   //     "drawSprite": "jiangnan_2017/drawSprite",
//   //     "jiangnan_2017": "jiangnan_2017/main",
//   //   },
//   //   shim: {
//   //     param: {
//   //       init: function () {
//   //         return {
//   //           param: param,
//   //         }
//   //       }
//   //     }
//   //   }
//   // })

//   // nanjing(["Page", "jiangnan_2017", "param", "drawSprite"], function (page, jiangnan_2017) {
//   //   collectBtn.copyToClipboard = function (json) { page.copyToClipboard(json) }
//   //   collectBtn.clipboardToData = function (json) { page.clipboardToData(json, jiangnan_2017.pixiClear(routeMap)) }
//   //   jiangnan_2017.workflow(routeMap);
//   // })
//   workflow(routeMap)
// }

export {
  main as nanjing,
}