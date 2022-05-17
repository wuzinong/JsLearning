import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: (location) => location.pathname === "/",
});

registerApplication({
  name: "@study/bran",
  app: () => {
    return System.import("@study/bran");
  },
  activeWhen: ["/bran"],
});

registerApplication({
  name: "@study/todos",
  app: () => {
    return System.import("@study/todos");
  },
  activeWhen: ["/todos"],
});

registerApplication({
  name: "@study/testvue",
  app: () => {
    return System.import("@study/testvue");
  },
  activeWhen: ["/testvue"],
});

// registerApplication({
//   name: "@study/navbar",
//   app: () => System.import("@study/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true, //是否可以通过history.pushState和replaceState更改触发single-spa路由，true不允许，false允许
});
