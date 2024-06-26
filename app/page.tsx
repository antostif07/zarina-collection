import Image from "next/image";
import Gallery from "./ui/Gallery";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1960px] p-4">
      <Gallery />
    </main>
  );
}
