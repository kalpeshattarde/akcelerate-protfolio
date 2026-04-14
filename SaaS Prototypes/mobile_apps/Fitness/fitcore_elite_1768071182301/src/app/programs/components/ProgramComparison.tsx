import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ComparisonFeature {
  name: string;
  strength: boolean | string;
  cardio: boolean | string;
  hybrid: boolean | string;
}

interface ProgramComparisonProps {
  features: ComparisonFeature[];
}

const ProgramComparison = ({ features }: ProgramComparisonProps) => {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="CheckIcon" size={20} className="text-primary mx-auto" />
      ) : (
        <Icon name="XMarkIcon" size={20} className="text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-sm text-foreground font-medium">{value}</span>;
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 border-b border-border">
        <h3 className="text-2xl font-bold text-foreground mb-2">Program Comparison Matrix</h3>
        <p className="text-muted-foreground">Compare features across our elite training programs</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Features
              </th>
              <th className="text-center p-6 text-sm font-bold text-foreground">
                <div className="flex flex-col items-center space-y-2">
                  <Icon name="FireIcon" size={24} className="text-red-400" />
                  <span>Strength Elite</span>
                </div>
              </th>
              <th className="text-center p-6 text-sm font-bold text-foreground">
                <div className="flex flex-col items-center space-y-2">
                  <Icon name="BoltIcon" size={24} className="text-blue-400" />
                  <span>Cardio Warrior</span>
                </div>
              </th>
              <th className="text-center p-6 text-sm font-bold text-foreground">
                <div className="flex flex-col items-center space-y-2">
                  <Icon name="StarIcon" size={24} className="text-primary" />
                  <span>Hybrid Athlete</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/20 transition-colors duration-200">
                <td className="p-6 text-sm font-medium text-foreground">
                  {feature.name}
                </td>
                <td className="p-6 text-center">
                  {renderFeatureValue(feature.strength)}
                </td>
                <td className="p-6 text-center">
                  {renderFeatureValue(feature.cardio)}
                </td>
                <td className="p-6 text-center">
                  {renderFeatureValue(feature.hybrid)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramComparison;