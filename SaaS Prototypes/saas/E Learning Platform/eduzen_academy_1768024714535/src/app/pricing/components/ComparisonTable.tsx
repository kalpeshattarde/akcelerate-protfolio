import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Feature {
  name: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}

interface ComparisonTableProps {
  features: Feature[];
}

const ComparisonTable = ({ features }: ComparisonTableProps) => {
  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon
          name="CheckIcon"
          variant="solid"
          size={20}
          className="text-success mx-auto"
        />
      ) : (
        <Icon
          name="XMarkIcon"
          variant="solid"
          size={20}
          className="text-muted-foreground/30 mx-auto"
        />
      );
    }
    return <span className="font-body text-sm text-foreground">{value}</span>;
  };

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left py-6 px-6 font-headline text-lg font-semibold text-foreground">
                Features
              </th>
              <th className="text-center py-6 px-6 font-headline text-lg font-semibold text-foreground">
                Starter
              </th>
              <th className="text-center py-6 px-6 font-headline text-lg font-semibold text-foreground">
                Professional
              </th>
              <th className="text-center py-6 px-6 font-headline text-lg font-semibold text-foreground">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={index}
                className="border-t border-border hover:bg-muted/20 transition-colors duration-200"
              >
                <td className="py-5 px-6 font-body text-sm text-foreground">
                  {feature.name}
                </td>
                <td className="py-5 px-6 text-center">
                  {renderCell(feature.starter)}
                </td>
                <td className="py-5 px-6 text-center">
                  {renderCell(feature.professional)}
                </td>
                <td className="py-5 px-6 text-center">
                  {renderCell(feature.enterprise)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;