export const errorHandler = (error) => {
  // Handle network errors (e.g., no connection, server is down)
  if (!error.response) {
    console.error("Network error:", error.message);
    return {
      type: "network",
      message: "Network error, please check your connection and try again.",
    };
  }

  // Handle backend validation or API errors
  if (error.response?.data) {
    console.error("Backend error:", error.response.data);

    // Custom error message from backend
    const backendMessage = error.response.data.message;

    return {
      type: "backend",
      message: backendMessage || "Something went wrong with the backend.",
      status: error.response.status, // Include HTTP status code if available
    };
  }

  // Fallback for unexpected errors
  console.error("Unexpected error:", error.message);

  return {
    type: "unknown",
    message: error.message || "An unexpected error occurred.",
  };
};
