import React, { useState } from 'react';
import Select from '../../../components/ui/Select';


const PortfolioSelector = ({ selectedPortfolio, onPortfolioChange, selectedBenchmark, onBenchmarkChange }) => {
  const portfolioOptions = [
    { value: 'main', label: 'Main Portfolio (₹12,58,473)' },
    { value: 'growth', label: 'Growth Portfolio (₹8,45,621)' },
    { value: 'dividend', label: 'Dividend Portfolio (₹5,23,890)' },
    { value: 'retirement', label: 'Retirement Fund (₹15,67,234)' }
  ];

  const benchmarkOptions = [
    { value: 'nifty50', label: 'Nifty 50' },
    { value: 'sensex', label: 'Sensex' },
    { value: 'nifty100', label: 'Nifty 100' },
    { value: 'custom', label: 'Custom Benchmark' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Select
          label="Portfolio"
          options={portfolioOptions}
          value={selectedPortfolio}
          onChange={onPortfolioChange}
          className="w-full"
        />
      </div>
      <div className="flex-1">
        <Select
          label="Benchmark"
          options={benchmarkOptions}
          value={selectedBenchmark}
          onChange={onBenchmarkChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PortfolioSelector;