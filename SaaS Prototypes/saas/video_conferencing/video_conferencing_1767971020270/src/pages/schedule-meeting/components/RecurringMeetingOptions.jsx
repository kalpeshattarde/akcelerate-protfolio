import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RecurringMeetingOptions = ({
  recurringSettings,
  onRecurringSettingsChange
}) => {
  const handleSettingChange = (field, value) => {
    onRecurringSettingsChange({
      ...recurringSettings,
      [field]: value
    });
  };

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom' }
  ];

  const endOptions = [
    { value: 'never', label: 'Never' },
    { value: 'date', label: 'On Date' },
    { value: 'occurrences', label: 'After Occurrences' }
  ];

  const weekDays = [
    { value: 'monday', label: 'Mon' },
    { value: 'tuesday', label: 'Tue' },
    { value: 'wednesday', label: 'Wed' },
    { value: 'thursday', label: 'Thu' },
    { value: 'friday', label: 'Fri' },
    { value: 'saturday', label: 'Sat' },
    { value: 'sunday', label: 'Sun' }
  ];

  const toggleWeekDay = (day) => {
    const currentDays = recurringSettings?.weekDays || [];
    const updatedDays = currentDays?.includes(day)
      ? currentDays?.filter(d => d !== day)
      : [...currentDays, day];
    handleSettingChange('weekDays', updatedDays);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Repeat" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Recurring Meeting</h2>
      </div>
      <div className="space-y-6">
        <Checkbox
          label="Make this a recurring meeting"
          description="Schedule multiple meetings with the same settings"
          checked={recurringSettings?.enabled}
          onChange={(e) => handleSettingChange('enabled', e?.target?.checked)}
        />

        {recurringSettings?.enabled && (
          <>
            <Select
              label="Frequency"
              options={frequencyOptions}
              value={recurringSettings?.frequency}
              onChange={(value) => handleSettingChange('frequency', value)}
              description="How often should this meeting repeat?"
            />

            {recurringSettings?.frequency === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Repeat Every"
                  type="number"
                  min="1"
                  max="30"
                  value={recurringSettings?.interval}
                  onChange={(e) => handleSettingChange('interval', e?.target?.value)}
                />
                <Select
                  label="Period"
                  options={[
                    { value: 'days', label: 'Days' },
                    { value: 'weeks', label: 'Weeks' },
                    { value: 'months', label: 'Months' }
                  ]}
                  value={recurringSettings?.period}
                  onChange={(value) => handleSettingChange('period', value)}
                />
              </div>
            )}

            {(recurringSettings?.frequency === 'weekly' || recurringSettings?.frequency === 'biweekly') && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Repeat On
                </label>
                <div className="flex flex-wrap gap-2">
                  {weekDays?.map((day) => (
                    <button
                      key={day?.value}
                      onClick={() => toggleWeekDay(day?.value)}
                      className={`px-3 py-2 text-sm rounded-md border transition-micro ${
                        (recurringSettings?.weekDays || [])?.includes(day?.value)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-surface text-foreground border-border hover:bg-muted'
                      }`}
                    >
                      {day?.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Select
              label="End Recurring Meeting"
              options={endOptions}
              value={recurringSettings?.endType}
              onChange={(value) => handleSettingChange('endType', value)}
              description="When should the recurring meetings stop?"
            />

            {recurringSettings?.endType === 'date' && (
              <Input
                label="End Date"
                type="date"
                value={recurringSettings?.endDate}
                onChange={(e) => handleSettingChange('endDate', e?.target?.value)}
                min={new Date()?.toISOString()?.split('T')?.[0]}
              />
            )}

            {recurringSettings?.endType === 'occurrences' && (
              <Input
                label="Number of Occurrences"
                type="number"
                min="1"
                max="100"
                value={recurringSettings?.occurrences}
                onChange={(e) => handleSettingChange('occurrences', e?.target?.value)}
                description="Maximum number of meetings to schedule"
              />
            )}

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Recurring Meeting Summary</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {recurringSettings?.frequency === 'daily' && 'Meets daily'}
                    {recurringSettings?.frequency === 'weekly' && `Meets weekly${(recurringSettings?.weekDays || [])?.length > 0 ? ` on ${(recurringSettings?.weekDays || [])?.join(', ')}` : ''}`}
                    {recurringSettings?.frequency === 'biweekly' && `Meets every 2 weeks${(recurringSettings?.weekDays || [])?.length > 0 ? ` on ${(recurringSettings?.weekDays || [])?.join(', ')}` : ''}`}
                    {recurringSettings?.frequency === 'monthly' && 'Meets monthly'}
                    {recurringSettings?.frequency === 'custom' && `Meets every ${recurringSettings?.interval || 1} ${recurringSettings?.period || 'days'}`}
                    {recurringSettings?.endType === 'never' && ', continues indefinitely'}
                    {recurringSettings?.endType === 'date' && `, ends on ${recurringSettings?.endDate || 'selected date'}`}
                    {recurringSettings?.endType === 'occurrences' && `, for ${recurringSettings?.occurrences || 1} occurrence${(recurringSettings?.occurrences || 1) > 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecurringMeetingOptions;