import { useState } from 'react';
import {
  ClipboardDocumentCheckIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(''); //met à jour l'état de l'input

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
    const CopyTasks = [...tasks];
    CopyTasks[index].completed = !CopyTasks[index].completed;
    setTasks(CopyTasks);
  };

  const deleteTask = index => {
    const CopyTasks = tasks.filter((_, i) => i !== index);
    setTasks(CopyTasks);
  };

  return (
    <>
      <NavBar />
      <div className='flex flex-col min-h-[calc(100vh-120px)]'>
        <div className='flex flex-col items-center flex-grow'>
          <div className='max-w-md w-full shadow-sm bg-slate-50 p-8 rounded-md mt-16'>
            <div className='flex max-w-sm rounded-xl items-center border border-gray-200 mb-4'>
              <img
                className='object-cover rounded-full w-12 h-12 m-2'
                src='https://lmrobles.fr/assets/luisMiguelRobles-RESoZECz.png'
                alt='profil pic'
              />
              <div className='w-full p-3'>
                <p className=' text-slate-700 ml-1 text-xl font-medium'>
                  Luis Miguel todo's
                </p>
                <p className=' text-slate-600 ml-1 text-base font-normal'>
                  {today}
                </p>
              </div>
            </div>
            <div className='flex flex-col mt-8 max-w-md w-full'>
              <form
                onSubmit={addTask} //associe la fonction addtask à l evenement de soumission du formulaire
                className='flex font-medium text-gray-800 w-full mb-4'
              >
                <input
                  type='text'
                  value={newTask} //la prop value affiche la valeur de l'état (c'est un input controlled)
                  onChange={e => setNewTask(e.target.value)} //prop onChange met à jour l'état à chaque fois que la valeur de l'input change
                  className='bg-gray-100 h-12 rounded-md p-2 border border-gray-200 w-full font-light outline-none'
                  placeholder='Add a new task'
                />
                <button className='bg-sky-600 rounded-md px-5 ml-1 shadow-sm text-white hover:bg-sky-400 transmition'>
                  Add
                </button>
              </form>
            </div>

            <div className='mt-4'>
              <ul className='max-w-md w-full'>
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    className={`bg-sky-100 min-h-12 flex justify-between items-center transition text-lg text-slate-600 font-normal p-3 rounded-md my-2 transform ${
                      task.completed
                        ? 'scale-completed bg-slate-200 text-slate-300/75  '
                        : 'scale-default'
                    }`}
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
      </div>
      <Footer />
    </>
  );
}
export default App;
