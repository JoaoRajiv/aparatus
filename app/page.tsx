import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "../public/banner.png";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 space-y-4">
      <SearchInput />
      <Image src={banner} alt="Aparatus Banner" className="rounded-lg h-auto w-full" sizes="100vw"/>
      </div>
    </div>
  );
}
