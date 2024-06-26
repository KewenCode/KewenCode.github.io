import { param } from "../parameter.js"
import { OS, progressBar } from "../../../tools.js"

async function printLogo(_x, _y, _color) {
  const container = new PIXI.Container();
  const _param = param.size;
  let _logo = Data.files ? await PIXI.Assets.load({ src: Data.files, loadParser: 'loadTextures' }) : null;
  // console.log(_logo?.width, _logo?.height)
  if (_logo?.width > 8192 || _logo?.height > 8192) {
    alert(`请确保Logo宽度及高度小于8192px！`);
    _logo = null;
  }

  // 集团标志
  let loadIconAssets = await PIXI.Assets.loadBundle('load-icon', (pro) => progressBar(pro, 'icon'));
  const icon_Nj = (() => {
    const frame = new PIXI.Rectangle(0, 0, 440, 440);
    const icon = new PIXI.Texture({ source: loadIconAssets.icon_Info, frame: frame });
    return new PIXI.Sprite({
      texture: _logo ? _logo : icon,
      label: "icon_Nj",
      anchor: { x: 0.5, y: 0.5 },
      position: { x: _param.logoGro.x + _x, y: _param.logoGro.y + _y },
      scale: { x: _param.logoGro.w / (_logo ? _logo?.width : 445), y: _param.logoGro.h / (_logo ? _logo?.height : 445) },
    });
  })()
  // 服务电话
  let loadElementAssets = await PIXI.Assets.loadBundle('load-NJGJ', (pro) => progressBar(pro, 'use-sprite'));
  const icon_Tel = (() => {
    const frame = new PIXI.Rectangle(0, 0, 900, 120);
    const icon = new PIXI.Texture({ source: loadElementAssets.Element, frame: frame });
    return new PIXI.Sprite({
      texture: icon,
      label: "icon_Tel",
      tint: _color,
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