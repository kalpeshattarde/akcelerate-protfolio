import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Component imports
import RecordingCard from './components/RecordingCard';
import RecordingListItem from './components/RecordingListItem';
import SearchFilters from './components/SearchFilters';
import BulkActions from './components/BulkActions';
import VideoPlayer from './components/VideoPlayer';
import ShareModal from './components/ShareModal';
import StorageInfo from './components/StorageInfo';

const RecordingsLibrary = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedRecordings, setSelectedRecordings] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [shareModal, setShareModal] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    organizer: '',
    quality: '',
    dateFrom: '',
    dateTo: '',
    hasTranscription: false,
    isShared: false,
    sortBy: 'date-desc'
  });

  // Mock recordings data
  const mockRecordings = [
    {
      id: 1,
      title: "Q4 Strategy Planning Meeting",
      date: "2025-01-20T10:00:00Z",
      duration: 3600,
      organizer: "John Doe",
      participantCount: 12,
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      quality: "HD",
      fileSize: 1024000000,
      hasTranscription: true,
      isShared: true
    },
    {
      id: 2,
      title: "Product Development Review",
      date: "2025-01-18T14:30:00Z",
      duration: 2700,
      organizer: "Sarah Wilson",
      participantCount: 8,
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      quality: "HD",
      fileSize: 850000000,
      hasTranscription: true,
      isShared: false
    },
    {
      id: 3,
      title: "Weekly Team Standup",
      date: "2025-01-15T09:00:00Z",
      duration: 1800,
      organizer: "Mike Johnson",
      participantCount: 6,
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      quality: "SD",
      fileSize: 450000000,
      hasTranscription: false,
      isShared: true
    },
    {
      id: 4,
      title: "Client Presentation - Project Alpha",
      date: "2025-01-12T16:00:00Z",
      duration: 4200,
      organizer: "Emily Davis",
      participantCount: 15,
      thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      quality: "HD",
      fileSize: 1200000000,
      hasTranscription: true,
      isShared: false
    },
    {
      id: 5,
      title: "Training Session: New Features",
      date: "2025-01-10T11:00:00Z",
      duration: 5400,
      organizer: "Alex Brown",
      participantCount: 25,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      quality: "HD",
      fileSize: 1500000000,
      hasTranscription: true,
      isShared: true
    },
    {
      id: 6,
      title: "Budget Review Meeting",
      date: "2025-01-08T13:30:00Z",
      duration: 2400,
      organizer: "John Doe",
      participantCount: 7,
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      quality: "SD",
      fileSize: 600000000,
      hasTranscription: false,
      isShared: false
    }
  ];

  // Mock storage data
  const storageData = {
    used: 5500000000, // 5.5 GB
    total: 10000000000, // 10 GB
    recordings: {
      total: mockRecordings?.length,
      thisMonth: 3
    }
  };

  // Filter and sort recordings
  const filteredRecordings = mockRecordings?.filter(recording => {
    if (filters?.search && !recording?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !recording?.organizer?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    
    if (filters?.organizer && recording?.organizer !== filters?.organizer) {
      return false;
    }
    
    if (filters?.quality && recording?.quality !== filters?.quality) {
      return false;
    }
    
    if (filters?.dateFrom && new Date(recording.date) < new Date(filters.dateFrom)) {
      return false;
    }
    
    if (filters?.dateTo && new Date(recording.date) > new Date(filters.dateTo)) {
      return false;
    }
    
    if (filters?.hasTranscription && !recording?.hasTranscription) {
      return false;
    }
    
    if (filters?.isShared && !recording?.isShared) {
      return false;
    }
    
    return true;
  })?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'duration-desc':
        return b?.duration - a?.duration;
      case 'duration-asc':
        return a?.duration - b?.duration;
      case 'title-asc':
        return a?.title?.localeCompare(b?.title);
      case 'title-desc':
        return b?.title?.localeCompare(a?.title);
      default:
        return 0;
    }
  });

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleRecordingSelect = (recordingId, isSelected) => {
    setSelectedRecordings(prev => {
      if (isSelected) {
        return [...prev, recordingId];
      } else {
        return prev?.filter(id => id !== recordingId);
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedRecordings(filteredRecordings?.map(r => r?.id));
  };

  const handleDeselectAll = () => {
    setSelectedRecordings([]);
  };

  const handlePlay = (recording) => {
    setCurrentPlayer(recording);
  };

  const handleShare = (recording) => {
    setShareModal(recording);
  };

  const handleDownload = (recording) => {
    console.log('Downloading recording:', recording?.title);
    // Mock download functionality
  };

  const handleDelete = (recording) => {
    console.log('Deleting recording:', recording?.title);
    // Mock delete functionality
  };

  const handleBulkDownload = (recordingIds) => {
    console.log('Bulk downloading recordings:', recordingIds);
  };

  const handleBulkShare = (recordingIds) => {
    console.log('Bulk sharing recordings:', recordingIds);
  };

  const handleBulkDelete = (recordingIds) => {
    console.log('Bulk deleting recordings:', recordingIds);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      organizer: '',
      quality: '',
      dateFrom: '',
      dateTo: '',
      hasTranscription: false,
      isShared: false,
      sortBy: 'date-desc'
    });
  };

  const handlePlayerNext = () => {
    const currentIndex = filteredRecordings?.findIndex(r => r?.id === currentPlayer?.id);
    if (currentIndex < filteredRecordings?.length - 1) {
      setCurrentPlayer(filteredRecordings?.[currentIndex + 1]);
    }
  };

  const handlePlayerPrevious = () => {
    const currentIndex = filteredRecordings?.findIndex(r => r?.id === currentPlayer?.id);
    if (currentIndex > 0) {
      setCurrentPlayer(filteredRecordings?.[currentIndex - 1]);
    }
  };

  const handleShareSubmit = (recording, settings) => {
    console.log('Sharing recording with settings:', recording, settings);
  };

  const currentPlayerIndex = currentPlayer ? filteredRecordings?.findIndex(r => r?.id === currentPlayer?.id) : -1;
  const hasNext = currentPlayerIndex < filteredRecordings?.length - 1;
  const hasPrevious = currentPlayerIndex > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
        notificationCount={3}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">Recordings Library</h1>
              <p className="text-muted-foreground">
                Manage and view your recorded video conferences
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  iconName="Grid3X3"
                />
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  iconName="List"
                />
              </div>

              <Button
                variant="default"
                iconName="Upload"
                iconPosition="left"
              >
                Upload Recording
              </Button>
            </div>
          </div>

          {/* Storage Info */}
          <StorageInfo storageData={storageData} />

          {/* Search and Filters */}
          <SearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedRecordings={selectedRecordings}
            onBulkDownload={handleBulkDownload}
            onBulkDelete={handleBulkDelete}
            onBulkShare={handleBulkShare}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            totalRecordings={filteredRecordings?.length}
          />

          {/* Results Info */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredRecordings?.length} of {mockRecordings?.length} recordings
            </p>
          </div>

          {/* Recordings Grid/List */}
          {filteredRecordings?.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Video" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No recordings found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button
                variant="outline"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4'
            }>
              {filteredRecordings?.map((recording) => (
                viewMode === 'grid' ? (
                  <RecordingCard
                    key={recording?.id}
                    recording={recording}
                    onPlay={handlePlay}
                    onShare={handleShare}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                    isSelected={selectedRecordings?.includes(recording?.id)}
                    onSelect={handleRecordingSelect}
                  />
                ) : (
                  <RecordingListItem
                    key={recording?.id}
                    recording={recording}
                    onPlay={handlePlay}
                    onShare={handleShare}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                    isSelected={selectedRecordings?.includes(recording?.id)}
                    onSelect={handleRecordingSelect}
                  />
                )
              ))}
            </div>
          )}
        </div>
      </main>
      {/* Video Player Modal */}
      {currentPlayer && (
        <VideoPlayer
          recording={currentPlayer}
          onClose={() => setCurrentPlayer(null)}
          onNext={handlePlayerNext}
          onPrevious={handlePlayerPrevious}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      )}
      {/* Share Modal */}
      {shareModal && (
        <ShareModal
          recording={shareModal}
          onClose={() => setShareModal(null)}
          onShare={handleShareSubmit}
        />
      )}
      <QuickActionButton />
    </div>
  );
};

export default RecordingsLibrary;