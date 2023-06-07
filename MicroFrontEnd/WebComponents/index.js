window.onload = () => {
  class WuJie extends HTMLElement {
    constructor() {
      super();
      this.init();
      this.getAttr("url");
    }

    init() {
      console.log("initing.....");
      const shadow = this.attachShadow({ mode: "open" }); // create shadow dom
      const template = document.querySelector("#wu-jie");
      console.log("template ", template);

      shadow.appendChild(template.content.cloneNode(true));
    }

    getAttr(str) {
      console.log("获取参数 ", this.getAttribute(str));
    }

    connectedCallback() {
      console.log("类似vue中的 mounted");
    }
    disconnectedCallback() {
      console.log("类似vue中的 destory");
    }
    attributeChangedCallback(name, oldVal, newVal) {
      console.log("和vue的watch 类似， 有属性发生变化时自动触发");
    }
  }

  window.customElements.define("wu-jie-tag", WuJie);
};
