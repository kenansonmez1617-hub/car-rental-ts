import { useEffect, type FC } from "react";
import { Link } from "react-router-dom";
import Button from "../button";
import { motion, useMotionValue, useTransform } from "motion/react";
import { animate } from "motion";

const Hero: FC = () => {
  const count = useMotionValue(1000);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, 1890, { duration: 1.5 });
    return () => controls.stop();
  }, []);

  return (
    <div className="hero padding-x padding-y">
      <div className="pt-20 x:flex-1 max-h-230">
        <div className="mb-4 text-xl flex items-center gap-2">
          <motion.pre style={{ color: "#8df0cc" }}>{rounded}</motion.pre>{" "}
          <span className="mb-1">+ Araba</span>
        </div>

        <h1 className="hero-title">Özgürlüğü Hisset, Yolculuğa Başla</h1>

        <p className="hero-subtitle">
          Altın standartta hizmetle unutulmaz bir yolculuğa hazır mısın? Araç
          kiralama deneyimini Altın Seçenekleri ile taçlandırarak her anını özel
          kılabilirsin.
        </p>

        <Link to="#catalog">
          <Button text="Arabaları Keşfet" designs="mt-12" />
        </Link>
      </div>
      <div className="flex-center">
        <motion.img
          initial={{ x: 300, opacity: 0 }} //baslangic stilleri yazilir
          animate={{ x: 0, opacity: 1 }} //bitis stilleri yazilir
          transition={{ duration: 0.3 }} // suresi yazilir
          src="/hero.png"
          className="object-contain xl:w-150 xl:h-119.25 drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default Hero;
