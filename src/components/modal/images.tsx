import type { FC } from "react";
import type { ICar } from "../../types";
import getImage from "../../utils/getImage";

interface Props {
  car: ICar;
}

const Images: FC<Props> = ({ car }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full">
        <img
          src={getImage(car)}
          className="size-full rounded-md object-cover"
        />
      </div>
      <div className="flex gap-3 -my-6 mb-3">
        <div className="rounded flex-1 relative h-30 bg-primary-blue-100 pt-4">
          <img
            src={getImage(car, "29")}
            className="size-full object-contain mx-auto"
          />
        </div>

        <div className="rounded flex-1 relative h-30 bg-primary-blue-100 pt-4">
          <img
            src={getImage(car, "05")}
            className="size-full object-contain mx-auto"
          />
        </div>

        <div className="rounded flex-1 relative h-30 bg-primary-blue-100 pt-4">
          <img
            src={getImage(car, "13")}
            className="size-full object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Images;
