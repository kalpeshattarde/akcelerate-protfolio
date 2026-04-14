import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ParticipantsPanel = ({ 
  isOpen = false, 
  onClose,
  participants = [],
  currentUserId = "user-1",
  userRole = "moderator"
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const filteredParticipants = participants?.filter(participant =>
    participant?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleMuteParticipant = (participantId) => {
    console.log('Muting participant:', participantId);
  };

  const handleRemoveParticipant = (participantId) => {
    console.log('Removing participant:', participantId);
  };

  const handleMakeModerator = (participantId) => {
    console.log('Making moderator:', participantId);
  };

  const handleInviteParticipant = (e) => {
    e?.preventDefault();
    if (!inviteEmail?.trim()) return;
    
    console.log('Inviting:', inviteEmail);
    setInviteEmail("");
    setShowInviteModal(false);
  };

  const getParticipantStatus = (participant) => {
    const statuses = [];
    if (participant?.isModerator) statuses?.push('Moderator');
    if (participant?.isScreenSharing) statuses?.push('Sharing');
    if (participant?.isSpeaking) statuses?.push('Speaking');
    return statuses?.join(', ');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed right-0 top-16 bottom-20 w-80 bg-surface border-l border-border z-30 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Participants</h3>
            <span className="text-sm text-muted-foreground">({participants?.length})</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Search and Invite */}
        <div className="p-4 border-b border-border space-y-3">
          <Input
            type="text"
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
          
          {userRole === 'moderator' && (
            <Button
              variant="outline"
              onClick={() => setShowInviteModal(true)}
              className="w-full"
            >
              <Icon name="UserPlus" size={16} className="mr-2" />
              Invite Others
            </Button>
          )}
        </div>

        {/* Participants List */}
        <div className="flex-1 overflow-y-auto">
          {filteredParticipants?.map((participant) => (
            <div
              key={participant?.id}
              className="flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border last:border-b-0"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {participant?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  
                  {/* Status Indicators */}
                  <div className="absolute -bottom-1 -right-1 flex space-x-1">
                    {!participant?.audioEnabled && (
                      <div className="w-4 h-4 bg-error rounded-full flex items-center justify-center">
                        <Icon name="MicOff" size={8} className="text-white" />
                      </div>
                    )}
                    {!participant?.videoEnabled && (
                      <div className="w-4 h-4 bg-error rounded-full flex items-center justify-center">
                        <Icon name="VideoOff" size={8} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Participant Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {participant?.name}
                      {participant?.id === currentUserId && ' (You)'}
                    </p>
                    {participant?.isModerator && (
                      <Icon name="Crown" size={12} className="text-warning flex-shrink-0" />
                    )}
                  </div>
                  
                  {/* Status */}
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      participant?.connectionQuality === 'excellent' ? 'bg-success' :
                      participant?.connectionQuality === 'good'? 'bg-warning' : 'bg-error'
                    }`} />
                    <p className="text-xs text-muted-foreground">
                      {getParticipantStatus(participant) || 'Connected'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {userRole === 'moderator' && participant?.id !== currentUserId && (
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {/* Mute */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMuteParticipant(participant?.id)}
                      className="w-8 h-8"
                      title="Mute participant"
                    >
                      <Icon name="MicOff" size={12} />
                    </Button>

                    {/* More Options */}
                    <div className="relative group">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        title="More options"
                      >
                        <Icon name="MoreVertical" size={12} />
                      </Button>

                      {/* Dropdown Menu */}
                      <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        <div className="py-2">
                          {!participant?.isModerator && (
                            <button
                              onClick={() => handleMakeModerator(participant?.id)}
                              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center space-x-2"
                            >
                              <Icon name="Crown" size={14} />
                              <span>Make Moderator</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleRemoveParticipant(participant?.id)}
                            className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted transition-colors flex items-center space-x-2"
                          >
                            <Icon name="UserMinus" size={14} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Meeting Controls (for moderators) */}
        {userRole === 'moderator' && (
          <div className="p-4 border-t border-border space-y-2">
            <Button variant="outline" className="w-full">
              <Icon name="MicOff" size={16} className="mr-2" />
              Mute All
            </Button>
            <Button variant="outline" className="w-full">
              <Icon name="UserX" size={16} className="mr-2" />
              Remove All
            </Button>
          </div>
        )}
      </div>
      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-lg shadow-elevated w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Invite Participants</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowInviteModal(false)}
                  className="w-8 h-8"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              <form onSubmit={handleInviteParticipant} className="space-y-4">
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e?.target?.value)}
                  required
                />

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Send Invite
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ParticipantsPanel;