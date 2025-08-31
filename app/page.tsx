import MemoryGame from "./components/MemoryGame";

export default async function Home() {
  return (
    <main className="container mx-auto p-4 max-w-4xl min-h-svh">
      <h1 className="text-3xl font-bold mb-8 text-center">Memory Game</h1>
      <MemoryGame />
    </main >
  );
}