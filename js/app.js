const baseUrl = new URL(document.documentURI)
const paramUrl = new URLSearchParams(baseUrl.search)

// 创建画布
const routeMap = new PIXI.Application();
await routeMap.init({
  backgroundColor: '#FFF',
  hello: true,
  antialias: true,  //抗锯齿
  resolution: 1, //分辨率
  sortableChildren: true,
  autoStart: false, // 取消自动渲染
  preference: paramUrl.get('render'), //手动选择render
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
      window.location.href = baseUrl;
    })() : renderOption.value = paramUrl.get('render')
})

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

