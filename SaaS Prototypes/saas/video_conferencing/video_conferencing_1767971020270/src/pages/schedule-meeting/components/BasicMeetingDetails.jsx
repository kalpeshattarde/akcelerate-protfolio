import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BasicMeetingDetails = ({
  meetingData,
  onMeetingDataChange,
  timezones,
  durations
}) => {
  const handleInputChange = (field, value) => {
    onMeetingDataChange({
      ...meetingData,
      [field]: value
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Calendar" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Meeting Details</h2>
      </div>
      <div className="space-y-6">
        <Input
          label="Meeting Title"
          type="text"
          placeholder="Enter meeting title"
          value={meetingData?.title}
          onChange={(e) => handleInputChange('title', e?.target?.value)}
          required
          className="w-full"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            placeholder="Add meeting description (optional)"
            value={meetingData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            value={meetingData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            required
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />

          <Input
            label="Time"
            type="time"
            value={meetingData?.time}
            onChange={(e) => handleInputChange('time', e?.target?.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Timezone"
            options={timezones}
            value={meetingData?.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
            searchable
            placeholder="Select timezone"
          />

          <Select
            label="Duration"
            options={durations}
            value={meetingData?.duration}
            onChange={(value) => handleInputChange('duration', value)}
            placeholder="Select duration"
          />
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={16} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Meeting Time Preview</p>
              <p className="text-sm text-muted-foreground mt-1">
                {meetingData?.date && meetingData?.time ? (
                  `${new Date(meetingData.date)?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at ${meetingData?.time} (${meetingData?.timezone || 'UTC'})`
                ) : (
                  'Select date and time to see preview'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicMeetingDetails;