'use client';
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
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
                    <DialogHeader>
                        <DialogTitle>Congratulations!</DialogTitle>
                        <DialogDescription>You won the game! Enter your name to save your score</DialogDescription>
                    </DialogHeader>
                    <div data-cy="score-display" className="py-4">
                        <p>Time: 5 seconds</p>
                        <p>Flips: 5 attempts</p>
                    </div>
                    <form>
                        <input type="hidden" name="time" value="5" />
                        <input type="hidden" name="attempts" value="5" />
                        <input type="hidden" name="categoryId" value="Animals" />
                        <div data-cy="name-input" className="grid gap-4 py-4">
                            <Label htmlFor="name">Name</Label>
                            <input type="text" id="name" name="name" className="block w-full rounded-md border-0 p-4 shadow-sm ring-1 ring-inset" />
                        </div>
                        <Button dataCy={'submit-button'} type="submit" variant="primary">
                            Submit score
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}