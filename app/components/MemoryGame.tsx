import GameBoard from "./GameBoard";

export default function MemoryGame() {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <GameBoard />
        </div>
    );
}