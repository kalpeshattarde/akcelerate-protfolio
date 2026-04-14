interface Stat {
  id: number;
  value: string;
  label: string;
  description: string;
}

interface StatsDisplayProps {
  stats: Stat[];
}

const StatsDisplay = ({ stats }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-surface/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center hover:bg-surface/80 transition-all duration-500 hover:shadow-dramatic"
        >
          <div className="font-headline text-5xl font-bold text-primary mb-2">
            {stat.value}
          </div>
          <div className="font-cta text-sm font-semibold text-foreground mb-2">
            {stat.label}
          </div>
          <div className="font-body text-xs text-text-secondary">
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsDisplay;