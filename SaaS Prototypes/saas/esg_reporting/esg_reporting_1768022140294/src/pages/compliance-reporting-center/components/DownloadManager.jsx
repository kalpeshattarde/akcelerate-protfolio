import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DownloadManager = ({ 
  isVisible = false, 
  onClose,
  downloads = [] 
}) => {
  const [downloadQueue, setDownloadQueue] = useState([]);
  const [completedDownloads, setCompletedDownloads] = useState([]);

  useEffect(() => {
    // Mock download queue with realistic data
    const mockDownloads = [
      {
        id: 1,
        name: 'GRI Standards Report 2024',
        framework: 'GRI',
        format: 'PDF',
        size: '15.2 MB',
        progress: 100,
        status: 'completed',
        startTime: '2024-12-07T09:15:00',
        completedTime: '2024-12-07T09:18:30',
        downloadUrl: '/downloads/gri-report-2024.pdf'
      },
      {
        id: 2,
        name: 'SASB Standards Disclosure',
        framework: 'SASB',
        format: 'PDF',
        size: '12.8 MB',
        progress: 85,
        status: 'downloading',
        startTime: '2024-12-07T09:20:00',
        estimatedCompletion: '2024-12-07T09:23:00'
      },
      {
        id: 3,
        name: 'TCFD Climate Report',
        framework: 'TCFD',
        format: 'PDF',
        size: '18.5 MB',
        progress: 45,
        status: 'generating',
        startTime: '2024-12-07T09:22:00',
        estimatedCompletion: '2024-12-07T09:27:00'
      },
      {
        id: 4,
        name: 'Combined ESG Report',
        framework: 'Combined',
        format: 'PDF',
        size: '42.1 MB',
        progress: 0,
        status: 'queued',
        queuePosition: 1,
        estimatedStart: '2024-12-07T09:25:00'
      },
      {
        id: 5,
        name: 'Executive Summary',
        framework: 'Summary',
        format: 'DOCX',
        size: '3.2 MB',
        progress: 0,
        status: 'queued',
        queuePosition: 2,
        estimatedStart: '2024-12-07T09:30:00'
      }
    ];

    // Separate active and completed downloads
    const active = mockDownloads?.filter(d => d?.status !== 'completed' && d?.status !== 'failed');
    const completed = mockDownloads?.filter(d => d?.status === 'completed' || d?.status === 'failed');

    setDownloadQueue(active);
    setCompletedDownloads(completed);

    // Simulate progress updates
    const interval = setInterval(() => {
      setDownloadQueue(prev => prev?.map(download => {
        if (download?.status === 'downloading' && download?.progress < 100) {
          const newProgress = Math.min(100, download?.progress + Math.random() * 10);
          return {
            ...download,
            progress: newProgress,
            status: newProgress >= 100 ? 'completed' : 'downloading'
          };
        }
        if (download?.status === 'generating' && download?.progress < 100) {
          const newProgress = Math.min(100, download?.progress + Math.random() * 5);
          return {
            ...download,
            progress: newProgress,
            status: newProgress >= 100 ? 'downloading' : 'generating'
          };
        }
        return download;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'downloading': return 'text-primary';
      case 'generating': return 'text-warning';
      case 'queued': return 'text-muted-foreground';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'downloading': return 'Download';
      case 'generating': return 'Cog';
      case 'queued': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getFrameworkIcon = (framework) => {
    switch (framework?.toLowerCase()) {
      case 'gri': return 'FileText';
      case 'sasb': return 'BarChart3';
      case 'tcfd': return 'TrendingUp';
      case 'combined': return 'Layers';
      case 'summary': return 'FileText';
      default: return 'File';
    }
  };

  const formatTimeRemaining = (startTime, estimatedCompletion) => {
    if (!estimatedCompletion) return 'Calculating...';
    
    const now = new Date();
    const completion = new Date(estimatedCompletion);
    const remaining = completion - now;
    
    if (remaining <= 0) return 'Almost done...';
    
    const minutes = Math.floor(remaining / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    
    if (minutes > 0) return `${minutes}m ${seconds}s remaining`;
    return `${seconds}s remaining`;
  };

  const handleDownload = (download) => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = download?.downloadUrl || '#';
    link.download = download?.name;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleRetry = (downloadId) => {
    setDownloadQueue(prev => prev?.map(download => 
      download?.id === downloadId 
        ? { ...download, status: 'generating', progress: 0 }
        : download
    ));
  };

  const handleCancel = (downloadId) => {
    setDownloadQueue(prev => prev?.filter(download => download?.id !== downloadId));
  };

  const clearCompleted = () => {
    setCompletedDownloads([]);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[80vh] bg-card border border-border rounded-lg shadow-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Download Manager</h2>
              <p className="text-sm text-muted-foreground">
                {downloadQueue?.length} active • {completedDownloads?.length} completed
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {/* Active Downloads */}
          {downloadQueue?.length > 0 && (
            <div className="p-6 border-b border-border">
              <h3 className="font-medium text-foreground mb-4">Active Downloads</h3>
              <div className="space-y-4">
                {downloadQueue?.map((download) => (
                  <div key={download?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={getFrameworkIcon(download?.framework)} 
                          size={20} 
                          className="text-muted-foreground"
                        />
                        <div>
                          <h4 className="font-medium text-foreground">{download?.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{download?.framework}</span>
                            <span>•</span>
                            <span>{download?.format}</span>
                            <span>•</span>
                            <span>{download?.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center space-x-1 ${getStatusColor(download?.status)}`}>
                          <Icon name={getStatusIcon(download?.status)} size={16} />
                          <span className="text-sm font-medium capitalize">
                            {download?.status}
                          </span>
                        </div>
                        {download?.status !== 'completed' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCancel(download?.id)}
                          >
                            <Icon name="X" size={14} />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {download?.status !== 'queued' && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">
                            {download?.status === 'generating' ? 'Generating report...' :
                             download?.status === 'downloading'? 'Downloading...' : 'Processing...'}
                          </span>
                          <span className="font-medium text-foreground">
                            {Math.round(download?.progress)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              download?.status === 'generating' ? 'bg-warning' :
                              download?.status === 'downloading' ? 'bg-primary' : 'bg-success'
                            }`}
                            style={{ width: `${download?.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Status Info */}
                    <div className="text-sm text-muted-foreground">
                      {download?.status === 'queued' ? (
                        <span>Position {download?.queuePosition} in queue</span>
                      ) : download?.status === 'failed' ? (
                        <div className="flex items-center justify-between">
                          <span className="text-error">Download failed</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRetry(download?.id)}
                          >
                            <Icon name="RotateCcw" size={14} className="mr-1" />
                            Retry
                          </Button>
                        </div>
                      ) : (
                        <span>
                          {formatTimeRemaining(download?.startTime, download?.estimatedCompletion)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Downloads */}
          {completedDownloads?.length > 0 && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">Completed Downloads</h3>
                <Button variant="ghost" size="sm" onClick={clearCompleted}>
                  <Icon name="Trash2" size={14} className="mr-2" />
                  Clear All
                </Button>
              </div>
              <div className="space-y-3">
                {completedDownloads?.map((download) => (
                  <div key={download?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={getFrameworkIcon(download?.framework)} 
                        size={18} 
                        className="text-muted-foreground"
                      />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{download?.name}</h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{download?.framework}</span>
                          <span>•</span>
                          <span>{download?.format}</span>
                          <span>•</span>
                          <span>{download?.size}</span>
                          <span>•</span>
                          <span>
                            {new Date(download.completedTime)?.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(download)}
                      >
                        <Icon name="Download" size={14} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {downloadQueue?.length === 0 && completedDownloads?.length === 0 && (
            <div className="p-12 text-center">
              <Icon name="Download" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Downloads</h3>
              <p className="text-muted-foreground">
                Generated reports will appear here for download
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Downloads are automatically deleted after 30 days
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={14} className="mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="FolderOpen" size={14} className="mr-2" />
                Open Folder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadManager;