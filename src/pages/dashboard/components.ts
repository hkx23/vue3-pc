import { LayoutItem } from 'grid-layout-plus';

export interface groupedComponentItem {
  category: string;
  children: componentItem[];
}

export interface componentItem extends LayoutItem {
  /**
   * 唯一编码
   */
  code: string;
  /**
   * 分类
   */
  category: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 显示标题
   */
  showTitle?: boolean;
  /**
   * 描述
   */
  description?: string;
  /**
   * 组件
   */
  component?: any;
}

import MiddleChart from './base/components/MiddleChart.vue';
import oftenUseMenu from './base/components/often-use-menu/index.vue';
import WorkingTablePie from './base/components/working-table-pie/index.vue';

export const components = [
  {
    code: 'often-use-menu',
    title: '常用&收藏',
    description: '显示常用&收藏功能',
    category: '系统',
    component: oftenUseMenu,
    w: 8,
    h: 1,
  },
  {
    code: 'working-table-pie',
    title: '过程不良TOP5',
    showTitle: true,
    description: '过程不良TOP5 按周',
    category: '生产',
    component: WorkingTablePie,
    w: 4,
    h: 3,
  },
  {
    code: 'working-table-pie1',
    title: 'MiddleChart',
    showTitle: true,
    description: '过程不良TOP5 按周 11',
    category: '生产',
    component: MiddleChart,
    w: 4,
    h: 3,
  },
] as componentItem[];
