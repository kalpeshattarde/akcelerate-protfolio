import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentScheduleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 4)); // September 2025
  const [selectedDate, setSelectedDate] = useState(null);

  const paymentData = {
    '2025-09-05': [
      { id: 1, vendor: 'TechCorp Solutions', amount: 45000, type: 'milestone', status: 'pending' },
      { id: 2, vendor: 'Global Services Inc', amount: 12500, type: 'monthly', status: 'approved' }
    ],
    '2025-09-10': [
      { id: 3, vendor: 'DataFlow Systems', amount: 78000, type: 'quarterly', status: 'overdue' }
    ],
    '2025-09-15': [
      { id: 4, vendor: 'CloudTech Partners', amount: 25000, type: 'monthly', status: 'pending' },
      { id: 5, vendor: 'Innovation Labs', amount: 35000, type: 'milestone', status: 'scheduled' }
    ],
    '2025-09-20': [
      { id: 6, vendor: 'Enterprise Solutions', amount: 95000, type: 'quarterly', status: 'scheduled' }
    ],
    '2025-09-25': [
      { id: 7, vendor: 'Digital Dynamics', amount: 18000, type: 'monthly', status: 'pending' }
    ]
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'bg-error text-error-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'scheduled': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(currentDate?.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(<div key={`empty-${i}`} className="h-24 border border-border/50"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentDate?.getFullYear(), currentDate?.getMonth(), day);
      const dayPayments = paymentData?.[dateKey] || [];
      const isSelected = selectedDate === dateKey;
      const isToday = dateKey === '2025-09-04';

      days?.push(
        <div
          key={day}
          onClick={() => setSelectedDate(dateKey)}
          className={`h-24 border border-border/50 p-2 cursor-pointer transition-smooth hover:bg-muted/50 ${
            isSelected ? 'bg-accent/10 border-accent' : ''
          } ${isToday ? 'bg-primary/5 border-primary/30' : ''}`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : 'text-text-primary'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayPayments?.slice(0, 2)?.map((payment) => (
              <div
                key={payment?.id}
                className={`text-xs px-2 py-1 rounded text-center ${getPaymentStatusColor(payment?.status)}`}
              >
                ${(payment?.amount / 1000)?.toFixed(0)}k
              </div>
            ))}
            {dayPayments?.length > 2 && (
              <div className="text-xs text-muted-foreground text-center">
                +{dayPayments?.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedPayments = selectedDate ? paymentData?.[selectedDate] || [] : [];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Payment Schedule</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <span className="text-sm font-medium text-text-primary px-4">
              {currentDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded"></div>
            <span>Overdue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span>Approved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded"></div>
            <span>Scheduled</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-7 gap-0 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map((day) => (
            <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground border-b border-border">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-0">
          {renderCalendarDays()}
        </div>

        {selectedDate && selectedPayments?.length > 0 && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium text-text-primary mb-3">
              Payments for {new Date(selectedDate)?.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </h4>
            <div className="space-y-2">
              {selectedPayments?.map((payment) => (
                <div key={payment?.id} className="flex items-center justify-between p-3 bg-surface rounded border border-border">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{payment?.vendor}</div>
                    <div className="text-xs text-muted-foreground capitalize">{payment?.type} payment</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-text-primary">
                      ${payment?.amount?.toLocaleString()}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${getPaymentStatusColor(payment?.status)}`}>
                      {payment?.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentScheduleCalendar;