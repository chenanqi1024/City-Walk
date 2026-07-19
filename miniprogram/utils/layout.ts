function getWindowWidth(): number {
  const info = wx.getSystemInfoSync()
  return info.windowWidth > 0 ? info.windowWidth : 375
}

function pxToRpx(px: number): number {
  return (px * 750) / getWindowWidth()
}

export function getTopSafeRpx(extraRpx: number): number {
  const info = wx.getSystemInfoSync()
  const statusBarHeight = typeof info.statusBarHeight === 'number' ? info.statusBarHeight : 24
  return Math.ceil(pxToRpx(statusBarHeight) + extraRpx)
}

export function getMenuBottomSafeRpx(extraRpx: number): number {
  try {
    const rect = wx.getMenuButtonBoundingClientRect()
    if (rect && rect.bottom > 0) {
      return Math.ceil(pxToRpx(rect.bottom) + extraRpx)
    }
  } catch (_error) {
    return getTopSafeRpx(extraRpx + 72)
  }

  return getTopSafeRpx(extraRpx + 72)
}
