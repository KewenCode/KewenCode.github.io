import { param } from "../parameter.js"
import { OS, progressBar } from "../../../tools.js"

async function printLogo(_x, _y, _color) {
  const container = new PIXI.Container();
  const _param = param.size;
  // 集团标志
  let loadIconAssets = await PIXI.Assets.loadBundle('load-icon', (pro) => progressBar(pro, 'icon'));
  const icon_Nj = (() => {
    const frame = new PIXI.Rectangle(0, 0, 440, 440);
    const icon = new PIXI.Texture({ source: loadIconAssets.icon_Info, frame: frame });
    return new PIXI.Sprite({
      texture: icon,
      label: "icon_Nj",
      anchor: { x: 0.5, y: 0.5 },
      position: { x: _param.logoGro.x + _x, y: _param.logoGro.y + _y },
      scale: { x: _param.logoGro.w / 445, y: _param.logoGro.h / 445 },
    });
  })()
  // 服务电话
  let loadElementAssets = await PIXI.Assets.loadBundle('load-NJGJ', (pro) => progressBar(pro, 'use-sprite'));
  const icon_Tel = (() => {
    const frame = new PIXI.Rectangle(0, 0, 900, 150);
    const icon = new PIXI.Texture({ source: loadElementAssets.Element, frame: frame });
    return new PIXI.Sprite({
      texture: icon,
      label: "icon_Tel",
      tint: param.color.JN_Tint,
      position: { x: _param.line.x[2] - 120 + _x, y: _param.textGro.y + _y },
      scale: { x: 1, y: 1 },
    });
  })()
  // icon_Tel.zIndex = 70;

  container.addChild(icon_Nj, icon_Tel);
  return container
}

async function printBranch(_x, _y, _color) {
  // 线路标志
  let loadIconAssets = await PIXI.Assets.loadBundle('load-icon');
  const icon_Br = (() => {
    const frame = new PIXI.Rectangle(0 + 440 * Data.lineNo.icon, 0, 440, 440);
    const icon = new PIXI.Texture({ source: loadIconAssets.icon_Info, frame: frame });
    return new PIXI.Sprite({
      texture: icon,
      label: "icon_Br",
      anchor: { x: 0.5, y: 0.5 },
    });
  })()
  // icon_Br.setTransform(_param.logoGro.x + _x, _param.logoGro.y + _y, _param.logoGro.w / 445, _param.logoGro.h / 445);
  return icon_Br
}

export {
  printLogo,
  printBranch,
}