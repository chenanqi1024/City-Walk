import {
  DEFAULT_PREFERENCE,
  HOT_CITIES,
  NEARBY_PLACES,
  ROUTES,
  RoutePreference,
  getRoutePreference,
  saveRoutePreference,
  saveCurrentRoutes,
  clearCurrentRoutes,
  readStringDataset,
} from '../../utils/routes'
import { getTopSafeRpx } from '../../utils/layout'
import { generateRoutes as requestGenerateRoutes, listCities, listNearbyPlaces } from '../../utils/api'

const FALLBACK_CITIES = ['杭州', '上海', '北京', '深圳']

interface IndexData {
  cities: string[]
  durations: string[]
  budgets: string[]
  formData: RoutePreference
  generating: boolean
  showCityPicker: boolean
  nearbyPlaces: typeof NEARBY_PLACES
  hotCities: typeof HOT_CITIES
  heroImage: string
  heroTopPaddingRpx: number
}

interface IndexCustom {
  toggleCityPicker(): void
  chooseCity(event: WechatMiniprogram.BaseEvent): void
  chooseDuration(event: WechatMiniprogram.BaseEvent): void
  chooseBudget(event: WechatMiniprogram.BaseEvent): void
  loadCitiesAndNearby(city: string): void
  loadNearby(city: string): void
  generateRoutes(): void
}

Page<IndexData, IndexCustom>({
  data: {
    cities: FALLBACK_CITIES,
    durations: ['半天', '一天'],
    budgets: ['免费', '≤100元', '≤300元'],
    formData: DEFAULT_PREFERENCE,
    generating: false,
    showCityPicker: false,
    nearbyPlaces: NEARBY_PLACES,
    hotCities: HOT_CITIES,
    heroImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=750&h=416&fit=crop&auto=format',
    heroTopPaddingRpx: getTopSafeRpx(18),
  },

  onLoad() {
    const formData = getRoutePreference()
    this.setData({ formData })
    saveRoutePreference(formData)
    this.loadCitiesAndNearby(formData.city)
  },

  toggleCityPicker() {
    this.setData({
      showCityPicker: !this.data.showCityPicker,
    })
  },

  chooseCity(event) {
    const city = readStringDataset(event, 'city')
    const formData = {
      ...this.data.formData,
      city,
    }
    saveRoutePreference(formData)
    clearCurrentRoutes()
    this.setData({
      formData,
      showCityPicker: false,
    })
    this.loadNearby(city)
  },

  chooseDuration(event) {
    const duration = readStringDataset(event, 'value')
    const formData = {
      ...this.data.formData,
      duration,
    }
    saveRoutePreference(formData)
    clearCurrentRoutes()
    this.setData({ formData })
  },

  chooseBudget(event) {
    const budget = readStringDataset(event, 'value')
    const formData = {
      ...this.data.formData,
      budget,
    }
    saveRoutePreference(formData)
    clearCurrentRoutes()
    this.setData({ formData })
  },

  loadCitiesAndNearby(city) {
    listCities()
      .then(directory => {
        const cities = directory.cities.map(item => item.name)
        const nextCities = cities.length > 0 ? cities : FALLBACK_CITIES
        const nextCity = nextCities.includes(city) ? city : directory.defaultCity
        const formData = {
          ...this.data.formData,
          city: nextCity,
        }
        saveRoutePreference(formData)
        this.setData({
          cities: nextCities,
          formData,
        })
        return this.loadNearby(nextCity)
      })
      .catch(() => {
        this.setData({ cities: FALLBACK_CITIES })
        this.loadNearby(city)
      })
  },

  loadNearby(city) {
    listNearbyPlaces(city)
      .then(nearbyPlaces => {
        this.setData({ nearbyPlaces })
      })
      .catch(() => {
        this.setData({ nearbyPlaces: NEARBY_PLACES })
      })
  },

  generateRoutes() {
    if (this.data.generating) {
      return
    }

    saveRoutePreference(this.data.formData)
    this.setData({ generating: true })
    wx.showLoading({ title: '智能生成中' })

    requestGenerateRoutes(this.data.formData)
      .then(routes => {
        saveCurrentRoutes(routes, this.data.formData)
        wx.hideLoading()
        this.setData({ generating: false })
        wx.switchTab({
          url: '/pages/routes/routes',
        })
      })
      .catch(() => {
        wx.hideLoading()
        this.setData({ generating: false })
        if (this.data.formData.city === DEFAULT_PREFERENCE.city) {
          saveCurrentRoutes(ROUTES, this.data.formData)
          wx.showToast({
            title: '网络异常，已使用本地路线',
            icon: 'none',
          })
          wx.switchTab({
            url: '/pages/routes/routes',
          })
          return
        }

        clearCurrentRoutes()
        wx.showToast({
          title: '生成失败，请稍后重试',
          icon: 'none',
        })
      })
  },
})
