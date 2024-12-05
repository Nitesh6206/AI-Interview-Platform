// components/AnswerRecording.js
'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/card';
import { CameraIcon, StopIcon } from '@heroicons/react/24/solid';
import { Spinner } from '@/components/ui/spinner'; // Optional: Spinner component for loading

const AnswerRecording = () => {
  const router = useRouter();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const startRecording = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      mediaRecorder.ondataavailable = (e) => {
        setChunks((prev) => [...prev, e.data]);
      };

      setRecording(true);
    } catch (err) {
      console.error('Error accessing media devices.', err);
      setError('Unable to access camera and microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setRecording(false);
      uploadRecording();
    }
  };

  const uploadRecording = async () => {
    setUploading(true);
    const blob = new Blob(chunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('file', blob, 'answer.webm');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/loader');
      } else {
        throw new Error('Upload failed.');
      }
    } catch (err) {
      console.error('Error uploading the recording:', err);
      setError('Failed to upload the recording. Please try again.');
    } finally {
      setUploading(false);
      setChunks([]); // Clear chunks after upload
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <Card className="max-w-2xl max-h-[100vh] w-full  bg-white shadow-2xl rounded-lg overflow-auto scrollbar-hide ">
        {/* <CardHeader className="flex justify-center bg-teal-100 p-6">
          <CameraIcon className="h-12 w-12 text-teal-600" />
        </CardHeader> */}
        <CardBody className="p-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Record Your Answer</h2>
          <p className="text-gray-600 mb-6">
            Please record your answer to the interview question below. Ensure your camera and microphone are enabled.
          </p>
          {error && (
            <div className="flex items-center justify-center mb-4">
              <StopIcon className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-500">{error}</span>
            </div>
          )}
          <div className="flex justify-center mb-6">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full max-w-md h-auto rounded-md shadow-md"
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col space-y-4 p-6">
          {!recording ? (
            <Button
              onClick={startRecording}
              className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 transition duration-300"
            >
              <CameraIcon className="h-5 w-5" />
              <span>Start Recording</span>
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 transition duration-300"
            >
              <StopIcon className="h-5 w-5" />
              <span>Stop Recording</span>
            </Button>
          )}
          {uploading && (
            <div className="flex items-center justify-center space-x-2">
              <Spinner className="h-5 w-5 text-blue-500" />
              <span className="text-blue-500">Uploading...</span>
            </div>
          )}
          <Button
            onClick={() => router.push('/question')}
            className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 transition duration-300"
          >
            {/* <UploadIcon className="h-5 w-5" /> */}
            <span>Proceed to Answer</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnswerRecording;
