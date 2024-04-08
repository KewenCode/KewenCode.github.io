import { param } from "../parameter.js"

const lineInfo = document.querySelector('.lineInfo');
const infoGroup = lineInfo.querySelector("#infoGroup");
const infoGroupEn = lineInfo.querySelector("#infoGroupEn");
const infoCompany = lineInfo.querySelector("#infoCompany");
// Logo
const infoGroupLogoFile = lineInfo.querySelector("#infoGroupLogoFile");
const infoGroupLogo = lineInfo.querySelector("#infoGroupLogo");
// 颜色
const JN = lineInfo.querySelector("#JN");
const YZ = lineInfo.querySelector("#YZ");
// 路号部分
const infoLineNo = lineInfo.querySelector("#infoLineNo");
const infoLineNoAppend = lineInfo.querySelector("#infoLineNoAppend");
const infoLineNoType = lineInfo.querySelector("#infoLineNoType");
const infoLineNoIcon = lineInfo.querySelector("#infoLineNoIcon");
// 线路类型
const lineTypeSelect = lineInfo.querySelector("#lineTypeSelect");
// 票价部分
const lineTick = lineInfo.querySelector(".lineTick");
const infoPrice = lineInfo.querySelector(".linePrice");
const linePriceSelect = lineTick.querySelector("#linePriceSelect");
const infoPrice1 = infoPrice.querySelector("#infoPrice1");
const infoPrice2 = infoPrice.querySelector("#infoPrice2");
const infoSellPri = infoPrice.querySelector("#infoSellPri");
// 服务时间
const lineTimeTitle = document.querySelectorAll('.lineTime [type="h5"]>h5');
const lineTimeLi = document.querySelectorAll(".lineTime>li");

function buildLineInfo() {
  infoGroup.value = Data.group
  infoGroup.addEventListener("input", e => {
    Data.group = infoGroup.value;
  })

  infoGroupEn.value = Data.groupEn
  infoGroupEn.addEventListener("input", e => {
    Data.groupEn = infoGroupEn.value;
  })

  infoCompany.value = Data.company
  infoCompany.addEventListener("input", e => {
    Data.company = infoCompany.value;
  })

  const modifyFile = () => {
    const curFiles = infoGroupLogoFile.files;

    if (curFiles.length !== 0 && infoGroupLogo.checked) {
      // console.log(curFiles[0].size);
      Data.files = URL.createObjectURL(curFiles[0]);
    } else {
      URL.revokeObjectURL(Data.files);
      delete Data.files
    }
  }
  infoGroupLogoFile.addEventListener("change", e => {
    modifyFile();
  })
  infoGroupLogo.addEventListener("input", e => {
    modifyFile();
  })

  JN.checked = JN.value == Data.compColor.name ? true : false;
  YZ.checked = YZ.value == Data.compColor.name ? true : false;
  JN.addEventListener("click", e => {
    Data.compColor = param.color.JN;
    YZ.checked = false;
  })
  YZ.addEventListener("click", e => {
    Data.compColor = param.color.YZ;
    JN.checked = false;
  })
  // 路号部分
  infoLineNo.value = Data.lineNo.main;
  infoLineNo.addEventListener("input", e => {
    Data.lineNo.main = infoLineNo.value;
  })
  switch (Data.lineNo.append) {
    case "路线路图":
      infoLineNoAppend.value = 1;
      break;
    case "路线路图\n及\n计价站点":
      infoLineNoAppend.value = 2;
      break;
    default:
      infoLineNoAppend.value = 0;
      infoLineNoType.value = 0;
      infoLineNoType.disabled = true;
      infoLineNoIcon.value = 0;
      infoLineNoIcon.disabled = true;
  }
  infoLineNoAppend.addEventListener("input", e => {
    switch (Number(infoLineNoAppend.value)) {
      case 0:
        Data.lineNo.append = null;
        infoLineNoIcon.value = 0;
        infoLineNoIcon.disabled = true;
        break;
      default:
        infoLineNoIcon.disabled = false;
        infoLineNoIcon.value = Data.lineNo.icon;
        switch (Number(infoLineNoAppend.value)) {
          case 1:
            Data.lineNo.append = "路线路图";
            break;
          case 2:
            Data.lineNo.append = "路线路图\n及\n计价站点";
            break;
        }
    }
  })
  infoLineNoType.value = Data.lineNo.type;
  infoLineNoType.addEventListener("input", e => {
    Data.lineNo.type = Number(infoLineNoType.value);
  })
  infoLineNoIcon.value = Data.lineNo.icon;
  infoLineNoIcon.addEventListener("input", e => {
    Data.lineNo.icon = Number(infoLineNoIcon.value);
  })

  lineTypeSelect.value = Data.lineType;
  lineTypeSelect.addEventListener("input", e => {
    Data.lineType = lineTypeSelect.value;
  })

  linePriceSelect.value = !Data.isSeg && !Data.isSel ? "infoNoSeg" :
    Data.isSeg ? "infoSeg" :
      Data.isSel ? "infoPerSeg" : null;
  Data.isSeg ? priHid(true, false, false) : priHid(true, false, true);
  Data.isSel ? Data.price[0] && Data.price[1] ? priHid(false, false, false) : priHid(false, true, true) : "";
  infoPrice1.value = Data.price[0] || null;
  infoPrice2.value = Data.price[1] || null;
  infoSellPri.checked = Data.price[0] && Data.price[1] && Data.isSel ? true : false;

  linePriceSelect.addEventListener("click", e => {
    switch (linePriceSelect.value) {
      case "infoNoSeg":
        Data.isSeg = false;
        Data.isSel = false;
        infoPrice1.value = Data.price[0] || null;
        infoPrice2.value = null;
        priHid(true, false, true);
        break;
      case "infoSeg":
        Data.isSeg = true;
        Data.isSel = false;
        infoPrice1.value = Data.price[0] || null;
        infoPrice2.value = Data.price[1] || null;
        priHid(true, false, false);
        break;
      case "infoPerSeg":
        Data.isSeg = false;
        Data.isSel = true;
        infoPrice1.value = null;
        infoPrice2.value = null;
        infoSellPri.checked = false;
        priHid(false, true, true);
        break;
    }
  })

  infoPrice1.addEventListener("click", e => {
    Data.price[0] = infoPrice1.value;
  })
  infoPrice2.addEventListener("click", e => {
    Data.price[1] = infoPrice2.value;
  })

  infoSellPri.addEventListener("click", () => {
    priHid(false, !infoSellPri.checked, !infoSellPri.checked);

    infoPrice1.value = infoSellPri.checked ? Data.price[0] : null;
    infoPrice2.value = infoSellPri.checked ? Data.price[1] : null;
  })

  // 站点选择
  lineTimeTitle.forEach((h5, key) => {
    h5.addEventListener("click", () => {
      h5.parentNode.querySelector(".select").classList.toggle("select");
      h5.classList.toggle("select");
      // 遍历子级
      lineTimeLi.forEach(li => {
        if (h5.dataset.id == li.dataset.id) {
          setTimeout(() => {
            li.classList.remove("hidden", "animate-out");
            li.classList.add("animate-in");
          }, 500);
        } else {
          if (!li.classList.contains("animate-out")) {
            li.classList.add("animate-out");
            setTimeout(() => { li.classList.add("hidden"); }, 500);
          }
        };
      })
    })
  })
  lineTimeLi.forEach((li, key) => {
    const name = li.querySelector("#infoName");
    const startTime = li.querySelector("#infoUpTime");
    const endTime = li.querySelector("#infoDwTime");
    name.value = Data.point[li.dataset.id].name;
    name.addEventListener("keyup", () => {
      Data.point[li.dataset.id].name = name.value;
    })
    startTime.value = Data.point[li.dataset.id].startTime;
    startTime.addEventListener("input", () => {
      Data.point[li.dataset.id].startTime = startTime.value;
    })
    endTime.value = Data.point[li.dataset.id].endTime;
    endTime.addEventListener("input", () => {
      Data.point[li.dataset.id].endTime = endTime.value;
    })
  })
}

function updateLineInfo() {
  infoGroup.value = Data.group;
  infoGroupEn.value = Data.groupEn;
  infoCompany.value = Data.company;
  JN.checked = JN.value == Data.compColor.name ? true : false;
  YZ.checked = YZ.value == Data.compColor.name ? true : false;
  infoLineNo.value = Data.lineNo.main;
  switch (Data.lineNo.append) {
    case "路线路图":
      infoLineNoAppend.value = 1;
      break;
    case "路线路图\n及\n计价站点":
      infoLineNoAppend.value = 2;
      break;
    default:
      infoLineNoAppend.value = 0;
      infoLineNoType.value = null;
      infoLineNoType.disabled = true;
      infoLineNoIcon.value = 0;
      infoLineNoIcon.disabled = true;
  }
  infoLineNoType.value = Data.lineNo.type;
  infoLineNoIcon.value = Data.lineNo.icon;
  lineTypeSelect.value = Data.lineType;
  linePriceSelect.value = !Data.isSeg && !Data.isSel ? "infoNoSeg" :
    Data.isSeg ? "infoSeg" :
      Data.isSel ? "infoPerSeg" : null;
  infoPrice1.value = Data.price[0] || null;
  infoPrice2.value = Data.price[1] || null;
  infoSellPri.checked = Data.price[0] && Data.price[1] ? Data.isSeg || Data.isSel ? true : false : false;
  Data.isSeg ? priHid(true, false, false) : priHid(true, false, true);
  Data.isSel ? priHid(false, Data.price[0] && Data.price[1] ? false : true, Data.price[0] && Data.price[1] ? false : true) : "";
  lineTimeLi.forEach((li, key) => {
    const name = li.querySelector("#infoName");
    const startTime = li.querySelector("#infoUpTime");
    const endTime = li.querySelector("#infoDwTime");
    name.value = Data.point[li.dataset.id].name;
    startTime.value = Data.point[li.dataset.id].startTime;
    endTime.value = Data.point[li.dataset.id].endTime;
  })
}

function priHid(J1, J2, J3) {
  infoSellPri.disabled = J1;
  infoPrice1.disabled = J2;
  infoPrice2.disabled = J3;
}

export {
  buildLineInfo,
  updateLineInfo,
}