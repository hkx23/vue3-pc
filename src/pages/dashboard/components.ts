import { LayoutItem } from 'grid-layout-plus';

import Todo from '@/modules/main/pages/todo/componentTodo.vue';

// demo
import LineChart from './base/components/demo/LineChart.vue';
import PieChart from './base/components/demo/PieChart.vue';
// 功能组件
import oftenUseMenu from './base/components/often-use-menu/index.vue';
import PoductionAchievementRateRanking from './base/components/poduction-achievement rate-ranking/index.vue';
import PoorProcessTop5 from './base/components/poor-process-top5/index.vue';

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
    code: 'todo',
    title: '我的待办',
    showTitle: false,
    ghost: true,
    description: '我的待办',
    category: '系统',
    component: Todo,
    w: 2,
    h: 5,
  },
  {
    code: 'poor-process-top5',
    title: '过程不良TOP5',
    showTitle: true,
    description: '过程不良TOP5 按周',
    category: '生产',
    component: PoorProcessTop5,
    w: 4,
    h: 3,
  },
  {
    code: 'poduction-achievement rate-ranking',
    title: '当天生产达成率排行',
    showTitle: true,
    description: '当天生产达成率排行',
    category: '生产',
    component: PoductionAchievementRateRanking,
    w: 4,
    h: 3,
  },
  {
    code: 'LineChartDemo',
    ghost: true,
    title: '折线图',
    description: '折线图示例',
    category: '示例',
    component: LineChart,
    w: 6,
    h: 5,
  },
  {
    code: 'PieChartDemo',
    title: '饼图',
    showTitle: true,
    description: '饼图示例',
    category: '示例',
    component: PieChart,
    w: 2,
    h: 5,
  },
] as componentItem[];

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
   * 子标题
   */
  subtitle?: string;
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
  /**
   * 透明组件，用于自定义样式
   */
  ghost?: boolean;
}
