import { param } from "./parameter.js"
import { OS } from "../../tools.js"

async function printLogo(_x, _y, _color) {
  const container = new PIXI.Container();
  const _param = param.size;
  // 集团标志
  let loadIconAssets = await PIXI.Assets.loadBundle('load-icon');
  const icon_Main = loadIconAssets.icon_Info;
  icon_Main.frame = new PIXI.Rectangle(0, 0, 445, 445);
  let icon_Nj = new PIXI.Sprite(icon_Main);
  icon_Nj.zIndex = 70;
  icon_Nj.name = "icon_Nj";
  icon_Nj.anchor.set(0.5, 0.5);
  icon_Nj.setTransform(_param.logoGro.x + _x, _param.logoGro.y + _y, _param.logoGro.w / 445, _param.logoGro.h / 445);
  // 服务电话
  let loadElementAssets = await PIXI.Assets.loadBundle('load-NJGJ');
  const E = loadElementAssets.Element;
  E.frame = new PIXI.Rectangle(0, 0, 900, 150)
  let icon_Tel = new PIXI.Sprite(E);
  icon_Tel.setTransform(_param.line.x[2] - 120 + _x, _param.textGro.y + _y, 1, 1);
  icon_Tel.zIndex = 70;
  icon_Tel.name = "icon_Tel";

  container.addChild(icon_Nj, icon_Tel);
  return container
}

export {
  printLogo,
}