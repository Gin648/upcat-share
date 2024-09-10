// 浏览器嗅探
export function detect(navigator) {
  let environment = ''
  if (window.Telegram?.WebApp.initData) {
    environment = 'tg'
  } else if (webview) {
    var ua = navigator.userAgent
    var platform = navigator.platform
    var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)
    var webview =
      !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
    environment = 'webview'
  } else {
    environment = 'browser'
  }
  return environment
}
