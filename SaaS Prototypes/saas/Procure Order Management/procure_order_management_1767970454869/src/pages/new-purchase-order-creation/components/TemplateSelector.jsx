import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TemplateSelector = ({ onClose, onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: "Office Supplies Standard",
      description: "Common office supplies with standard quantities and pricing",
      category: "Office",
      itemCount: 8,
      estimatedTotal: 1250.00,
      lastUsed: "2024-01-15",
      lineItems: [
        {
          id: 1,
          productCode: "CHAIR001",
          description: "Ergonomic Office Chair - Adjustable Height, Lumbar Support",
          quantity: 5,
          unitPrice: 299.99,
          taxRate: 8.25,
          total: 1499.95
        },
        {
          id: 2,
          productCode: "DESK001",
          description: "Standing Desk Converter - Dual Monitor Support",
          quantity: 3,
          unitPrice: 399.99,
          taxRate: 8.25,
          total: 1199.97
        }
      ]
    },
    {
      id: 2,
      name: "IT Equipment Bundle",
      description: "Standard IT equipment package for new employee setup",
      category: "Technology",
      itemCount: 5,
      estimatedTotal: 3200.00,
      lastUsed: "2024-01-10",
      lineItems: [
        {
          id: 1,
          productCode: "LAPTOP001",
          description: "Dell Latitude 7420 Laptop - 14\" FHD, Intel i7, 16GB RAM, 512GB SSD",
          quantity: 1,
          unitPrice: 1299.99,
          taxRate: 8.25,
          total: 1299.99
        },
        {
          id: 2,
          productCode: "MONITOR001",
          description: "24\" LED Monitor - Full HD, USB-C Connectivity",
          quantity: 2,
          unitPrice: 249.99,
          taxRate: 8.25,
          total: 499.98
        }
      ]
    },
    {
      id: 3,
      name: "Marketing Materials",
      description: "Promotional materials and marketing supplies",
      category: "Marketing",
      itemCount: 12,
      estimatedTotal: 850.00,
      lastUsed: "2024-01-08",
      lineItems: [
        {
          id: 1,
          productCode: "BANNER001",
          description: "Trade Show Banner - 8x10 ft, Full Color Print",
          quantity: 2,
          unitPrice: 125.00,
          taxRate: 8.25,
          total: 250.00
        },
        {
          id: 2,
          productCode: "BROCHURE001",
          description: "Company Brochures - Tri-fold, Glossy Finish (500 pack)",
          quantity: 5,
          unitPrice: 45.00,
          taxRate: 8.25,
          total: 225.00
        }
      ]
    },
    {
      id: 4,
      name: "Maintenance Supplies",
      description: "Facility maintenance and cleaning supplies",
      category: "Facilities",
      itemCount: 15,
      estimatedTotal: 450.00,
      lastUsed: "2024-01-05",
      lineItems: [
        {
          id: 1,
          productCode: "CLEAN001",
          description: "All-Purpose Cleaner - Industrial Grade (1 gallon)",
          quantity: 10,
          unitPrice: 12.99,
          taxRate: 8.25,
          total: 129.90
        },
        {
          id: 2,
          productCode: "PAPER001",
          description: "Paper Towels - Commercial Grade (12 pack)",
          quantity: 5,
          unitPrice: 24.99,
          taxRate: 8.25,
          total: 124.95
        }
      ]
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Office': return 'Building';
      case 'Technology': return 'Monitor';
      case 'Marketing': return 'Megaphone';
      case 'Facilities': return 'Wrench';
      default: return 'Package';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Office': return 'text-blue-600 bg-blue-50';
      case 'Technology': return 'text-purple-600 bg-purple-50';
      case 'Marketing': return 'text-green-600 bg-green-50';
      case 'Facilities': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSelectTemplate = () => {
    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate);
      onSelectTemplate({
        lineItems: template.lineItems,
        notes: `Created from template: ${template.name}`
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-card border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading-semibold text-text-primary">
            Select Purchase Order Template
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-card p-4 cursor-pointer transition-smooth ${
                  selectedTemplate === template.id
                    ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-secondary-50'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                {/* Template Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-button ${getCategoryColor(template.category)}`}>
                      <Icon name={getCategoryIcon(template.category)} size={20} />
                    </div>
                    <div>
                      <h3 className="font-body-semibold text-text-primary">{template.name}</h3>
                      <p className="text-sm text-text-secondary">{template.category}</p>
                    </div>
                  </div>
                  {selectedTemplate === template.id && (
                    <Icon name="CheckCircle" size={20} className="text-primary" />
                  )}
                </div>

                {/* Template Description */}
                <p className="text-sm text-text-secondary mb-4">{template.description}</p>

                {/* Template Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-body-semibold text-text-primary">{template.itemCount}</div>
                    <div className="text-xs text-text-secondary">Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-body-semibold text-text-primary">
                      ${template.estimatedTotal.toLocaleString()}
                    </div>
                    <div className="text-xs text-text-secondary">Est. Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-body-semibold text-text-primary">
                      {new Date(template.lastUsed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-xs text-text-secondary">Last Used</div>
                  </div>
                </div>

                {/* Sample Items Preview */}
                <div className="border-t border-border pt-3">
                  <h4 className="text-sm font-body-medium text-text-primary mb-2">Sample Items:</h4>
                  <div className="space-y-1">
                    {template.lineItems.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-text-secondary truncate flex-1 mr-2">
                          {item.description}
                        </span>
                        <span className="text-text-primary">
                          {item.quantity}x ${item.unitPrice}
                        </span>
                      </div>
                    ))}
                    {template.lineItems.length > 2 && (
                      <div className="text-xs text-text-secondary">
                        +{template.lineItems.length - 2} more items...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Template Preview */}
          {selectedTemplate && (
            <div className="mt-6 p-4 border border-border rounded-card bg-secondary-50">
              <h3 className="font-body-medium text-text-primary mb-3">Template Preview</h3>
              <div className="max-h-48 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-surface sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-text-secondary">Description</th>
                      <th className="px-3 py-2 text-right text-text-secondary">Qty</th>
                      <th className="px-3 py-2 text-right text-text-secondary">Price</th>
                      <th className="px-3 py-2 text-right text-text-secondary">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {templates.find(t => t.id === selectedTemplate)?.lineItems.map((item, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="px-3 py-2 text-text-primary">{item.description}</td>
                        <td className="px-3 py-2 text-right text-text-primary">{item.quantity}</td>
                        <td className="px-3 py-2 text-right text-text-primary">${item.unitPrice.toFixed(2)}</td>
                        <td className="px-3 py-2 text-right text-text-primary">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            {selectedTemplate ? 
              `Selected: ${templates.find(t => t.id === selectedTemplate)?.name}` : 
              'Select a template to continue'
            }
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-button hover:bg-secondary-50 transition-smooth"
            >
              Cancel
            </button>
            <button
              onClick={handleSelectTemplate}
              disabled={!selectedTemplate}
              className="px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Use Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;