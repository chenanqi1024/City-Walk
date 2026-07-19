# AGENTS.md

## 项目说明
本项目是一个微信小程序：City Walk 周末行。

## 技术栈
- 前端：微信小程序官方 TypeScript + Less
- 地图：微信小程序内置 `map` 组件
- 持久化：微信本地缓存

## 核心流程
首页选择城市、时长、预算  
→ 点击生成路线  
→ 查看路线列表  
→ 进入路线详情  
→ 打开地图查看 POI
→ 收藏路线  
→ 在“我的”页查看收藏

## 设计稿
功能、样式等请完全参考 Figma Make 设计稿：`https://www.figma.com/make/i1x08RvNEJLvmK65tMwGi6/CityWalk-mp--Community-?t=Jd9T06tzygoeSy2U-1`
请确保通过 MCP 成功读取 Figma Make 设计稿（推荐使用`get_design_context`），而不是通过链接拿到截图。
底部 Tabbar 包含 探索、路线、发现、我的 4个 Tab 页，请使用系统默认的 Tabbar。

## 云端 API
当前版本暂不接入云端 API

## 小程序注意事项
- 尽量使用 rpx 作为长度单位，小程序的屏幕宽度设计是 750rpx；
- 宽度需要自定义的控件不要使用 `button`，因为系统的 `button` 不支持宽度修改。
- miniprogram 文件夹不放大图/大文件（因为小程序 2MB 限制）

## 验收标准
- 没有语法错误
- 保证代码可以成功编译
- 过程文件请不要加入 git
- 每次完成任务后请在项目根目录 logs 文件夹写入改动日志（包含 日期时间、用户输入的 Prompt、改动范围等）
