// components/CheckPermissions.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/button';
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/card';
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const CheckPermissions = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const checkPermissions = async () => {
    setLoading(true);
    setError('');
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      await navigator.mediaDevices.getDisplayMedia({ video: true });
      setPermissionsGranted(true);
      setTimeout(() => {
        router.push('/question');
      }, 1500); // Brief delay to show success state
    } catch (err) {
      setError('Permissions not granted. Please allow access to proceed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <Card className="max-w-md w-full bg-white shadow-lg rounded-lg">
        <CardHeader className="flex justify-center">
          {permissionsGranted ? (
            <CheckCircleIcon className="h-12 w-12 text-green-500" />
          ) : (
            <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />
          )}
        </CardHeader>
        <CardBody className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {permissionsGranted ? 'Permissions Granted!' : 'Check Permissions'}
          </h2>
          <p className="text-gray-600 mb-6">
            We need access to your camera, microphone, and screen sharing to proceed with the interview.
          </p>
          {error && (
            <div className="flex items-center justify-center mb-4">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-500">{error}</span>
            </div>
          )}
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button
            onClick={checkPermissions}
            className="w-full"
            disabled={loading || permissionsGranted}
          >
            {loading ? 'Checking...' : permissionsGranted ? 'Redirecting...' : 'Grant Permissions'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckPermissions;
