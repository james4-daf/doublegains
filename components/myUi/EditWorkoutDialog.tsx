'use client';
import { Button } from '@/components/ui/button';
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
import React, { Children } from 'react';

function EditWorkoutDialog({
  WorkoutTitle,
  index,
  hoveredIndex,
  date,
  setHoveredIndex,
  children,
}: {
  WorkoutTitle: string;
  index: number;
  hoveredIndex: number;
  date: string;
  setHoveredIndex: Function;
  children: string;
}) {
  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && setHoveredIndex(null)}>
      <DialogTrigger asChild>
        <p
          className={` p-4 w-[100%] h-8 hover:bg-red-300 text-black text-center 
          }`}
        >
          {children}
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Workout Title:</Label>

                <Input
                  name="workoutTitle"
                  className="col-span-2"
                  //   onChange={handleInputChange}
                  value={children}
                />
              </div>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Type?</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setHoveredIndex(null)}>
                Save changes
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="bg-red-400"
                onClick={() => setHoveredIndex(null)}
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditWorkoutDialog;
