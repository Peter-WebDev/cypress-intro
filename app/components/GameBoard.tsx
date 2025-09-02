'use client';
import type { Asset } from '@/generated/prisma';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Card from './Card';
interface GameCard {
    id: number;
    imageUrl: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const shuffleArray = (array: Asset[]): Asset[] => {
    return array.sort(() => Math.random() - 0.5);
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
        // Flip the card
        setCards(prevCards =>
            prevCards.map(c =>
                c.id === cardId ? { ...c, isFlipped: true } : c
            )
        );

        // Add to flipped cards
        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        // If two cards are flipped, increase attempt by 1
        if (newFlippedCards.length === 2) {
            setAttempts(prev => prev + 1);

            // Check if cards match
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(c => c.id === firstCardId);
            const secondCard = cards.find(c => c.id === secondCardId);

            if (firstCard && secondCard && firstCard.imageUrl === secondCard.imageUrl) {
                // Match found - mark cards as matched
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map(c =>
                            c.id === firstCardId || c.id === secondCardId
                                ? { ...c, isMatched: true }
                                : c
                        )
                    );
                    setFlippedCards([]);
                }, 1000);

            } else {
                // No match - flip back cards
            }

        };
    };

    if (isLoading) return <div>Loading cards...</div>;
    if (isError) return <div>Error loading game assets.</div>;
    if (!assets || assets.length === 0) return <div>No assets available.</div>;

    return (
        <div className="flex flex-col items-center">
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
                Attempts: {attempts}
            </div>
        </div>
    );
}