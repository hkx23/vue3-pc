import { TreeOptionData } from 'tdesign-vue-next';

export interface BusinessItem extends TreeOptionData {
  /** 标签 */
  label: string;
  /** 标签值 */
  value: string;
  /** 行数据 */
  row?: any;
  cmp?: {
    /** 名称（优先级高于标签） */
    name?: string;
    subName?: string;
    /** 编码 */
    code?: string;
    /** 描述（优先级高于标签值） */
    description?: string;
    /** 头像标签（默认name取第一个字节） */
    avatarLabel?: string;
    /** 后缀标签 */
    suffixTag?: string;
    /** 是否显示图标 */
    showIcon?: boolean;
  };
}
