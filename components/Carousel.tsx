'use client';
import React, { useEffect, useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Loading from './Loading';
import { AddWorkoutDialog } from './myUi/AddWorkoutDialog';

type Props = {};

const Carousel = (props: Props) => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [days, setDays] = useState<Date[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    const today = new Date();
    let daysArray = [];

    for (let i = -3; i <= 3; i++) {
      daysArray.push(addDays(today, i));
    }

    setDays(daysArray);
    setLoading(false);
  }, []);

  const handleNextDay = () => {
    setCurrentDay((prev) => {
      const newDay = addDays(prev, 1);
      setDays(days.map((day) => addDays(day, 1)));
      return newDay;
    });
  };

  const handlePreviousDay = () => {
    setCurrentDay((prev) => {
      const newDay = subDays(prev, 1);
      setDays(days.map((day) => subDays(day, 1)));
      return newDay;
    });
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
                className={`flex flex-col items-center p-4 rounded-lg w-20 h-48 ${
                  format(day, 'yyyy-MM-dd') === format(currentDay, 'yyyy-MM-dd')
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                <div>{format(day, 'EEE')}</div>
                <AddWorkoutDialog index={index} hoveredIndex={hoveredIndex} />
              </div>
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
