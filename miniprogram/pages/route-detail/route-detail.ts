import {
  RouteData,
  getCurrentRoutes,
  getFavoriteIds,
  getRouteById,
  toggleFavorite,
} from '../../utils/routes'
import { getTopSafeRpx } from '../../utils/layout'

interface DetailData {
  route: RouteData
  favorited: boolean
  controlTopRpx: number
}

interface DetailCustom {
  loadRoute(id: number): void
  toggleFavorite(): void
  openMap(): void
  goBack(): void
}

Page<DetailData, DetailCustom>({
  data: {
    route: getCurrentRoutes()[0],
    favorited: false,
    controlTopRpx: getTopSafeRpx(20),
  },

  onLoad(query) {
    const firstRoute = getCurrentRoutes()[0]
    const routeId = Number(query.id || firstRoute.id)
    this.loadRoute(Number.isNaN(routeId) ? firstRoute.id : routeId)
  },

  onShow() {
    this.setData({
      favorited: getFavoriteIds().includes(this.data.route.id),
    })
  },

  loadRoute(id) {
    const route = getRouteById(id)
    this.setData({
      route,
      favorited: getFavoriteIds().includes(route.id),
    })
  },

  toggleFavorite() {
    toggleFavorite(this.data.route.id)
    this.setData({
      favorited: getFavoriteIds().includes(this.data.route.id),
    })
  },

  openMap() {
    wx.navigateTo({
      url: `/pages/route-map/route-map?id=${this.data.route.id}`,
    })
  },

  goBack() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack()
      return
    }

    wx.switchTab({
      url: '/pages/routes/routes',
    })
  },
})
