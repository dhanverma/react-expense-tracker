import React, { useState } from 'react'

const navigations = [
  { icon: 'home', nav: 'Dashboard' },
  { icon: 'sync_alt', nav: 'Transactions' },
  { icon: 'radar', nav: 'Budgets' },
  { icon: 'trophy', nav: 'Goals' },
  { icon: 'bar_chart', nav: 'Reports' },
  { icon: 'settings', nav: 'Settings' },
]

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState('Dashboard')

  return (
    <div className='fixed left-0 top-0 overflow-y-auto flex gap-0.5 min-h-screen flex-col w-58 shrink-0 p-3 text-[16px] border-x border-x-[#1e133a] bg-[#150d29] '>
      <div className="flex justify-start items-center gap-4 py-4 pb-8">
        <div><img src="https://cdn-icons-png.flaticon.com/128/7276/7276473.png" alt="Expense_Tracker_logo" height={'60px'} width={'60px'} /></div>
        <div className='flex flex-col text-2xl font-bold'>
          <span>Expense</span>
          <span className='text-purple-800'>Tracker</span>
        </div>
      </div>
      {navigations.map(btn => (
        <button
          key={btn.nav}
          onClick={() => setActiveNav(btn.nav)}
          className={`flex items-center w-full rounded-xl text-sm gap-3 px-3 py-1 cursor-pointer ${activeNav === btn.nav ? 'border border-violet-700 bg-violet-800/80' : 'hover:bg-violet-900/40'}`}>
          <span className="material-symbols-outlined p-2">{btn.icon}</span>
          <span>{btn.nav}</span>
        </button>
      ))}

      <button className="mt-auto flex items-center gap-3 w-full rounded-xl p-2 text-left hover:bg-violet-900/40">
        <div className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center bg-violet-500 font-semibold">
          DV
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Dhanraj Verma</p>
          <p className="text-xs text-gray-400">Premium User 👑</p>
        </div>

        <span className="material-symbols-outlined ml-auto">
          more_vert
        </span>
      </button>

    </div>
  )
}

export default Sidebar
