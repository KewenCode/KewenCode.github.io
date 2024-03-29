function lineStation() {
  const ltem = { Tag: 'div', Class: ['stationOption', 'row', 'justify-content-between', 'hidden'], node: [{ Tag: 'ul', Class: ['stationBase', 'divWrap', 'row', 'justify-content-between'], node: [{ Tag: 'li', Class: ['col-12', 'col-md-3', 'my-2'], node: [{ Tag: 'div', Class: ['col-12', 'form-floating'], node: [{ Tag: 'input', Type: 'text', Name: 'stationName', id: 'optionName', placeholder: '', Class: ['form-control'], }, { Tag: 'label', for: 'optionName', text: '站名：', }] }] }, { Tag: 'li', Class: ['row', 'col-12', 'col-md-9', 'col-lg-7', 'my-2'], node: [{ Tag: 'div', Class: ['row-div', 'col-12'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'stationIsSingle', id: 'optionSingle', Class: ['form-check-input'], }, { Tag: 'label', for: 'optionSingle', text: '单向站', Class: ['form-check-label'], }] }, { Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'stationIsStart', id: 'optionStart', Class: ['form-check-input'], }, { Tag: 'label', for: 'optionStart', text: '起始站', Class: ['form-check-label'], }] }, { Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'stationIsEnd', id: 'optionEnd', Class: ['form-check-input'], }, { Tag: 'label', for: 'optionEnd', text: '终点站', Class: ['form-check-label'], }] }, { Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'stationIsRiver', id: 'optionRiver', Class: ['form-check-input'], }, { Tag: 'label', for: 'optionRiver', text: '图形站', Class: ['form-check-label'], }] }] }, { Tag: 'div', Class: ['row-div', 'col-12'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'stationIsMetro', id: 'optionMetro', Class: ['form-check-input'], }, { Tag: 'label', for: 'optionMetro', text: '换乘站', Class: ['form-check-label'], }] }, { Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'stationIsPriSeg', id: 'optionPrice', Class: ['form-check-input'], }, { Tag: 'label', for: 'optionPrice', text: '计价点', Class: ['form-check-label'], }] }] }] }, { Tag: 'li', Class: ['row-div', 'col-12', 'col-lg-2', 'my-2'], node: [{ Tag: 'div', Class: ['row-div'], node: [{ Tag: 'button', Type: 'button', Class: ['btn', 'btn-danger'], id: 'stationDelate', text: '删除当前站点' }] }] }] }, { Tag: 'ul', Class: ['stationSingle', 'divWrap', 'row', 'hidden'], node: [{ Tag: 'li', Class: ['col-12', 'col-md-6', 'my-2'], node: [{ Tag: 'div', Class: ['col-12', 'input-group'], node: [{ Tag: 'div', Class: ['col-12', 'col-md-6', 'input-group-text'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'singleDir', id: 'dirUp', value: '1', Class: ['form-check-input'], }, { Tag: 'label', for: 'dirUp', text: '上行（从左往右）', Class: ['form-check-label'], }] }] }, { Tag: 'div', Class: ['col-12', 'col-md-6', 'input-group-text'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'singleDir', id: 'dirDown', value: '0', Class: ['form-check-input'], }, { Tag: 'label', for: 'dirDown', text: '下行（从右往左）', Class: ['form-check-label'], }] }] }] }] }, { Tag: 'li', Class: ['col-12', 'col-md-6', 'my-2'], node: [{ Tag: 'div', Class: ['col-12', 'input-group'], node: [{ Tag: 'div', Class: ['col-6', 'col-md-3', 'input-group-text'], node: [{ Tag: 'span', style: 'width: 100%;', text: 'Tag位置' }] }, { Tag: 'div', Class: ['col-6', 'col-md-3', 'input-group-text'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'singleTag', id: 'tagUp', value: '1', Class: ['form-check-input'], disabled: true, }, { Tag: 'label', for: 'tagUp', text: '上侧', Class: ['form-check-label'], }] }] }, { Tag: 'div', Class: ['col-6', 'col-md-3', 'input-group-text'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'singleTag', id: 'tagDown', value: '0', Class: ['form-check-input'], disabled: true, }, { Tag: 'label', for: 'tagDown', text: '下侧', Class: ['form-check-label'], }] }] }, { Tag: 'div', Class: ['col-6', 'col-md-3', 'input-group-text'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'singleTag', id: 'tagHid', value: '-1', Class: ['form-check-input'], disabled: true, }, { Tag: 'label', for: 'tagHid', text: '隐藏', Class: ['form-check-label'], }] }] },] },] }] }, { Tag: 'ul', Class: ['stationMetro', 'divWrap', 'col-md-12', 'row', 'hidden'], node: [{ Tag: 'li', Class: ['col-12', 'my-2'], node: [{ Tag: 'div', role: 'alert', Class: ['d-flex', 'justify-content-between', 'alert', 'alert-primary', 'm-1',], node: [{ Tag: 'div', Class: ['w-100'], node: [{ Tag: 'P', text: '已选择线路（按顺序排序）：', node: [{ Tag: 'span', style: 'word-break: break-word;', }] }] }, { Tag: 'div', Class: ['flex-shrink-1', 'form-check', 'form-switch', 'form-check-inline', 'align-self-center', 'm-1',], node: [{ Tag: 'input', Type: 'checkbox', id: 'metroMerge', autocomplete: 'off', Class: ['form-check-input'], }, { Tag: 'label', for: 'metroMerge', style: 'white-space: nowrap;', text: '自动合并', Class: ['form-check-label'], }] }] }] }, { Tag: 'li', node: [{ Tag: 'div', Class: ['col-12', 'my-2'], node: [{ Tag: 'input', Type: 'checkbox', id: 'L1', autocomplete: 'off', value: '1', Class: ['btn-check'], }, { Tag: 'label', for: 'L1', text: '1号线', Class: ['btn', 'btn-outline-njline1', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'L2', autocomplete: 'off', value: '2', Class: ['btn-check'], }, { Tag: 'label', for: 'L2', text: '2号线', Class: ['btn', 'btn-outline-njline2', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'L3', autocomplete: 'off', value: '3', Class: ['btn-check'], }, { Tag: 'label', for: 'L3', text: '3号线', Class: ['btn', 'btn-outline-njline3', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'L4', autocomplete: 'off', value: '4', Class: ['btn-check'], }, { Tag: 'label', for: 'L4', text: '4号线', Class: ['btn', 'btn-outline-njline4', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'L5', autocomplete: 'off', value: '5', Class: ['btn-check'], }, { Tag: 'label', for: 'L5', text: '5号线', Class: ['btn', 'btn-outline-njline5', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'L6', autocomplete: 'off', value: '6', Class: ['btn-check'], disabled: true, }, { Tag: 'label', for: 'L6', text: '6号线', Class: ['btn', 'btn-outline-njline6', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'L7', autocomplete: 'off', value: '7', Class: ['btn-check'], }, { Tag: 'label', for: 'L7', text: '7号线', Class: ['btn', 'btn-outline-njline7', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'L8', autocomplete: 'off', value: '8', Class: ['btn-check'], disabled: true, }, { Tag: 'label', for: 'L8', text: '8号线', Class: ['btn', 'btn-outline-njline8', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'L9', autocomplete: 'off', value: '9', Class: ['btn-check'], disabled: true, }, { Tag: 'label', for: 'L9', text: '9号线', Class: ['btn', 'btn-outline-njline9', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'L10', autocomplete: 'off', value: '10', Class: ['btn-check'], }, { Tag: 'label', for: 'L10', text: '10号线', Class: ['btn', 'btn-outline-njline10', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'L11', autocomplete: 'off', value: '11', Class: ['btn-check'], disabled: true, }, { Tag: 'label', for: 'L11', text: '11号线', Class: ['btn', 'btn-outline-njline11', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'LS1', autocomplete: 'off', value: 'S1', Class: ['btn-check'], }, { Tag: 'label', for: 'LS1', text: 'S1号线', Class: ['btn', 'btn-outline-njlineS1', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'LS2', autocomplete: 'off', value: 'S2', Class: ['btn-check'], disabled: true, }, { Tag: 'label', for: 'LS2', text: 'S2号线', Class: ['btn', 'btn-outline-njlineS2', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'LS3', autocomplete: 'off', value: 'S3', Class: ['btn-check'], }, { Tag: 'label', for: 'LS3', text: 'S3号线', Class: ['btn', 'btn-outline-njlineS3', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'LS4', autocomplete: 'off', value: 'S4', Class: ['btn-check'], disabled: true, }, { Tag: 'label', for: 'LS4', text: 'S4号线', Class: ['btn', 'btn-outline-njlineS4', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'LS5', autocomplete: 'off', value: 'S5', Class: ['btn-check'], disabled: true, }, { Tag: 'label', for: 'LS5', text: 'S5号线', Class: ['btn', 'btn-outline-njlineS5', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'LS6', autocomplete: 'off', value: 'S6', Class: ['btn-check'], }, { Tag: 'label', for: 'LS6', text: 'S6号线', Class: ['btn', 'btn-outline-njlineS6', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'LS7', autocomplete: 'off', value: 'S7', Class: ['btn-check'], }, { Tag: 'label', for: 'LS7', text: 'S7号线', Class: ['btn', 'btn-outline-njlineS7', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'LS8', autocomplete: 'off', value: 'S8', Class: ['btn-check'], }, { Tag: 'label', for: 'LS8', text: 'S8号线', Class: ['btn', 'btn-outline-njlineS8', 'm-1'], }, { Tag: 'input', Type: 'checkbox', id: 'LS9', autocomplete: 'off', value: 'S9', Class: ['btn-check'], }, { Tag: 'label', for: 'LS9', text: 'S9号线', Class: ['btn', 'btn-outline-njlineS9', 'm-1'], }] },] }] }, { Tag: 'ul', Class: ['stationPrice', 'divWrap', 'row', 'hidden'], node: [{ Tag: 'li', Class: ['row', 'col-12', 'my-2'], node: [{ Tag: 'div', Class: ['col-md-6'], node: [{ Tag: 'div', Class: ['form-floating'], node: [{ Tag: 'select', id: 'priSegDir', Class: ['form-select'], node: [{ Tag: 'option', value: "null", disabled: true, selected: true, text: '请选择', }, { Tag: 'option', value: "1", text: '上行（红色）', }, { Tag: 'option', value: "0", text: '下行（蓝色）', },] }, { Tag: 'label', for: 'priSegDir', text: '计价点方向', Class: ['form-label'], }] }] }, { Tag: 'div', Class: ['col-md-6'], node: [{ Tag: 'div', Class: ['form-floating'], node: [{ Tag: 'select', id: 'priSegPrice', Class: ['form-select'], node: [{ Tag: 'option', value: "null", disabled: true, selected: true, text: '请选择', }, { Tag: 'option', value: "2", text: '￥2', }, { Tag: 'option', value: "3", text: '￥3', }, { Tag: 'option', value: "4", text: '￥4', },] }, { Tag: 'label', for: 'priSegPrice', text: '票价', Class: ['form-label'], }] }] }] }] }, { Tag: 'ul', Class: ['stationRiver', 'divWrap', 'row', 'hidden'], node: [{ Tag: 'li', Class: ['col-12', 'col-lg-4', 'my-2'], node: [{ Tag: 'div', Class: ['col-12', 'form-floating'], node: [{ Tag: 'input', Type: 'text', Name: 'stationRiver', id: 'optionRS', placeholder: '', Class: ['form-control'], }, { Tag: 'label', for: 'optionRS', text: '道路名称', }] }] }, { Tag: 'li', Class: ['col-12', 'col-sm-6', 'col-lg-4', 'my-2'], node: [{ Tag: 'div', Class: ['input-group'], node: [{ Tag: 'div', Class: ['input-group-text'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'stationRiver', id: 'optionRLD', value: 'false', Class: ['form-check-input'], }, { Tag: 'label', for: 'optionRLD', text: '置底', Class: ['form-check-label'], }] }] }, { Tag: 'div', Class: ['col-12', 'form-floating'], node: [{ Tag: 'input', Type: 'text', Name: 'stationRiver', id: 'optionRL', Class: ['form-control'], }, { Tag: 'label', for: 'optionRL', text: '左侧附注', }] }] },] }, { Tag: 'li', Class: ['col-12', 'col-sm-6', 'col-lg-4', 'my-2'], node: [{ Tag: 'div', Class: ['input-group'], node: [{ Tag: 'div', Class: ['input-group-text'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'stationRiver', id: 'optionRRD', value: 'false', Class: ['form-check-input'], }, { Tag: 'label', for: 'optionRRD', text: '置底', Class: ['form-check-label'], }] }] }, { Tag: 'div', Class: ['col-12', 'form-floating'], node: [{ Tag: 'input', Type: 'text', Name: 'stationRiver', id: 'optionRR', Class: ['form-control'], }, { Tag: 'label', for: 'optionRR', text: '右侧附注', }] }] },] }] }] }

  const Info = { Tag: 'div', node: [{ Tag: 'ul', Class: ['divWrap', 'row', 'justify-content-between', 'align-items-center'], node: [{ Tag: 'li', Class: ['col-12', 'col-md-6', 'my-2'], node: [{ Tag: 'div', Class: ['col-12', 'form-floating'], node: [{ Tag: 'input', Type: 'text', Name: 'group', id: 'infoGroup', placeholder: '', Class: ['form-control'], }, { Tag: 'label', for: 'infoGroup', text: '集团名称：', }] }] }, { Tag: 'li', Class: ['col-12', 'col-md-6', 'my-2'], node: [{ Tag: 'div', Class: ['col-12', 'form-floating'], node: [{ Tag: 'input', Type: 'text', Name: 'groupEn', id: 'infoGroupEn', placeholder: '', Class: ['form-control'], style: 'font-size: x-small;' }, { Tag: 'label', for: 'infoGroupEn', text: '集团英文名称：', }] }] }, { Tag: 'li', Class: ['col-12', 'col-md-6', 'my-2'], node: [{ Tag: 'div', Class: ['col-12', 'form-floating'], node: [{ Tag: 'input', Type: 'text', Name: 'company', id: 'infoCompany', placeholder: '', Class: ['form-control'], }, { Tag: 'label', for: 'infoCompany', text: '公司名称：', }] }] }, { Tag: 'li', Class: ['col-12', 'col-md-6', 'my-2'], node: [{ Tag: 'div', Class: ['col-12', 'input-group'], node: [{ Tag: 'div', Class: ['col-12', 'col-md-6', 'input-group-text'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'compColor', id: 'JN', value: "JN", Class: ['form-check-input'], }, { Tag: 'label', for: 'JN', text: '江南蓝', Class: ['form-check-label'], }] }] }, { Tag: 'div', Class: ['col-12', 'col-md-6', 'input-group-text'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', Name: 'compColor', id: 'YZ', value: 'YZ', Class: ['form-check-input'], }, { Tag: 'label', for: 'YZ', text: '扬子红', Class: ['form-check-label'], }] }] }] }] }] }, { Tag: 'ul', Class: ['divWrap', 'row', 'justify-content-between'], node: [{ Tag: 'li', Class: ['col-12', 'col-lg-6', 'my-2'], node: [{ Tag: 'div', Class: ['input-group'], node: [{ Tag: 'div', Class: ['form-floating'], node: [{ Tag: 'input', Type: 'text', Name: 'lineNo', id: 'infoLineNo', Class: ['form-control'], }, { Tag: 'label', for: 'infoLineNo', text: '路号', }] }, { Tag: 'div', Class: ['form-floating'], node: [{ Tag: 'select', id: 'infoLineNoAppend', Class: ['form-select'], node: [{ Tag: 'option', value: '0', text: '无', }, { Tag: 'option', value: '1', text: '路线路图', selected: true }, { Tag: 'option', value: '2', text: '路线路图及计价站点' }] }, { Tag: 'label', for: 'infoLineNoAppend', text: '路号附注', Class: ['form-label'] }] }] }] }, { Tag: 'li', Class: ['col-12', 'col-lg-6', 'my-2'], node: [{ Tag: 'div', Class: ['input-group'], node: [{ Tag: 'div', Class: ['form-floating'], node: [{ Tag: 'select', id: 'infoLineNoType', Class: ['form-select'], node: [{ Tag: 'option', value: 'null', text: '无', selected: true }, { Tag: 'option', value: '1', text: '[分段计价]', }, { Tag: 'option', value: '2', text: '[大站快车]' }, { Tag: 'option', value: '3', text: '微循环公交' }, { Tag: 'option', value: '4', text: '假日旅游线' }] }, { Tag: 'label', for: 'infoLineNoType', text: '类型附注', Class: ['form-label'] }] }, { Tag: 'div', Class: ['form-floating'], node: [{ Tag: 'select', id: 'infoLineNoIcon', Class: ['form-select'], node: [{ Tag: 'option', value: '0', text: '无', selected: true }, { Tag: 'option', value: '1', text: '小蓝鲸', }, { Tag: 'option', value: '2', text: '假日观光线' }] }, { Tag: 'label', for: 'infoLineNoIcon', text: '图标', Class: ['form-label'] }] }] }] }, { Tag: 'li', Class: ['lineType', 'col-6', 'col-lg-3', 'my-2'], node: [{ Tag: 'div', Class: ['form-floating'], node: [{ Tag: 'select', id: 'lineTypeSelect', Class: ['form-select'], node: [{ Tag: 'option', value: 'null', text: '待选择', selected: true, disabled: true }, { Tag: 'option', value: 'normal', text: '常规线路', }, { Tag: 'option', value: 'round', text: '环线' }] }, { Tag: 'label', for: 'lineTypeSelect', text: '线路类型：', Class: ['form-label'] }] }] }, { Tag: 'li', Class: ['lineTick', 'col-6', 'col-lg-3', 'my-2'], node: [{ Tag: 'div', Class: ['form-floating'], node: [{ Tag: 'select', id: 'linePriceSelect', Class: ['form-select'], node: [{ Tag: 'option', value: 'null', text: '待选择', selected: true, disabled: true }, { Tag: 'option', value: 'infoNoSeg', text: '单一票价', }, { Tag: 'option', value: 'infoSeg', text: '分段计价' }, { Tag: 'option', value: 'infoPerSeg', text: '有人售票' }] }, { Tag: 'label', for: 'linePriceSelect', text: '售票方式：', Class: ['form-label'] }] }] }, { Tag: 'li', Class: ['linePrice', 'col-12', 'col-lg-6', 'my-2'], node: [{ Tag: 'div', Class: ['input-group'], node: [{ Tag: 'div', Class: ['input-group-text'], node: [{ Tag: 'div', Class: ['row-div', 'form-check', 'form-switch', 'form-check-inline'], node: [{ Tag: 'input', Type: 'checkbox', id: 'infoSellPri', value: 'false', Class: ['form-check-input'], }, { Tag: 'label', for: 'infoSellPri', Class: ['form-check-label'], }] }] }, { Tag: 'div', Class: ['form-floating'], node: [{ Tag: 'select', id: 'infoPrice1', Class: ['form-select'], node: [{ Tag: 'option', value: 'null', text: '待选择', disabled: true }, { Tag: 'option', value: '0', text: '0元', }, { Tag: 'option', value: '1', text: '1元', }, { Tag: 'option', value: '2', text: '2元', selected: true }, { Tag: 'option', value: '3', text: '3元' }, { Tag: 'option', value: '4', text: '4元' }, { Tag: 'option', value: '5', text: '5元' }, { Tag: 'option', value: '6', text: '6元' }, { Tag: 'option', value: '7', text: '7元' }] }, { Tag: 'label', for: 'infoPrice1', text: '票价', Class: ['form-label'] }] }, { Tag: 'div', Class: ['form-floating'], node: [{ Tag: 'select', id: 'infoPrice2', Class: ['form-select'], node: [{ Tag: 'option', value: 'null', text: '待选择', disabled: true }, { Tag: 'option', value: '0', text: '0元', }, { Tag: 'option', value: '1', text: '1元', }, { Tag: 'option', value: '2', text: '2元', selected: true }, { Tag: 'option', value: '3', text: '3元' }, { Tag: 'option', value: '4', text: '4元' }, { Tag: 'option', value: '5', text: '5元' }, { Tag: 'option', value: '6', text: '6元' }, { Tag: 'option', value: '7', text: '7元' }] }, { Tag: 'label', for: 'infoPrice2', text: '至', Class: ['form-label'] }] }] }] }] }, { Tag: 'ul', Class: ['lineTime', 'divWrap', 'row', 'justify-content-start'], node: [{ Tag: 'div', Class: ['title'], node: [{ Tag: 'div', Type: 'h5', Class: ['col-12'], node: [{ Tag: 'h5', dataId: 'A', text: '首站', Class: ['select'], }, { Tag: 'h5', dataId: 'Z', text: '末站' }] }] }, { Tag: 'li', dataId: 'A', Class: ['row-div', 'col-12', 'my-2'], node: [{ Tag: 'div', Class: ['col-12', 'col-md-6', 'form-floating'], node: [{ Tag: 'input', Type: 'text', Name: 'Name', id: 'infoName', placeholder: '', Class: ['form-control'], }, { Tag: 'label', for: 'infoName', text: '站名：', }] }, { Tag: 'div', Class: ['col-6', 'col-md-3', 'col-lg-2', 'ms-auto', 'form-floating'], node: [{ Tag: 'input', Type: 'time', Name: 'UpTime', id: 'infoUpTime', value: '06:00', pattern: '[0-9]{2}:[0-9]{2}', Class: ['form-control'], }, { Tag: 'label', for: 'infoUpTime', text: '首班车：', }] }, { Tag: 'div', Class: ['col-6', 'col-md-3', 'col-lg-2', 'form-floating'], node: [{ Tag: 'input', Type: 'time', Name: 'DwTime', id: 'infoDwTime', value: '06:00', pattern: '[0-9]{2}:[0-9]{2}', Class: ['form-control'], }, { Tag: 'label', for: 'infoDwTime', text: '末班车：', }] }] }, { Tag: 'li', dataId: 'Z', Class: ['row-div', 'col-12', 'my-2', 'hidden'], node: [{ Tag: 'div', Class: ['col-12', 'col-md-6', 'form-floating'], node: [{ Tag: 'input', Type: 'text', Name: 'Name', id: 'infoName', placeholder: '', Class: ['form-control'], }, { Tag: 'label', for: 'infoName', text: '站名：', }] }, { Tag: 'div', Class: ['col-6', 'col-md-3', 'col-lg-2', 'ms-auto', 'form-floating'], node: [{ Tag: 'input', Type: 'time', Name: 'UpTime', id: 'infoUpTime', value: '06:00', pattern: '[0-9]{2}:[0-9]{2}', Class: ['form-control'], }, { Tag: 'label', for: 'infoUpTime', text: '首班车：', }] }, { Tag: 'div', Class: ['col-6', 'col-md-3', 'col-lg-2', 'form-floating'], node: [{ Tag: 'input', Type: 'time', Name: 'DwTime', id: 'infoDwTime', value: '06:00', pattern: '[0-9]{2}:[0-9]{2}', Class: ['form-control'], }, { Tag: 'label', for: 'infoDwTime', text: '末班车：', }] }] }] }] }

  const Node = (obj) => {
    let html = `<${obj.Tag} `
    obj?.Class ? (() => {
      html += 'class="'
      obj.Class.forEach(e => { html += `${e} ` });
      html += '" '
    })() : '';
    obj?.Type ? html += `type="${obj.Type}" ` : '';
    obj?.Name ? html += `name="${obj.Name}" ` : '';
    obj?.dataLink ? html += `data-link="${obj.dataLink}" ` : '';
    obj?.dataId ? html += `data-id="${obj.dataId}" ` : '';
    obj?.id ? html += `id="${obj.id}" ` : '';
    obj?.for ? html += `for="${obj.for}" ` : '';
    obj?.autocomplete ? html += `autocomplete="${obj.autocomplete}" ` : '';
    obj?.value ? html += `value="${obj.value}" ` : '';
    obj?.pattern ? html += `pattern="${obj.pattern}" ` : '';
    obj?.role ? html += `role="${obj.role}" ` : '';
    obj?.placeholder ? html += `placeholder="${obj.placeholder}" ` : '';
    obj?.style ? html += `style="${obj.style}" ` : '';
    obj?.disabled ? html += `disabled ` : '';
    obj?.selected ? html += `selected ` : '';
    obj?.text ? html += '>' + obj.text : html += '>';
    obj?.node ? obj.node.forEach(e => { html += Node(e) }) : '';
    return obj.Tag == 'input' ? html : html += `</${obj.Tag}>`
  }

  document.querySelector('.lineList').innerHTML += Node(ltem);
  document.querySelector('.lineInfo').innerHTML += Node(Info);
  return true;
}

export {
  lineStation,
}