import type { DriveType, ICar } from "../types";

export interface PricingOptions {
  currency?: "TRY";
  minPrice?: number;
  maxPrice?: number;
  roundTo?: number;
  currentYear?: number;
  demandMultiplier?: number; // sezon, şehir, doluluk oranı gibi dış sinyaller için
}

export interface RentalPriceResult {
  dailyPrice: number;
  currency: "TRY";
  breakdown: {
    basePrice: number;
    vehicleClassMultiplier: number;
    brandMultiplier: number;
    ageMultiplier: number;
    driveMultiplier: number;
    fuelMultiplier: number;
    transmissionMultiplier: number;
    engineMultiplier: number;
    efficiencyMultiplier: number;
    emissionMultiplier: number;
    demandMultiplier: number;
  };
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const roundToNearest = (value: number, step: number): number =>
  Math.round(value / step) * step;

const getVehicleClassMultiplier = (vclass: string): number => {
  const value = vclass.toLowerCase();

  if (value.includes("small sport utility")) return 1.55;
  if (value.includes("standard sport utility")) return 1.85;
  if (value.includes("sport utility")) return 1.65;

  if (value.includes("two seater")) return 1.9;
  if (value.includes("minicompact")) return 1.05;
  if (value.includes("subcompact")) return 1.0;
  if (value.includes("compact")) return 1.08;
  if (value.includes("midsize")) return 1.2;
  if (value.includes("large")) return 1.35;
  if (value.includes("pickup")) return 1.55;
  if (value.includes("van")) return 1.35;
  if (value.includes("wagon")) return 1.25;

  return 1.15;
};

const getBrandMultiplier = (make: string): number => {
  const brand = make.trim().toUpperCase();

  const premiumBrands: Record<string, number> = {
    BMW: 1.35,
    MERCEDES: 1.38,
    "MERCEDES-BENZ": 1.38,
    AUDI: 1.32,
    VOLVO: 1.25,
    LEXUS: 1.32,
    JAGUAR: 1.45,
    "LAND ROVER": 1.5,
    PORSCHE: 1.85,
    TESLA: 1.45,
    MINI: 1.2,
    CADILLAC: 1.35,
    INFINITI: 1.28,
    ACURA: 1.22,
  };

  return premiumBrands[brand] ?? 1;
};

const getAgeMultiplier = (year: string, currentYear: number): number => {
  const carYear = Number(year);

  if (!Number.isFinite(carYear)) return 1;

  const age = Math.max(currentYear - carYear, 0);

  if (age <= 1) return 1.22;
  if (age <= 3) return 1.15;
  if (age <= 5) return 1.08;
  if (age <= 8) return 1.0;
  if (age <= 12) return 0.86;

  return 0.72;
};

const getDriveMultiplier = (drive: DriveType): number => {
  switch (drive) {
    case "All-Wheel Drive":
      return 1.12;
    case "4-Wheel Drive":
    case "4-Wheel or All-Wheel Drive":
    case "Part-time 4-Wheel Drive":
      return 1.15;
    case "Rear-Wheel Drive":
      return 1.08;
    case "Front-Wheel Drive":
      return 1.0;
    case "2-Wheel Drive":
    default:
      return 1.0;
  }
};

const getFuelMultiplier = (fueltype: string, fueltype1: string): number => {
  const fuel = `${fueltype} ${fueltype1}`.toLowerCase();

  if (fuel.includes("premium")) return 1.08;
  if (fuel.includes("diesel")) return 1.04;
  if (fuel.includes("electricity") || fuel.includes("electric")) return 1.12;
  if (fuel.includes("regular")) return 1.0;

  return 1.02;
};

const getTransmissionMultiplier = (trany: string): number => {
  const value = trany.toLowerCase();

  if (value.includes("automatic")) return 1.06;
  if (value.includes("manual")) return 0.95;

  return 1;
};

const getEngineMultiplier = (car: ICar): number => {
  const displacement = Number.isFinite(car.displ) ? car.displ : 1.6;
  const cylinders = Number.isFinite(car.cylinders) ? car.cylinders : 4;

  const displacementFactor = 1 + Math.max(displacement - 1.6, 0) * 0.08;
  const cylinderFactor = 1 + Math.max(cylinders - 4, 0) * 0.045;

  // Interface'te tcharger null görünüyor ama örnek datada "T" geliyor.
  const hasTurbo =
    Array.isArray(car.eng_dscr) &&
    car.eng_dscr.some((item) => item.toLowerCase().includes("turbo"));

  const turboFactor =
    hasTurbo ||
    (car as unknown as { tcharger?: string | null }).tcharger === "T"
      ? 1.08
      : 1;

  return clamp(displacementFactor * cylinderFactor * turboFactor, 0.9, 1.45);
};

const getEfficiencyMultiplier = (car: ICar): number => {
  // comb08 MPG değeridir. Düşük MPG daha yüksek operasyon maliyeti demek.
  const mpg = car.comb08 > 0 ? car.comb08 : 25;

  if (mpg >= 45) return 0.92;
  if (mpg >= 35) return 0.96;
  if (mpg >= 25) return 1.0;
  if (mpg >= 18) return 1.07;

  return 1.14;
};

const getEmissionMultiplier = (co2: number): number => {
  if (!Number.isFinite(co2) || co2 <= 0) return 1;

  if (co2 <= 150) return 0.96;
  if (co2 <= 250) return 1.0;
  if (co2 <= 350) return 1.06;

  return 1.1;
};

export function calculateDailyRentalPrice(
  car: ICar,
  options: PricingOptions = {},
): RentalPriceResult {
  const {
    currency = "TRY",
    minPrice = 900,
    maxPrice = 15000,
    roundTo = 50,
    currentYear = new Date().getFullYear(),
    demandMultiplier = 1,
  } = options;

  const basePrice = 1200;

  const vehicleClassMultiplier = getVehicleClassMultiplier(car.vclass);
  const brandMultiplier = getBrandMultiplier(car.make);
  const ageMultiplier = getAgeMultiplier(car.year, currentYear);
  const driveMultiplier = getDriveMultiplier(car.drive);
  const fuelMultiplier = getFuelMultiplier(car.fueltype, car.fueltype1);
  const transmissionMultiplier = getTransmissionMultiplier(car.trany);
  const engineMultiplier = getEngineMultiplier(car);
  const efficiencyMultiplier = getEfficiencyMultiplier(car);
  const emissionMultiplier = getEmissionMultiplier(car.co2);

  const rawPrice =
    basePrice *
    vehicleClassMultiplier *
    brandMultiplier *
    ageMultiplier *
    driveMultiplier *
    fuelMultiplier *
    transmissionMultiplier *
    engineMultiplier *
    efficiencyMultiplier *
    emissionMultiplier *
    demandMultiplier;

  const dailyPrice = roundToNearest(
    clamp(rawPrice, minPrice, maxPrice),
    roundTo,
  );

  return {
    dailyPrice,
    currency,
    breakdown: {
      basePrice,
      vehicleClassMultiplier,
      brandMultiplier,
      ageMultiplier,
      driveMultiplier,
      fuelMultiplier,
      transmissionMultiplier,
      engineMultiplier,
      efficiencyMultiplier,
      emissionMultiplier,
      demandMultiplier,
    },
  };
}
