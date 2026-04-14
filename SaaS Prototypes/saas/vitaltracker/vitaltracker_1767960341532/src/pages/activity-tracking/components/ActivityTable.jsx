import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityTable = ({ activities, onEditActivity, onDeleteActivity }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedActivities = [...activities]?.sort((a, b) => {
    if (sortConfig?.key === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortConfig?.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortConfig?.key === 'duration' || sortConfig?.key === 'calories' || sortConfig?.key === 'steps') {
      return sortConfig?.direction === 'asc' 
        ? a?.[sortConfig?.key] - b?.[sortConfig?.key]
        : b?.[sortConfig?.key] - a?.[sortConfig?.key];
    }
    
    return sortConfig?.direction === 'asc' 
      ? a?.[sortConfig?.key]?.localeCompare(b?.[sortConfig?.key])
      : b?.[sortConfig?.key]?.localeCompare(a?.[sortConfig?.key]);
  });

  const totalPages = Math.ceil(sortedActivities?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = sortedActivities?.slice(startIndex, startIndex + itemsPerPage);

  const getActivityIcon = (type) => {
    const iconMap = {
      walking: 'Footprints',
      running: 'Zap',
      cycling: 'Bike',
      swimming: 'Waves',
      yoga: 'Heart',
      strength: 'Dumbbell',
      cardio: 'Activity'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'low': return 'text-success bg-success/10';
      case 'moderate': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const SortButton = ({ column, children }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center space-x-1 text-left font-medium text-foreground hover:text-primary transition-colors duration-200"
    >
      <span>{children}</span>
      <div className="flex flex-col">
        <Icon 
          name="ChevronUp" 
          size={12} 
          className={`${sortConfig?.key === column && sortConfig?.direction === 'asc' ? 'text-primary' : 'text-muted-foreground'}`}
        />
        <Icon 
          name="ChevronDown" 
          size={12} 
          className={`${sortConfig?.key === column && sortConfig?.direction === 'desc' ? 'text-primary' : 'text-muted-foreground'} -mt-1`}
        />
      </div>
    </button>
  );

  return (
    <div className="bg-card rounded-xl shadow-wellness elevation-1 border border-border/40 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <Icon name="List" size={20} className="text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Activity Log</h3>
              <p className="text-sm text-muted-foreground">
                {activities?.length} activities recorded
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-4 text-left">
                <SortButton column="date">Date</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton column="type">Activity</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton column="duration">Duration</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton column="calories">Calories</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton column="steps">Steps</SortButton>
              </th>
              <th className="px-6 py-4 text-left">Intensity</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {paginatedActivities?.map((activity) => (
              <tr key={activity?.id} className="hover:bg-muted/20 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-foreground">
                      {new Date(activity.date)?.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-muted-foreground">
                      {new Date(activity.date)?.toLocaleDateString('en-US', { 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                      <Icon name={getActivityIcon(activity?.type)} size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground capitalize">{activity?.type}</div>
                      <div className="text-sm text-muted-foreground">{activity?.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">
                    {activity?.duration} min
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">
                    {activity?.calories} cal
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">
                    {activity?.steps?.toLocaleString() || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getIntensityColor(activity?.intensity)}`}>
                    {activity?.intensity}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditActivity(activity)}
                      iconName="Edit2"
                      className="text-muted-foreground hover:text-foreground"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteActivity(activity?.id)}
                      iconName="Trash2"
                      className="text-muted-foreground hover:text-error"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border/40">
        {paginatedActivities?.map((activity) => (
          <div key={activity?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Icon name={getActivityIcon(activity?.type)} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground capitalize">{activity?.type}</h4>
                  <p className="text-sm text-muted-foreground">{activity?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditActivity(activity)}
                  iconName="Edit2"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteActivity(activity?.id)}
                  iconName="Trash2"
                  className="text-error"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-2 font-medium text-foreground">
                  {new Date(activity.date)?.toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <span className="ml-2 font-medium text-foreground">{activity?.duration} min</span>
              </div>
              <div>
                <span className="text-muted-foreground">Calories:</span>
                <span className="ml-2 font-medium text-foreground">{activity?.calories} cal</span>
              </div>
              <div>
                <span className="text-muted-foreground">Steps:</span>
                <span className="ml-2 font-medium text-foreground">
                  {activity?.steps?.toLocaleString() || 'N/A'}
                </span>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getIntensityColor(activity?.intensity)}`}>
                {activity?.intensity}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border/40 bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, activities?.length)} of {activities?.length} activities
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
              />
              <span className="text-sm font-medium text-foreground">
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;