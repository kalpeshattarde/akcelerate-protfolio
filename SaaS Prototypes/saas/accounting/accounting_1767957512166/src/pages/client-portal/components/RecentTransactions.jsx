import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RecentTransactions = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const transactions = [
    {
      id: 1,
      date: "2024-11-15",
      description: "Software License Renewal - Adobe Creative Suite",
      category: "Technology",
      type: "expense",
      amount: -2400.00,
      status: "completed",
      reference: "TXN-2024-1156"
    },
    {
      id: 2,
      date: "2024-11-14",
      description: "Client Payment - Project Alpha Consulting",
      category: "Revenue",
      type: "income",
      amount: 15750.00,
      status: "completed",
      reference: "TXN-2024-1155"
    },
    {
      id: 3,
      date: "2024-11-13",
      description: "Office Rent - November 2024",
      category: "Operations",
      type: "expense",
      amount: -4200.00,
      status: "completed",
      reference: "TXN-2024-1154"
    },
    {
      id: 4,
      date: "2024-11-12",
      description: "Marketing Campaign - Google Ads",
      category: "Marketing",
      type: "expense",
      amount: -1850.00,
      status: "pending",
      reference: "TXN-2024-1153"
    },
    {
      id: 5,
      date: "2024-11-11",
      description: "Freelancer Payment - Web Development",
      category: "Personnel",
      type: "expense",
      amount: -3200.00,
      status: "completed",
      reference: "TXN-2024-1152"
    },
    {
      id: 6,
      date: "2024-11-10",
      description: "Product Sales - E-commerce Platform",
      category: "Revenue",
      type: "income",
      amount: 8950.00,
      status: "completed",
      reference: "TXN-2024-1151"
    },
    {
      id: 7,
      date: "2024-11-09",
      description: "Business Insurance Premium",
      category: "Operations",
      type: "expense",
      amount: -1200.00,
      status: "completed",
      reference: "TXN-2024-1150"
    },
    {
      id: 8,
      date: "2024-11-08",
      description: "Equipment Purchase - Laptop",
      category: "Technology",
      type: "expense",
      amount: -2800.00,
      status: "completed",
      reference: "TXN-2024-1149"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Transactions', count: transactions?.length },
    { id: 'income', label: 'Income', count: transactions?.filter(t => t?.type === 'income')?.length },
    { id: 'expense', label: 'Expenses', count: transactions?.filter(t => t?.type === 'expense')?.length },
    { id: 'pending', label: 'Pending', count: transactions?.filter(t => t?.status === 'pending')?.length }
  ];

  const filteredTransactions = transactions?.filter(transaction => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pending') return transaction?.status === 'pending';
    return transaction?.type === selectedFilter;
  });

  const getTransactionIcon = (type) => {
    return type === 'income' ? 'ArrowUpRight' : 'ArrowDownLeft';
  };

  const getTransactionColor = (type) => {
    return type === 'income' ? 'text-success' : 'text-error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success-100';
      case 'pending':
        return 'text-warning bg-warning-100';
      default:
        return 'text-text-secondary bg-background';
    }
  };

  const formatAmount = (amount) => {
    const absAmount = Math.abs(amount);
    return `${amount < 0 ? '-' : '+'}$${absAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
              Recent Transactions
            </h3>
            <p className="text-sm text-text-secondary">Latest financial activity</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {filters?.map((filter) => (
              <button
                key={filter?.id}
                onClick={() => setSelectedFilter(filter?.id)}
                className={`
                  px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium nav-transition flex items-center space-x-1 sm:space-x-2 flex-shrink-0
                  ${selectedFilter === filter?.id
                    ? 'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                <span className="truncate">{filter?.label}</span>
                <span className={`
                  text-xs px-1.5 py-0.5 rounded-full flex-shrink-0
                  ${selectedFilter === filter?.id
                    ? 'bg-white bg-opacity-20 text-white' :'bg-border text-text-secondary'
                  }
                `}>
                  {filter?.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left py-3 px-4 sm:px-6 text-sm font-medium text-text-secondary whitespace-nowrap">Date</th>
                <th className="text-left py-3 px-4 sm:px-6 text-sm font-medium text-text-secondary">Description</th>
                <th className="text-left py-3 px-4 sm:px-6 text-sm font-medium text-text-secondary whitespace-nowrap">Category</th>
                <th className="text-left py-3 px-4 sm:px-6 text-sm font-medium text-text-secondary whitespace-nowrap">Status</th>
                <th className="text-right py-3 px-4 sm:px-6 text-sm font-medium text-text-secondary whitespace-nowrap">Amount</th>
                <th className="text-center py-3 px-4 sm:px-6 text-sm font-medium text-text-secondary whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions?.map((transaction) => (
                <tr key={transaction?.id} className="hover:bg-background nav-transition">
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="text-sm text-text-primary font-medium">
                      {formatDate(transaction?.date)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {transaction?.reference}
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        ${transaction?.type === 'income' ? 'bg-success-100' : 'bg-error-100'}
                      `}>
                        <Icon 
                          name={getTransactionIcon(transaction?.type)} 
                          size={16} 
                          color={transaction?.type === 'income' ? 'var(--color-success)' : 'var(--color-error)'} 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-text-primary break-words overflow-wrap-anywhere leading-5">
                          {transaction?.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
                      {transaction?.category}
                    </span>
                  </td>
                  
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${getStatusColor(transaction?.status)}
                    `}>
                      {transaction?.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className={`text-sm font-medium ${getTransactionColor(transaction?.type)}`}>
                      {formatAmount(transaction?.amount)}
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                    <button
                      className="p-2 text-text-secondary hover:text-primary hover:bg-primary-100 rounded-lg nav-transition"
                      title="View details"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {filteredTransactions?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Receipt" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h3 className="font-medium text-text-primary mb-2">No transactions found</h3>
          <p className="text-text-secondary">
            No transactions match the selected filter criteria.
          </p>
        </div>
      )}
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Showing {filteredTransactions?.length} of {transactions?.length} transactions
          </p>
          <button className="text-sm text-secondary hover:text-secondary-700 nav-transition font-medium">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;