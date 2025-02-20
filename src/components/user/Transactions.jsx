import React, { useState } from "react";
import { FaFilter, FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import AddExpense from "./AddExpense";
const Transactions = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy Data
  const transactions = [
    {
      id: 1,
      type: "expense",
      amount: 50,
      category: "Food",
      description: "Lunch",
      date: "2024-02-20",
    },
    {
      id: 2,
      type: "income",
      amount: 1000,
      category: "Salary",
      description: "Monthly salary",
      date: "2024-02-19",
    },
    {
      id: 3,
      type: "expense",
      amount: 100,
      category: "Lunch",
      description: "Dinner",
      date: "2024-02-19",
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <AddExpense isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Transactions
        </h1>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="px-4 py-2 flex items-center space-x-2 text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <FaFilter className="text-gray-400" />
            <span>Filter</span>
          </button>

          <button
            className="px-4 py-2 flex items-center space-x-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="form-select rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500">
              <option value="">All Types</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <select className="form-select rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="salary">Salary</option>
            </select>

            <input
              type="date"
              className="form-input rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />

            <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-1 divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === "expense"
                        ? "bg-red-50"
                        : "bg-green-50"
                    }`}
                  >
                    {transaction.type === "expense" ? (
                      <FaArrowDown className="text-red-600" />
                    ) : (
                      <FaArrowUp className="text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.type === "expense"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {transaction.type === "expense" ? "-" : "+"}$
                    {transaction.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
