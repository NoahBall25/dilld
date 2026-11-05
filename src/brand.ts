// The DILL'D logo exported from Stitch lives at public/brand/logo.png.
// Everything that shows the logo falls back to the text wordmark if it's missing.

export const LOGO_URL = '/brand/logo.png'

export const brand: { logo: HTMLImageElement | null } = { logo: null }

export function loadBrand(): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      brand.logo = img
      resolve()
    }
    img.onerror = () => resolve()
    img.src = LOGO_URL
  })
}
