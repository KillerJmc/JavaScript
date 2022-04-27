import HashRouter from './hash-router.js'

// 获取html msg标签
let msg = document.getElementById("msg")

// 定义路由
const routes = {
  '/': () => {
    msg.innerText = "欢迎来到主页！"
  },
  '/activity': () => {
    msg.innerText = "欢迎来到活动页面!"
  },
  '/about': () => {
    msg.innerText = "欢迎来到关于页面!"
  }
}

// 定义错误回调
const errorCallback = url => {
  console.error("不存在的url：" + url)
}

// 新建路由
new HashRouter(routes, errorCallback)
