'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Carousel from '../../components/Carousel';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; // Or a loading spinner, etc.
  }

  return (
    <main className="">
      {session && (
        <>
          <p>Logged in</p>
        </>
      )}
      <Carousel />
    </main>
  );
}
