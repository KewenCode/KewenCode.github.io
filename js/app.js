const baseUrl = new URL(document.documentURI)
const paramUrl = new URLSearchParams(baseUrl.search)
let skipUnloadConfirm = false;

// 创建画布
const routeMap = new PIXI.Application();
await routeMap.init({
  backgroundColor: '#FFF',
  hello: true,
  resolution: 1, //分辨率
  sortableChildren: true,
  autoStart: false, // 取消自动渲染
  preference: paramUrl.get('render') || 'webgpu', //手动选择render 8.1.0又切换为webgl默认
  antialias: Number(paramUrl.get('antialias')) ? true : false,  //抗锯齿
});
// PIXI加入指定DOM
const wrap = document.querySelector("#map_wrap");
wrap.appendChild(routeMap.canvas);

// render选项监听
const renderOption = document.querySelector("#renderer");
renderOption.value = paramUrl.get('render') || 'webgpu';
renderOption.addEventListener("input", e => {
  const Name = { "webgpu": "WebGPU", "webgl": "WebGL" }
  confirm(`请确认是否切换为【${Name[renderOption.value]}】渲染？\n此项操作将不会保存数据，如需保存数据请提前使用【导出】按钮！`) ?
    (() => {
      paramUrl.set('render', `${renderOption.value}`);
      baseUrl.search = paramUrl.toString();
      skipUnloadConfirm = true;
      window.location.href = baseUrl;
    })() : renderOption.value = paramUrl.get('render') || 'webgpu';
})

// antialias选项监听
const antialiasOption = document.querySelector("#antialias");
antialiasOption.value = paramUrl.get('antialias') || 1;
antialiasOption.addEventListener("input", e => {
  confirm(`请确认是否${Number(antialiasOption.value) ? '开启' : '关闭'}图像抗锯齿？\n此项操作将不会保存数据，如需保存数据请提前使用【导出】按钮！`) ?
    (() => {
      paramUrl.set('antialias', `${antialiasOption.value}`);
      baseUrl.search = paramUrl.toString();
      skipUnloadConfirm = true;
      window.location.href = baseUrl;
    })() : antialiasOption.value = paramUrl.get('antialias') || 1;
})

// 加载vConsole
paramUrl.get('vConsole') ? (() => {
  let consoleScript = document.createElement("script");
  consoleScript.src = "https://cdn.jsdelivr.net/npm/vconsole@latest/dist/vconsole.min.js";
  consoleScript.onload = function () {
    new VConsole()
  }
  document.head.appendChild(consoleScript);
})() : '';

// 关闭提示
window.onbeforeunload = function (e) {
  console.log(skipUnloadConfirm)
  if (!skipUnloadConfirm) {
    var e = window.event || e;
    e.returnValue = ("确定离开页面吗？ヾ(•ω•`)o");
    // 销毁舞台
    routeMap.destroy(true);
  }
};

let _boolean = true;
_boolean ? (() => {
  import('./nanjing/nanjingList.js')
    .then(module => {
      Data = Object.assign({}, Data_jiangnan_2017);
      // 使用模块中导出的功能
      module.nanjing(routeMap,);
    })
    .catch(error => {
      // 处理模块加载失败的情况
      console.error('南京模块加载失败:', error);
    })
})() : console.log("南京模块未加载");
// _boolean ? nanjing("jiangnan_2017", collectBtn) : console.log("南京模块未加载");

