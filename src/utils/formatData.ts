import type { ICar } from "../types";

const formatData = (car: ICar): [string, string | number | null][] => {
  // nesne içerisinde filtrelemek istediğim anahtar değerleri
  const ACCEPTED = [
    "make",
    "model",
    "year",
    "fueltype",
    "cylinders",
    "drive",
    "trany",
    "vclass",
    "tcharger",
    "startstop",
    "co2",
    "displ",
    "atvtype",
  ];

  // nesneyi dizi formatina cevirip istedigimiz degerleri aldik
  return Object.entries(car).filter(([key]) => ACCEPTED.includes(key));
};

export default formatData;
