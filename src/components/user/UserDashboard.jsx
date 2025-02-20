import React, { useState } from "react";
import { FaWallet, FaArrowUp, FaArrowDown, FaChartBar } from "react-icons/fa";
import AddExpense from "./AddExpense";
import Chart from "../Charts/Chart";
import { Link } from "react-router-dom";
import { format } from "date-fns";
const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Static Data
  const stats = {
    balance: 2500,
    income: 4000,
    expenses: 1500,
    savings: 2500,
  };
  // Transactions
  const transactions = [
    {
      id: 1,
      type: "expense",
      amount: 50,
      category: "Food & Drinks",
      description: "Lunch at Restaurant",
      date: "2024-02-20",
    },
    {
      id: 2,
      type: "income",
      amount: 2000,
      category: "Salary",
      description: "Monthly Salary",
      date: "2024-02-19",
    },
    {
      id: 3,
      type: "expense",
      amount: 100,
      category: "Transportation",
      description: "Fuel",
      date: "2024-02-18",
    },
  ];
  const StatCard = ({ title, amount, icon, color, bgColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <div className={`${bgColor} p-4 rounded-lg`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">
            ${amount.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50">
      <AddExpense isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, <span className="text-blue-600">User!</span>
        </h1>
        <p className="text-gray-600">
          Track your expenses and savings with ease
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Balance"
          amount={stats.balance}
          icon={<FaWallet className="text-blue-600 text-xl" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Total Income"
          amount={stats.income}
          icon={<FaArrowUp className="text-green-600 text-xl" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Total Expenses"
          amount={stats.expenses}
          icon={<FaArrowDown className="text-red-600 text-xl" />}
          bgColor="bg-red-50"
        />
        <StatCard
          title="Total Savings"
          amount={stats.savings}
          icon={<FaChartBar className="text-purple-600 text-xl" />}
          bgColor="bg-purple-50"
        />
      </div>
      {/* Chart Component */}
      <div className="mb-8">
        <Chart />
      </div>
      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Recent Transactions
          </h2>
          <Link to="/user/transactions">
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer">
              View All
            </button>
          </Link>
        </div>

        <div className="space-y-4">
          {transactions.length > 0 ? (
            <>
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-lg ${
                        transaction.type === "expense"
                          ? "bg-red-50"
                          : "bg-green-50"
                      }`}
                    >
                      {transaction.type === "expense" ? (
                        <FaArrowDown className="text-red-600 text-lg" />
                      ) : (
                        <FaArrowUp className="text-green-600 text-lg" />
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
                      {transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(transaction.date), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              ))}
              <div className="text-center mt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Add New Transaction
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
              <FaWallet className="text-gray-400 text-4xl mb-4" />
              <p className="text-gray-500 text-center">
                No recent transactions to display
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Add Transaction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
