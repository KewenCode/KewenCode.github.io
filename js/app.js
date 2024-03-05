// let generate = require.config({
//   baseUrl: 'js/',
//   paths: {
//     "jquery": ["libs/jquery-3.7.1.min"],
//     "bootstrap": ["libs/bootstrap.bundle"],
//     "pixi": "libs/pixi.min",
//     "SorTable": "libs/Sortable.min",  // include require
//     "selectTag": "selectTag",
//     "listStation": "listStation",
//     "nanjing": "nanjing/nanjingList",
//   },
//   shim: {
//     pixi: {
//       exports: 'PIXI'
//     },
//     bootstrap: {
//       deps: ['jquery']
//     },
//     // "SorTable": {
//     //   exports: "Sortable"
//     // },
//     // "selectTag": {
//     //   deps: ["Sortable"],
//     // },
//     //   "drawSprite": {
//     //     deps: ["PIXI"],
//     //     exports: "drawSprite"
//     //   }
//   }
// })

// let collectBtn = {}

// generate(["nanjing", "selectTag", "listStation", "jquery", "SorTable"], function (nanjing, selectTag, listStation) {

//   collectBtn.removeTag = function (_this, tag) { selectTag.removeTag(_this, tag) }
//   collectBtn.removeItemStation = function (start, end) { listStation.removeItemStation(start, end) }
//   collectBtn.stationClick = function (_this) { listStation.stationClick(_this) }
//   collectBtn.updateBtn = function () { console.log(111); }
//   // 创建画布
//   const routeMap = new PIXI.Application({
//     backgroundColor: '#FFF',
//     hello: true,
//     // antialias: true,  //抗锯齿
//     // resolution: 1, //分辨率
//     sortableChildren: true,
//   });
//   // PIXI加入指定DOM
//   const wrap = document.querySelector("#map_wrap");
//   wrap.appendChild(routeMap.view);

// })

import { nanjing } from './nanjing/nanjingList.js';

// 创建画布
const routeMap = new PIXI.Application({
  backgroundColor: '#FFF',
  hello: true,
  antialias: true,  //抗锯齿
  // resolution: 1, //分辨率
  // sortableChildren: true,
  autoStart: false, // 取消自动渲染
});
// PIXI加入指定DOM
const wrap = document.querySelector("#map_wrap");
wrap.appendChild(routeMap.view);

let _boolean = true;
Data = Object.assign({}, Data_jiangnan_2017);
_boolean ? nanjing(routeMap,) : console.log("南京模块未加载");
// _boolean ? nanjing("jiangnan_2017", collectBtn) : console.log("南京模块未加载");

