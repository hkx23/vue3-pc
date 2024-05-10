import { LayoutItem } from 'grid-layout-plus';

// 功能组件
import oftenUseMenu from '@/pages/dashboard/base/components/often-use-menu/index.vue';
import PoductionAchievementRateRanking from '@/pages/dashboard/base/components/poduction-achievement rate-ranking/index.vue';

// 所有二开的看板都需要在此初始化
export const components = [
  {
    code: 'often-use-menu',
    title: '常用&收藏(demo)',
    showTitle: true,
    ghost: true,
    description: '显示常用&收藏功能(例子:后续可删除)',
    category: '系统',
    component: oftenUseMenu,
    w: 1,
    h: 1,
  },
  {
    code: 'poduction-achievement-rate-ranking',
    title: '当天生产达成率排行',
    showTitle: true,
    description: '当天生产达成率排行',
    category: '生产',
    component: PoductionAchievementRateRanking,
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
   * 唯一编码(也是指标的指标路径信息)
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
  /**
   * 指标缩略图相对地址
   */
  indexIconPath?: string;
  /**
   * 指标缩略图全地址
   */
  fileSignedUrl?: string;
}
