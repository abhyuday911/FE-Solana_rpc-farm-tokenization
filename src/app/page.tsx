import { createProgram } from '@/api/anchor';
import NavBar from "@/components/layout/NavBar";

export default function Home() {
  const program = createProgram();
  console.log(program);
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="">
        <NavBar />
      </main>
    </div>
  );
}
