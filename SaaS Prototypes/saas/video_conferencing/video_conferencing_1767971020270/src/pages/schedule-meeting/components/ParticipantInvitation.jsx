import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ParticipantInvitation = ({
  participants,
  onParticipantsChange
}) => {
  const [newParticipant, setNewParticipant] = useState('');
  const [emailSuggestions] = useState([
    "john.doe@company.com",
    "sarah.wilson@company.com",
    "mike.johnson@company.com",
    "emily.davis@company.com",
    "alex.brown@company.com"
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addParticipant = (email) => {
    if (email && !participants?.find(p => p?.email === email)) {
      const participant = {
        id: Date.now(),
        email: email,
        name: email?.split('@')?.[0]?.replace('.', ' ')?.replace(/\b\w/g, l => l?.toUpperCase()),
        role: 'participant',
        status: 'pending'
      };
      onParticipantsChange([...participants, participant]);
      setNewParticipant('');
      setShowSuggestions(false);
    }
  };

  const removeParticipant = (id) => {
    onParticipantsChange(participants?.filter(p => p?.id !== id));
  };

  const updateParticipantRole = (id, role) => {
    onParticipantsChange(
      participants?.map(p => p?.id === id ? { ...p, role } : p)
    );
  };

  const filteredSuggestions = emailSuggestions?.filter(email =>
    email?.toLowerCase()?.includes(newParticipant?.toLowerCase()) &&
    !participants?.find(p => p?.email === email)
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Users" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Invite Participants</h2>
      </div>
      <div className="space-y-6">
        <div className="relative">
          <Input
            label="Add Participants"
            type="email"
            placeholder="Enter email address"
            value={newParticipant}
            onChange={(e) => {
              setNewParticipant(e?.target?.value);
              setShowSuggestions(e?.target?.value?.length > 0);
            }}
            onKeyPress={(e) => {
              if (e?.key === 'Enter') {
                e?.preventDefault();
                addParticipant(newParticipant);
              }
            }}
            description="Press Enter to add participant"
          />

          {showSuggestions && filteredSuggestions?.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-elevated z-50 max-h-40 overflow-y-auto">
              {filteredSuggestions?.map((email, index) => (
                <button
                  key={index}
                  onClick={() => addParticipant(email)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-micro flex items-center space-x-2"
                >
                  <Icon name="Mail" size={14} className="text-muted-foreground" />
                  <span>{email}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => addParticipant(newParticipant)}
            disabled={!newParticipant}
            iconName="Plus"
            iconPosition="left"
          >
            Add Participant
          </Button>
          <span className="text-sm text-muted-foreground">
            {participants?.length} participant{participants?.length !== 1 ? 's' : ''} added
          </span>
        </div>

        {participants?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Invited Participants</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {participants?.map((participant) => (
                <div key={participant?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {participant?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{participant?.name}</p>
                      <p className="text-xs text-muted-foreground">{participant?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={participant?.role}
                      onChange={(e) => updateParticipantRole(participant?.id, e?.target?.value)}
                      className="text-xs border border-border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="participant">Participant</option>
                      <option value="moderator">Moderator</option>
                      <option value="presenter">Presenter</option>
                    </select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeParticipant(participant?.id)}
                      className="w-6 h-6 text-error hover:text-error"
                    >
                      <Icon name="X" size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantInvitation;