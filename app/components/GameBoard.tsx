export default function GameBoard() {
    const cards = Array(16).fill(null);

    return (
        <div data-cy="game-board" className="grid grid-cols-4 gap-4">
            {cards.map((_, index) => (
                <div
                    key={index}
                    data-cy={`card-${index}`}
                    className="aspect-square grid place-items-center w-25 h-25 bg-zinc-700 text-3xl cursor-pointer"
                >
                    <h2>?</h2>
                </div>
            ))}
        </div>
    );
}