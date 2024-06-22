import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CiSquarePlus } from 'react-icons/ci';
import { GrRun } from 'react-icons/gr';

export function AddWorkoutDialog({
  index,
  hoveredIndex,
}: {
  index: number;
  hoveredIndex: number;
}) {
  const [runWorkout, setRunWorkout] = useState<boolean>(false);
  const [strengthWorkout, setStrengthWorkout] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log('submitting');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={` p-8 w-[80%] bg-blue-500 text-white rounded transition-opacity duration-300 ${
            hoveredIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CiSquarePlus />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Workout Title:
                </Label>

                <Input id="name" className="col-span-2" />
              </div>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Type?
              </Label>
              <Button
                disabled={strengthWorkout}
                variant={runWorkout ? 'secondary' : 'outline'}
                onClick={() => setRunWorkout((prev) => !prev)}
              >
                🏃
              </Button>
              <Button
                disabled={runWorkout}
                variant={strengthWorkout ? 'secondary' : 'outline'}
                onClick={() => setStrengthWorkout((prev) => !prev)}
              >
                🏋
              </Button>
            </div>
            {runWorkout && (
              <div className="grid grid-cols-4 items-center gap-1">
                <Label htmlFor="Distance" className="text-right">
                  Distance
                </Label>
                <Input id="Distance" type="number" className="col-span-1" />

                <Label htmlFor="time" className="text-right">
                  Time
                </Label>

                <Input
                  className="col-span-1"
                  type="time"
                  id="time"
                  name="time"
                  min="00:00"
                  max="23:59"
                  required
                />
              </div>
            )}
            {strengthWorkout && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-center">
                    Muscles trained
                  </Label>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </>
            )}
          </div>
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
