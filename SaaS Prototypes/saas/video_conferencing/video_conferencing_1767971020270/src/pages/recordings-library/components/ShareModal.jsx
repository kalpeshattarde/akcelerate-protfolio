import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ShareModal = ({ recording, onClose, onShare }) => {
  const [shareSettings, setShareSettings] = useState({
    accessLevel: 'view',
    expirationDate: '',
    requirePassword: false,
    password: '',
    allowDownload: false,
    notifyByEmail: true,
    emails: ''
  });
  const [shareLink, setShareLink] = useState('');
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);

  const accessLevelOptions = [
    { value: 'view', label: 'View Only' },
    { value: 'comment', label: 'View & Comment' },
    { value: 'edit', label: 'View & Edit' }
  ];

  const handleSettingChange = (key, value) => {
    setShareSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const generateShareLink = () => {
    // Mock link generation
    const mockLink = `https://videoconf.app/shared/${recording?.id}?token=abc123xyz`;
    setShareLink(mockLink);
    setIsLinkGenerated(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(shareLink);
      // Show success message (you could add a toast notification here)
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = () => {
    onShare(recording, shareSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg shadow-floating w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Share Recording</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Recording Info */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-foreground text-sm mb-1">{recording?.title}</h3>
            <p className="text-xs text-muted-foreground">
              {new Date(recording.date)?.toLocaleDateString()} • {recording?.organizer}
            </p>
          </div>

          {/* Share Settings */}
          <div className="space-y-4">
            <Select
              label="Access Level"
              options={accessLevelOptions}
              value={shareSettings?.accessLevel}
              onChange={(value) => handleSettingChange('accessLevel', value)}
            />

            <Input
              label="Expiration Date (Optional)"
              type="date"
              value={shareSettings?.expirationDate}
              onChange={(e) => handleSettingChange('expirationDate', e?.target?.value)}
              description="Leave empty for no expiration"
            />

            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={shareSettings?.requirePassword}
                  onChange={(e) => handleSettingChange('requirePassword', e?.target?.checked)}
                  className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
                <span>Require password to access</span>
              </label>

              {shareSettings?.requirePassword && (
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={shareSettings?.password}
                  onChange={(e) => handleSettingChange('password', e?.target?.value)}
                />
              )}
            </div>

            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={shareSettings?.allowDownload}
                onChange={(e) => handleSettingChange('allowDownload', e?.target?.checked)}
                className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span>Allow download</span>
            </label>

            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={shareSettings?.notifyByEmail}
                onChange={(e) => handleSettingChange('notifyByEmail', e?.target?.checked)}
                className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span>Send email notification</span>
            </label>

            {shareSettings?.notifyByEmail && (
              <Input
                label="Email Addresses"
                type="email"
                placeholder="Enter email addresses separated by commas"
                value={shareSettings?.emails}
                onChange={(e) => handleSettingChange('emails', e?.target?.value)}
                description="Separate multiple emails with commas"
              />
            )}
          </div>

          {/* Generate Link */}
          {!isLinkGenerated ? (
            <Button
              variant="outline"
              onClick={generateShareLink}
              iconName="Link"
              iconPosition="left"
              fullWidth
            >
              Generate Share Link
            </Button>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Share Link</label>
              <div className="flex items-center space-x-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                >
                  <Icon name="Copy" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleShare}
            disabled={shareSettings?.notifyByEmail && !shareSettings?.emails}
          >
            Share Recording
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;