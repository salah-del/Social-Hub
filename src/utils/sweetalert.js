import Swal from "sweetalert2";

const sweetalert = {
  deleteOrNot: () =>
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }),

  logout: () =>
    Swal.fire({
      title: "Do you want to log out?",
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
