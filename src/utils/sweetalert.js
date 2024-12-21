import Swal from "sweetalert2";

const sweetalert = {
  deleteOrNot: ({ title, text, confirmBtn, cancelBtn }) =>
    Swal.fire({
      title: title || "Are you sure?",
      text: text || "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonColor: "var(--main-color)",
      cancelButtonColor: "#D3D3D3",
      confirmButtonText: confirmBtn || "Yes, delete it!",
      cancelButtonText: cancelBtn || "No, cancel",
    }),

  logout: () =>
    Swal.fire({
      title: "Do you want to logout?",
      text: null,
      icon: "warning",
      iconColor: "var(--main-color)",
      confirmButtonColor: "var(--main-color)",
      showCancelButton: true,
      cancelButtonColor: "",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    }),

  done: (message) =>
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message || "Operation completed successfully.",
      iconColor: "#28a745",
      confirmButtonColor: "#28a745",
    }),
  error: (message) =>
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: message || "Something went wrong, please try again.",
      iconColor: "var(--main-color)",
      confirmButtonColor: "var(--main-color)",
    }),
  info: (title, message) =>
    Swal.fire({
      title: title || "Info",
      text: message || "Here is some information for you.",
      icon: "info",
      confirmButtonText: "Ok",
      iconColor: "var(--main-color)",
      confirmButtonColor: "var(--main-color)",
    }),
};

export default sweetalert;
