import React from 'react';

export default function NavBar() {
  return (
    <div className=' bg-gray-200 flex flex-col sm:flex-row justify-between items-center p-4'>
      <div className='flex items-center sm:mb-0 pl-32'>
        <span className='text-customBlue text-2xl font-semibold'>Focus</span>
        <p className='  text-yellow-500 text-2xl font-semibold '>Tasker</p>
      </div>
      <ul className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-customBlue  text-lg font-normal'>
        {/* <li className='hover:text-text-blue-600'>
          <a href='#Home'>Home</a>
        </li>
        <li className='hover:text-blue-600'>
          <a href='#about'>About</a>
        </li> */}
        <li className='hover:text-slate-800  pr-32'>
          <a href='#profil'>Profil</a>
        </li>
      </ul>
    </div>
  );
}
