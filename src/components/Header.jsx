import React from 'react'

const Header = ({ onClick, search = '', onSearch }) => {
    return (
        <div className='flex items-center sticky top-0 pb-3 text-sm w-full gap-3 bg-[#0c0224] '>
            <div className="searchBox flex items-center text-mauve-300 max-w-md flex-1 p-1.5 shadow-lg shadow-black bg-[#0b0714] rounded-[10px] border border-indigo-950">
                <span className="material-symbols-outlined px-1.5">
                    search
                </span>
                <input 
                type="search"
                name="search"
                value={search}
                onChange={onSearch} 
                id="searchInp" 
                placeholder='Search Transactions...' 
                className='px-2 focus:outline-none w-full' 
                />
                <span className='hidden sm:block text-xs text-center bg-mauve-800 rounded-lg ml-auto min-w-13 px-1.5 font-light'>Ctrl + K</span>
            </div>
            <button
                type="button"
                onClick={onClick}
                className="rounded-lg bg-violet-600 ml-auto px-4 py-2 text-white"
            >
                🞤 Add Transaction
            </button>
            <button className="notifications relative text-indigo-300 bg-mauve-950 rounded-4xl border border-indigo-900" aria-label="Notifications">
                <span className="material-symbols-outlined p-2">
                    notifications
                </span>
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
            </button>
            <button className="themeBtn text-indigo-300 bg-mauve-950 rounded-4xl border border-indigo-900">
                <span className="material-symbols-outlined p-2">
                    bedtime
                </span>
            </button>
        </div>
    )
}

export default Header
