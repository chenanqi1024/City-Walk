import {
  RouteData,
  RoutePoint,
  MapMarker,
  MapPolyline,
  buildMapMarkers,
  buildMapPolyline,
  getCurrentRoutes,
  getRouteById,
  readNumberDataset,
} from '../../utils/routes'
import { getMenuBottomSafeRpx, getTopSafeRpx } from '../../utils/layout'

interface RouteMapData {
  route: RouteData
  markers: MapMarker[]
  polyline: MapPolyline[]
  activePointId: number
  activePoint: RoutePoint
  drawerOpen: boolean
  latitude: number
  longitude: number
  controlTopRpx: number
  pillTopRpx: number
}

interface RouteMapCustom {
  loadRoute(id: number): void
  setActivePoint(pointId: number): void
  selectMarker(event: WechatMiniprogram.CustomEvent<{ markerId: number }>): void
  selectPoint(event: WechatMiniprogram.BaseEvent): void
  toggleDrawer(): void
  goBack(): void
}

Page<RouteMapData, RouteMapCustom>({
  data: {
    route: getCurrentRoutes()[0],
    markers: buildMapMarkers(getCurrentRoutes()[0], getCurrentRoutes()[0].points[0].id),
    polyline: buildMapPolyline(getCurrentRoutes()[0]),
    activePointId: getCurrentRoutes()[0].points[0].id,
    activePoint: getCurrentRoutes()[0].points[0],
    drawerOpen: false,
    latitude: getCurrentRoutes()[0].center.latitude,
    longitude: getCurrentRoutes()[0].center.longitude,
    controlTopRpx: getTopSafeRpx(20),
    pillTopRpx: getMenuBottomSafeRpx(12),
  },

  onLoad(query) {
    const firstRoute = getCurrentRoutes()[0]
    const routeId = Number(query.id || firstRoute.id)
    this.loadRoute(Number.isNaN(routeId) ? firstRoute.id : routeId)
  },

  loadRoute(id) {
    const route = getRouteById(id)
    const firstPoint = route.points[0]
    this.setData({
      route,
      polyline: buildMapPolyline(route),
      activePointId: firstPoint.id,
      activePoint: firstPoint,
      markers: buildMapMarkers(route, firstPoint.id),
      latitude: route.center.latitude,
      longitude: route.center.longitude,
    })
  },

  setActivePoint(pointId) {
    const activePoint = this.data.route.points.find(point => point.id === pointId) || this.data.route.points[0]
    this.setData({
      activePointId: activePoint.id,
      activePoint,
      markers: buildMapMarkers(this.data.route, activePoint.id),
      latitude: activePoint.latitude,
      longitude: activePoint.longitude,
    })
  },

  selectMarker(event) {
    this.setActivePoint(event.detail.markerId)
  },

  selectPoint(event) {
    const pointId = readNumberDataset(event, 'id')
    this.setActivePoint(pointId)
    this.setData({ drawerOpen: false })
  },

  toggleDrawer() {
    this.setData({
      drawerOpen: !this.data.drawerOpen,
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
