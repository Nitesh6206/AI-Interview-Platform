// components/Loader.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody } from '@/components/ui/card';
import { Spinner } from './ui/spinner';

const Loader = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/test-completion');
    }, 3000); // Simulate a 3-second loading time

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <Card className="max-w-md w-full bg-white shadow-xl rounded-lg">
        <CardBody className="flex flex-col items-center justify-center p-6">

          {/* Informative Text */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Processing Your Response</h2>
          <p className="text-gray-600 text-center">
            Please wait while we process your answer. This might take a few moments.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Loader;
