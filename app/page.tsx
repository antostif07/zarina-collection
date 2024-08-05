import Gallery from "./ui/Gallery";
import * as XLSX from 'xlsx'

export default async function Home() {
  return (
    <main className="mx-auto max-w-[1960px] p-4">
      <Gallery />
    </main>
  );
}
