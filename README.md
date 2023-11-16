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