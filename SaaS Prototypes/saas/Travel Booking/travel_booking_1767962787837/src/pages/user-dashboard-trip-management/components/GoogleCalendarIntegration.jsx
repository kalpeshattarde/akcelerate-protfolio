// src/pages/user-dashboard-trip-management/components/GoogleCalendarIntegration.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const GoogleCalendarIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [syncedTrips, setSyncedTrips] = useState([]);
  const [pendingSync, setPendingSync] = useState([]);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, success, error
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Mock data
  useEffect(() => {
    // Simulate checking connection status
    const checkConnection = () => {
      // Mock: 60% chance user is connected
      const connected = Math.random() > 0.4;
      setIsConnected(connected);
      
      if (connected) {
        setLastSyncTime(new Date(Date.now() - 2 * 60 * 60 * 1000)); // 2 hours ago
        
        const mockSyncedTrips = [
          {
            id: 1,
            destination: 'Los Angeles',
            departureDate: '2024-02-15',
            calendarEventId: 'cal_123',
            syncedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
          },
          {
            id: 2,
            destination: 'Paris',
            departureDate: '2024-03-10',
            calendarEventId: 'cal_456',
            syncedAt: new Date(Date.now() - 30 * 60 * 1000)
          }
        ];
        setSyncedTrips(mockSyncedTrips);
        
        // Mock pending trips (trips not yet synced)
        const mockPendingTrips = [];
        setPendingSync(mockPendingTrips);
      } else {
        // Mock pending trips when not connected
        const mockPendingTrips = [
          {
            id: 1,
            destination: 'Los Angeles',
            departureDate: '2024-02-15',
            returnDate: '2024-02-20'
          },
          {
            id: 2,
            destination: 'Paris',
            departureDate: '2024-03-10',
            returnDate: '2024-03-17'
          }
        ];
        setPendingSync(mockPendingTrips);
      }
    };
    
    checkConnection();
  }, []);

  const handleConnect = async () => {
    setSyncStatus('syncing');
    
    // Mock connection process
    setTimeout(() => {
      setIsConnected(true);
      setSyncStatus('success');
      setLastSyncTime(new Date());
      
      // Move pending trips to synced
      const newSyncedTrips = pendingSync.map(trip => ({
        ...trip,
        calendarEventId: `cal_${Math.random().toString(36).substr(2, 9)}`,
        syncedAt: new Date()
      }));
      setSyncedTrips(newSyncedTrips);
      setPendingSync([]);
      
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSyncedTrips([]);
    setLastSyncTime(null);
    setSyncStatus('idle');
    
    // Move synced trips back to pending
    const restoredTrips = syncedTrips.map(({ calendarEventId, syncedAt, ...trip }) => trip);
    setPendingSync(restoredTrips);
  };

  const handleSyncTrip = (tripId) => {
    setSyncStatus('syncing');
    
    setTimeout(() => {
      const tripToSync = pendingSync.find(trip => trip.id === tripId);
      if (tripToSync) {
        const syncedTrip = {
          ...tripToSync,
          calendarEventId: `cal_${Math.random().toString(36).substr(2, 9)}`,
          syncedAt: new Date()
        };
        
        setSyncedTrips(prev => [...prev, syncedTrip]);
        setPendingSync(prev => prev.filter(trip => trip.id !== tripId));
        setSyncStatus('success');
        setLastSyncTime(new Date());
        
        setTimeout(() => setSyncStatus('idle'), 2000);
      }
    }, 1000);
  };

  const handleRemoveFromCalendar = (tripId) => {
    const tripToRemove = syncedTrips.find(trip => trip.id === tripId);
    if (tripToRemove) {
      const { calendarEventId, syncedAt, ...trip } = tripToRemove;
      
      setSyncedTrips(prev => prev.filter(trip => trip.id !== tripId));
      setPendingSync(prev => [...prev, trip]);
    }
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading-semibold text-text-primary">Google Calendar</h2>
          <Icon name="Calendar" size={20} className="text-primary" />
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-success-600' : 'bg-secondary-300'
            }`}></div>
            <span className="text-sm font-body-medium text-text-primary">
              {isConnected ? 'Connected' : 'Not Connected'}
            </span>
          </div>
          
          {isConnected && lastSyncTime && (
            <span className="text-xs text-text-secondary">
              Last sync: {formatDateTime(lastSyncTime)}
            </span>
          )}
        </div>

        {/* Connection Button */}
        {!isConnected ? (
          <button
            onClick={handleConnect}
            disabled={syncStatus === 'syncing'}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-out"
          >
            {syncStatus === 'syncing' ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Icon name="Calendar" size={16} />
                <span>Connect Google Calendar</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleDisconnect}
            className="text-error-600 hover:text-error-700 text-sm font-body-medium transition-colors duration-200 ease-out"
          >
            Disconnect
          </button>
        )}
      </div>

      <div className="p-6">
        {/* Success Message */}
        {syncStatus === 'success' && (
          <div className="mb-4 p-3 bg-success-100 border border-success-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success-600" />
              <span className="text-sm text-success-700">Successfully synced with Google Calendar!</span>
            </div>
          </div>
        )}

        {/* Synced Trips */}
        {isConnected && syncedTrips.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-body-medium text-text-primary mb-3">Synced Trips</h3>
            <div className="space-y-2">
              {syncedTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-success-600" />
                    <div>
                      <p className="text-sm font-body-medium text-text-primary">{trip.destination}</p>
                      <p className="text-xs text-text-secondary">
                        {formatDate(trip.departureDate)} • Synced {formatDateTime(trip.syncedAt)}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveFromCalendar(trip.id)}
                    className="text-error-600 hover:text-error-700 transition-colors duration-200 ease-out"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Sync */}
        {pendingSync.length > 0 && (
          <div>
            <h3 className="text-sm font-body-medium text-text-primary mb-3">
              {isConnected ? 'Available to Sync' : 'Pending Sync'}
            </h3>
            <div className="space-y-2">
              {pendingSync.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={16} className="text-warning-600" />
                    <div>
                      <p className="text-sm font-body-medium text-text-primary">{trip.destination}</p>
                      <p className="text-xs text-text-secondary">
                        {formatDate(trip.departureDate)}
                        {trip.returnDate && ` - ${formatDate(trip.returnDate)}`}
                      </p>
                    </div>
                  </div>
                  
                  {isConnected && (
                    <button
                      onClick={() => handleSyncTrip(trip.id)}
                      disabled={syncStatus === 'syncing'}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-out"
                    >
                      {syncStatus === 'syncing' ? (
                        <>
                          <Icon name="Loader2" size={14} className="animate-spin" />
                          <span>Syncing...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="Plus" size={14} />
                          <span>Sync</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {isConnected && syncedTrips.length === 0 && pendingSync.length === 0 && (
          <div className="text-center py-6">
            <Icon name="Calendar" size={48} className="mx-auto text-secondary-300 mb-4" />
            <h3 className="text-lg font-heading-medium text-text-primary mb-2">All Trips Synced</h3>
            <p className="text-text-secondary text-sm">
              Your travel calendar is up to date. New trips will be automatically available for sync.
            </p>
          </div>
        )}

        {/* Not Connected State */}
        {!isConnected && pendingSync.length === 0 && (
          <div className="text-center py-6">
            <Icon name="CalendarOff" size={48} className="mx-auto text-secondary-300 mb-4" />
            <h3 className="text-lg font-heading-medium text-text-primary mb-2">Connect Your Calendar</h3>
            <p className="text-text-secondary text-sm">
              Automatically add your trips to Google Calendar and never miss a travel date.
            </p>
          </div>
        )}

        {/* Benefits */}
        {!isConnected && (
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-sm font-body-medium text-text-primary mb-3">Benefits of Syncing:</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success-600" />
                <span>Automatic calendar events for flights and hotels</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success-600" />
                <span>Travel reminders and notifications</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success-600" />
                <span>Easy sharing with family and colleagues</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCalendarIntegration;