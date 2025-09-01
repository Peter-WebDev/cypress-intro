'use client';
import Image from "next/image";

type CardProps = {
    imageUrl: string;
    isFlipped: boolean;
    isMatched: boolean;
    onClick: () => void;
    'data-cy'?: string;
};

export default function Card({
    imageUrl,
    isFlipped,
    isMatched,
    onClick,
    'data-cy': dataCy
}: CardProps) {
    return (
        <div
            data-cy={dataCy}
            data-flipped={isFlipped}
            data-matched={isMatched}
            onClick={!isFlipped ? onClick : undefined}
            className={`
        relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg cursor-pointer
        transition-transform duration-500 transform-style-3d
        ${isFlipped ? 'rotate-y-180' : ''}
        ${isMatched ? 'opacity-50' : ''}
      `}
        >
            <div
                className={`
          absolute inset-0 backface-hidden rounded-lg
          bg-gray-500 flex justify-center items-center
          ${isFlipped ? 'opacity-0' : 'opacity-100'}
        `}
            >
                <div className="text-xl sm:text-2xl text-white font-bold">?</div>
            </div>
            <div
                className={`
          absolute inset-0 backface-hidden rounded-lg
          rotate-y-180 transition-transform duration-500
          ${isFlipped ? 'opacity-100' : 'opacity-0'}
        `}
            >
                <Image src={imageUrl} alt="" className="w-full h-full object-cover rounded-lg" width={100} height={100}></Image>
            </div>
        </div>

    );
}