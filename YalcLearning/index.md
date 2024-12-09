[C:\Users\guxh\AppData\Local\Yalc](https://www.bilibili.com/video/BV1gD4y157cL/?spm_id_from=333.1391.0.0&vd_source=06e03e457b155f3649ca17a325fd3f3a)

npm i yalc -g

package.json

{
"build": "vite build",
"yalc-publish": "npm run build & yalc push"
}

//Web 项目 add 进来

yalc add my-component

//处理 vite 缓存
https://vitejs.cn/vite3-cn/config/server-options.html#server-watch
server:{
watch: {
ignored: ['!**/node_modules/my-component/**'],
},
}

optimizeDeps: {
exclude: ['my-component'],
},

//如果还有缓存，那就是浏览器缓存，记得 clear
