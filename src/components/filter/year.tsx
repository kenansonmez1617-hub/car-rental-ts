import { useEffect, useState, type FC, type SubmitEvent } from "react";
import { useSearchParams } from "react-router-dom";

const Year: FC = () => {
  const [year, setYear] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  // url deki parametreleri input a aktar
  useEffect(() => {
    setYear(searchParams.get("year") || "");
  }, [searchParams]);

  //form gonderilince
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (year) {
      searchParams.set("year", year);
    } else {
      searchParams.delete("year");
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label className="font-semibold mb-2 text-sm">Yıl</label>

      <div className="flex items-center">
        <input
          type="number"
          placeholder="örn:2026"
          className="w-32 rounded-l-2xl input-bg"
          min={2000}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button type="submit" className="input-bg rounded-r-2xl cursor-pointer">
          <img src="/search.svg" className="size-5" />
        </button>
      </div>
    </form>
  );
};

export default Year;
