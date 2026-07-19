# 改动日志

- 时间：2026-07-19 23:23:55 CST
- 用户 Prompt：`下面的四个页面都没有相关的icon。此外，路线页的右上角和工具栏重叠了`
- 改动范围：
  - 新增系统 TabBar 本地图标资源：探索、路线、发现、我的，包含默认态与选中态。
  - 更新 `miniprogram/app.json`，为 4 个 Tab 页配置 `iconPath` 与 `selectedIconPath`。
  - 扩展 `miniprogram/utils/layout.ts`，新增按微信右上角胶囊按钮底边计算顶部安全距离的方法。
  - 路线页顶部改为使用胶囊按钮底边安全间距，避免右上角筛选胶囊与微信工具栏重叠。
  - 发现页、我的页、地图页顶部标题胶囊同步使用更稳的胶囊避让逻辑。
- 验证：
  - `npx --yes -p typescript@5.9.3 tsc --noEmit` 通过。
  - TabBar 图标路径自检通过。
  - `app.json` 页面文件路径自检通过。
  - `miniprogram` 目录约 204KB。
