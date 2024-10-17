import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core';

class SequenceModel extends PolylineEdgeModel {
  initEdgeData(data: any) {
    super.initEdgeData(data);
    this.text.value = 'Stand Time';
  }

  getEdgeStyle() {
    const style = super.getEdgeStyle();
    style.strokeDasharray = '3 3';
    style.stroke = 'var(--td-success-color)';
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    style.stroke = 'var(--td-success-color)';
    return style;
  }
}

export default {
  type: 'properties',
  view: PolylineEdge,
  model: SequenceModel,
};
