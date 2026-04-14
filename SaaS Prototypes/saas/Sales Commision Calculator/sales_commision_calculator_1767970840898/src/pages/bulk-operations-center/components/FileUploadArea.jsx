// src/pages/bulk-operations-center/components/FileUploadArea.jsx
import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';

const FileUploadArea = ({ selectedOperation, onFileUpload, uploadedFiles, operationStatus }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['csv', 'xlsx', 'xls'].includes(extension);
    });

    if (validFiles.length !== files.length) {
      alert('Some files were skipped. Only CSV and Excel files are supported.');
    }

    if (validFiles.length > 0) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 20;
        });
      }, 200);

      // Process files and add metadata
      const processedFiles = validFiles.map(file => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        recordCount: Math.floor(Math.random() * 500) + 50, // Mock record count
        uploadTime: new Date(),
        status: 'uploaded'
      }));

      setTimeout(() => {
        onFileUpload(processedFiles);
      }, 1000);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    onFileUpload(updatedFiles);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded': return 'CheckCircle';
      case 'validating': return 'RefreshCw';
      case 'error': return 'XCircle';
      default: return 'FileText';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'text-success';
      case 'validating': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-white/60';
    }
  };

  const isProcessing = ['uploading', 'validating', 'processing'].includes(operationStatus);

  return (
    <div className="glass-morphism border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">File Upload</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Upload" size={16} className="text-white/60" />
          <span className="text-sm text-white/70">
            {selectedOperation?.supportedFormats?.join(', ') || 'CSV, Excel'}
          </span>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
          dragActive 
            ? 'border-neon-indigo bg-white/10' 
            : isProcessing 
              ? 'border-white/20 bg-white/5 opacity-50 cursor-not-allowed' :'border-white/30 hover:border-white/50 hover:bg-white/5'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".csv,.xlsx,.xls"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />

        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 glass-morphism-elevated rounded-full flex items-center justify-center">
            <Icon 
              name={dragActive ? 'Upload' : 'FileText'} 
              size={24} 
              className={dragActive ? 'text-neon-indigo' : 'text-white/60'} 
            />
          </div>
          
          <div>
            <p className="text-white font-medium mb-1">
              {dragActive ? 'Drop files here' : 'Drag and drop files here'}
            </p>
            <p className="text-sm text-white/70 mb-2">
              or click to browse your computer
            </p>
            <p className="text-xs text-white/60">
              Supports CSV and Excel files (max 10MB each)
            </p>
          </div>

          {!isProcessing && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-glass-primary"
            >
              Select Files
            </button>
          )}
        </div>

        {operationStatus === 'uploading' && (
          <div className="absolute inset-0 glass-morphism-elevated bg-opacity-90 flex items-center justify-center rounded-xl">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2">
                <Icon name="RefreshCw" size={32} className="text-neon-indigo animate-spin" />
              </div>
              <p className="text-sm font-medium text-white mb-2">Uploading files...</p>
              <div className="w-48 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-neon-indigo h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-white/70 mt-1">{Math.round(uploadProgress)}% complete</p>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      {uploadedFiles?.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-white mb-3">Uploaded Files ({uploadedFiles.length})</h4>
          <div className="space-y-2">
            {uploadedFiles.map((fileData, index) => (
              <div key={index} className="flex items-center justify-between p-3 glass-morphism-dark rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getStatusIcon(fileData.status)} 
                    size={16} 
                    className={`${getStatusColor(fileData.status)} ${
                      fileData.status === 'validating' ? 'animate-spin' : ''
                    }`} 
                  />
                  <div>
                    <p className="font-medium text-white">{fileData.name}</p>
                    <div className="flex items-center space-x-4 text-xs text-white/60">
                      <span>{formatFileSize(fileData.size)}</span>
                      <span>{fileData.recordCount} records</span>
                      <span>Uploaded {fileData.uploadTime?.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeFile(index)}
                    disabled={isProcessing}
                    className="p-1 text-error hover:bg-error/20 rounded transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* File Summary */}
          <div className="mt-3 p-3 glass-morphism-elevated rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-white">
                  Total Records: {uploadedFiles.reduce((acc, file) => acc + file.recordCount, 0)}
                </span>
                <span className="text-white/70">
                  Total Size: {formatFileSize(uploadedFiles.reduce((acc, file) => acc + file.size, 0))}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={14} className="text-info" />
                <span className="text-info">Data validation will run automatically</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Download */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Need a template?</p>
            <p className="text-xs text-white/60">Download the template file for {selectedOperation?.name}</p>
          </div>
          <button className="flex items-center space-x-2 px-3 py-2 text-neon-indigo hover:bg-white/10 rounded-sm transition-smooth">
            <Icon name="Download" size={16} />
            <span>Download Template</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadArea;