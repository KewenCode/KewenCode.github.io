
const rightChange = document.querySelectorAll(".right .title h2");
const rightSpace = document.querySelector(".right .content");

rightChange.forEach(h2 => {
  h2.addEventListener("click", () => {
    // console.log(h2)
    h2.parentNode.querySelector(".select").classList.toggle("select"); //旧元素取消选择
    h2.classList.toggle("select");
    // console.log(rightSpace)
    // 遍历子级
    Array.prototype.forEach.call(rightSpace.children, div => {
      div.classList.add("hidden");
    })
    // 取消目标隐藏
    rightSpace.querySelector(`[data-link=${h2.dataset.link}]`).classList.toggle("hidden");
  })
})

// 导出json按钮
function copyToClipboard(text) {
  // 检查浏览器是否支持 Clipboard API
  if (!navigator.clipboard) {
    // 如果不支持，则使用传统的 document.execCommand("copy") 方式
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("复制成功");
    return;
  }

  // 使用 Clipboard API 复制内容到剪切板
  navigator.clipboard.writeText(text).then(
    function () {
      alert("复制成功");
    },
    function () {
      alert("复制失败");
    }
  );
}

// 导入数据
function clipboardToData(text, func) {
  try {
    var obj = JSON.parse(text); // 2、仅仅通过 JSON.parse(str)，不能完全检验一个字符串是JSON格式的字符串
    if (typeof obj == 'object' && obj) {  //3、还必须是 object 类型
      alert('转换成功：' + text);
      if (func) { func() };
      return obj;
    } else if (text == null) {/**消除默认事件 */
    } else {
      alert('转换失败：' + text);
      return false;
    }
  } catch (e) {
    console.log('error：[' + text + '] !!! ' + e);
    alert("非Json格式字符串，请检查。");
    return false;
  }
}

// 关闭提示
window.onbeforeunload = function (e) {
  var e = window.event || e;
  e.returnValue = ("确定离开页面吗？ヾ(•ω•`)o");
  // 销毁舞台
  routeMap.destroy(true);
};

export {
  copyToClipboard,
  clipboardToData,
}