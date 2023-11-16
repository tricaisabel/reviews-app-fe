import { FC, useContext } from "react";
import { StateContext } from "../../App";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const ToastComponent: FC = () => {
  const state = useContext(StateContext);

  return (
    <Toast isOpen={state.toast.show}>
      <ToastHeader>Pop up</ToastHeader>
      <ToastBody>{state.toast.message} </ToastBody>
    </Toast>
  );
};

export default ToastComponent;
