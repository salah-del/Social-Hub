import Swal from "sweetalert2";

const sweetalert = {
  deleteOrNot: ({title, text, confirmBtn, cancelBtn}) =>
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

  done: (text) =>
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      // text: `The ${name} has been deleted successfully.`,
      text: text,
      iconColor: "var(--main-color)",
      confirmButtonColor: "var(--main-color)",
    }),
  error: (text) =>
    Swal.fire({
      icon: "error",
      title: "Error!",
      // text: "Something went wrong, please try again.",
      text: text,
      iconColor: "var(--main-color)",
      confirmButtonColor: "var(--main-color)",
    }),
};

export default sweetalert;
