import { DISCOVER_ARTICLES, DISCOVER_TOPICS, Article } from '../../utils/routes'
import { getMenuBottomSafeRpx } from '../../utils/layout'

interface DiscoverData {
  articles: Article[]
  topics: string[]
  bannerImage: string
  topSafeRpx: number
}

Page<DiscoverData, object>({
  data: {
    articles: DISCOVER_ARTICLES,
    topics: DISCOVER_TOPICS,
    bannerImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=750&h=315&fit=crop&auto=format',
    topSafeRpx: getMenuBottomSafeRpx(18),
  },
})
