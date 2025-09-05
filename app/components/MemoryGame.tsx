'use client';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GameResultWithCategory, getTopGameResults } from "../actions";
import { Button } from "../ui/button";
import GameBoard from "./GameBoard";
import LeaderBoard from "./LeaderBoard";

export default function MemoryGame() {
    const { data: results, isLoading, isError } = useQuery<GameResultWithCategory[]>({
        queryKey: ['topGameResults'],
        queryFn: getTopGameResults,
    });

    // Skapa en state för att trigga en omstart
    const [newGameTrigger, setNewGameTrigger] = useState(0);

    const handleNewGame = () => {
        setNewGameTrigger(prev => prev + 1);
    };

    return (
        <section className="grid place-items-center gap-8">
            <Button
                type="button"
                variant="primary"
                className="w-fit mx-auto mb-4"
                onClick={handleNewGame}
            >
                New Game
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                <GameBoard onNewGame={newGameTrigger} />
                {isLoading && (
                    <div className="p-6 rounded-lg border">
                        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
                        <p className="text-xl">Loading scores...</p>
                    </div>
                )}
                {isError && (
                    <div className="p-6 rounded-lg border">
                        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
                        <p className="text-red-500 text-xl">Error loading leaderboard.</p>
                    </div>
                )}
                {results && (
                    <LeaderBoard results={results} isLoading={isLoading} isError={isError} />
                )}
            </div>
        </section>
    );
}