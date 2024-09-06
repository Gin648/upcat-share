// 获取svg
export const getSvg = (name) => {
  return new URL(`/src/assets/svg/${name}`, import.meta.url).href
}

export const getImage = (name) => {
  return new URL(`/src/assets/${name}`, import.meta.url).href
}