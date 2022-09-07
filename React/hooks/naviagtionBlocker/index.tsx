import { useCallback, useState, useContext, useEffect } from "react";
import { useNavigate, UNSAFE_NavigationContext } from "react-router-dom";
export const useTest = (
  when: boolean,
  onSuccess: () => void
): {
  navigationWasBlocked: boolean;
  handleCancel: () => void;
  handleOk: () => void;
} => {
  const [nextLocation, setNextLocation] = useState(null);
  const { navigator } = useContext(UNSAFE_NavigationContext);

  const navigate = useNavigate();
  console.log("setNextLocation outer ", nextLocation);
  const handleCancel = () => {
    //点击取消按钮调用此方法，清空当前要跳转到的链接
    setNextLocation(undefined);
  };

  const handleOk = () => {
    //点击了同意按钮
    debugger;
    onSuccess(); //先调用回调函数，此函数在调用此hook时传入
    setNextLocation(undefined); //跳转完毕后清空，因为setState的异步性，放这里和放最后一样
    navigate(nextLocation); //跳转到当前需要跳转的链接，虽然上面设置了undefind但是由于异步性这里获取的还是未清空时的链接
  };

  const blocker: any = useCallback(
    ({ action, location: nextLocation, retry }) => {
      console.log("location ", location);
      debugger;
      switch (action) {
        case "REPLACE": {
          retry();
          return;
        }
        case "POP":
        case "PUSH": {
          //POP：点击浏览器后退按钮
          //PUSH: 点击了某个按钮跳转页面
          setNextLocation(nextLocation); //无论是哪种，都把当前要跳转到的链接信息放入currentLocation
          return;
        }
        default:
          break;
      }
    },
    []
  );

  //调用此hook
  // const { navigationWasBlocked, handleCancel, handleOk } = useTest(true, () => {
  // 	console.log('called');
  // });
  useEffect(() => {
    if (!when) return; //当when为false时表示不需要启用此功能
    if (nextLocation) return; //如果NextLocation存在值就跳出
    if (!("block" in navigator)) return; //block属性不存在就跳出，浏览器兼容？
    const unblock = (navigator as any).block((tx: any) => {
      debugger;
      console.log("tttttttttt    ", tx.retry.toString());
      //监听路由变化，每当点击跳转按钮会调用此函数
      //这个函数会传入tx，形如：
      // {
      //     "action": "PUSH",
      //     "location": {
      //         "pathname": "/dummy-test-01",
      //         "hash": "",
      //         "search": "",
      //         "state": null,
      //         "key": "igdvd1g0"
      //     }
      //     "retry":function(){go(delta * -1);}
      // }
      //   debugger;
      //   if (tx.action === "POP") {
      //     tx.action = "REPLACE";
      //   }
      const autoUnblockingTx = {
        ...tx,
        retry() {
          //扩展retry方法
          //如果Replace的情况就会走到这里
          //第一步把绑定的监听事件移除
          unblock();
          //接着调tx上的retry方法
          //go(delta * -1) 比如点击后退delta为1，变成go(-1)，改变url
          tx.retry();
        },
      };
      blocker(autoUnblockingTx); //调用blocker函数(设置当前router信息)
    });
    console.log("unblock ", unblock);
    return unblock; //返回block函数的调用结果（是一个function组件卸载时调用此function）移除beforeunload listener
  }, [navigator, blocker, when, nextLocation]);

  return {
    navigationWasBlocked: Boolean(nextLocation),
    handleCancel,
    handleOk,
  };
};
