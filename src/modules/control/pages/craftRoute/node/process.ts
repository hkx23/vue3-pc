import { h, RectNode, RectNodeModel } from '@logicflow/core';

class ProcessModel extends RectNodeModel {
  // 自定义节点形状属性
  initNodeData(data: any) {
    data.text = {
      value: (data.text && data.text.value) || '工序',
      x: data.x,
      y: data.y,
      dragable: false,
      editable: true,
    };
    super.initNodeData(data);
    this.radius = 20;
  }

  getNodeStyle() {
    const backgroundColor = this.properties.backgroundColor || '#ffffff';
    const style = super.getNodeStyle();
    style.fill = backgroundColor;
    return style;
  }
}

class ProcessView extends RectNode {
  getShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const { fill } = model.getNodeStyle();
    return h('g', {}, [
      h('rect', {
        fill,
        stroke: 'var(--td-brand-color-active)',
        strokeWidth: 1,
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
      }),
      this.getLabelShape(),
    ]);
  }

  getLabelShape() {
    const { x, y, width, height } = this.props.model;
    return h(
      'svg',
      {
        fill: 'var(--td-brand-color-active)',
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        viewBox: '0 0 24 24',
        width: 20,
        height: 20,
      },
      [
        h('path', {
          d: 'M9.18 1h5.64l.65 3.24a8.5 8.5 0 011.52.88l3.13-1.06 2.82 4.88-2.49 2.18a8.58 8.58 0 010 1.76l2.49 2.18-2.82 4.88-3.13-1.06a8.5 8.5 0 01-1.52.88L14.82 23H9.18l-.65-3.24a8.5 8.5 0 01-1.52-.88l-3.13 1.06-2.82-4.88 2.48-2.18a8.59 8.59 0 010-1.76L1.06 8.94l2.82-4.88 3.13 1.06a8.5 8.5 0 011.52-.88L9.18 1zm1.64 2l-.54 2.7-.53.2A6.5 6.5 0 007.85 7l-.44.36-2.61-.88-1.18 2.04 2.07 1.82-.1.55a6.55 6.55 0 000 2.22l.1.55-2.07 1.82 1.18 2.04 2.61-.88.43.36a6.5 6.5 0 001.91 1.1l.53.2.54 2.7h2.36l.54-2.7.53-.2a6.5 6.5 0 001.9-1.1l.44-.36 2.61.88 1.18-2.04-2.07-1.82.1-.55a6.55 6.55 0 000-2.22l-.1-.55 2.07-1.82-1.18-2.04-2.61.88-.43-.36a6.5 6.5 0 00-1.91-1.1l-.53-.2-.54-2.7h-2.36zM12 9a3 3 0 100 6 3 3 0 000-6zm-5 3a5 5 0 1110 0 5 5 0 01-10 0z',
        }),
      ],
    );
  }
}

export default {
  type: 'process',
  view: ProcessView,
  model: ProcessModel,
};
