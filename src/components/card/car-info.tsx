import type { FC } from "react";
import type { ICar } from "../../types";
import { DRIVE_OPTIONS } from "../../utils/constant";

interface Props {
  car: ICar;
}

const CarInfo: FC<Props> = ({ car }) => {
  // ekrana basilacak bilgiler
  const arr = [
    {
      icon: "/steering-wheel.svg",
      text: car.trany.includes("Auto") ? "Auto" : "Manuel",
    },
    { icon: "/tire.svg", text: DRIVE_OPTIONS[car.drive] },
    { icon: "/calendar.svg", text: car.year },
  ];
  return (
    <div className="flex-between">
      {arr.map((item, key) => (
        <div key={key} className="flex-center flex-col gap-1">
          <img src={item.icon} width={25} height={25} />
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CarInfo;
