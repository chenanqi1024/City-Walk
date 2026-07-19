# 改动日志

- 时间：2026-07-20 00:57:08 CST
- 用户 Prompt：`那现在我应该做什么`
- 问题背景：
  - 切换城市只更新了路线偏好和首页附近好去处，路线页仍读取旧的 `citywalk:current-routes` 缓存，因此可能出现“城市显示上海，但推荐路线仍是杭州”的错位。
- 改动范围：
  - `miniprogram/utils/routes.ts` 新增路线缓存元数据 `citywalk:current-routes-meta`，记录路线对应的城市、时长、预算和生成时间。
  - 新增 `getCurrentRoutesForPreference` 和 `clearCurrentRoutes`，路线缓存只有在城市、时长、预算完全一致时才会被使用。
  - 首页切换城市、时长、预算时清空旧路线缓存。
  - 首页生成路线成功后，将路线和当前偏好一起缓存。
  - 路线页若发现没有当前条件的缓存，会自动调用后端重新生成路线；失败时显示空状态和重新生成入口，不再展示旧城市路线。
- 验证：
  - `npx --yes -p typescript@5.9.3 tsc --noEmit` 通过。
  - 页面路径自检通过。
  - TabBar 图标路径自检通过。
  - `miniprogram` 目录约 220KB。
