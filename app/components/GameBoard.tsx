'use client';
import type { Asset } from '@/generated/prisma';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Card from './Card';
import GameResultModal from './GameResultModal';
interface GameCard {
    id: number;
    imageUrl: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const shuffleArray = (array: Asset[]): Asset[] => {
    // Disable shuffling in test environment
    if (typeof window !== 'undefined' &&
        (window as any).Cypress &&
        (window as any).Cypress.env('DISABLE_SHUFFLE')) {
        return [...array];
    }

    // Fisher-Yates shuffle algorithm (better than sort + random)
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};


// Function to fetch assets from API
const getAssets = async (): Promise<Asset[]> => {
    const response = await fetch('/api/assets');
    if (!response.ok) {
        throw new Error('Failed to fetch assets');
    }
    return response.json();
};

export default function GameBoard() {
    const { data: assets, isLoading, isError } = useQuery({
        queryKey: ['gameAssets'],
        queryFn: getAssets,
    });

    const [cards, setCards] = useState<GameCard[]>([]);
    const [attempts, setAttempts] = useState(0);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [gameIsFinished, setGameIsFinished] = useState(false);


    useEffect(() => {
        if (assets && assets.length > 0) {
            const selectedAssets = shuffleArray(assets).slice(0, 8);
            const gameCards: GameCard[] = shuffleArray([...selectedAssets, ...selectedAssets]).map((asset, index) => ({
                id: index,
                imageUrl: asset.imageUrl,
                isFlipped: false,
                isMatched: false,
            }));
            setCards(gameCards);
        }
    }, [assets]);

    const handleCardClick = (cardId: number) => {
        // Don't allow clicking if card is already flipped or matched
        const card = cards.find(c => c.id === cardId);
        if (!card || card.isFlipped || card.isMatched) return;

        // Don't allow more than 2 cards to be flipped at once
        if (flippedCards.length >= 2) return;

        // Turn up the clicked card instantly
        setCards(prevCards =>
            prevCards.map(c => (c.id === cardId ? { ...c, isFlipped: true } : c))
        );

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        // If second card is flipped
        if (newFlippedCards.length === 2) {
            setAttempts(prev => prev + 1);

            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(c => c.id === firstCardId);
            const secondCard = cards.find(c => c.id === secondCardId);

            if (firstCard && secondCard && firstCard.imageUrl === secondCard.imageUrl) {
                // Match found - mark cards as matched
                setTimeout(() => {
                    const nextCards = cards.map(c =>
                        c.id === firstCardId || c.id === secondCardId
                            ? { ...c, isMatched: true, isFlipped: true }
                            : c
                    );
                    setCards(nextCards);
                    setFlippedCards([]);

                    if (nextCards.every(c => c.isMatched)) {
                        setGameIsFinished(true);
                    }
                });

            } else {
                // No match - flip back cards
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map(c =>
                            c.id === firstCardId || c.id === secondCardId
                                ? { ...c, isFlipped: false }
                                : c
                        )
                    );
                    setFlippedCards([]);
                }, 1500);
            }
        };
    };

    if (isLoading) return <h2 className='text-3xl text-center mt-4'>Loading cards...</h2>;
    if (isError) return <h2 className='text-3xl text-center mt-4'>Error loading game assets.</h2>;
    if (!assets || assets.length === 0) return <h2 className='text-3xl text-center mt-4'>No assets available.</h2>;

    return (
        <div className="flex flex-col items-center lg:col-span-2">
            <div data-cy="game-board" className="grid grid-cols-4 gap-4">
                {cards.map((card, index) => (
                    <Card
                        key={card.id}
                        data-cy={`card-${index}`}
                        data-asset-url={card.imageUrl}
                        imageUrl={card.imageUrl}
                        isFlipped={card.isFlipped}
                        isMatched={card.isMatched}
                        onClick={() => handleCardClick(card.id)} // Connect click-event
                    />
                ))}
            </div>
            <div className="mt-4 text-lg font-medium text-gray-700">
                Attempts: <span data-cy="attempts" className="ml-2">{attempts}</span>
            </div>
            <GameResultModal
                isOpen={gameIsFinished}
                onClose={() => setGameIsFinished(false)}
                dataCy={'win-modal'}
            />
        </div>
    );
}