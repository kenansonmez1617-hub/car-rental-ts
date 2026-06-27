import type { ICarResponse } from "../types";

// return tipi tanimla
export const fetchCars = async (
  make: string,
  model: string,
  year: string,
  page: string,
  limit: number,
): Promise<ICarResponse> => {
  let url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records/?lang=en&limit=${limit}&order_by=-year`;

  if (make) {
    url += `&where=make:"${make}"`;
  }

  if (model) {
    url += `&where=model:"${model}"`;
  }

  if (year) {
    url += `&refine=year:"${year}"`;
  }

  // limit: 12
  // page: 1 2 3 4 5 6
  // offset: 0 12 24 36 48 60

  const offset = (Number(page) - 1) * limit;
  url += `&offset=${offset}`;

  const res = await fetch(url);

  return await res.json();
};
