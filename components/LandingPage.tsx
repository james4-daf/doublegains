'use client';
import { signIn } from 'next-auth/react';
function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">MyFitness</h1>
              </div>
            </div>
            <div className="flex items-center ">
              <button className="border mx-6">login</button>
              <button className="border">sign up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-start flex-1 text-center py-16 px-4 mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Achieve Your <span className="text-indigo-600">Fitness Goals</span>{' '}
            Today
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Join our community and start your journey towards a healthier,
            happier you.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
            >
              Get Started
            </a>
            <button onClick={() => signIn('google')}>sign in</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
