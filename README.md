# Web桌面端

# 技术栈
Web桌面端主要用到的技术框架如下：

| 技术组件 | 说明 |
| --- | --- |
| [Vue3](https://cn.vuejs.org/) | Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。 |
| [Vue Router](https://router.vuejs.org/zh/) | 项目使用Vue Router进行路由管理。 Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。 |
| [Pinia](https://pinia.vuejs.org/zh/introduction.html) | 项目使用Pinia进行全局的状态管理。 Pinia 是由vue.js官方成员重新设计的新一代状态管理器，开发者可以使用Pinia提供的各类基于Composition API的封装，更方便地在vue的项目中进行状态管理。 |
| [TDesign](https://tdesign.tencent.com/vue-next/overview) | 腾讯开源UI组件库，是一套完整的 企业级设计体系，拥有基于 Vue / React / 小程序 等技术栈的组件库解决方案。用于构建 设计统一 / 跨端多技术栈 的前端应用时，TDesign 更有优势。 |
| [vue-i18n](https://vue-i18n.intlify.dev/) | vue 多语言插件 |
| [vue-hooks-plus](https://inhiblab-core.gitee.io/docs/hooks/) | 常用hook封装 |
| [Lodash](https://www.lodashjs.com/) | 常用js函数封装 |
| [Dayjs](https://dayjs.gitee.io/zh-CN/) | 日期库 |
| [Echarts](https://echarts.apache.org/zh/index.html) | 一个基于JavaScript的开源可视化图表库 |
| [TypeScript](https://ts.nodejs.cn/) | TypeScript 是具有类型语法的 JavaScript |


## 代码目录结构
```
src                                # 页面代码
├── api                            # 全局api
├── ├── mock                       # 全局api Mock
│   │   ├── pages                  # 页面api目录
│   │   │   ├── modeling           # 页面api领域目录
│   │   │   │   ├── org.ts         # 页面api Mock
│   │   │   │   └── ...            # 其他页面api Mock
│   │   └── index.js               # 页面Mock api汇总
├── modules                        # 领域模块层
│   ├── demo                       # 示例模块
│   │   ├── api                    # 领域模块接口
│   │   │   ├── model              # 领域模块接口模型目录
│   │   │   │   ├── orgModel.ts    # 功能接口模型
│   │   │   │   └── ...            # 其他功能接口模型
│   │   │   ├── org.ts             # 功能接口
│   │   │   └── ...                # 其他功能接口
│   │   ├── assets                 # 领域模块静态资源
│   │   ├── components             # 领域模块组件
│   │   ├── locales                # 领域模块国际化
│   │   │   ├── lang               # 领域模块多语言目录
│   │   │   │   ├── zh-CN          # 中文目录
│   │   │   │   │   ├── pages      # 所有功能中文目录
│   │   │   │   │   │   ├── org.ts # 功能中文
│   │   │   │   │   │   ├── ...    # 其他功能中文
│   │   │   │   │   ├── index.ts   # 所有功能中文汇总
│   │   │   │   ├── en-US          # 英文目录
│   │   │   │   └── ...            # 其他语言目录
│   │   ├── pages                  # 领域模块页面
│   │   │   ├── org                # 功能页面目录
│   │   │   │   ├── index.vue      # 功能页面代码
│   │   │   └── ...                # 其他功能页面
│   │   ├── router                 # 领域模块路由
│   │   │   ├── pages              # 功能页面路由目录
│   │   │   │   ├── org.ts         # 功能页面子路由
│   │   │   └── index.ts           # 领域模块路由汇总
│   │   └── store                  # 领域模块状态管理
│   ├── andon                      # 安灯
│   ├── control                    # 生产
│   ├── equipment                  # 设备
│   ├── modeling                   # 建模
│   ├── process                    # 工艺
│   ├── quality                    # 质量
│   ├── system                     # 系统
│   └── warehouse                  # 仓库
├── components                     # 全局组件
├── utils                          # 全局工具
└── App.vue                        # Portal 入口页面
.env                               # 生产环境变量
.env.development                   # 开发环境变量
vite.config.js                     # vite 配置文件（proxy代理配置）
```

## 代码提交规范
| 类型       | 含义                           | 示例                               |
| ---------- | ------------------------------ | ---------------------------------- |
| build      | 构建系统或外部依赖的变更       | `build: 更新构建工具或依赖库`       |
| chore      | 项目配置或工具的变更           | `chore: 更新项目配置或工具`         |
| ci         | 持续集成 (CI) 配置的变更       | `ci: 更新 CI/CD 配置文件`           |
| docs       | 文档的变更                     | `docs: 更新文档`                    |
| feat       | 新功能的添加                   | `feat: 添加新功能`                  |
| fix        | 修复 bug                       | `fix: 修复 bug`                     |
| perf       | 性能优化的提交                 | `perf: 提交性能优化代码`            |
| refactor   | 代码重构，不涉及功能变更       | `refactor: 代码重构`                |
| revert     | 撤销之前的提交                 | `revert: 撤销之前的提交`            |
| style      | 代码风格变更                   | `style: 代码风格变更`               |
| test       | 添加或修改测试代码             | `test: 添加或修改测试代码`          |
| types      | TypeScript 类型定义文件的变更  | `types: 更新类型定义文件`            |