import type { FC } from "react";

const Loading: FC = () => {
  return (
    <div>
      <div className="size-8 rounded-full border-3 border-blue-500 border-x-0 border-b-0 animate-spin" />
    </div>
  );
};

export default Loading;
