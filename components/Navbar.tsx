import Image from "next/image";
import logo from "../public/assets/logo.svg";

export default function Navbar() {
  return (
    <nav className="w-full bg-transparent py-4 sm:py-5 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" className="h-8 sm:h-9 md:h-10 w-auto" priority />
        </div>
      </div>
    </nav>
  );
}
