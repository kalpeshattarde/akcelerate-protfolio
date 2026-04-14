import React, { useState } from 'react';
import Button from '../../../components/ui/Button';


const DateRangePicker = ({ selectedRange, onRangeChange }) => {
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const presetRanges = [
    { value: '1M', label: '1M', active: selectedRange === '1M' },
    { value: '3M', label: '3M', active: selectedRange === '3M' },
    { value: '6M', label: '6M', active: selectedRange === '6M' },
    { value: '1Y', label: '1Y', active: selectedRange === '1Y' },
    { value: '3Y', label: '3Y', active: selectedRange === '3Y' },
    { value: 'ALL', label: 'ALL', active: selectedRange === 'ALL' }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-medium text-muted-foreground mr-2">Period:</span>
      {presetRanges?.map((range) => (
        <Button
          key={range?.value}
          variant={range?.active ? "default" : "outline"}
          size="sm"
          onClick={() => onRangeChange(range?.value)}
          className="min-w-[50px]"
        >
          {range?.label}
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowCustomPicker(!showCustomPicker)}
        iconName="Calendar"
        iconPosition="left"
      >
        Custom
      </Button>
      {showCustomPicker && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-card border border-border rounded-lg shadow-lg z-10">
          <div className="flex gap-2 items-center">
            <input
              type="date"
              className="px-3 py-2 border border-border rounded-md text-xs"
              defaultValue="2024-01-01"
            />
            <span className="text-muted-foreground">to</span>
            <input
              type="date"
              className="px-3 py-2 border border-border rounded-md text-xs"
              defaultValue="2024-12-31"
            />
            <Button size="sm" onClick={() => setShowCustomPicker(false)}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;