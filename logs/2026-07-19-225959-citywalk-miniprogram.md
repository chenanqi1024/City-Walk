# 改动日志

- 时间：2026-07-19 22:59:59 CST
- 用户 Prompt：`[@build-ios-apps](plugin://build-ios-apps@openai-curated-remote) [@figma](plugin://figma@openai-curated-remote) 根据AGENTS.md完成小程序`
- Figma 读取：已通过 Figma MCP `get_design_context` 成功读取 Figma Make 文件 `i1x08RvNEJLvmK65tMwGi6`，并参考入口 `src/app/App.tsx` 与主题色实现。
- 改动范围：
  - 更新 `miniprogram/app.json`，增加探索、路线、发现、我的 4 个系统 Tab 页，以及详情页、地图页。
  - 新增本地路线数据、收藏缓存、路线偏好、地图 marker/polyline 工具：`miniprogram/utils/routes.ts`。
  - 重写探索首页，支持城市、时长、预算选择与生成路线流程。
  - 新增路线列表页、路线详情页、内置 map 地图页、发现页、我的收藏页。
  - 更新全局样式与 TypeScript 配置，跳过微信官方声明文件内部检查。
- 验证：
  - `npx --yes -p typescript@5.9.3 tsc --noEmit` 通过。
  - 所有小程序 JSON 文件可解析。
  - `app.json` 页面路径与 4 项系统 TabBar 自检通过。
  - `miniprogram` 目录约 168KB，未加入大图或大文件。
- 备注：微信开发者工具 `preview` 会触发外部预览服务打包发送，已被安全策略拦截，未执行。
