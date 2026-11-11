import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard.jsx'
import Sidebar from './components/Sidebar.jsx'
import TransactionModal from './components/TransactionModal.jsx'
import TransactionsView from './components/TransactionsView.jsx'

const initialTransactions = [
  { id: 1, title: '🍕 Pizza Dinner', category: 'Eating Out', type: 'expense', amount: 450, date: '2025-11-01', icon: 'restaurant' },
  { id: 2, title: '💰 Freelance Project', category: 'Income', type: 'income', amount: 15000, date: '2025-10-31', icon: 'money' },
  { id: 3, title: '🛒 Groceries', category: 'Food', type: 'expense', amount: 1250, date: '2025-10-30', icon: 'grocery' },
  { id: 4, title: '🎁 Gift for Her ❤️', category: 'Personal', type: 'expense', amount: 2000, date: '2025-10-28', icon: 'favorite' },
]

function readTransactions() {
  try {
    const stored = localStorage.getItem('allTransactions')
    if (!stored) return initialTransactions
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : initialTransactions
  } catch {
    return initialTransactions
  }
}

function App() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [transactions, setTransactions] = useState(readTransactions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  useEffect(() => {
    localStorage.setItem('allTransactions', JSON.stringify(transactions))
  }, [transactions])

  function openAddModal() {
    setSelectedTransaction(null)
    setIsModalOpen(true)
  }

  function openEditModal(id) {
    const transaction = transactions.find((item) => item.id === id)
    if (!transaction) return
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setSelectedTransaction(null)
  }

  function addTransaction(newTransaction) {
    setTransactions((current) => [
      { ...newTransaction, id: Date.now() },
      ...current,
    ])
    closeModal()
  }

  function updateTransaction(id, updatedData) {
    setTransactions((current) => current.map((transaction) =>
      transaction.id === id ? { ...transaction, ...updatedData } : transaction
    ))
    closeModal()
  }

  function deleteTransaction(id) {
    setTransactions((current) => current.filter((transaction) => transaction.id !== id))
  }

  function renderPage() {
    switch (activeNav) {
      case 'Dashboard':
        return (
          <Dashboard
            transactions={transactions}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onDelete={deleteTransaction}
            onNavigate={setActiveNav}
          />
        )
      case 'Transactions':
        return (
          <TransactionsView
            transactions={transactions}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onDelete={deleteTransaction}
          />
        )
      case 'Budgets':
      case 'Goals':
      case 'Reports':
      case 'Settings':
        return (
          <section className="rounded-xl border border-[#1d1531] bg-[#150d29] p-6">
            <h1 className="text-2xl font-bold">{activeNav}</h1>
            <p className="mt-2 text-sm text-gray-400">This page is planned for a future update.</p>
          </section>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      <Sidebar activeNav={activeNav} onNavigate={setActiveNav} />
      <main className="ml-58 min-h-screen min-w-0 p-5">
        {renderPage()}
      </main>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={addTransaction}
        onUpdate={updateTransaction}
        selectedTransaction={selectedTransaction}
        isEditing={Boolean(selectedTransaction)}
      />
    </div>
  )
}

export default App
