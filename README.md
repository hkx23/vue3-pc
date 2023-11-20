# Web桌面端

## 代码目录结构
```
src                                # 页面代码
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