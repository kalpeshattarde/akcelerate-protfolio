'use client';

interface TeamFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function TeamFilter({ activeFilter, onFilterChange }: TeamFilterProps) {
  const filters = [
    { id: 'all', label: 'All Team' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'creative', label: 'Creative' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'technology', label: 'Technology' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-6 py-2.5 font-cta text-sm rounded-md transition-all duration-300 ${
            activeFilter === filter.id
              ? 'bg-primary text-background' :'bg-muted/50 text-text-secondary hover:bg-muted hover:text-foreground'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}