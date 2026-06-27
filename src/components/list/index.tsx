import { useEffect, useRef, useState, type FC } from "react";
import { fetchCars } from "../../utils/service";
import type { ICar } from "../../types";
import Loading from "../loading";
import Error from "../error";
import Container from "../container";
import Card from "../card";
import { useSearchParams } from "react-router-dom";
import Pagination from "rc-pagination";

const List: FC = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  //url deki paramatrelere eris
  const make: string = searchParams.get("make") || "";
  const model: string = searchParams.get("model") || "";
  const year: string = searchParams.get("year") || "";
  const page: string = searchParams.get("page") || "1";
  const limit: number = 12;

  useEffect(() => {
    setIsLoading(true);

    fetchCars(make, model, year, page, limit)
      .then((data) => {
        setCars(data.results);
        setTotalCount(data.total_count);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [make, model, year, page]);

  if (isLoading)
    return (
      <Container>
        <Loading />
      </Container>
    );

  if (error)
    return (
      <Container>
        <Error message={error} />
      </Container>
    );

  return (
    <div ref={containerRef} className="padding-x max-width mb-10">
      <div className="home-cars-wrapper">
        {!cars || cars?.length === 0 ? (
          <Container>Aradığınız araç bulunamadı</Container>
        ) : (
          cars?.map((car) => <Card key={car.id} car={car} />)
        )}
      </div>

      <Pagination
        total={totalCount}
        pageSize={limit}
        onChange={(current) => {
          // yeni sayfayi parametre olarak ekle
          searchParams.set("page", String(current));
          setSearchParams(searchParams);

          // kullaniciyi liste basina yonlendir
          containerRef.current?.scrollIntoView();
        }}
        current={Number(page)}
        className="pagination"
        prevIcon={<span>{"<"}</span>}
        nextIcon={<span>{">"}</span>}
        jumpPrevIcon={<span>...</span>}
        jumpNextIcon={<span>...</span>}
      />
    </div>
  );
};

export default List;
