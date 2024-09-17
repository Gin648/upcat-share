import isFunction from 'lodash/isFunction'

/**
 * 图片资源预加载
 * @param {Array} urlArr 图片链接数组
 * @param {number} index 当前加载的是第几张图片
 * @param {function} imgLoadFn 单张图片加载成功的回调
 * @param {function} successFn 成功失败回调函数
 * @param {function} errorFn 加载失败回调函数
 */
const imgLoader = (urlArr, index, imgLoadFn, successFn, errorFn) => {
  if (index === urlArr.length && !urlArr[index]) return
  downloadPic(...arguments)
}

//  加载单张图片
const downloadPic = (urlArr, index, imgLoadFn, successFn, errorFn) => {
  console.log('开始加载第', index, '张图')
  const img = document.createElement('img')
  img.src = urlArr[index]
  img.onload = () => {
    // 这里每一个图片加载完成时传入的应该是index+1，因为index是从0开始的，而这里表示的是第几张图片完成加载的回调，传入数组长度用于计算百分比
    isFunction(imgLoadFn) && imgLoadFn(index + 1, urlArr.length)
    if (index === urlArr.length - 1) {
      // 加载完最后一张时调用全部完成函数
      successFn(index)
    } else {
      //  否则开启下一张图片的加载
      index += 1
      downloadPic(urlArr, index, imgLoadFn, successFn, errorFn)
    }
  }
  img.onError = errorFn
    ? () => {
        isFunction(errorFn) &&
          errorFn({
            index,
            url: urlArr[index],
          })
      }
    : () => imgLoaderError(index)
}

/**
 * 图片加载失败
 * @param {number} index 数组下标
 */
const imgLoaderError = (index) => {
  console.error(`第${index}张图片加载失败`)
}
