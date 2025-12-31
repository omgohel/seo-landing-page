import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Illustration from "../components/Illustration";
import Promotion from "../components/Promotion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] relative overflow-hidden">
      <Navbar />
      <div className="absolute left-[1%] top-[2%] w-[100px] h-[100px] rounded-full bg-[#A83CF6] blur-[100px] pointer-events-none" />
      <Hero />
      <div className="absolute left-[50%] top-[30%] w-[100px] h-[100px] rounded-full bg-[#A83CF6] blur-[100px] pointer-events-none" />
      <Illustration />
      <div className="absolute left-[80%] top-[70%] w-[100px] h-[100px] rounded-full bg-[#A83CF6] blur-[100px] pointer-events-none" />
      <Promotion />
    </main>
  );
}
