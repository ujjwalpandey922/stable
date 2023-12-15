import Header from "@/components/Header";
import Result from "@/components/Result";
import Search from "@/components/Search";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <Header />
      <Search />
      <Result />
    </main>
  );
}
