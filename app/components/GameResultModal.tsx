'use client';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";

interface GameResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    'dataCy': string;
}

export default function GameResultModal({ isOpen, onClose, dataCy }: GameResultModalProps) {
    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent data-cy={dataCy}>
                    <DialogTitle>Congratulations!</DialogTitle>
                    <DialogDescription>You won the game!</DialogDescription>
                    <DialogClose onClick={onClose}>Close</DialogClose>
                </DialogContent>
            </Dialog>
        </>
    );
}