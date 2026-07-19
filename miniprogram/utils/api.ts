import {
  NEARBY_PLACES,
  ROUTES,
  NearbyPlace,
  RouteData,
  RoutePoint,
  RoutePreference,
} from './routes'

const API_BASE_URL = 'https://citywalk-fzgahtvdow.cn-hangzhou.fcapp.run'

export interface CloudCity {
  slug: string
  name: string
  isDefault: boolean
  center: {
    latitude: number
    longitude: number
  }
}

export interface CityDirectoryResponse {
  defaultCity: string
  cities: CloudCity[]
}

interface ApiNearbyPlace {
  poiId: string
  name: string
  type: string
  dist: string
  latitude: number
  longitude: number
  img: string
}

interface NearbyResponse {
  city: string
  count: number
  nearby: ApiNearbyPlace[]
}

interface ApiRoutePoint {
  id: string
  order?: number
  name: string
  desc: string
  tags: string[]
  latitude: number
  longitude: number
  address?: string
  category?: string
  stayMinutes?: number
}

interface GeneratedRoute {
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
  points: ApiRoutePoint[]
  center: {
    latitude: number
    longitude: number
  }
}

interface GenerateRouteResponse {
  city: string
  generationSource: 'deepseek' | 'rules-fallback'
  generationError?: string
  routes: GeneratedRoute[]
}

interface RequestOptions {
  method?: 'GET' | 'POST'
  data?: object
}

function buildUrl(path: string, query?: Record<string, string | number | undefined>): string {
  if (!query) {
    return `${API_BASE_URL}${path}`
  }

  const search = Object.keys(query)
    .filter(key => query[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(String(query[key]))}`)
    .join('&')

  return search ? `${API_BASE_URL}${path}?${search}` : `${API_BASE_URL}${path}`
}

function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE_URL}${path}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'content-type': 'application/json',
      },
      timeout: 15000,
      success: response => {
        const statusCode = response.statusCode
        if (statusCode >= 200 && statusCode < 300) {
          resolve(response.data as T)
          return
        }

        const message = parseErrorMessage(response.data)
        reject(new Error(message || `请求失败：${statusCode}`))
      },
      fail: error => {
        reject(new Error(error.errMsg || '网络请求失败'))
      },
    })
  })
}

function parseErrorMessage(data: unknown): string {
  if (data && typeof data === 'object') {
    const candidate = data as { message?: unknown }
    if (typeof candidate.message === 'string') {
      return candidate.message
    }
  }
  return ''
}

export function listCities(): Promise<CityDirectoryResponse> {
  return request<CityDirectoryResponse>('/cities')
}

export function listNearbyPlaces(city: string): Promise<NearbyPlace[]> {
  const path = buildUrl('/nearby', { city, limit: 4 }).replace(API_BASE_URL, '')
  return request<NearbyResponse>(path).then(response => normalizeNearbyPlaces(response.nearby))
}

export function generateRoutes(preference: RoutePreference): Promise<RouteData[]> {
  return request<GenerateRouteResponse>('/generateRoute', {
    method: 'POST',
    data: {
      city: preference.city,
      duration: preference.duration,
      budget: preference.budget,
      count: 3,
      preferences: [],
    },
  }).then(response => normalizeGeneratedRoutes(response.routes))
}

function normalizeNearbyPlaces(nearby: ApiNearbyPlace[]): NearbyPlace[] {
  const normalized = nearby
    .filter(place => place.img.startsWith('https://'))
    .map(place => ({
      id: place.poiId,
      name: place.name,
      type: place.type,
      dist: place.dist,
      img: place.img,
      latitude: place.latitude,
      longitude: place.longitude,
    }))

  return normalized.length > 0 ? normalized : NEARBY_PLACES
}

function normalizeGeneratedRoutes(routes: GeneratedRoute[]): RouteData[] {
  const normalized = routes.map((route, index) => normalizeGeneratedRoute(route, index))
  return normalized.length > 0 ? normalized : ROUTES
}

function normalizeGeneratedRoute(route: GeneratedRoute, index: number): RouteData {
  const fallback = ROUTES[index % ROUTES.length]
  const center = isValidLocation(route.center) ? route.center : fallback.center
  const points = normalizeRoutePoints(route.points, center, route.title, route.shortDesc)

  return {
    id: typeof route.id === 'number' ? route.id : index + 1,
    title: route.title || fallback.title,
    shortDesc: route.shortDesc || fallback.shortDesc,
    desc: route.desc || fallback.desc,
    tags: Array.isArray(route.tags) && route.tags.length > 0 ? route.tags : fallback.tags,
    rating: typeof route.rating === 'number' ? route.rating : fallback.rating,
    reviews: typeof route.reviews === 'number' ? route.reviews : fallback.reviews,
    distance: route.distance || fallback.distance,
    time: route.time || fallback.time,
    difficulty: route.difficulty || fallback.difficulty,
    spots: typeof route.spots === 'number' ? route.spots : points.length,
    cover: route.cover && route.cover.startsWith('https://') ? route.cover : fallback.cover,
    coverTheme: route.coverTheme,
    coverSource: route.coverSource,
    highlights: Array.isArray(route.highlights) && route.highlights.length > 0 ? route.highlights : fallback.highlights,
    points,
    center,
  }
}

function normalizeRoutePoints(
  points: ApiRoutePoint[],
  center: { latitude: number; longitude: number },
  title: string,
  shortDesc: string,
): RoutePoint[] {
  const normalized = Array.isArray(points)
    ? points.filter(point => isValidLocation(point)).map((point, index) => ({
      id: typeof point.order === 'number' && point.order > 0 ? point.order : index + 1,
      poiId: point.id,
      name: point.name,
      desc: point.desc,
      latitude: point.latitude,
      longitude: point.longitude,
      address: point.address,
      category: point.category,
      stayMinutes: point.stayMinutes,
    }))
    : []

  if (normalized.length > 0) {
    return normalized
  }

  return [{
    id: 1,
    name: title,
    desc: shortDesc,
    latitude: center.latitude,
    longitude: center.longitude,
  }]
}

function isValidLocation(value: unknown): value is { latitude: number; longitude: number } {
  if (!value || typeof value !== 'object') {
    return false
  }
  const location = value as { latitude?: unknown; longitude?: unknown }
  return typeof location.latitude === 'number' && typeof location.longitude === 'number'
}
