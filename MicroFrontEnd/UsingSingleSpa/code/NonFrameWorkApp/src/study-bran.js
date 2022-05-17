let branContainer = null;

export const bootstrap = async function () {
  console.log("启动中....");
};

export const mount = async function () {
  console.log("挂载中...");
  branContainer = document.createElement("div");
  branContainer.id = "branContainer";
  branContainer.innerHTML = "出现吧神龙";
  document.querySelector("#brancontainer").appendChild(branContainer);
};

export const unmount = async function () {
  console.log("卸载中...");
};
