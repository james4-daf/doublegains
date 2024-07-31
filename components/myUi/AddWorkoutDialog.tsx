'use client';
import { createWorkout } from '@/app/api/workouts';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import { GrRun } from 'react-icons/gr';

export function AddWorkoutDialog({
  index,
  hoveredIndex,
  date,
}: {
  index: number;
  hoveredIndex: number;
  date: string;
}) {
  const { data: session } = useSession();
  const [formWorkoutData, setFormWorkoutData] = useState({
    workoutTitle: '',
    type: '',
    musclesTrained: '',
    userEmail: session?.user?.email || '',
    date: date,
  });
  //console.log(session?.user?.email);
  const [runWorkout, setRunWorkout] = useState<boolean>(false);
  const [strengthWorkout, setStrengthWorkout] = useState<boolean>(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormWorkoutData({
      ...formWorkoutData,
      [name]: value,
    });
    console.log(formWorkoutData);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log('submitting');
    if (!formWorkoutData.userEmail) {
      console.error('User email is missing. Cannot create workout.');
      return;
    }

    const formData = new FormData();

    // Append the values from formWorkoutData to formData
    formData.append('workoutTitle', formWorkoutData.workoutTitle);
    formData.append('type', formWorkoutData.type);
    formData.append('musclesTrained', formWorkoutData.musclesTrained);
    formData.append('userEmail', String(formWorkoutData.userEmail));
    formData.append('date', formWorkoutData.date);

    try {
      await createWorkout(formData);
      // Optionally reset the form or handle post-submission logic here
    } catch (error) {
      console.error('Failed to create workout:', error);
    }
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
                <Label className="text-right">Workout Title:</Label>

                <Input
                  name="workoutTitle"
                  className="col-span-2"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Type?</Label>
              <Button
                disabled={strengthWorkout}
                variant={runWorkout ? 'secondary' : 'outline'}
                onClick={(e) => {
                  e.preventDefault();
                  setFormWorkoutData({ ...formWorkoutData, type: 'run' });
                  setRunWorkout((prev) => !prev);
                }}
              >
                🏃
              </Button>
              <Button
                disabled={runWorkout}
                variant={strengthWorkout ? 'secondary' : 'outline'}
                onClick={(e) => {
                  e.preventDefault();
                  setFormWorkoutData({ ...formWorkoutData, type: 'strength' });
                  setStrengthWorkout((prev) => !prev);
                }}
              >
                🏋
              </Button>
            </div>
            {runWorkout && (
              <div className="grid grid-cols-4 items-center gap-1">
                <Label htmlFor="Distance" className="text-right">
                  Distance
                </Label>
                <Input type="number" className="col-span-1" />

                <Label htmlFor="time" className="text-right">
                  Time
                </Label>

                <Input
                  className="col-span-1"
                  type="time"
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
                  <Label htmlFor="musclesTrained" className="text-center">
                    Muscles trained
                  </Label>
                  <Input
                    name="musclesTrained"
                    onChange={handleInputChange}
                    className="col-span-2"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit">Save changes</Button>
                  </DialogClose>
                </DialogFooter>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
