function domFunction(e){
  //    鼠标
  // 　　screenX/Y：鼠标位置相对于屏幕的坐标

  // 　　pageX/Y：相对于文档边缘（包含滚动条距离）
  
  // 　　clientX/Y：相对于当前页面且不包含滚动条距离
  
  // 　　offsetX/Y：相对于当前元素（块或行内块），除safari外不包含边框。
  
  // 　　其他：
  
  // 　　X/Y：与clientX/Y相同，firefox不支持
  
  // 　　layerX/Y：除IE外与pageX/Y相同，IE11下与clientX/Y相同。非官方属性。

  // event.clientX 相对文档的水平座标 
  // event.clientY 相对文档的垂直座标 
  // event.offsetX 相对容器的水平坐标 
  // event.offsetY 相对容器的垂直坐标
  // clientX： 相对文档的水平坐标
  // clientY： 相对文档的垂直坐标

  console.error("Mouse----------------------------------")
  console.log("目前被点击元素：")
  console.log(e.target);

  console.log("event.clientX/Y:鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条。IE事件和标准事件都定义了这2个属性")
  console.log(e.clientX+"-"+e.clientY)
  
  console.log("event.pageX/Y:类似于event.clientX、event.clientY，但它们使用的是文档坐标而非窗口坐标。这2个属性不是标准属性，但得到了广泛支持。IE事件中没有这2个属性")
  console.log(e.pageX+"-"+e.pageY)

  console.log("event.screenX/Y:鼠标相对于用户显示器屏幕左上角的X,Y坐标。标准事件和IE事件都定义了这2个属性")
  console.log(e.screenX+"-"+e.screenY)

  console.log("event.offsetX/Y:鼠标相对于事件源元素（srcElement）的X,Y坐标，只有IE事件有这2个属性，标准事件没有对应的属性")
  console.log(e.offsetX+"-"+e.offsetY)

  console.log("layerX/Y：除IE外与pageX/Y相同，IE11下与clientX/Y相同。非官方属性")
  console.log(e.layerX+"-"+e.layerY)
  console.log("X/Y：与clientX/Y相同，firefox不支持")
  console.log(e.x+"-"+e.y)

  
  console.error("Dom----------------------------------")

  // clientLeft,clientTop:表示内容区域的左上角相对于整个元素左上角的位置（包括边框）。(取决于边框的像数值？)
  // clientWidth,clientHeight:内容区域的宽高，不包括边框宽度值/相对文档的宽/高度（可见部分的宽度）
  // offsetLeft,offsetTop:相对于最近的祖先定位元素。
  // offsetParent:某元素的父元素 例如：this.offsetParent.tagName.toLowerCase() 得到body...
  // offsetWidth,offsetHeight 整个元素的尺寸(不包括变宽的宽度)/对象相对于版面或offsetParent 的高度（可见部分的宽度加上滚动条实体的宽度）
  // scrollLeft,scrollTop:元素滚动的大小
  // scrollWidth,scrollHeight:整个内容区域的宽度(包括需拉动滚动条隐藏起来的那些部分) scrollTop+clientWidth
  // scrollWidth:获取对象的滚动宽度/对象的滚动高度（滚动条的高度，可滚动的高度）
  // scrollHeight: 获取对象的滚动高度。/对象的滚动宽度（同上）
  // scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离/对象左边界和窗口中目前可见内容的左端之间的距离（滚动条已滚动的距离）
  // scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离/对象最顶端和窗口中可见内容的最顶端之间的距离（同上）
  // offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置/对象相对于版面或由 offsetParent 左侧位置
  // offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置/对象相对于版面或由 offsetTop 顶端位置
 

  var ele = e.target;

  console.log("clientLeft,clientTop:表示内容区域的左上角相对于整个元素左上角的位置（包括边框）Border 取决于边框的像数值？");
  console.log(ele.clientLeft+"-"+ele.clientTop);

  console.log("clientWidth,clientHeight:内容区域的宽高，不包括边框宽度值")
  console.log(ele.clientWidth+"-"+ele.clientHeight);

  console.log("offsetLeft,offsetTop:相对于最近的祖先定位元素。")
  console.log(ele.offsetLeft+"-"+ele.offsetTop)

  console.log("offsetParent:某元素的父元素");
  console.log(ele.offsetParent);
  
  console.log("offsetWidth,offsetHeight 整个元素的尺寸(不包括变宽的宽度)");
  console.log(ele.offsetWidth+"-"+ele.offsetHeight);

  console.log("scrollLeft,scrollTop:元素滚动的大小")
  console.log(ele.scrollLeft+"-"+ele.scrollTop)

  console.log("scrollWidth,scrollHeight:整个内容区域的宽度(包括需拉动滚动条隐藏起来的那些部分) scrollTop+clientWidth")
  console.log(ele.scrollWidth+"-"+ele.scrollHeight)
}

window.onload =function(){
   window.config =  {
     mouseOn:false
   }
   var a = document.documentElement;
   var mouseBtn = document.querySelector(".mouse");
   mouseBtn.addEventListener("click",function(){

      if(config.mouseOn){
        config.mouseOn = false;
        a.removeEventListener("click",domFunction) 
    }else{
        config.mouseOn = true;
        a.addEventListener("click",domFunction,false);
    }
   },false)
   
   
}