
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 路由集合
let routes = {};
// 辅助函数集合
let helpObj = {};
// 懒加载路由集合
let requireRouter = {};

/**
 * 自动注册功能
 * @param {function} ctx webpackAsyncContext
 */
function auto(ctx) {
  // 保存懒加载
  requireRouter = ctx;
  ctx.keys().forEach(filePath => {
    registered(filePath);
  });
}

/**
 * 自动注册功能
 * @param {string} r 文件地址
 */
async function registered(r) {
  // 过滤已经存在的1级目录
  if (r in helpObj) return;
  // 获取文件地址
  let path =  r.slice(1, -10);

  if (r.endsWith("route.js")) {
    let { default: main } = await requireRouter(r);
    // 动态添加路由
    myRouter.addRoutes([main]);
  } else {
    let pathArr = path.split("/");
    let arrLength = pathArr.length;

    if (arrLength > 2) {
      // 处理父级内容
      let parentPath = pathArr.slice(0, -1);
      parentPath = `.${parentPath.join("/")}/index.vue`;

      // 路由内容
      let route = {
        name: pathArr.filter(Boolean).join("-"),
        path: pathArr[arrLength - 1],
        component: () => requireRouter(r)
      };

      // 判断辅助函数中有没有父级内容
      if (parentPath in helpObj) {
        let helpObjParent = helpObj[parentPath];

        // 父级是否有 children
        if (helpObjParent.children) {
          helpObjParent.children.push(route);
        } else {
          helpObjParent.children = [route];
        }
      }
      // 如果父级不存在
      else {
        // 注册父级
        registered(parentPath);
        // 更新路由
        helpObj[parentPath].children = [route];
      }

      // 增加到辅助函数中
      helpObj[r] = route;
    } else {
      let name = path.slice(1);
      
      let data = {
        name,
        path,
        component: () => requireRouter(r)
      };
      
      // 处理 / 目录，此项目将 Home 为根目录
      if (path === "/home") {
        data.alias = "/";
      }

      routes[path] = data;
      // 增加到辅助函数中
      helpObj[r] = data;
    }
  }
}

// 自动处理懒加载
auto(require.context( // eslint-disable-line
    "@/views",
    true,
    /(index\.vue$)|(route\.js$)/,
    "lazy", // sync
  )
);


const myRouter = new Router({
  mode: "history",
  routes: Object.values(routes)
});


// 释放内存空间
helpObj = null;

export default myRouter;
