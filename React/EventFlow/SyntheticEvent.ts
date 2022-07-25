type Container = Element | Document;
type EventCb = (e: Event) => void;

const elementEventPropsKey = "__eventProps";
const validEventTypeList = ["click"];

interface PackagedElement extends Element {
  [elementEventPropsKey]: {
    [eventType: string]: EventCb;
  };
}
interface Paths {
  capture: EventCb[];
  bubble: EventCb[];
}

interface SyntheticEvent extends Event {
  __stopPropagation: boolean;
}

function createSyntheticEvent(e: Event): SyntheticEvent {
  const se = e as SyntheticEvent;
  se.__stopPropagation = false;
  const originStopPropagation = e.stopPropagation;
  se.stopPropagation = () => {
    se.__stopPropagation = true;
    if (originStopPropagation) {
      originStopPropagation();
    }
  };
  return se;
}

function getEventCbNameFromEventType(eventType: string): string[] | undefined {
  return {
    click: ["onClickCapture", "click"],
  }[eventType];
}

function collectPaths(
  targetElement: PackagedElement,
  container: Container,
  eventType: string
) {
  const paths: Paths = {
    capture: [],
    bubble: [],
  };

  while (targetElement && targetElement !== container) {
    //循环收集触发事件dom的events和它父节点的events
    const eventProps = targetElement[elementEventPropsKey];
    if (eventProps) {
      const cbNameList = getEventCbNameFromEventType(eventType);
      if (cbNameList) {
        cbNameList.forEach((cbName, i) => {
          const cb = eventProps[cbName];
          if (cb) {
            if (i === 0) {
              paths.capture.unshift(cb);
            } else {
              paths.bubble.push(cb);
            }
          }
        });
      }
    }
    targetElement = targetElement.parentNode as PackagedElement;
  }
  return paths;
}

function updateFiberProps(node: PackagedElement, props: any) {
  //遍历Props找出需要的事件 (可以在react中的createInstance方法中初始化element的时候调用)
  //把事件保存在node中
  node[elementEventPropsKey] = node[elementEventPropsKey] || {};
  validEventTypeList.forEach((eventType) => {
    // {onClick:()=>{},onClickCapture:()=>{}}

    const cbNameList = getEventCbNameFromEventType(eventType);
    if (!cbNameList) {
      return;
    }
    //['onClickCapture','click']
    //DOM.__eventProps = {onClick:xxx}
    cbNameList.forEach((cbName) => {
      if (Object.hasOwnProperty.call(props, cbName)) {
        node[elementEventPropsKey][cbName] = props[cbName];
      }
    });
  });
  return node;
}

function triggerEventFlow(paths: EventCb[], se: SyntheticEvent) {
  for (let i = 0; i < paths.length; i++) {
    const cb = paths[i];
    cb.call(null, se);
    if (se.__stopPropagation) {
      break;
    }
  }
}

function dispatchEvent(container: Container, eventType: string, e: Event) {
  const targetElement = e.target as PackagedElement;
  if (targetElement === null) {
    console.error("error no target Element");
    return;
  }
  // 收集从触发事件得目标dom到container之间的所有相关事件
  const { capture, bubble } = collectPaths(targetElement, container, eventType);
  // 事件保存在数组里[xxxxCapture,xxxx]
  // e -> 包装一下以抹平不同浏览器之间的差异
  const se = createSyntheticEvent(e);
  // 正向遍历数组
  triggerEventFlow(capture, se);
  // 反向遍历数组
  triggerEventFlow(bubble, se);
}

export function initEvent(container: Container, eventType: string) {
  container.addEventListener(eventType, (e) => {
    dispatchEvent(container, eventType, e);
  });
}
