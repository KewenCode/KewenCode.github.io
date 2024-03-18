import { removeItemStation } from "./liItemStation.js";

const option = document.querySelector(".stationOption");
const stationName = option.querySelector("#optionName");
const stationNameLabel = option.querySelector('[for="optionName"]');
const stationIsSingle = option.querySelector("#optionSingle");
const stationIsMetro = option.querySelector("#optionMetro");
const stationIsPriSeg = option.querySelector("#optionPrice");
const stationIsRiver = option.querySelector("#optionRiver");
const stationIsStart = option.querySelector("#optionStart");
const stationIsEnd = option.querySelector("#optionEnd");
// 控制器
let stationController
let singleController
let metroController
let priSegController
let riverController

function stationClick(element) {
  const node = element.parentNode.parentNode;
  // 清除潜在监听器
  if (stationController) stationController.abort();
  if (singleController) singleController.abort();
  if (metroController) metroController.abort();
  if (priSegController) priSegController.abort();
  if (riverController) riverController.abort();
  $(".stationRiver").addClass("hidden");
  $(".stationPrice").addClass("hidden");
  $(".stationMetro").addClass("hidden");
  $(".stationSingle").addClass("hidden");
  $(".stationOption").removeClass("hidden").addClass("animate-in");
  setTimeout(() => {
    $(".stationOption").removeClass("animate-in");
  }, 600);
  node.nodeName === "LI" ? stationInfo(node.dataset.id) : '';
} // 站点工具点击回调函数
// mapStation.addEventListener("click", e => {
//   // 清除潜在监听器
//   if (stationController) stationController.abort();
//   if (singleController) singleController.abort();
//   if (metroController) metroController.abort();
//   $(".stationMetro").addClass("hidden");
//   $(".stationSingle").addClass("hidden");
//   const node = e.target.parentNode.parentNode
//   node.nodeName === "LI" ? stationInfo(node.dataset.id) : '';
// }) // 唤起对应详情
$(document).mouseup(function (e) {
  var targetArea = $(".right"); // 设置目标区域
  if (!targetArea.is(e.target) && targetArea.has(e.target).length === 0) {
    $(".stationRiver").addClass("hidden");
    $(".stationPrice").addClass("hidden");
    $(".stationMetro").addClass("hidden");
    $(".stationSingle").addClass("hidden");
    $(".stationOption").addClass("animate-out")
    setTimeout(() => {
      $(".stationOption").removeClass("animate-out").addClass("hidden");
    }, 600);
    // 清除潜在监听器
    if (stationController) stationController.abort();
    if (singleController) singleController.abort();
    if (metroController) metroController.abort();
    if (priSegController) priSegController.abort();
    if (riverController) riverController.abort();
  }
}); //点击option区域外隐藏

function stationInfo(id) {
  const item = Data.station[Number(id)];
  const stationDel = document.querySelector('[id="stationDelate"]');
  const itemStation = mapStation.querySelector(`[data-id="${id}"]`);
  const left = itemStation.querySelector(".icon-arrow-left-circle");
  const right = itemStation.querySelector(".icon-arrow-right-circle");
  const metro = itemStation.querySelector(".icon-metro-nanjing");
  const priSeg = itemStation.querySelector(".icon-tick-price");
  stationController = new AbortController();
  // 站名
  stationName.value = item.name.trim();
  // 图形站
  stationIsRiver.checked = item.isRiver;
  item.isRiver ?
    (() => {
      stationNameLabel.innerHTML = '河流名称：';
      stationIsSingle.disabled = true;
      stationIsMetro.disabled = true;
      stationIsPriSeg.disabled = true;
      stationIsSingle.checked = false;
      stationIsMetro.checked = false;
      stationIsPriSeg.checked = false;
      $(stationIsSingle).parent().children("label").css("text-decoration", "line-through");
      $(stationIsMetro).parent().children("label").css("text-decoration", "line-through");
      $(stationIsPriSeg).parent().children("label").css("text-decoration", "line-through");
      riverController = new AbortController();
      $(".stationRiver").removeClass("hidden");
      stationRiver();
    })() :
    (() => {
      stationNameLabel.innerHTML = '站名：';
      $(stationIsSingle).parent().children("label").css("text-decoration", "none");
      $(stationIsMetro).parent().children("label").css("text-decoration", "none");
      $(stationIsPriSeg).parent().children("label").css("text-decoration", "none");
      stationIsSingle.disabled = false;
      stationIsMetro.disabled = false;
      stationIsPriSeg.disabled = false;
      $(".stationRiver").addClass("hidden");
      // 单向站
      stationIsSingle.checked = item.isSingle;
      item.isSingle ? (() => {
        singleController = new AbortController();
        $(".stationSingle").removeClass("hidden");
        stationSingle();
      })() : '';
      // 换乘站
      stationIsMetro.checked = item.isMetro;
      item.isMetro ? (() => {
        metroController = new AbortController();
        $(".stationMetro").removeClass("hidden");
        stationMetro();
      })() : '';
      // 分段计价
      stationIsPriSeg.checked = item.isPriSeg;
      item.isPriSeg ? (() => {
        priSegController = new AbortController();
        $(".stationPrice").removeClass("hidden");
        stationPrice();
      })() : '';
    })();
  // 起讫站
  stationIsStart.checked = item.isStart;
  stationIsEnd.checked = item.isEnd;

  // 站名
  stationName.addEventListener("input", e => {
    item.name = stationName.value.trim();
    itemStation.dataset.station = stationName.value;
    itemStation.querySelector("p").innerText = stationName.value;
  }, {
    signal: stationController.signal
  });

  // 单向站
  stationIsSingle.addEventListener("click", e => {
    item.isSingle = stationIsSingle.checked;
    item.isSingle ? $(".stationSingle").removeClass("hidden") : $(".stationSingle").addClass("hidden");
    // 判断item.sign对象存在
    item.isSingle ? item.sign ? item.sign = {
      ...item.sign,
      ...{
        direction: 1,
        tag: -1
      }
    } : item.sign = {
      direction: 1,
      tag: -1
    } : delete item.sign.direction;
    // 添加默认右箭头/清除箭头
    item.isSingle ? right.classList.toggle("hidden") : [left, right].forEach(e => { e.classList.add("hidden") });
    // 选中 添加/撤销监听器
    item.isSingle ? (() => {
      singleController = new AbortController();
      stationSingle();
    })() : singleController.abort();
  }, {
    signal: stationController.signal
  });

  // 换乘站
  stationIsMetro.addEventListener("click", e => {
    item.isMetro = stationIsMetro.checked;
    item.isMetro ? $(".stationMetro").removeClass("hidden") : $(".stationMetro").addClass("hidden");
    // console.log(233)
    // 判断item.metro对象存在
    item.isMetro ? item.metro ? [] : item.metro = [] : [];
    // 添加图标
    item.isMetro ? metro.classList.remove("hidden") : metro.classList.add("hidden");
    // 选中 添加/撤销监听器
    item.isMetro ? (() => {
      metroController = new AbortController();
      stationMetro();
    })() : metroController.abort();
  }, {
    signal: stationController.signal
  });

  // 计价点
  stationIsPriSeg.addEventListener("click", e => {
    // 判断item.peiSeg对象存在
    item.peiSeg ? {} : item.peiSeg = { "direction": null, "price": null };
    item.isPriSeg = stationIsPriSeg.checked;
    item.isPriSeg ? $(".stationPrice").removeClass("hidden") : $(".stationPrice").addClass("hidden");
    // 添加图标
    item.isPriSeg ? priSeg.classList.remove("hidden") : priSeg.classList.add("hidden");
    // 选中 添加/撤销监听器
    item.isPriSeg ? (() => {
      priSegController = new AbortController();
      stationPrice();
    })() : priSegController.abort();
  }, {
    signal: stationController.signal
  });

  // 起讫站-图形站可用判断-临时
  if (id != 0 && id != Object.keys(Data.station).length - 1) {
    stationIsStart.disabled = true;
    stationIsEnd.disabled = true;
    stationIsRiver.disabled = false;
    $(stationIsStart).parent().children("label").css("text-decoration", "line-through");
    $(stationIsEnd).parent().children("label").css("text-decoration", "line-through");
    $(stationIsRiver).parent().children("label").css("text-decoration", "none");
    // 图形站
    stationIsRiver.addEventListener("click", e => {
      // 判断item.peiSeg对象存在
      item.river ? {} : item.river = { road: null, infoL: null, infoLD: null, infoR: null, infoRD: null };
      item.isRiver = stationIsRiver.checked;
      item.isRiver ?
        (() => {
          itemStation.style.backgroundColor = "#87CEEB";
          stationNameLabel.innerHTML = '河流名称：';
          stationIsSingle.disabled = true;
          stationIsMetro.disabled = true;
          stationIsPriSeg.disabled = true;
          stationIsSingle.checked = false;
          stationIsMetro.checked = false;
          stationIsPriSeg.checked = false;
          $(stationIsSingle).parent().children("label").css("text-decoration", "line-through");
          $(stationIsMetro).parent().children("label").css("text-decoration", "line-through");
          $(stationIsPriSeg).parent().children("label").css("text-decoration", "line-through");
          $(".stationRiver").removeClass("hidden")
        })() :
        (() => {
          itemStation.style.backgroundColor = "";
          stationNameLabel.innerHTML = '站名：';
          $(stationIsSingle).parent().children("label").css("text-decoration", "none");
          $(stationIsMetro).parent().children("label").css("text-decoration", "none");
          $(stationIsPriSeg).parent().children("label").css("text-decoration", "none");
          stationIsSingle.disabled = false;
          stationIsMetro.disabled = false;
          stationIsPriSeg.disabled = false;
          $(".stationRiver").addClass("hidden");
        })()
      // 添加图标
      // item.isRiver ? priSeg.classList.remove("hidden") : priSeg.classList.add("hidden");
      // 选中 添加/撤销监听器
      item.isRiver ? (() => {
        riverController = new AbortController();
        stationRiver();
      })() : riverController.abort();
    }, {
      signal: stationController.signal
    });
  } else {
    stationIsStart.disabled = false;
    stationIsEnd.disabled = false;
    stationIsRiver.disabled = true;
    $(stationIsStart).parent().children("label").css("text-decoration", "none");
    $(stationIsEnd).parent().children("label").css("text-decoration", "none");
    $(stationIsRiver).parent().children("label").css("text-decoration", "line-through");
    // 起点站
    stationIsStart.addEventListener("click", e => {
      item.isStart = stationIsStart.checked;
      stationIsEnd.checked = !stationIsStart.checked;
      item.isEnd = stationIsEnd.checked;
    }, {
      signal: stationController.signal
    })
    // 终点站
    stationIsEnd.addEventListener("click", e => {
      item.isEnd = stationIsEnd.checked;
      stationIsStart.checked = !stationIsEnd.checked;
      item.isStart = stationIsStart.checked;
    }, {
      signal: stationController.signal
    })
  };

  //删除站点按钮
  stationDel.addEventListener("click", e => {
    removeItemStation(id, id, () => {
      $(".stationOption").addClass('hidden');
      $(".stationMetro").addClass("hidden");
      $(".stationSingle").addClass("hidden");
      $(".stationPrice").addClass("hidden");
      $(".stationRiver").addClass("hidden");
    })
  }, {
    signal: stationController.signal
  });

  function stationSingle() {
    const singleList = document.querySelector('.stationSingle');
    const dirUp = document.querySelector('[id="dirUp"]');
    const dirDown = document.querySelector('[id="dirDown"]');
    const tagUp = document.querySelector('[id="tagUp"]');
    const tagDown = document.querySelector('[id="tagDown"]');
    const tagHid = document.querySelector('[id="tagHid"]');
    const singleTag = document.querySelectorAll('[name="singleTag"]')
    // console.log(singleTag)
    // 初值覆盖
    dirUp.checked = item.sign.direction ? true : false;
    dirDown.checked = item.sign.direction ? false : true;
    // tag初始
    item.isSingle && item.isStart || item.isEnd ?
      singleTag.forEach(e => { e.disabled = false; e.checked = Number(e.value) == item.sign.tag ? true : false }) :
      singleTag.forEach(e => { e.disabled = true })

    singleList.addEventListener("click", e => {
      // console.log(e.target)
      switch (e.target.id) {
        case "dirUp":
          item.sign.direction = Number(dirUp.value);
          dirDown.checked = !dirUp.checked;
          [left, right].forEach(e => { e.classList.toggle("hidden") })
          break;
        case "dirDown":
          item.sign.direction = Number(dirDown.value);
          dirUp.checked = !dirDown.checked;
          [left, right].forEach(e => { e.classList.toggle("hidden") })
          break;
        case "tagUp":
          tagDown.checked = tagUp.checked ? !tagUp.checked : tagUp.checked;
          tagHid.checked = !tagUp.checked;  // 默认启用
          item.sign.tag = tagUp.checked ? Number(tagUp.value) : -1;
          break;
        case "tagDown":
          tagUp.checked = tagDown.checked ? !tagDown.checked : tagDown.checked;
          tagHid.checked = !tagDown.checked;  // 默认启用
          item.sign.tag = tagDown.checked ? Number(tagDown.value) : -1;
          break;
        case "tagHid":
          tagDown.checked = tagHid.checked ? !tagHid.checked : tagHid.checked;
          tagUp.checked = !tagHid.checked;  // 默认启用
          item.sign.tag = tagHid.checked ? Number(tagHid.value) : 1;
          break;
      }
    }, {
      signal: singleController.signal
    })
  }

  function stationMetro() {
    const metroList = document.querySelectorAll('.stationMetro li div>input.btn-check');
    const metroMerge = document.querySelector('.stationMetro li #metroMerge');
    const metroText = document.querySelector('.stationMetro div>p span');
    const M = item.metro;
    metroMerge.checked = item?.metroMerge;
    metroMerge.addEventListener("click", () => {
      item.metroMerge = metroMerge.checked;
    }, {
      signal: metroController.signal
    })
    metroText.innerHTML = M.length ? M.join(",") + "号线" : "暂无数据";
    metroList.forEach(e => {
      M.includes(e.value) ? e.checked = true : e.checked = false;
      e.addEventListener("click", () => {
        e.checked ? M.push(e.value) : M.splice(M.indexOf(e.value), 1);
        // console.log(M)
        metroText.innerHTML = M.length ? M.join(",") + "号线" : "暂无数据";
      }, {
        signal: metroController.signal
      })
    });
  }

  function stationPrice() {
    const priSegDir = document.querySelector('[id="priSegDir"]');
    const priSegPrice = document.querySelector('[id="priSegPrice"]');
    priSegDir.value = item.peiSeg ? item.peiSeg.direction : null;
    priSegPrice.value = item.peiSeg ? item.peiSeg.price : null;

    priSegDir.addEventListener("click", () => {
      switch (priSegDir.value) {
        case "1":
          item.peiSeg.direction = 1;
          break;
        case "0":
          item.peiSeg.direction = 0;
          break;
      }
    }, {
      signal: priSegController.signal
    })
    priSegPrice.addEventListener("click", () => {
      switch (priSegPrice.value) {
        case "2":
          item.peiSeg.price = 2;
          break;
        case "3":
          item.peiSeg.price = 3;
          break;
        case "4":
          item.peiSeg.price = 4;
          break;
      }
    }, {
      signal: priSegController.signal
    })
  }

  function stationRiver() {
    const optionRS = document.querySelector('[id="optionRS"]');
    const optionRL = document.querySelector('[id="optionRL"]');
    const optionRLD = document.querySelector('[id="optionRLD"]');
    const optionRR = document.querySelector('[id="optionRR"]');
    const optionRRD = document.querySelector('[id="optionRRD"]');
    item.river ? optionRS.value = item.river.road : "";
    item.river ? optionRL.value = item.river.infoL : "";
    item.river ? optionRLD.checked = item.river.infoLD : "";
    item.river ? optionRR.value = item.river.infoR : "";
    item.river ? optionRRD.checked = item.river.infoRD : "";

    optionRS.addEventListener("input", () => {
      item.river.road = optionRS.value;
    }, {
      signal: riverController.signal
    })
    optionRL.addEventListener("input", () => {
      item.river.infoL = optionRL.value;
    }, {
      signal: riverController.signal
    })
    optionRLD.addEventListener("click", () => {
      item.river.infoLD = optionRLD.checked;
    }, {
      signal: riverController.signal
    })
    optionRR.addEventListener("input", () => {
      item.river.infoR = optionRR.value;
    }, {
      signal: riverController.signal
    })
    optionRRD.addEventListener("click", () => {
      item.river.infoRD = optionRRD.checked;
    }, {
      signal: riverController.signal
    })
  }
}

export {
  stationClick,
}