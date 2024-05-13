import { LayoutItem } from 'grid-layout-plus';

import { ConferenceOrgVO } from '@/api/daily';
// 功能组件
import oftenUseMenu from '@/pages/dashboard/base/components/often-use-menu/index.vue';
import PoductionAchievementRateRanking from '@/pages/dashboard/base/components/poduction-achievement rate-ranking/index.vue';

// demo
import LineChart from './demo/LineChart.vue';
import PieChart from './demo/PieChart.vue';
// 所有二开的看板都需要在此初始化    (注意: 组件需要暴露出refresh事件方法, 否则无法刷新组件)
export const components = [
  {
    code: 'often-use-menu',
    title: '常用&收藏(demo)',
    ghost: true,
    showTitle: true,
    description: '显示常用&收藏功能(例子:后续可删除)',
    category: '系统',
    component: oftenUseMenu, // 组件需要暴露出refresh事件方法
    w: 1,
    h: 1,
  },
  {
    code: 'poduction-achievement-rate-ranking',
    title: '当天生产达成率排行(demo)',
    showTitle: true,
    description: '当天生产达成率排行',
    category: '生产',
    component: PoductionAchievementRateRanking, // 组件需要暴露出refresh事件方法
    w: 1,
    h: 1,
  },
  {
    code: 'LineChartDemo',
    title: '折线图(demo)',
    showTitle: false,
    ghost: true,
    description: '折线图示例',
    category: '示例',
    component: LineChart,
    w: 1,
    h: 1,
  },
  {
    code: 'PieChartDemo',
    title: '饼图(demo)',
    showTitle: true,
    description: '饼图示例',
    category: '示例',
    component: PieChart,
    w: 1,
    h: 1,
  },
] as componentItem[];

export interface groupedComponentItem {
  category: string;
  children: componentItem[];
}

export interface componentCondition {
  conferenceId: string; // 会议ID
  conferenceCoode: string; // 会议编码
  conferenceName: string; // 会议名称
  attendanceModeId: string; // 出勤模式ID
  attendanceModeCode: string; // 出勤模式代码
  attendanceModeName: string; // 出勤模式名称
  dimension: string; // 选择的时间维度
  defaultDimension: string[]; // 默认的所有时间维度信息
  conferenceOrgIds: string; // 会议组织ID集合,若多选则逗号隔开
  conferenceOrgs: ConferenceOrgVO[]; // 选择的会议组织信息
  defaultCnferenceOrgs: ConferenceOrgVO[]; // 默认的所有组织信息
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
