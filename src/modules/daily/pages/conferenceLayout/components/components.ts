import { LayoutItem } from 'grid-layout-plus';

// 功能组件
// import oftenUseMenu from './base/components/often-use-menu/index.vue';

export const components = [
  {
    code: 'often-use-menu',
    title: '常用&收藏1',
    showTitle: true,
    ghost: true,
    description: '显示常用&收藏功能',
    category: '系统',
    component: null,
    w: 1,
    h: 1,
  },
  {
    code: 'often-use-menu1',
    title: '常用&收藏2',
    showTitle: true,
    ghost: true,
    description: '显示常用&收藏功能',
    category: '系统',
    component: null,
    w: 1,
    h: 1,
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
  /**
   * 跳转路径（显示其他按钮）
   */
  redirect?: string;
}
