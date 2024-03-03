const Tag = document.querySelector(".tags ul");
tagInput = Tag.querySelector('.tags [id="tag"]');
const countTagNum = document.querySelector(".tags .detail span");

let tags = [];

// 计数
function countTag() {
  tagInput.focus();
  countTagNum.innerText = tags.length;
}

// 建立tag
function createTag() {
  Tag.querySelectorAll("li").forEach(li => li.remove());
  tags.slice().reverse().forEach(tag => {
    let liTag = `<li data-station="${tag}"><p>${tag}</p><div id="icon"><i class="iconfont icon-close-normal" onclick="removeTag(this, '${tag}')"></i></div></li>`
    Tag.insertAdjacentHTML("afterbegin", liTag);
  })
  countTag();
}

function removeTag(element, tag) {
  // console.log(element)
  let index = tags.indexOf(tag);
  tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  element.parentElement.parentElement.remove();
  countTag();
  // createTag();
  // console.log(element, tag);
}

function addTang(e) {
  if (e.key == "Enter") {
    let tag = e.target.value.replace(/\s+/g, ' ');
    if (tag.length > 1) {
      tag.split(',' || '，').forEach(tag => {
        // console.log(tag);
        if (!tags.includes(tag) && tag.length > 0) {
          tags.push(tag);
          // console.log(tags);
          createTag();
        }
      });
    }
    e.target.value = "";
    console.log(tags);
  }
}

// sortable对象
new Sortable(tagStation, {
  group: {
    name: 'stations',
    pull: 'clone',
    put: false,
  },
  animation: 150,
  filter: ".ignore-elements",
  // 拖拽时预览图样式
  ghostClass: 'red-background-class',
  // onClone: function (evt) {
  //   console.log(233)
  // },
});

// 回车添加tag
tagInput.addEventListener("keyup", addTang);

const tagUl = document.querySelector(".tags ul");
tagUl.addEventListener("mouseover", (e) => {
  const target = e.target.classList;
  if (target.contains("icon-close-normal")) {
    target.toggle("icon-close-normal");
    target.toggle("icon-close-active");
  }
})
tagUl.addEventListener("mouseout", (e) => {
  const target = e.target.classList;
  if (target.contains("icon-close-active")) {
    target.toggle("icon-close-active");
    target.toggle("icon-close-normal");
  }
})

// 清空
const removeBtn = document.querySelector("#clear");
removeBtn.addEventListener("click", () => {
  tags.length = 0;
  Tag.querySelectorAll("li").forEach(li => li.remove());
  countTag();
});

// 重新排序
const resortBtn = document.querySelector("#resort");
resortBtn.addEventListener("click", () => {
  // console.log(tags);
  tags.sort();
  createTag();
});

// export {
//   removeTag
// }