/**
 * Hash路由类
 */
export default class HashRouter {
  /**
   * 构造一个路由
   * @param routes 路由表的map集合（url (如：/activity) -> callback func () => {...}）
   * @param errorCallback 没有路由的错误回调方法 (url) => {...}
   */
  constructor(routes, errorCallback) {
    this.routes = routes
    this.errorCallback = errorCallback

    // window监控hash改变时回调onHashChange方法
    // 这里用方法调用是因为防止this污染（否则回调中的this就是window而不是Router对象了）
    window.onhashchange = () => this.onHashChange()
  }

  /**
   * 当hash改变时运行路由表的回调方法
   */
  onHashChange() {
    // 获取当前页面hash
    let hash = location.hash
    console.log("Hash change to: " + hash)

    // 尝试获取路由对应的回调方法（跳过第1个字符，如：#/activity -> /activity）
    if (hash.substring(1) in this.routes) {
      console.log("Run callback Func of hash: " + hash)
      // 执行回调方法
      this.routes[hash.substring(1)]()
    } else {
      // 执行错误回调方法
      this.errorCallback(hash.substring(1))
    }
  }
}
