/**
 * History路由类
 */
export default class HistoryRouter {
  /**
   * 构造一个路由
   * @param components 将要被注册的组件（如a标签），为一个map，componentId -> url
   * @param routes 路由表的map集合（url (如：/activity) -> callback func () => {...}）
   * @param errorCallback 没有路由的错误回调方法 (url) => {...}
   */
  constructor(components, routes, errorCallback) {
    this.register(components)
    this.routes = routes
    this.errorCallback = errorCallback
  }

  // 注册组件，自动填充onclick方法
  register(components) {
    for (let id in components) {
      // 获取id字段
      document.getElementById(id).onclick = () => {
        // 改变路径
        this.changePath(components[id])
      }
    }
  }

  /**
   * 改变当前路径
   * @param newPath 新的路径
   */
  changePath(newPath) {
    // 改变history，跳转到新路径
    history.pushState(null, '', newPath)

    // 获取当前页面的history (path)
    let path = location.pathname
    console.log("Path change to: " + path)

    // 尝试获取路由对应的回调方法
    if (path in this.routes) {
      console.log("Run callback Func of path: " + path)
      // 执行回调方法
      this.routes[path]()
    } else {
      // 执行错误回调方法
      this.errorCallback(path)
    }
  }
}
