'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import LandingPage from '@/components/LandingPage';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/dashboard');
  }
  return (
    <main className="">
      <LandingPage />
    </main>
  );
}
