// components/Question.js
'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/card';
import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
// import { VolumeUpIcon } from '@heroicons/react/24/solid';

const Question = () => {
  const router = useRouter();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  const playAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        audioRef.current.onended = () => setIsPlaying(false);
      } catch (err) {
        console.error('Error playing audio:', err);
        setError('Unable to play audio. Please try again.');
      }
    } else {
      console.error('Audio reference is null.');
      setError('Audio element not found.');
    }
  };

  const handleNext = () => {
    router.push('/answer-recording');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <Card className="max-w-lg w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="flex justify-center bg-purple-100 p-6">
          <SpeakerWaveIcon className="h-12 w-12 text-purple-600" />
        </CardHeader>
        <CardBody className="p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interview Question</h2>
          <p className="text-gray-600 mb-6">Listen to the question carefully before answering.</p>
          {error && (
            <div className="flex items-center justify-center mb-4">
              <SpeakerWaveIcon className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-500">{error}</span>
            </div>
          )}
          <audio ref={audioRef} preload="auto">
            <source src="/audio/question.mp4" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </CardBody>
        <CardFooter className="flex flex-col space-y-4 p-6">
          <Button
            onClick={playAudio}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-500 hover:bg-indigo-600 transition duration-300"
            disabled={isPlaying}
          >
            {/* <VolumeUpIcon className="h-5 w-5" /> */}
            <span>{isPlaying ? 'Playing...' : 'Play Question Audio'}</span>
          </Button>
          <Button
            onClick={handleNext}
            className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300"
          >
            Proceed to Answer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Question;
