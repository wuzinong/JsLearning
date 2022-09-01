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
    setNextLocation(undefined);
  };

  const handleOk = () => {
    onSuccess();
    setNextLocation(undefined);
    navigate(nextLocation);
  };

  const blocker: any = useCallback(
    ({ action, location: nextLocation, retry }) => {
      debugger;
      switch (action) {
        case "REPLACE": {
          retry();
          return;
        }
        case "POP": {
          setNextLocation(nextLocation);
          return;
        }
        case "PUSH": {
          setNextLocation(nextLocation);
          return;
        }
        default:
          break;
      }
    },
    []
  );

  useEffect(() => {
    if (!when) return;
    if (nextLocation) return;
    if (!("block" in navigator)) return;
    const unblock = (navigator as any).block((tx: any) => {
      debugger;
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when, nextLocation]);

  return {
    navigationWasBlocked: Boolean(nextLocation),
    handleCancel,
    handleOk,
  };
};
