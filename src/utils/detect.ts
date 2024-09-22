// 浏览器嗅探
export function detect(navigator) {
  let environment = ''
  if (window.Telegram?.WebApp.initData) {
    environment = 'tg'
  } else {
    var ua = navigator.userAgent
    const chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)
    const webview =
      !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
    if (webview) {
      environment = 'webview'
    } else {
      environment = 'browser'
    }
  }

  // else if (webview) {
  //   var ua = navigator.userAgent
  //   var platform = navigator.platform
  //   var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)
  //   var webview =
  //     !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
  //
  // } else {
  //   environment = 'browser'
  // }
  return environment
}
