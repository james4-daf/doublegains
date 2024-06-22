'use client';
import { useSession } from 'next-auth/react';
import Carousel from '../../components/Carousel';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push('/');
  }
  return (
    <main className="">
      {session && (
        <>
          <p>loged in</p>
        </>
      )}
      <Carousel />
    </main>
  );
}
