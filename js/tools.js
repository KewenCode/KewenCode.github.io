//JS判断当前设备类型
var OS = (() => {
  let ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
})();

var progressBar = (pre, target) => {
  const progress = document.querySelector(".progress")
  switch (target) {
    case "js":
      progress.querySelector('[data-target="js"]').style.width = `${pre * 10}%`;
      break;
    case "bg-sprite":
      progress.querySelector('[data-target="bg-sprite"]').style.width = `${pre * 20}%`;
      break;
    case "font":
      progress.querySelector('[data-target="font"]').style.width = `${pre * 20}%`;
      break;
    case "icon":
      progress.querySelector('[data-target="icon"]').style.width = `${pre * 20}%`;
      break;
    case "use-sprite":
      progress.querySelector('[data-target="use-sprite"]').style.width = `${pre * 20}%`;
      break;
    case "canvas":
      progress.querySelector('[data-target="canvas"]').style.width = `${pre * 10}%`;
      document.querySelector("canvas").style.visibility == "hidden" ?
        setTimeout(() => {
          document.querySelector("canvas").style.visibility = "visible";
          document.querySelector("#map_load").style.visibility = "hidden";
        }, 800) : ''
      break;
  }
  // console.log(pre, target)

}

export {
  OS,
  progressBar
}