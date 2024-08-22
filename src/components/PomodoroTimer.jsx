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
      interval = setInterval(() => setSecondsLeft(seconds => seconds - 1),
       1000);
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
    <div className='max-w-md w-full rounded-md flex flex-col items-center'>
      <div className='flex flex-col items-center w-full border border-gray-200 rounded-xl p-4 mb-4'>
        <p className='text-slate-700 text-xl font-medium mb-2'>Pomodoro Timer</p>
        <div className='flex space-x-2 mb-4'>
          {['pomodoro', 'shortBreak', 'longBreak'].map(m => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`rounded-md px-4 py-2 ${mode === m ? 'bg-sky-500 text-white' : 'bg-gray-300 text-black'} transition`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
        <div className='w-80'>
          <CircularProgressbar
            value={(secondsLeft / modes[mode]) * 100}
            text={formatTime(secondsLeft)}
            styles={buildStyles({
              strokeLinecap: 'butt',
              textColor: '#000',
              pathColor: '#4caf50',
            })}
          />
        </div>
      </div>
      <div className='w-full flex justify-center space-x-4'>
        <button
          onClick={() => setIsActive(prev => !prev)}
          className='rounded-md px-5 py-2 bg-yellow-500 text-white'
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => { setIsActive(false); setSecondsLeft(modes[mode]); }}
          className='rounded-md px-5 py-2 bg-sky-500 text-white'
        >
          Reset
        </button>
      </div>
    </div>
  );
}
