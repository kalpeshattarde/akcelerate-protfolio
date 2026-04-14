import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecuritySection = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [connectedDevices] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro",
      type: "mobile",
      lastActive: "2 minutes ago",
      location: "New York, NY",
      current: true
    },
    {
      id: 2,
      name: "MacBook Pro",
      type: "desktop",
      lastActive: "1 hour ago",
      location: "New York, NY",
      current: false
    },
    {
      id: 3,
      name: "iPad Air",
      type: "tablet",
      lastActive: "3 days ago",
      location: "Boston, MA",
      current: false
    }
  ]);

  const handlePasswordChange = (e) => {
    const { name, value } = e?.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors?.[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    const errors = {};

    if (!passwordData?.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordData?.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData?.newPassword?.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (!passwordData?.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors)?.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    console.log('Password change requested');
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordErrors({});
  };

  const handleTwoFactorToggle = () => {
    if (twoFactorEnabled) {
      setTwoFactorEnabled(false);
    } else {
      setShowTwoFactorSetup(true);
    }
  };

  const handleTwoFactorSetup = () => {
    setTwoFactorEnabled(true);
    setShowTwoFactorSetup(false);
  };

  const handleDeviceRemove = (deviceId) => {
    console.log('Removing device:', deviceId);
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'mobile': return 'Smartphone';
      case 'tablet': return 'Tablet';
      case 'desktop': return 'Monitor';
      default: return 'Monitor';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-destructive rounded-lg">
          <Icon name="Lock" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Security Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your account security and access</p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Password Management */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Password</h3>
          <div className="bg-muted/30 rounded-lg p-4">
            {!showPasswordForm ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                </div>
                <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
                  Change Password
                </Button>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  value={passwordData?.currentPassword}
                  onChange={handlePasswordChange}
                  error={passwordErrors?.currentPassword}
                  required
                />
                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={passwordData?.newPassword}
                  onChange={handlePasswordChange}
                  error={passwordErrors?.newPassword}
                  description="Must be at least 8 characters long"
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  value={passwordData?.confirmPassword}
                  onChange={handlePasswordChange}
                  error={passwordErrors?.confirmPassword}
                  required
                />
                <div className="flex space-x-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Update Password
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Two-Factor Authentication</h3>
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-foreground">2FA Status</p>
                <p className="text-xs text-muted-foreground">
                  {twoFactorEnabled ? 'Two-factor authentication is enabled' : 'Add an extra layer of security'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {twoFactorEnabled && (
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="Shield" size={16} />
                    <span className="text-xs font-medium">Enabled</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleTwoFactorToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    twoFactorEnabled ? 'bg-success' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            {twoFactorEnabled && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="Smartphone" size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Authenticator App</p>
                      <p className="text-xs text-muted-foreground">Google Authenticator</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Connected Devices */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Connected Devices</h3>
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            {connectedDevices?.map((device) => (
              <div key={device?.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
                    <Icon name={getDeviceIcon(device?.type)} size={20} color="white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-foreground">{device?.name}</p>
                      {device?.current && (
                        <span className="px-2 py-1 text-xs font-medium bg-success text-success-foreground rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last active: {device?.lastActive} • {device?.location}
                    </p>
                  </div>
                </div>
                {!device?.current && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeviceRemove(device?.id)}
                    iconName="X"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Login Activity */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Recent Login Activity</h3>
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            {[
              { time: "2 minutes ago", location: "New York, NY", device: "iPhone 14 Pro", status: "success" },
              { time: "1 hour ago", location: "New York, NY", device: "MacBook Pro", status: "success" },
              { time: "3 days ago", location: "Boston, MA", device: "iPad Air", status: "success" },
              { time: "1 week ago", location: "Unknown", device: "Chrome Browser", status: "failed" }
            ]?.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    activity?.status === 'success' ? 'bg-success' : 'bg-destructive'
                  }`}>
                    <Icon 
                      name={activity?.status === 'success' ? 'Check' : 'X'} 
                      size={16} 
                      color="white" 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity?.device}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity?.time} • {activity?.location}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  activity?.status === 'success' ?'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
                }`}>
                  {activity?.status === 'success' ? 'Success' : 'Failed'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Recommendations */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Security Recommendations</h3>
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Enable Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">
                  Secure your account with an additional verification step
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-success/5 border border-success/20 rounded-lg">
              <Icon name="Check" size={20} className="text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Strong Password</p>
                <p className="text-xs text-muted-foreground">
                  Your password meets security requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Two-Factor Setup Modal */}
      {showTwoFactorSetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl p-6 max-w-md w-full elevation-3">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-success rounded-lg">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Setup Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Icon name="QrCode" size={48} className="text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your authenticator app
                </p>
              </div>
              
              <Input
                label="Verification Code"
                type="text"
                placeholder="Enter 6-digit code"
                description="Enter the code from your authenticator app"
              />
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowTwoFactorSetup(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button 
                variant="default" 
                onClick={handleTwoFactorSetup}
                fullWidth
              >
                Enable 2FA
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;