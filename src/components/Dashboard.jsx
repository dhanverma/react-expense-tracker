import React, { useState, useEffect } from 'react'
import Header from './Header.jsx'
import Greeting from './Greeting.jsx';
import SummaryCards from './SummaryCards.jsx'
import Sidebar from './Sidebar.jsx'
import RecentTransactions from './RecentTransactions.jsx';
import SpendingOverview from './SpendingOverview.jsx';
import BudgetOverview from './BudgetOverview.jsx';
import SavingsGoals from './SavingsGoals.jsx';
import InsightsView from './InsightsView.jsx';
import TransactionModal from './TransactionModal.jsx';

const Dashboard = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editObject, setEditObject] = useState(null)


    const [transactions, setTransactions] = useState(() => {
        const storedTransaction = localStorage.getItem('allTransactions')

        if (storedTransaction) {
            return JSON.parse(storedTransaction)
        }
        return [
            {
                id: 1,
                title: '🍕 Pizza Dinner',
                category: 'Eating Out',
                type: 'expense',
                amount: 450,
                date: '2025-11-01',
                icon: 'restaurant'
            },
            {
                id: 2,
                title: '💰 Freelance Project',
                category: 'Income',
                type: 'income',
                amount: 15000,
                date: '2025-10-31',
                icon: 'money'
            },
            {
                id: 3,
                title: '🛒 Groceries',
                category: 'Food',
                type: 'expense',
                amount: 1250,
                date: '2025-10-30',
                icon: 'grocery'
            },
            {
                id: 4,
                title: '🎁 Gift for Her ❤️',
                category: 'Personal',
                type: 'expense',
                amount: 2000,
                date: '2025-10-28',
                icon: 'favorite'
            },
        ];
    });

    useEffect(() => {
        localStorage.setItem('allTransactions', JSON.stringify(transactions));
    }, [transactions]);

    const [search, setSearch] = useState("")

    const filteredTransaction = transactions.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
    )


    function addTransaction(newTransaction) {
        setTransactions((currentTransactions) => [
            {
                ...newTransaction,
                id: Date.now()
            },
            ...currentTransactions,
        ]);
        setIsAddModalOpen(false);
    }

    function deleteTransaction(id) {
        setTransactions((currentTransactions) =>
            currentTransactions.filter(transaction => transaction.id !== id)
        )
    }

    function editTransaction(id) {
        const obj = transactions.find(t => t.id === id)
        if (obj) setEditObject(obj)

        setIsAddModalOpen(true)
    }

    function updateTransaction(id, updatedData) {
        setTransactions(currentTransactions =>
            currentTransactions.map(transaction =>
                transaction.id === id
                    ? { ...transaction, ...updatedData }
                    : transaction
            )
        );

        setEditObject(null);
        setIsAddModalOpen(false);
    }

    const totalIncome = transactions.reduce((sum, acc) => {
        if (acc.type === 'income') {
            return sum + acc.amount
        }
        return sum
    }, 0)

    const totalExpense = transactions.reduce((sum, acc) => {
        if (acc.type === 'expense') {
            return sum + acc.amount
        }
        return sum
    }, 0)

    const totalBalance = totalIncome - totalExpense;
    const totalSaving = totalIncome - totalExpense;


    return (
        <div className='flex min-h-screen ml-58 min-w-0'>

            <Sidebar />

            <div className="flex-1 p-5">

                <Header
                    onClick={() => {
                        setIsAddModalOpen(true);
                        setEditObject(null)
                    }}
                    onSearch={(e) => setSearch(e.target.value)}
                />
                <Greeting />
                <SummaryCards
                    totalIncome={totalIncome}
                    totalExpense={totalExpense}
                    totalBalance={totalBalance}
                    totalSaving={totalSaving}
                />
                <TransactionModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={addTransaction}
                    onUpdate={updateTransaction}
                    selectedTransaction={editObject}
                    isEditing={editObject ? true : false}
                />

                <div className='grid grid-cols-[2.5fr_1fr] gap-5'>

                    <div className='flex flex-col gap-4'>

                        <SpendingOverview />
                        <RecentTransactions
                            transactions={filteredTransaction}
                            onDelete={deleteTransaction}
                            onEdit={editTransaction}
                        />

                    </div>
                    <div className='flex flex-col gap-4'>

                        <BudgetOverview />
                        <SavingsGoals />
                        <InsightsView />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
