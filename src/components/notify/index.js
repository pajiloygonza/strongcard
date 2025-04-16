import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (message) => {
  toast.success(<div className="flex items-center">{message}</div>, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    zIndex: 9999,
  });
};

export const notifyError = (message) => {
  toast.error(
    <div className="flex items-center">{message || "Unknown error"}</div>,
    {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      zIndex: 9999,
    }
  );
};

export const notifyInfo = (message) => {
  toast.info(<div className="flex items-center">{message}</div>, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    zIndex: 9999,
  });
};
