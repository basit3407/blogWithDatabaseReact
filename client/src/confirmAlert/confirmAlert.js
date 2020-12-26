import { confirmAlert } from "react-confirm-alert";

export const confirm = (title, message) =>
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "Yes",
        onClick: () => "yes",
      },
      {
        label: "No",
        onClick: () => "no",
      },
    ],
  });
