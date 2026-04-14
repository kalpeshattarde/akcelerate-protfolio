import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-03-15",
    gender: "female",
    height: "165",
    weight: "62",
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });
  const [tempData, setTempData] = useState(profileData);
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData(profileData);
    setErrors({});
  };

  const handleSave = () => {
    const newErrors = {};
    
    if (!tempData?.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!tempData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/?.test(tempData?.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    setProfileData(tempData);
    setIsEditing(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setTempData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempData(prev => ({ ...prev, profilePhoto: event?.target?.result }));
      };
      reader?.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="User" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
            <p className="text-sm text-muted-foreground">Manage your account details and profile</p>
          </div>
        </div>
        {!isEditing ? (
          <Button variant="outline" onClick={handleEdit} iconName="Edit" iconPosition="left">
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel} size="sm">
              Cancel
            </Button>
            <Button variant="default" onClick={handleSave} size="sm">
              Save
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo */}
        <div className="lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-muted">
                <Image
                  src={isEditing ? tempData?.profilePhoto : profileData?.profilePhoto}
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                  <Icon name="Camera" size={16} color="white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              {isEditing ? "Click camera icon to change photo" : "Profile Photo"}
            </p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={isEditing ? tempData?.fullName : profileData?.fullName}
              onChange={handleInputChange}
              disabled={!isEditing}
              error={errors?.fullName}
              required
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={isEditing ? tempData?.email : profileData?.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              error={errors?.email}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={isEditing ? tempData?.phone : profileData?.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <Input
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={isEditing ? tempData?.dateOfBirth : profileData?.dateOfBirth}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
              <select
                name="gender"
                value={isEditing ? tempData?.gender : profileData?.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <Input
              label="Height (cm)"
              type="number"
              name="height"
              value={isEditing ? tempData?.height : profileData?.height}
              onChange={handleInputChange}
              disabled={!isEditing}
              min="100"
              max="250"
            />
            <Input
              label="Weight (kg)"
              type="number"
              name="weight"
              value={isEditing ? tempData?.weight : profileData?.weight}
              onChange={handleInputChange}
              disabled={!isEditing}
              min="30"
              max="200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;