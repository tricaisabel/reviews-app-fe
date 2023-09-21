import { FC, useContext } from "react";
import { StateContext } from "../../App";
import "./Toast.css";
const Toast: FC = () => {
  const state = useContext(StateContext);

  return (
    <div>
      {state.toast.show && <div className="toast">{state.toast.message}</div>}
    </div>
  );
};

export default Toast;
