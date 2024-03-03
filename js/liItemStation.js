const mapStation = document.querySelector("#mapStation");
const countStationNum = document.querySelector(".lineList .detail span");

// sortable对象
new Sortable(mapStation, {
  group: {
    name: 'station',
    pull: false,
    put: true,
  },
  animation: 150,
  // 拖拽时预览图样式
  ghostClass: 'blue-background-class',
  onEnd: function (evt) {
    if (evt.oldIndex != evt.newIndex) {
      // console.log(`${evt.item.innerText} from ${evt.oldIndex} to ${evt.newIndex}`)
      // console.log(Data.station)
      resortItemId();
      // 深拷贝旧数据
      const oldObj = Object.assign({}, Data.station[evt.oldIndex]);
      delete Data.station[evt.oldIndex];
      resortJson(evt.newIndex, oldObj) ? "" : console.log("[SortableonEnd] 未成功resortJson");
    }
  },
  onAdd: function (evt) {
    tagInput.focus();
    let origEl = evt.item;
    let origElDiv = origEl.querySelector("div")
    // var cloneEl = evt.clone; // 位于tag内
    while (origElDiv.hasChildNodes()) //当table下还存在子节点时 循环继续
    {
      origElDiv.removeChild(origElDiv.firstChild);
    }
    let icon = '<span class="iconfont icon-metro-nanjing hidden" style="color:red"></span><span class="iconfont icon-arrow-right-circle hidden"></span><span class="iconfont icon-arrow-left-circle hidden"></span><i class="iconfont icon-setting" onclick="stationClick(this)"></i>';
    origElDiv.insertAdjacentHTML("beforeend", icon);
    // console.log(evt.newIndex);
    resortItemId();

    resortJson(evt.newIndex, { name: origEl.innerText }) ? countList() : console.log("[SortableonAdd] 未成功resortJson");
  },
  onMove: function (evt, originalEvent) {
    // 河流禁止拖至首末站
    if (evt.dragged.style.backgroundColor) {
      if (Number(evt.related.dataset.id) == 0) { return false }
      if (Number(evt.related.dataset.id) == Object.keys(Data.station).length - 1) { return false }
    } else {
      // 首末站禁止越过旁边河流
      if (Number(evt.dragged.dataset.id) == 0 && document.querySelector(`[data-id="1"]`).style.backgroundColor) { return false }
      if (Number(evt.dragged.dataset.id) == Object.keys(Data.station).length - 1 && document.querySelector(`[data-id="${Object.keys(Data.station).length - 2}"]`).style.backgroundColor) { return false }
    }
  }
});

// 创建列表
function createList() {
  console.log(Data.station)
  mapStation.querySelectorAll("li").forEach(li => li.remove());
  Data.station ? Object.keys(Data.station).map((key) => {
    const val = Data.station[key];
    color = val.isRiver ? 'style="background-color:#87CEEB"' : '';
    dir = val.isSingle ? (val.sign.direction ?
      '<span class="iconfont icon-arrow-right-circle"></span><span class="iconfont icon-arrow-left-circle hidden"></span>' :
      '<span class="iconfont icon-arrow-right-circle hidden"></span><span class="iconfont icon-arrow-left-circle"></span>'
    ) : '<span class="iconfont icon-arrow-right-circle hidden"></span><span class="iconfont icon-arrow-left-circle hidden"></span>';
    metro = val.isMetro ? '<span class="iconfont icon-metro-nanjing" style="color:red"></span>' : '<span class="iconfont icon-metro-nanjing hidden" style="color:red"></span>';
    priSeg = val.isPriSeg ? '<span class="iconfont icon-tick-price" style="color:red"></span>' : '<span class="iconfont icon-tick-price hidden" style="color:red"></span>';
    let liTag = `<li draggable="true" data-id="${key}" data-station="${val.name}" ${color}><p>${val.name}</p><div id="icon">${priSeg}${metro}${dir}<i class="iconfont icon-setting" onclick="stationClick(this)"></i></div></li>`
    mapStation.insertAdjacentHTML("beforeend", liTag);
  }) : ''
  countList();
}
// item计数
function countList() {
  countStationNum.innerText = Data.station ? Object.keys(Data.station).length : 0;
}
// 创建站名列表
createList();

// li-id 排序
function resortItemId() {
  const item = [...mapStation.querySelectorAll("li")];
  for (let i = 0; i < item.length; i++) {
    item[i].dataset.id = i;
  }
}

// 删除li-station
function removeItemStation(start, end, func, pass) {
  const item = [...mapStation.querySelectorAll("li")];
  let delStation = []
  for (let i = start; i <= end; i++) {
    delStation.push(item[i].dataset.station);
  }
  if (pass || confirm(`确认是否删除“${delStation.join(',')}”站？`)) {
    for (let i = start; i <= end; i++) {
      item[i].remove();
      delete Data.station[i]
      // resortJson(Number(i), Object.keys(Data.station).length - 1);
    }
    !pass ?
      resortJson() ? (() => {
        resortItemId();
        countList();
        if (func) func();
      })() : console.log("[removeItemStation] 未成功resortJson")
      : "";
    // 建立新map
    // for (let i = Object.keys(Data.station).length; i > Object.keys(Data.station).length - delStation.length; i--) {
    //   delete objMap[i - 1];
    // }
    // stationMap = new Map(Object.entries(objMap));
  }
}

function resortJson(_Index, _Obj) {
  let i = 0;
  let tempObj = {}
  Number(_Index) < 0 ? (() => { return false })() : "";
  Number(_Index) > Object.keys(Data.station).length ? (() => { return false })() : "";
  Object.keys(Data.station).map((key) => {
    Number(_Index) === i ? (() => { tempObj[i] = _Obj; i++; })() : "";
    tempObj[i] = Data.station[key];
    i++;
  })
  Number(_Index) == Object.keys(Data.station).length ? tempObj[_Index] = _Obj : "";
  Data.station = Object.assign({}, tempObj);
  return true
}

mapStation.addEventListener("mouseover", (e) => {
  const target = e.target.classList;
  if (target.contains("icon-setting")) {
    target.toggle("icon-setting");
    target.toggle("icon-setting-fill");
  }
}) // 设置按钮变图
mapStation.addEventListener("mouseout", (e) => {
  const target = e.target.classList;
  if (target.contains("icon-setting-fill")) {
    target.toggle("icon-setting-fill");
    target.toggle("icon-setting");
  }
}) // 设置按钮变图

// export {
//   createList,
//   countList,
//   removeItemStation,
//   stationClick,
// }
