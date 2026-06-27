import type { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../button";

const Header: FC = () => {
  return (
    <div className="w-full z-10 glass-dark border-x-0 backdrop-blur-xl">
      <div className="max-width flex-between padding-x padding-y">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" width={50} height={50} />
          <h1 className="text-2xl md:text-3xl font-bold text-transparent text-gradient">
            CarHUB
          </h1>
        </Link>

        <Button text="Kaydol" />
      </div>
    </div>
  );
};

export default Header;
