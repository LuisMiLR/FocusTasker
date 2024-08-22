import { useState } from 'react';
import {
  ClipboardDocumentCheckIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './index.css';
import PomodoroTimer from './components/PomodoroTimer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(''); //met à jour l'état de l'input
  const [taskToDelete, setTaskToDelete] = useState(null); 

  const today = new Date().toDateString();

  const addTask = e => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { text: newTask[0].toUpperCase() + newTask.slice(1), completed: false },
      ]); //crée un nouveau tableau et ajoute un nouvelle objet
      setNewTask(''); // Réinitialise le champ de saisie
    }
  };

  const toggleTaskCompletion = index => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = index => {
    setTaskToDelete(index); 
    setTimeout(() => {
      setTasks(tasks.filter((_, i) => i !== index)); 
      setTaskToDelete(null);  
    }, 300);  
  };
  return (
    <>
      <NavBar />
      <div className='flex flex-col mb-8 min-h-[calc(100vh-120px)]'>
        <div className='flex flex-col items-center flex-grow'>
          <div className='max-w-md w-full shadow-md bg-slate-50 p-8 rounded-md mt-4'>
            <PomodoroTimer />
            <div className='flex items-center border border-gray-200 rounded-xl p-4 mt-8 mb-4 w-full max-w-sm'>
              <img
                className='object-cover rounded-full w-12 h-12 mr-3'
                src='https://lmrobles.fr/assets/luisMiguelRobles-RESoZECz.png'
                alt='Profil'
              />
              <div>
                <p className='text-slate-700 text-xl font-medium'>Todo List</p>
                <p className='text-slate-600 text-base'>{today}</p>
              </div>
            </div>
            <form onSubmit={addTask} className='flex items-center mb-4'>
              <input
                type='text'
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                className='bg-gray-100 h-12 rounded-md p-2 border border-gray-200 w-full font-light outline-none'
                placeholder='Add a new task'
              />
              <button
                type='submit'
                className='bg-sky-600 rounded-md px-4 py-2 ml-2 text-white hover:bg-sky-500 transition'
              >
                Add
              </button>
            </form>
          </div>
          <div className='max-w-md w-full shadow-md bg-slate-50 p-8 rounded-md mt-4'>
            <ul>
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center bg-sky-100 p-3 rounded-md mb-2 transition ${
                    task.completed
                      ? 'bg-slate-200 text-slate-400'
                      : 'bg-sky-100'
                  }${taskToDelete === index ? 'fade-deleting' : ''}`}
                >
                  {task.text}
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => toggleTaskCompletion(index)}
                      className={`transition ${
                        task.completed
                          ? 'text-green-600'
                          : 'text-gray-500 hover:text-green-600'
                      }`}
                    >
                      <ClipboardDocumentCheckIcon className='h-5 w-5' />
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className='text-gray-500 hover:text-red-600 transition'
                    >
                      <TrashIcon className='h-5 w-5' />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
