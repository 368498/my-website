import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-primary">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Sorry, this page does not exist.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Home
      </Link>
    </main>
  );
} 