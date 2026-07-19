export interface RoutePoint {
  id: number
  poiId?: string
  name: string
  desc: string
  latitude: number
  longitude: number
  address?: string
  category?: string
  stayMinutes?: number
}

export interface RouteData {
  id: number
  title: string
  shortDesc: string
  desc: string
  tags: string[]
  rating: number
  reviews: number
  distance: string
  time: string
  difficulty: string
  spots: number
  cover: string
  coverTheme?: string
  coverSource?: string
  highlights: string[]
  points: RoutePoint[]
  center: {
    latitude: number
    longitude: number
  }
}

export interface RoutePreference {
  city: string
  duration: string
  budget: string
}

export interface RouteCacheMeta extends RoutePreference {
  generatedAt: number
}

export interface NearbyPlace {
  id: string
  name: string
  type: string
  dist: string
  img: string
  latitude?: number
  longitude?: number
}

export interface CityCard {
  name: string
  sub: string
  img: string
}

export interface Article {
  id: number
  title: string
  author: string
  reads: string
  img: string
}

export interface MapMarker {
  id: number
  latitude: number
  longitude: number
  title: string
  width: number
  height: number
  callout: {
    content: string
    color: string
    bgColor: string
    padding: number
    borderRadius: number
    display: 'ALWAYS' | 'BYCLICK'
  }
}

export interface MapPolyline {
  points: Array<{
    latitude: number
    longitude: number
  }>
  color: string
  width: number
  dottedLine: boolean
  arrowLine: boolean
}

const FAVORITES_KEY = 'citywalk:favorites'
const PREFERENCE_KEY = 'citywalk:preference'
const CURRENT_ROUTES_KEY = 'citywalk:current-routes'
const CURRENT_ROUTES_META_KEY = 'citywalk:current-routes-meta'

export const DEFAULT_PREFERENCE: RoutePreference = {
  city: '杭州',
  duration: '半天',
  budget: '免费',
}

export const ROUTES: RouteData[] = [
  {
    id: 1,
    title: '西湖古韵半日游',
    shortDesc: '穿越断桥白堤，邂逅千年诗意',
    desc: '沿着白堤漫步，感受苏堤春晓的绝美景致，探访孤山梅花，于平湖秋月品茶听曲，最后在楼外楼尝一口正宗西湖醋鱼，将一个午后过成一首诗。',
    tags: ['文化', '历史', '拍照'],
    rating: 4.9,
    reviews: 328,
    distance: '4.2km',
    time: '3小时',
    difficulty: '轻松',
    spots: 6,
    cover: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=750&h=560&fit=crop&auto=format',
    center: { latitude: 30.2567, longitude: 120.1483 },
    highlights: [
      '断桥残雪观景台，一城山色半城湖',
      '白堤千株桃柳，春日最美漫步道',
      '平湖秋月茶室，月下品茶听曲',
      '楼外楼百年老店，正宗西湖醋鱼',
    ],
    points: [
      { id: 1, name: '断桥残雪', desc: '西湖十景之首，登桥眺望一城山色', latitude: 30.2636, longitude: 120.1529 },
      { id: 2, name: '白堤', desc: '白居易修筑，千株桃柳春日最美', latitude: 30.2602, longitude: 120.1488 },
      { id: 3, name: '平湖秋月', desc: '月下赏湖绝佳位置，可品茶休憩', latitude: 30.2559, longitude: 120.1465 },
      { id: 4, name: '孤山公园', desc: '西湖最大岛屿，梅花盛开如雪', latitude: 30.2539, longitude: 120.1436 },
      { id: 5, name: '西泠印社', desc: '百年金石篆刻，天下第一名社', latitude: 30.2516, longitude: 120.1431 },
      { id: 6, name: '楼外楼', desc: '百年老字号，必尝西湖醋鱼套餐', latitude: 30.2508, longitude: 120.1475 },
    ],
  },
  {
    id: 2,
    title: '河坊街烟火气漫步',
    shortDesc: '走进老杭州的市井日常与古街滋味',
    desc: '从南宋御街出发，穿过胡庆余堂的药香，在大井巷尝遍地道小吃，走进元宝街窥见清代民居，最后登上吴山广场，将杭城全景尽收眼底。',
    tags: ['美食', '市井', '老街'],
    rating: 4.7,
    reviews: 215,
    distance: '2.8km',
    time: '2.5小时',
    difficulty: '轻松',
    spots: 5,
    cover: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=750&h=560&fit=crop&auto=format',
    center: { latitude: 30.2445, longitude: 120.1714 },
    highlights: [
      '河坊街老字号林立，南宋市井重现',
      '胡庆余堂，国家重点文保单位',
      '大井巷美食集市，地道小吃打卡',
      '吴山广场登高，眺望西湖全景',
    ],
    points: [
      { id: 1, name: '河坊街入口', desc: '最热闹的历史街区入口广场', latitude: 30.2452, longitude: 120.1712 },
      { id: 2, name: '胡庆余堂', desc: '百年中药老店，国家重点文保', latitude: 30.2438, longitude: 120.1702 },
      { id: 3, name: '大井巷', desc: '小吃云集，定胜糕、葱包烩必吃', latitude: 30.2441, longitude: 120.1687 },
      { id: 4, name: '元宝街', desc: '清代民居石板巷，时光倒流', latitude: 30.2425, longitude: 120.1664 },
      { id: 5, name: '吴山广场', desc: '登高远眺，杭城与西湖尽在眼下', latitude: 30.2459, longitude: 120.1652 },
    ],
  },
  {
    id: 3,
    title: '良渚文明探秘一日游',
    shortDesc: '走进五千年文明，与史前智慧对话',
    desc: '从良渚博物院出发，深入遗址公园核心区，登上莫角山台地感受王城气势，最后漫步美丽洲公园湿地，感受史前文明与现代自然的奇妙交融。',
    tags: ['历史', '亲子', '博物馆'],
    rating: 4.8,
    reviews: 189,
    distance: '6.5km',
    time: '全天',
    difficulty: '中等',
    spots: 4,
    cover: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=750&h=560&fit=crop&auto=format',
    center: { latitude: 30.3956, longitude: 120.0459 },
    highlights: [
      '良渚博物院，国宝玉琮近在咫尺',
      '遗址公园核心区，五千年都城',
      '莫角山宫殿台地，俯瞰良渚全貌',
      '美丽洲湿地公园，自然放松收尾',
    ],
    points: [
      { id: 1, name: '良渚博物院', desc: '五千年文明见证，玉琮玉璧不可错过', latitude: 30.3951, longitude: 120.0504 },
      { id: 2, name: '遗址公园', desc: '良渚古城核心区，史前都城遗迹', latitude: 30.3986, longitude: 120.0438 },
      { id: 3, name: '莫角山', desc: '良渚王城宫殿台地，登高俯瞰', latitude: 30.4015, longitude: 120.0388 },
      { id: 4, name: '美丽洲公园', desc: '湿地生态公园，自然放松完美收尾', latitude: 30.3908, longitude: 120.0449 },
    ],
  },
]

export const NEARBY_PLACES: NearbyPlace[] = [
  { id: 'local-1', name: '西湖音乐喷泉', type: '景点', dist: '0.8km', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format' },
  { id: 'local-2', name: '南山路咖啡街', type: '美食', dist: '1.2km', img: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=300&h=200&fit=crop&auto=format' },
  { id: 'local-3', name: '龙井问茶', type: '文化', dist: '3.5km', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop&auto=format' },
  { id: 'local-4', name: '湖滨步行街', type: '购物', dist: '0.5km', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop&auto=format' },
]

export const HOT_CITIES: CityCard[] = [
  { name: '上海', sub: '外滩·弄堂·咖啡馆', img: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=400&h=240&fit=crop&auto=format' },
  { name: '成都', sub: '宽窄巷子·火锅·茶馆', img: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&h=240&fit=crop&auto=format' },
]

export const DISCOVER_ARTICLES: Article[] = [
  { id: 1, title: '杭州最美秋日漫步路线合集', author: '城市漫游者', reads: '2.3k', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=180&fit=crop&auto=format' },
  { id: 2, title: '一个人的成都：慢游宽窄巷子', author: '独行客Leo', reads: '1.8k', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=180&fit=crop&auto=format' },
  { id: 3, title: '上海法租界弄堂深度探访', author: '魔都漫步', reads: '3.1k', img: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=180&fit=crop&auto=format' },
]

export const DISCOVER_TOPICS = ['# 周末去哪', '# 独游攻略', '# 亲子路线', '# 摄影打卡', '# 美食探店']

export function getRouteById(id: number): RouteData {
  return getCurrentRoutes().find(route => route.id === id) || ROUTES.find(route => route.id === id) || ROUTES[0]
}

export function getCurrentRoutes(): RouteData[] {
  const saved = wx.getStorageSync(CURRENT_ROUTES_KEY) as unknown
  if (isRouteDataArray(saved)) {
    return saved
  }
  return ROUTES
}

export function getCurrentRoutesForPreference(preference: RoutePreference): RouteData[] | null {
  const meta = getCurrentRoutesMeta()
  if (!meta || !isSamePreference(meta, preference)) {
    return null
  }

  const saved = wx.getStorageSync(CURRENT_ROUTES_KEY) as unknown
  return isRouteDataArray(saved) ? saved : null
}

export function saveCurrentRoutes(routes: RouteData[], preference?: RoutePreference): void {
  wx.setStorageSync(CURRENT_ROUTES_KEY, routes.length > 0 ? routes : ROUTES)
  if (preference) {
    wx.setStorageSync(CURRENT_ROUTES_META_KEY, {
      ...preference,
      generatedAt: Date.now(),
    })
  }
}

export function clearCurrentRoutes(): void {
  wx.removeStorageSync(CURRENT_ROUTES_KEY)
  wx.removeStorageSync(CURRENT_ROUTES_META_KEY)
}

function getCurrentRoutesMeta(): RouteCacheMeta | null {
  const saved = wx.getStorageSync(CURRENT_ROUTES_META_KEY) as unknown
  if (!saved || typeof saved !== 'object') {
    return null
  }

  const meta = saved as Partial<RouteCacheMeta>
  if (
    typeof meta.city !== 'string'
    || typeof meta.duration !== 'string'
    || typeof meta.budget !== 'string'
    || typeof meta.generatedAt !== 'number'
  ) {
    return null
  }

  return {
    city: meta.city,
    duration: meta.duration,
    budget: meta.budget,
    generatedAt: meta.generatedAt,
  }
}

function isSamePreference(meta: RoutePreference, preference: RoutePreference): boolean {
  return meta.city === preference.city
    && meta.duration === preference.duration
    && meta.budget === preference.budget
}

function isRouteDataArray(value: unknown): value is RouteData[] {
  return Array.isArray(value) && value.every(route => {
    if (!route || typeof route !== 'object') {
      return false
    }
    const candidate = route as Partial<RouteData>
    return typeof candidate.id === 'number'
      && typeof candidate.title === 'string'
      && typeof candidate.cover === 'string'
      && Array.isArray(candidate.points)
      && candidate.points.length > 0
      && candidate.center !== undefined
      && typeof candidate.center.latitude === 'number'
      && typeof candidate.center.longitude === 'number'
  })
}

export function getRoutePreference(): RoutePreference {
  const saved = wx.getStorageSync(PREFERENCE_KEY) as Partial<RoutePreference> | ''
  if (!saved || typeof saved !== 'object') {
    return DEFAULT_PREFERENCE
  }

  return {
    city: typeof saved.city === 'string' ? saved.city : DEFAULT_PREFERENCE.city,
    duration: typeof saved.duration === 'string' ? saved.duration : DEFAULT_PREFERENCE.duration,
    budget: typeof saved.budget === 'string' ? saved.budget : DEFAULT_PREFERENCE.budget,
  }
}

export function saveRoutePreference(preference: RoutePreference): void {
  wx.setStorageSync(PREFERENCE_KEY, preference)
}

export function getFavoriteIds(): number[] {
  const saved = wx.getStorageSync(FAVORITES_KEY) as unknown
  if (!Array.isArray(saved)) {
    return []
  }
  return saved.filter((id): id is number => typeof id === 'number')
}

export function toggleFavorite(routeId: number): number[] {
  const next = new Set(getFavoriteIds())
  if (next.has(routeId)) {
    next.delete(routeId)
  } else {
    next.add(routeId)
  }
  const favoriteIds = Array.from(next)
  wx.setStorageSync(FAVORITES_KEY, favoriteIds)
  return favoriteIds
}

export function buildMapMarkers(route: RouteData, activePointId: number): MapMarker[] {
  return route.points.map(point => ({
    id: point.id,
    latitude: point.latitude,
    longitude: point.longitude,
    title: point.name,
    width: point.id === activePointId ? 34 : 28,
    height: point.id === activePointId ? 34 : 28,
    callout: {
      content: `${point.id}. ${point.name}`,
      color: '#ffffff',
      bgColor: point.id === activePointId ? '#5B8C5E' : '#7AAD7D',
      padding: 8,
      borderRadius: 18,
      display: point.id === activePointId ? 'ALWAYS' : 'BYCLICK',
    },
  }))
}

export function buildMapPolyline(route: RouteData): MapPolyline[] {
  return [{
    points: route.points.map(point => ({
      latitude: point.latitude,
      longitude: point.longitude,
    })),
    color: '#5B8C5EDD',
    width: 5,
    dottedLine: true,
    arrowLine: true,
  }]
}

export function readNumberDataset(event: WechatMiniprogram.BaseEvent, key: string): number {
  const value = event.currentTarget.dataset[key]
  if (typeof value === 'number') {
    return value
  }
  if (typeof value === 'string') {
    return Number(value)
  }
  return 0
}

export function readStringDataset(event: WechatMiniprogram.BaseEvent, key: string): string {
  const value = event.currentTarget.dataset[key]
  return typeof value === 'string' ? value : String(value || '')
}
