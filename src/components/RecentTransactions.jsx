import React from 'react'
import TransactionRow from './TransactionRow.jsx'

const RecentTransactions = ({ transactions, onDelete, onEdit }) => {
    return (
        <div className='py-2 rounded-xl h-66 overflow-hidden border border-[#1d1531] bg-[#150d29]'>
            <div className='flex px-2 pb-2 justify-between'>
                <div className='flex gap-2 items-center'>
                    <span className="material-symbols-outlined px-1.5 text-violet-500">cached</span>
                    <span className='font-bold'>Recent Transactions</span>
                </div>
                <button type="button" className="text-violet-500 text-sm">View All →</button>
            </div>
            <div className="grid grid-cols-2 px-4 py-1 text-sm md:grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] bg-[#1d1531]">
                <div>Description</div>
                <div>Category</div>
                <div>Type</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Action</div>
            </div>
            {transactions.length > 0 ?
                transactions.map(transaction => (
                    <TransactionRow
                        key={transaction.id}
                        transaction={transaction}
                        deleteTrans={() => onDelete(transaction.id)}
                        editTrans={() => onEdit(transaction.id)}
                    />
                )) : (
                    <div className="rounded-2xl  px-4 py-10 text-center">
                        <p className="text-lg font-semibold text-gray-700">
                            No transactions yet
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Add a task to get started.
                        </p>
                    </div>
                )}
        </div>
    )
}

export default RecentTransactions
