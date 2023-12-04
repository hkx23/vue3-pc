import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core';

class SequenceModel extends PolylineEdgeModel {
  initEdgeData(data: any) {
    super.initEdgeData(data);
    this.text.value = this.text.value || 'GOOD';
  }

  getEdgeStyle() {
    const style = super.getEdgeStyle();
    const result = this.text.value || 'GOOD';
    if (result === 'NG') {
      style.stroke = 'var(--td-error-color)';
    } else {
      style.stroke = 'var(--td-brand-color-active)';
    }
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    const result = this.text.value || 'GOOD';
    if (result === 'NG') {
      style.stroke = 'var(--td-error-color)';
    } else {
      style.stroke = 'var(--td-brand-color-active)';
    }
    return style;
  }
}

export default {
  type: 'sequence',
  view: PolylineEdge,
  model: SequenceModel,
};
