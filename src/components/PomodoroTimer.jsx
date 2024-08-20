import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(1500); //25 min par défaut
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro'); // pomodoro, shortBreak, longBreak

  const modes = {
    pomodoro: 1500, // 25 min
    shortBreak: 300, // 5 min
    longBreak: 900, // 15 min
  };

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(seconds => seconds - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleModeChange = newMode => {
    setMode(newMode);
    setSecondsLeft(modes[newMode]);
    setIsActive(false); // Réinitialiser l'activité lorsque le mode change
  };

  return (
    <div className='max-w-md w-full  rounded-md flex flex-col items-center'>
      <div className='flex max-w-md  rounded-xl items-center border border-gray-200 mb-4'>
        
        <div className='w-full p-3'>
          <p className=' text-slate-700 ml-1 text-xl font-medium '>
            Pomodoro Timer
          </p>
          <div className='flex space-x-2 mt-4'>
            <button
              onClick={() => handleModeChange('pomodoro')} // pour le bouton Pomodoro
              className={`rounded-md px-6 py-3 ml-1 shadow-sm text-white ${
                mode === 'pomodoro' ? 'bg-sky-400 text-white' : `bg-sky-600`
              }`}
            >
              Pomodoro
            </button>
            <button
              onClick={() => handleModeChange('shortBreak')}
              className={`rounded-md px-5 py-2 ml-1 shadow-sm text-white ${
                mode === 'shortBreak'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-600 text-black'
              }`}
            >
              shortBreak
            </button>
            <button
              onClick={() => handleModeChange('longBreak')}
              className={`rounded-md px-5 py-2 ml-1 shadow-sm text-white ${
                mode === 'longBreak'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-600 text-black'
              }`}
            >
              LongBreak
            </button>
          </div>
        </div>
      </div>
      <div className=' bg-gray-300 w-96   rounded-md flex flex-col items-center'>
        <div className='p-10'>
          <CircularProgressbar
            value={(secondsLeft / modes[mode]) * 100}
            text={formatTime(secondsLeft)}
            styles={buildStyles({
              strokeLinecap: 'butt',
              textColor: '#fff',
              pathColor: '#e0f2fe',
            })}
          />
        </div>
      </div>
      <div className='w-full p-3 border-3  flex justify-center  max-w-md  rounded-xl items-center border border-gray-200 mb-4 '>
        <div className='flex space-x-4 '>
          <button
            onClick={() => setIsActive(!isActive)}
            className='rounded-md px-5 py-2 ml-1 shadow-sm bg-yellow-500 text-white'
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => setIsActive(false)}
            className='rounded-md px-5 py-2 ml-1 shadow-sm  bg-sky-500 text-white'
          >
            Reset
          </button>
        </div>
        {/* <div className='mt-4'>
          <button className='px-4 py-2 bg-gray-500 text-white'>Settings</button>
        </div> */}
      </div>
    </div>
  );
}
