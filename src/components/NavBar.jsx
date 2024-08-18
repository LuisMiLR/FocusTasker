import React from 'react';

export default function NavBar() {
  return (
    <div className=' bg-gray-50 shadow-sm flex flex-col sm:flex-row justify-between items-center p-4'>
      <div className='flex items-center sm:mb-0 pl-32'>
        <span className='text-sky-600 text-2xl font-bold'>Focus</span>
        <p className='  text-slate-700 text-2xl font-semibold '>Tasker</p>
      </div>
      <ul className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-slate-600  text-lg font-normal'>
        {/* <li className='hover:text-text-blue-600'>
          <a href='#Home'>Home</a>
        </li>
        <li className='hover:text-blue-600'>
          <a href='#about'>About</a>
        </li> */}
        <li className='hover:text-slate-400 pr-32'>
          <a href='#profil'>Profil</a>
        </li>
      </ul>
    </div>
  );
}
