import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const BulkImportModal = ({ onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [importData, setImportData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const csvTemplate = `Product Code,Description,Quantity,Unit Price,Tax Rate
LAPTOP001,"Dell Latitude 7420 Laptop - 14"" FHD, Intel i7, 16GB RAM, 512GB SSD",2,1299.99,8.25 CHAIR001,"Ergonomic Office Chair - Adjustable Height, Lumbar Support",5,299.99,8.25 PRINTER001,"HP LaserJet Pro M404n Monochrome Printer",1,199.99,8.25`;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    if (!file.name.endsWith('.csv')) {
      setErrors(['Please upload a CSV file']);
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);
    setErrors([]);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      const requiredHeaders = ['Product Code', 'Description', 'Quantity', 'Unit Price', 'Tax Rate'];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      
      if (missingHeaders.length > 0) {
        setErrors([`Missing required columns: ${missingHeaders.join(', ')}`]);
        setIsProcessing(false);
        return;
      }

      const data = [];
      const parseErrors = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const row = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        // Validate and convert data
        const lineItem = {
          id: Date.now() + i,
          productCode: row['Product Code'],
          description: row['Description'],
          quantity: parseInt(row['Quantity']) || 0,
          unitPrice: parseFloat(row['Unit Price']) || 0,
          taxRate: parseFloat(row['Tax Rate']) || 8.25,
          total: 0
        };

        // Calculate total
        lineItem.total = lineItem.quantity * lineItem.unitPrice;

        // Validate required fields
        if (!lineItem.description) {
          parseErrors.push(`Row ${i + 1}: Description is required`);
        }
        if (lineItem.quantity <= 0) {
          parseErrors.push(`Row ${i + 1}: Quantity must be greater than 0`);
        }
        if (lineItem.unitPrice <= 0) {
          parseErrors.push(`Row ${i + 1}: Unit Price must be greater than 0`);
        }

        data.push(lineItem);
      }

      if (parseErrors.length > 0) {
        setErrors(parseErrors);
      } else {
        setImportData(data);
      }
    } catch (error) {
      setErrors(['Error parsing CSV file. Please check the format.']);
    }

    setIsProcessing(false);
  };

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'purchase_order_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (importData.length > 0) {
      onImport(importData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-card border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading-semibold text-text-primary">
            Bulk Import Line Items
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-button hover:bg-secondary-100 transition-smooth"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Instructions */}
          <div className="mb-6">
            <h3 className="font-body-medium text-text-primary mb-2">Instructions</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Upload a CSV file with your line items</li>
              <li>• Use the template below for proper formatting</li>
              <li>• Maximum 100 items per import</li>
              <li>• All monetary values should be in USD</li>
            </ul>
          </div>

          {/* Template Download */}
          <div className="mb-6 p-4 bg-secondary-50 rounded-button">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-body-medium text-text-primary">CSV Template</h3>
                <p className="text-sm text-text-secondary">Download the template to ensure proper formatting</p>
              </div>
              <button
                onClick={downloadTemplate}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Download Template
              </button>
            </div>
          </div>

          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-card p-8 text-center transition-smooth ${
              dragActive 
                ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-secondary-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <Icon name="Upload" size={48} className="mx-auto text-text-secondary" />
              <div>
                <p className="text-lg font-body-medium text-text-primary">
                  {dragActive ? 'Drop your CSV file here' : 'Drag and drop your CSV file here'}
                </p>
                <p className="text-text-secondary">or click to browse files</p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 border border-border rounded-button hover:bg-secondary-50 transition-smooth"
              >
                Choose File
              </button>
            </div>
          </div>

          {/* Processing State */}
          {isProcessing && (
            <div className="mt-4 p-4 bg-primary-50 rounded-button">
              <div className="flex items-center space-x-3">
                <Icon name="Loader2" size={20} className="text-primary animate-spin" />
                <span className="text-primary">Processing CSV file...</span>
              </div>
            </div>
          )}

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mt-4 p-4 bg-error-50 border border-error-100 rounded-button">
              <h3 className="font-body-medium text-error mb-2">Import Errors</h3>
              <ul className="text-sm text-error space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview */}
          {importData.length > 0 && (
            <div className="mt-6">
              <h3 className="font-body-medium text-text-primary mb-3">
                Preview ({importData.length} items)
              </h3>
              <div className="border border-border rounded-button overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left text-text-secondary">Code</th>
                        <th className="px-3 py-2 text-left text-text-secondary">Description</th>
                        <th className="px-3 py-2 text-right text-text-secondary">Qty</th>
                        <th className="px-3 py-2 text-right text-text-secondary">Price</th>
                        <th className="px-3 py-2 text-right text-text-secondary">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importData.map((item, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="px-3 py-2 text-text-primary">{item.productCode}</td>
                          <td className="px-3 py-2 text-text-primary truncate max-w-xs">{item.description}</td>
                          <td className="px-3 py-2 text-right text-text-primary">{item.quantity}</td>
                          <td className="px-3 py-2 text-right text-text-primary">${item.unitPrice.toFixed(2)}</td>
                          <td className="px-3 py-2 text-right text-text-primary">${item.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            {uploadedFile && `File: ${uploadedFile.name}`}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-button hover:bg-secondary-50 transition-smooth"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={importData.length === 0}
              className="px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Import {importData.length} Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkImportModal;