import { memo } from "react";

const LoaderW = memo(({ className }) => {
  return (
    <img
      draggable={false}
      src="/src/assets/loaderW.svg"
      alt="Loading..."
      className={className}
    />
  );
});

export default LoaderW;
