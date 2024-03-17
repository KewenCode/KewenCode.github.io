import { param } from "./parameter.js"

function reSize(jiangnanMap) {
  jiangnanMap.renderer.resize(param.size.map.w, param.size.map.h);
  const wrap = document.querySelector("#map_wrap");

  const routeMapView = jiangnanMap.canvas.style;
  const pixiResize = () => {
    if (window.innerWidth > window.innerHeight) {
      routeMapView.width = (window.innerWidth / 1.5) + 'px';
    } else {
      routeMapView.width = wrap.offsetWidth + 'px';
    }
  };
  pixiResize();
  // 延迟500毫秒执行
  window.addEventListener('resize', (delay = 500) => {
    let timer;
    return (() => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        pixiResize();
      }, delay);
    })()
  });
}

async function loadResource() {
  // const manifest = {
  //   bundles: [{
  //     name: 'load-box',
  //     assets: [{
  //       alias: 'box',
  //       src: '../../../images/nanjing/BoxSprite.png',
  //     },],
  //   },
  //   {
  //     name: 'load-NJGJ',
  //     assets: [{
  //       alias: 'Price',
  //       src: './images/nanjing/BusPriceSprite.png',
  //     },
  //     {
  //       alias: 'Element',
  //       src: './images/nanjing/NJGJSprite.png',
  //     },
  //     {
  //       alias: 'Metro',
  //       src: './images/nanjing/MetroSprite.png',
  //     },
  //     ],
  //   },
  //   {
  //     name: 'load-icon',
  //     assets: [{
  //       alias: 'icon_Info',
  //       src: './images/nanjing/IconSprite.png',
  //     },
  //     {
  //       alias: 'logoSvg',
  //       src: './images/Logo.svg',
  //     },
  //     {
  //       alias: 'logoPng',
  //       src: './images/Logo.png',
  //     },
  //     ],
  //   },
  //   {
  //     name: 'load-font',
  //     assets: [{
  //       alias: 'FZZZHONGJW',
  //       src: './font/fzzzhongjw.woff',
  //     },
  //     {
  //       alias: 'FZHTJW',
  //       src: './font/fzhtjw.woff',
  //     },
  //     {
  //       alias: 'YGYXSZITI',
  //       src: './font/YGYXSZITI.woff',
  //     },
  //     ],
  //   },
  //   {
  //     name: 'load-font-mobile',
  //     assets: [{
  //       alias: 'TNR',
  //       src: './font/Times New Roman.woff',
  //     },
  //     ],
  //   },
  //   ]
  // };

  const manifest = {
    bundles: [{
      name: 'load-box',
      assets: [{
        alias: 'box',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/images/nanjing/BoxSprite.png',
      },],
    },
    {
      name: 'load-NJGJ',
      assets: [{
        alias: 'Price',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/images/nanjing/BusPriceSprite.png',
      },
      {
        alias: 'Element',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/images/nanjing/NJGJSprite.png',
      },
      {
        alias: 'Metro',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/images/nanjing/MetroSprite.png',
      },
      ],
    },
    {
      name: 'load-icon',
      assets: [{
        alias: 'icon_Info',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/images/nanjing/IconSprite.png',
      },
      {
        alias: 'logoSvg',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/images/Logo.svg',
      },
      {
        alias: 'logoPng',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/images/Logo.png',
      },
      ],
    },
    {
      name: 'load-font',
      assets: [{
        alias: 'FZZZHONGJW',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/font/fzzzhongjw.woff',
      },
      {
        alias: 'FZHTJW',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/font/fzhtjw.woff',
      },
      {
        alias: 'YGYXSZITI',
        src: 'https://cdn.jsdelivr.net/gh/KewenCode/KewenCode.github.io@main/font/ygyxsziti.woff',
      },
      ],
    },
    {
      name: 'load-font-mobile',
      assets: [{
        alias: 'TNR',
        src: './font/Times New Roman.woff',
      },
      ],
    },
    ]
  };

  await PIXI.Assets.init({
    manifest
  });
}

export {
  reSize,
  loadResource,
}