import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const PassportScanner = ({ onComplete, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize camera when component mounts
    initializeCamera();
    
    return () => {
      // Cleanup camera when component unmounts
      stopCamera();
    };
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          // Mock passport data
          const mockPassportData = {
            firstName: 'John',
            lastName: 'Doe',
            passportNumber: 'P123456789',
            nationality: 'United States',
            dateOfBirth: '1990-01-15',
            expiryDate: '2030-01-15',
            gender: 'M'
          };
          
          setScanResult(mockPassportData);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleConfirm = () => {
    onComplete(scanResult);
  };

  const handleRetry = () => {
    setScanResult(null);
    setScanProgress(0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-heading-semibold text-text-primary">
            Passport Scanner
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-all duration-200 ease-out"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!scanResult ? (
            <>
              {/* Camera View */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-white border-dashed w-4/5 h-3/5 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <Icon name="FileText" size={48} className="mx-auto mb-2 opacity-75" />
                      <p className="text-sm">Position passport here</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {isScanning && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-200 ease-out"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                      <span className="text-white text-sm">{scanProgress}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-secondary-100 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-body-medium text-text-primary mb-2">
                  Scanning Instructions:
                </h4>
                <ul className="text-xs text-text-secondary space-y-1">
                  <li>• Ensure good lighting</li>
                  <li>• Hold passport steady within the frame</li>
                  <li>• Make sure all text is clearly visible</li>
                  <li>• Avoid glare and shadows</li>
                </ul>
              </div>

              {/* Scan Button */}
              <button
                onClick={handleStartScan}
                disabled={isScanning}
                className="w-full flex items-center justify-center py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-out"
              >
                {isScanning ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Scanning...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Icon name="Scan" size={20} className="mr-2" />
                    Start Scanning
                  </div>
                )}
              </button>
            </>
          ) : (
            <>
              {/* Scan Results */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={16} color="white" />
                  </div>
                  <h4 className="text-lg font-heading-semibold text-text-primary">
                    Scan Complete!
                  </h4>
                </div>

                <div className="bg-secondary-100 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-text-secondary">First Name</label>
                      <p className="text-sm font-body-medium text-text-primary">{scanResult.firstName}</p>
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary">Last Name</label>
                      <p className="text-sm font-body-medium text-text-primary">{scanResult.lastName}</p>
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary">Passport Number</label>
                      <p className="text-sm font-body-medium text-text-primary">{scanResult.passportNumber}</p>
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary">Nationality</label>
                      <p className="text-sm font-body-medium text-text-primary">{scanResult.nationality}</p>
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary">Date of Birth</label>
                      <p className="text-sm font-body-medium text-text-primary">{scanResult.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary">Expiry Date</label>
                      <p className="text-sm font-body-medium text-text-primary">{scanResult.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleRetry}
                  className="flex-1 py-3 px-4 border border-border text-text-secondary rounded-lg hover:bg-secondary-100 transition-all duration-200 ease-out"
                >
                  Scan Again
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-700 transition-all duration-200 ease-out"
                >
                  Use This Data
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassportScanner;