import {
  DEFAULT_PREFERENCE,
  RouteData,
  ROUTES,
  RoutePreference,
  clearCurrentRoutes,
  getCurrentRoutesForPreference,
  getFavoriteIds,
  getRoutePreference,
  readNumberDataset,
  saveCurrentRoutes,
  toggleFavorite,
} from '../../utils/routes'
import { getMenuBottomSafeRpx } from '../../utils/layout'
import { generateRoutes as requestGenerateRoutes } from '../../utils/api'

interface RouteCardView extends RouteData {
  favorited: boolean
}

interface RoutesData {
  routes: RouteCardView[]
  city: string
  duration: string
  budget: string
  topSafeRpx: number
  loading: boolean
  statusText: string
}

interface RoutesCustom {
  refreshRoutes(): void
  generateForPreference(preference: RoutePreference): void
  retryGenerate(): void
  applyFavoriteState(routes: RouteData[]): RouteCardView[]
  openDetail(event: WechatMiniprogram.BaseEvent): void
  handleFavorite(event: WechatMiniprogram.BaseEvent): void
}

Page<RoutesData, RoutesCustom>({
  data: {
    routes: [],
    city: '杭州',
    duration: '半天',
    budget: '免费',
    topSafeRpx: getMenuBottomSafeRpx(18),
    loading: false,
    statusText: '',
  },

  onShow() {
    this.refreshRoutes()
  },

  refreshRoutes() {
    const preference = getRoutePreference()
    const cachedRoutes = getCurrentRoutesForPreference(preference)
    this.setData({
      city: preference.city,
      duration: preference.duration,
      budget: preference.budget,
    })

    if (cachedRoutes) {
      this.setData({
        routes: this.applyFavoriteState(cachedRoutes),
        loading: false,
        statusText: '',
      })
      return
    }

    this.generateForPreference(preference)
  },

  generateForPreference(preference) {
    if (this.data.loading) {
      return
    }

    this.setData({
      routes: [],
      loading: true,
      statusText: `正在为${preference.city}生成路线`,
    })

    requestGenerateRoutes(preference)
      .then(routes => {
        saveCurrentRoutes(routes, preference)
        this.setData({
          routes: this.applyFavoriteState(routes),
          loading: false,
          statusText: '',
        })
      })
      .catch(() => {
        if (preference.city === DEFAULT_PREFERENCE.city) {
          saveCurrentRoutes(ROUTES, preference)
          this.setData({
            routes: this.applyFavoriteState(ROUTES),
            loading: false,
            statusText: '',
          })
          return
        }

        clearCurrentRoutes()
        this.setData({
          routes: [],
          loading: false,
          statusText: '路线生成失败，请回到探索页重试',
        })
        wx.showToast({
          title: '生成失败，请稍后重试',
          icon: 'none',
        })
      })
  },

  retryGenerate() {
    this.generateForPreference(getRoutePreference())
  },

  applyFavoriteState(routes) {
    const favoriteSet = new Set(getFavoriteIds())
    return routes.map(route => ({
      ...route,
      favorited: favoriteSet.has(route.id),
    }))
  },

  openDetail(event) {
    const routeId = readNumberDataset(event, 'id')
    wx.navigateTo({
      url: `/pages/route-detail/route-detail?id=${routeId}`,
    })
  },

  handleFavorite(event) {
    const routeId = readNumberDataset(event, 'id')
    toggleFavorite(routeId)
    this.setData({
      routes: this.applyFavoriteState(this.data.routes),
    })
  },
})
