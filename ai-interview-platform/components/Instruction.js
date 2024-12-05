// components/Instruction.js
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/card';
import { Button } from './ui/button';
// import { CheckCircleIcon } from '@heroicons/react/24/solid';

const Instruction = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/check-permissions');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <Card className="max-w-md w-full bg-white shadow-lg rounded-lg">
        <CardHeader className="flex justify-center">
          {/* <CheckCircleIcon className="h-12 w-12 text-green-500" /> */}
        </CardHeader>
        <CardBody className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to the AI Interview Platform
          </h1>
          <p className="text-gray-600 mb-6">
            Prepare yourself for an insightful AI-driven interview experience. Please read the instructions carefully before proceeding.
          </p>
          <ul className="text-left text-gray-600 mb-6 space-y-2">
            <li className="flex items-center">
              <span className="h-4 w-4 mr-2 bg-blue-500 rounded-full inline-block"></span>
              Ensure you have a stable internet connection.
            </li>
            <li className="flex items-center">
              <span className="h-4 w-4 mr-2 bg-blue-500 rounded-full inline-block"></span>
              Allow access to your camera and microphone.
            </li>
            <li className="flex items-center">
              <span className="h-4 w-4 mr-2 bg-blue-500 rounded-full inline-block"></span>
              Find a quiet and well-lit environment for the interview.
            </li>
          </ul>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button onClick={handleStart} className="w-full">
            Start Test
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Instruction;
