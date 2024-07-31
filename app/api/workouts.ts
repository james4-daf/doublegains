'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createWorkout(formData: FormData) {
  await prisma.workout.create({
    data: {
      workoutTitle: formData.get('workoutTitle') as string,
      type: formData.get('type') as string,
      musclesTrained: formData.get('musclesTrained') as string,
      userEmail: formData.get('userEmail') as string,
      date: formData.get('date') as string,
    },
  });
}

export async function fetchUserWorkouts(email: string) {
  const workouts = await prisma.workout.findMany({
    where: {
      userEmail: email,
    },
  });
  return workouts;
}

export async function fetchAllWorkouts() {
  return await prisma.workout.findMany();
}
