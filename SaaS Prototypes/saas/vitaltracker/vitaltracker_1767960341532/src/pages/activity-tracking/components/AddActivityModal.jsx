import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddActivityModal = ({ isOpen, onClose, onSave, editingActivity = null }) => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    duration: '',
    calories: '',
    steps: '',
    intensity: 'moderate',
    date: new Date()?.toISOString()?.split('T')?.[0],
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const activityTypeOptions = [
    { value: 'walking', label: 'Walking' },
    { value: 'running', label: 'Running' },
    { value: 'cycling', label: 'Cycling' },
    { value: 'swimming', label: 'Swimming' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'strength', label: 'Strength Training' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'sports', label: 'Sports' },
    { value: 'dance', label: 'Dance' },
    { value: 'hiking', label: 'Hiking' },
    { value: 'other', label: 'Other' }
  ];

  const intensityOptions = [
    { value: 'low', label: 'Low Intensity' },
    { value: 'moderate', label: 'Moderate Intensity' },
    { value: 'high', label: 'High Intensity' }
  ];

  useEffect(() => {
    if (editingActivity) {
      setFormData({
        type: editingActivity?.type || '',
        name: editingActivity?.name || '',
        duration: editingActivity?.duration?.toString() || '',
        calories: editingActivity?.calories?.toString() || '',
        steps: editingActivity?.steps?.toString() || '',
        intensity: editingActivity?.intensity || 'moderate',
        date: editingActivity?.date || new Date()?.toISOString()?.split('T')?.[0],
        notes: editingActivity?.notes || ''
      });
    } else {
      setFormData({
        type: '',
        name: '',
        duration: '',
        calories: '',
        steps: '',
        intensity: 'moderate',
        date: new Date()?.toISOString()?.split('T')?.[0],
        notes: ''
      });
    }
    setErrors({});
  }, [editingActivity, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Auto-calculate calories based on activity type and duration
    if (name === 'type' || name === 'duration') {
      const activityType = name === 'type' ? value : formData?.type;
      const duration = name === 'duration' ? parseInt(value) || 0 : parseInt(formData?.duration) || 0;
      
      if (activityType && duration > 0) {
        const calorieRates = {
          walking: 5,
          running: 15,
          cycling: 12,
          swimming: 14,
          yoga: 3,
          strength: 8,
          cardio: 10,
          sports: 12,
          dance: 7,
          hiking: 9,
          other: 6
        };
        
        const estimatedCalories = Math.round(duration * (calorieRates?.[activityType] || 6));
        setFormData(prev => ({ ...prev, calories: estimatedCalories?.toString() }));
      }
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.type) {
      newErrors.type = 'Activity type is required';
    }

    if (!formData?.name?.trim()) {
      newErrors.name = 'Activity name is required';
    }

    if (!formData?.duration || parseInt(formData?.duration) <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    if (!formData?.calories || parseInt(formData?.calories) <= 0) {
      newErrors.calories = 'Calories must be greater than 0';
    }

    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const activityData = {
        ...formData,
        duration: parseInt(formData?.duration),
        calories: parseInt(formData?.calories),
        steps: formData?.steps ? parseInt(formData?.steps) : null,
        id: editingActivity?.id || Date.now(),
        timestamp: new Date()?.toISOString()
      };

      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onSave(activityData);
      onClose();
    } catch (error) {
      console.error('Error saving activity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      walking: 'Footprints',
      running: 'Zap',
      cycling: 'Bike',
      swimming: 'Waves',
      yoga: 'Heart',
      strength: 'Dumbbell',
      cardio: 'Activity',
      sports: 'Trophy',
      dance: 'Music',
      hiking: 'Mountain',
      other: 'Plus'
    };
    return iconMap?.[type] || 'Activity';
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card rounded-xl shadow-wellness-lg animate-scale-in elevation-3 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name={formData?.type ? getActivityIcon(formData?.type) : 'Plus'} size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {editingActivity ? 'Edit Activity' : 'Add New Activity'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {editingActivity ? 'Update your activity details' : 'Log your physical activity'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activity Type */}
            <Select
              label="Activity Type"
              placeholder="Select activity type"
              options={activityTypeOptions}
              value={formData?.type}
              onChange={(value) => handleSelectChange('type', value)}
              error={errors?.type}
              required
            />

            {/* Activity Name */}
            <Input
              label="Activity Name"
              type="text"
              name="name"
              placeholder="e.g., Morning jog in the park"
              value={formData?.name}
              onChange={handleInputChange}
              error={errors?.name}
              required
            />

            {/* Duration */}
            <Input
              label="Duration (minutes)"
              type="number"
              name="duration"
              placeholder="30"
              value={formData?.duration}
              onChange={handleInputChange}
              error={errors?.duration}
              min="1"
              required
            />

            {/* Calories */}
            <Input
              label="Calories Burned"
              type="number"
              name="calories"
              placeholder="250"
              value={formData?.calories}
              onChange={handleInputChange}
              error={errors?.calories}
              min="1"
              required
            />

            {/* Steps */}
            <Input
              label="Steps (optional)"
              type="number"
              name="steps"
              placeholder="5000"
              value={formData?.steps}
              onChange={handleInputChange}
              min="0"
            />

            {/* Intensity */}
            <Select
              label="Intensity Level"
              options={intensityOptions}
              value={formData?.intensity}
              onChange={(value) => handleSelectChange('intensity', value)}
              required
            />

            {/* Date */}
            <Input
              label="Date"
              type="date"
              name="date"
              value={formData?.date}
              onChange={handleInputChange}
              error={errors?.date}
              required
              className="md:col-span-2"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes (optional)
            </label>
            <textarea
              name="notes"
              value={formData?.notes}
              onChange={handleInputChange}
              placeholder="Add any additional notes about your activity..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              {editingActivity ? 'Update Activity' : 'Save Activity'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AddActivityModal;