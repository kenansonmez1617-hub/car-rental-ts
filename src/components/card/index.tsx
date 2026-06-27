import { useState, type FC } from "react";
import type { ICar } from "../../types";
import CarInfo from "./car-info";
import { calculateDailyRentalPrice } from "../../utils/getPrice";
import getImage from "../../utils/getImage";
import Button from "../button";
import Modal from "../modal";

interface Props {
  car: ICar;
}

const Card: FC<Props> = ({ car }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="car-card group">
        {/* marka */}
        <h2 className="car-card-content-title">
          {car.make} {car.model}
        </h2>
        {/* fiyat bilgisi */}
        <div className="flex mt-6 text-[19px]">
          <span className="font-semibold">₺</span>
          <span className="text-[32px]">
            {calculateDailyRentalPrice(car).dailyPrice}
          </span>
          <span className="font-semibold self-end">/gün</span>
        </div>

        {/* arac resmi */}
        <img
          src={getImage(car, "01", true)}
          className="size-full object-contain min-h-50"
        />

        {/* detaylar */}
        <div className="w-full">
          <div className="group-hover:hidden">
            <CarInfo car={car} />
          </div>
          <div className="hidden group-hover:block">
            <Button
              text="Daha Fazla"
              designs="w-full mt-[0.5px]"
              fn={() => setIsOpen(true)}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} close={() => setIsOpen(false)} car={car} />
    </>
  );
};

export default Card;
