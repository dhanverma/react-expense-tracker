import React from 'react'

const TransactionRow = ({ transaction , deleteTrans , editTrans}) => {

    const formattedDate = new Date(`${transaction.date}T00:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });

    return (
        <div className="grid grid-cols-2 px-4 py-1 text-sm md:grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] items-center border-b border-white/5">
            <div className="font-medium">{transaction.title}</div>

            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">{transaction.icon}</span>
                <span>{transaction.category}</span>
            </div>

            <div className={`flex items-center ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`} >
                <span className="material-symbols-outlined">
                    {`${transaction.type === 'income' ? 'arrow_upward' : 'arrow_downward'}`}
                </span>
                <span>
                    {transaction.type}
                </span>
            </div>

            <div className="font-semibold flex gap-1">
                {`${transaction.type === 'income' ? '+' : '-'}`}
                {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0
                    }).format(`${transaction.amount}`)}
            </div>

            <div>{formattedDate}</div>
            <div className='flex gap-1'>
                <button
                    type="button"
                    aria-label="Edit transaction"
                    onClick={editTrans}
                >
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                    type="button"
                    aria-label="delete transaction"
                    onClick={deleteTrans}
                >
                    <span className="text-red-400 material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    )
}

export default TransactionRow