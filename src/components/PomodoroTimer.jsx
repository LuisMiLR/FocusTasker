import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { toast, Bounce, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import wav files
import alarm from '../assets/audio/alarm.wav';
import jackpot from '../assets/audio/jackpot.wav';
import littleBirds from '../assets/audio/littleBirds.wav';

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(1500); //25 min par défaut
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro'); // pomodoro, shortBreak, longBreak

  const modes = {
    pomodoro: 1500, // 25 min
    shortBreak: 50, // 5 min
    longBreak: 900, // 15 min
  };

  const colors = {
    pomodoro: '#0891b2',
    shortBreak: '#A7F3D0',
    longBreak: '#A5F3FC',
  };

  const pomodoroAlert = new Audio(alarm);
  const shortBreakAlert = new Audio(littleBirds);
  const longBreakAlert = new Audio(jackpot);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(
        () => setSecondsLeft(seconds => seconds - 1),
        1000
      );
    } else if (secondsLeft === 0) {
      clearInterval(interval);
      if (mode === 'pomodoro') {
        shortBreakAlert.play();
        toast.info('Time for a short break!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide,
        });
        handleModeChange('shortBreak');
      } else if (mode === 'shortBreak') {
        pomodoroAlert.play();
        toast.info('Back to work!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide,
        });
        handleModeChange('pomodoro');
      } else if (mode === 'longBreak') {
        pomodoroAlert.play();
        toast.info('Back to work!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide,
        });
        handleModeChange('pomodoro');
      }
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleModeChange = () => {
    if (mode === 'pomodoro') {
      setMode('shortBreak');
      setSecondsLeft(modes['shortBreak']);
    } else if (mode === 'shortBreak') {
      setMode('pomodoro');
    } else if (mode === 'longBreak') {
      setMode('pomodoro');
      setSecondsLeft(modes['pomodoro']);
    }
    setIsActive(false);
  };

  return (
    <div className='max-w-md w-full rounded-md flex flex-col items-center'>
      <div className='flex space-x-2 mb-4'>
        {['pomodoro', 'shortBreak', 'longBreak'].map(m => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`rounded-md px-4 py-2 ${
              mode === m
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-sky-800 text-white shadow-md'
            } transition`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      <div className='flex flex-col items-center w-full border border-gray-200 rounded-xl p-4 mb-4'>
        <div className='w-80'>
          <CircularProgressbar
            value={(secondsLeft / modes[mode]) * 100}
            text={formatTime(secondsLeft)}
            styles={buildStyles({
              strokeLinecap: 'butt',
              textColor: '#075985',
              textSize: '28px',
              pathColor: colors[mode],
              transition: 'stroke 0.5s ease',
            })}
          />
        </div>
      </div>
      <div className='w-full flex justify-center space-x-4'>
        <button
          onClick={() => setIsActive(prev => !prev)}
          className='rounded-md px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-white shadow-sm'
        >
          {isActive ? (
            <PauseIcon className='h-5 w-10' />
          ) : (
            <PlayIcon className='h-5 w-10' />
          )}
        </button>
        <button
          onClick={() => {
            setIsActive(false);
            setSecondsLeft(modes[mode]);
          }}
          className='rounded-md px-5 py-2 bg-sky-800 hover:bg-sky-500 transition text-white shadow-sm'
        >
          <ArrowPathIcon className='h-5 w-10' />
        </button>
      </div>
    </div>
  );
}
