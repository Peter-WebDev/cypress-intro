import GameBoard from "./GameBoard";
import LeaderBoard from "./LeaderBoard";

export default function MemoryGame() {

    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <GameBoard />
            <LeaderBoard />
        </section>
    );
}