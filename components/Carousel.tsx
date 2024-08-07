'use client';
import { fetchAllWorkouts, fetchUserWorkouts } from '@/app/api/workouts';

import { addDays, format, subDays } from 'date-fns';
import { enUS, se } from 'date-fns/locale';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { AddWorkoutDialog } from './myUi/AddWorkoutDialog';
import EditWorkoutDialog from './myUi/EditWorkoutDialog';
import { Button } from './ui/button';

type Props = {};

const Carousel = (props: Props) => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [days, setDays] = useState<Date[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: session } = useSession();

  // const clientFetchAllWorkouts = async () => {
  //   const workout = await fetchAllWorkouts();
  //   setWorkouts(workout);
  // };

  const clientFetchUserWorkouts = async () => {
    const userWorkouts = await fetchUserWorkouts(
      session?.user?.email as string,
    );
    setWorkouts(userWorkouts);
  };

  const [workouts, setWorkouts] = useState<
    | {
        id: number;
        workoutTitle: string;
        type: string;
        musclesTrained: string;
        userEmail: string;
        date: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    setLoading(true);
    const today = new Date();
    let daysArray = [];

    for (let i = -3; i <= 3; i++) {
      daysArray.push(addDays(today, i));
    }

    setDays(daysArray);
    setLoading(false);
    clientFetchUserWorkouts();
  }, [session?.user?.email]);

  const handleNextDay = () => {
    setCurrentDay((prev) => {
      const newDay = addDays(prev, 1);
      setDays(days.map((day) => addDays(day, 1)));
      setHoveredIndex(null);
      return newDay;
    });
  };

  const handlePreviousDay = () => {
    setCurrentDay((prev) => {
      const newDay = subDays(prev, 1);
      setDays(days.map((day) => subDays(day, 1)));
      setHoveredIndex(null);
      return newDay;
    });
  };

  const jumpToToday = () => {
    const today = new Date();
    setCurrentDay(today);
    setHoveredIndex(null);
    setDays(Array.from({ length: 7 }, (_, i) => addDays(today, i - 3)));
  };

  const getMusclesTrainedForDate = (date: Date) => {
    const formattedDate = format(date, 'dd-MM-yyyy');
    const workoutsForDate = workouts?.filter((w) => w.date === formattedDate);
    return workoutsForDate?.map((workout) => workout.musclesTrained) || [];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col  items-center  p-4 mt-32">
      <Button onClick={jumpToToday}>Today</Button>
      <div className="flex justify-center  items-center space-x-12">
        <button onClick={handlePreviousDay} className="p-2 bg-gray-300 rounded">
          Previous
        </button>
        <div className="flex  overflow-x-auto space-x-4">
          {days.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-20 h-48 relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="mb-2">{format(day, 'MMM d')}</div>
              <div
                className={`flex flex-col items-center pt-2  rounded-lg w-full h-full ${
                  format(day, 'dd-MM-yyyy') === format(currentDay, 'dd-MM-yyyy')
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                <div>{format(day, 'EEE')}</div>
                <div className="mt-2 text-sm">
                  {getMusclesTrainedForDate(day).map((muscle, index) => {
                    return (
                      <ul key={index} className="text-center">
                        <li>
                          <EditWorkoutDialog setHoveredIndex={setHoveredIndex}>
                            {muscle}
                          </EditWorkoutDialog>
                        </li>
                      </ul>
                    );
                  })}
                </div>{' '}
                {/* Display muscles trained */}
              </div>
              <AddWorkoutDialog
                index={index}
                hoveredIndex={hoveredIndex}
                date={format(day, 'dd-MM-yyyy')}
                getMusclesTrainedForDate={getMusclesTrainedForDate}
                clientFetchUserWorkouts={clientFetchUserWorkouts}
                setHoveredIndex={setHoveredIndex}
              />
            </div>
          ))}
        </div>
        <button onClick={handleNextDay} className="p-2 bg-gray-300 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
