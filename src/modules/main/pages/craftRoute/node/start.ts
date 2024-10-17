import { CircleNode, CircleNodeModel, h } from '@logicflow/core';

class StartModel extends CircleNodeModel {
  // 自定义节点形状属性
  initNodeData(data: any) {
    data.text = {
      value: (data.text && data.text.value) || '开始',
      x: data.x,
      y: data.y + 35,
      dragable: false,
      editable: false,
    };
    super.initNodeData(data);
    this.r = 20;
  }

  getConnectedTargetRules() {
    const rules = super.getConnectedTargetRules();
    const notAsTarget = {
      message: '起始节点不能作为连线的终点',
      validate: () => false,
    };
    rules.push(notAsTarget);
    return rules;
  }
}

class StartView extends CircleNode {
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
          d: 'M18.25 12L8.5 17.63V6.37L18.25 12z',
        }),
      ],
    );
  }
}

export default {
  type: 'start',
  view: StartView,
  model: StartModel,
};
