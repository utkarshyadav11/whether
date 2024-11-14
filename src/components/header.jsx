import { Link } from "react-router-dom";
import { CitySearch } from "./city-search";

export function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
         <Link to={"/"}>
          <img
            src={"/cloudy.png"}
            alt="Klimate logo"
            className="h-14"
          />
        </Link> 
        <div className="flex gap-4">
          <CitySearch />
        </div>
      </div>
    </header>
  );
}
