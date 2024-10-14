import { CircleNode, CircleNodeModel, h } from '@logicflow/core';

class EndModel extends CircleNodeModel {
  // 自定义节点形状属性
  initNodeData(data: any) {
    data.text = {
      value: (data.text && data.text.value) || '结束',
      x: data.x,
      y: data.y + 35,
      dragable: false,
      editable: false,
    };
    super.initNodeData(data);
    this.r = 20;
  }

  getConnectedTargetRules() {
    const rules = super.getConnectedSourceRules();
    const notAsTarget = {
      message: '终止节点不能作为连线的起点',
      validate: () => false,
    };
    rules.push(notAsTarget);
    return rules;
  }
}

class EndView extends CircleNode {
  getShape() {
    const { model } = this.props;
    const { x, y, r } = model;
    const { fill, strokeWidth } = model.getNodeStyle();
    return h('g', {}, [
      h('circle', {
        cx: x,
        cy: y,
        r,
        fill,
        stroke: 'var(--td-brand-color)',
        strokeWidth,
      }),
      this.getLabelShape(),
    ]);
  }

  getLabelShape() {
    const { x, y, width, height } = this.props.model;
    return h(
      'svg',
      {
        fill: 'var(--td-brand-color)',
        x: x - (1 / 2) * width,
        y: y - (1 / 2) * height,
        viewBox: '0 0 24 24',
        width: 40,
        height: 40,
      },
      [
        h('path', {
          d: 'M8 8h8v8H8V8z',
        }),
      ],
    );
  }
}

export default {
  type: 'end',
  view: EndView,
  model: EndModel,
};
