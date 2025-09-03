import MemoryGame from "./components/MemoryGame";
import { Button } from "./ui/button";

export default async function Home() {
  return (
    <main className="grid place-content-center gap-4 container mx-auto p-4 max-w-4xl min-h-svh">
      <h1 className="text-5xl font-black mb-8 text-center">Memory Game</h1>
      <Button type="button" variant="primary" className="w-fit mx-auto">New Game</Button>
      <MemoryGame />
    </main >
  );
}