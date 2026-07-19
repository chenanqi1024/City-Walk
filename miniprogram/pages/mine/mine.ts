import { RouteData, getCurrentRoutes, getFavoriteIds, readNumberDataset } from '../../utils/routes'
import { getMenuBottomSafeRpx } from '../../utils/layout'

interface MineData {
  favoriteRoutes: RouteData[]
  favoriteCount: number
  walkCount: number
  totalDistance: string
  profileTopPaddingRpx: number
  menuItems: Array<{
    label: string
    icon: string
  }>
}

interface MineCustom {
  refreshFavorites(): void
  openDetail(event: WechatMiniprogram.BaseEvent): void
}

function formatTotalDistance(routes: RouteData[]): string {
  const total = routes.reduce((sum, route) => {
    const value = Number(route.distance.replace('km', ''))
    return Number.isNaN(value) ? sum : sum + value
  }, 0)
  return total.toFixed(1)
}

Page<MineData, MineCustom>({
  data: {
    favoriteRoutes: [],
    favoriteCount: 0,
    walkCount: 3,
    totalDistance: '0.0',
    profileTopPaddingRpx: getMenuBottomSafeRpx(22),
    menuItems: [
      { label: '足迹地图', icon: '⌖' },
      { label: '步行统计', icon: '⌁' },
      { label: '关于我们', icon: '◇' },
    ],
  },

  onShow() {
    this.refreshFavorites()
  },

  refreshFavorites() {
    const favoriteSet = new Set(getFavoriteIds())
    const favoriteRoutes = getCurrentRoutes().filter(route => favoriteSet.has(route.id))
    this.setData({
      favoriteRoutes,
      favoriteCount: favoriteRoutes.length,
      walkCount: favoriteRoutes.length + 3,
      totalDistance: formatTotalDistance(favoriteRoutes),
    })
  },

  openDetail(event) {
    const routeId = readNumberDataset(event, 'id')
    wx.navigateTo({
      url: `/pages/route-detail/route-detail?id=${routeId}`,
    })
  },
})
