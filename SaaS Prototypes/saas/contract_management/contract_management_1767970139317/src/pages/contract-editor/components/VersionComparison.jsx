import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const VersionComparison = ({ versions = [], onAcceptChange, onRejectChange }) => {
  const [selectedVersions, setSelectedVersions] = useState({
    left: '',
    right: ''
  });
  const [viewMode, setViewMode] = useState('side-by-side');
  const [showChangesOnly, setShowChangesOnly] = useState(false);

  const mockVersions = [
    {
      id: 'v1.0',
      version: '1.0',
      title: 'Initial Draft',
      author: 'John Doe',
      timestamp: new Date('2024-09-01T10:00:00'),
      changes: 0,
      content: `SERVICE AGREEMENT\n\nThis Service Agreement ("Agreement") is entered into on September 1, 2024, between ContractFlow Pro Inc. ("Company") and Vendor Solutions LLC ("Vendor").\n\n1. SERVICES\nVendor shall provide consulting services as described in Exhibit A.\n\n2. PAYMENT TERMS\nPayment shall be made within fifteen (15) days of invoice receipt.\n\n3. TERM\nThis Agreement shall commence on September 1, 2024 and continue for a period of twelve (12) months.`
    },
    {
      id: 'v1.1',
      version: '1.1',
      title: 'Legal Review Updates',
      author: 'Lisa Brown',
      timestamp: new Date('2024-09-02T14:30:00'),
      changes: 3,
      content: `SERVICE AGREEMENT\n\nThis Service Agreement ("Agreement") is entered into on September 1, 2024, between ContractFlow Pro Inc. ("Company") and Vendor Solutions LLC ("Vendor").\n\n1. SERVICES\nVendor shall provide consulting services as described in Exhibit A attached hereto and incorporated by reference.\n\n2. PAYMENT TERMS\nPayment shall be made within thirty (30) days of invoice receipt. Late payments shall incur a service charge of 1.5% per month.\n\n3. TERM\nThis Agreement shall commence on September 1, 2024 and continue for a period of twelve (12) months, with automatic renewal for successive one-year terms unless terminated by either party with sixty (60) days written notice.`
    },
    {
      id: 'v1.2',
      version: '1.2',
      title: 'Finance Approved',
      author: 'Sarah Smith',
      timestamp: new Date('2024-09-03T11:15:00'),
      changes: 2,
      content: `SERVICE AGREEMENT\n\nThis Service Agreement ("Agreement") is entered into on September 1, 2024, between ContractFlow Pro Inc. ("Company") and Vendor Solutions LLC ("Vendor").\n\n1. SERVICES\nVendor shall provide consulting services as described in Exhibit A attached hereto and incorporated by reference.\n\n2. PAYMENT TERMS\nPayment shall be made within thirty (30) days of invoice receipt. Late payments shall incur a service charge of 1.5% per month. All payments shall be made in US Dollars.\n\n3. TERM\nThis Agreement shall commence on September 1, 2024 and continue for a period of twelve (12) months, with automatic renewal for successive one-year terms unless terminated by either party with sixty (60) days written notice.\n\n4. LIMITATION OF LIABILITY\nIn no event shall either party's liability exceed the total amount paid under this Agreement in the twelve months preceding the claim.`
    }
  ];

  const allVersions = versions?.length > 0 ? versions : mockVersions;

  const versionOptions = allVersions?.map(v => ({
    value: v?.id,
    label: `${v?.version} - ${v?.title} (${v?.author})`
  }));

  const viewModes = [
    { value: 'side-by-side', label: 'Side by Side' },
    { value: 'unified', label: 'Unified View' },
    { value: 'changes-only', label: 'Changes Only' }
  ];

  const getVersionContent = (versionId) => {
    return allVersions?.find(v => v?.id === versionId)?.content || '';
  };

  const generateDiff = (leftContent, rightContent) => {
    const leftLines = leftContent?.split('\n');
    const rightLines = rightContent?.split('\n');
    const maxLines = Math.max(leftLines?.length, rightLines?.length);
    
    const diff = [];
    for (let i = 0; i < maxLines; i++) {
      const leftLine = leftLines?.[i] || '';
      const rightLine = rightLines?.[i] || '';
      
      if (leftLine === rightLine) {
        diff?.push({ type: 'unchanged', left: leftLine, right: rightLine, lineNumber: i + 1 });
      } else if (leftLine && !rightLine) {
        diff?.push({ type: 'removed', left: leftLine, right: '', lineNumber: i + 1 });
      } else if (!leftLine && rightLine) {
        diff?.push({ type: 'added', left: '', right: rightLine, lineNumber: i + 1 });
      } else {
        diff?.push({ type: 'modified', left: leftLine, right: rightLine, lineNumber: i + 1 });
      }
    }
    
    return diff;
  };

  const leftContent = getVersionContent(selectedVersions?.left);
  const rightContent = getVersionContent(selectedVersions?.right);
  const diff = selectedVersions?.left && selectedVersions?.right ? generateDiff(leftContent, rightContent) : [];

  const filteredDiff = showChangesOnly ? diff?.filter(line => line?.type !== 'unchanged') : diff;

  const getLineClass = (type) => {
    switch (type) {
      case 'added': return 'bg-success/10 border-l-4 border-success';
      case 'removed': return 'bg-error/10 border-l-4 border-error';
      case 'modified': return 'bg-warning/10 border-l-4 border-warning';
      default: return '';
    }
  };

  const getTextClass = (type) => {
    switch (type) {
      case 'added': return 'text-success';
      case 'removed': return 'text-error';
      case 'modified': return 'text-warning';
      default: return 'text-text-primary';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Version Comparison</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export Diff
            </Button>
            <Button variant="outline" size="sm" iconName="Printer">
              Print
            </Button>
          </div>
        </div>

        {/* Version Selection */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Select
            label="Compare From"
            options={versionOptions}
            value={selectedVersions?.left}
            onChange={(value) => setSelectedVersions(prev => ({ ...prev, left: value }))}
            placeholder="Select version"
          />
          <Select
            label="Compare To"
            options={versionOptions}
            value={selectedVersions?.right}
            onChange={(value) => setSelectedVersions(prev => ({ ...prev, right: value }))}
            placeholder="Select version"
          />
          <Select
            label="View Mode"
            options={viewModes}
            value={viewMode}
            onChange={setViewMode}
          />
        </div>

        {/* Options */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showChangesOnly}
              onChange={(e) => setShowChangesOnly(e?.target?.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-text-primary">Show changes only</span>
          </label>
          
          {selectedVersions?.left && selectedVersions?.right && (
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success rounded"></div>
                <span>Added</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-error rounded"></div>
                <span>Removed</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-warning rounded"></div>
                <span>Modified</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Comparison Content */}
      <div className="flex-1 overflow-hidden">
        {!selectedVersions?.left || !selectedVersions?.right ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icon name="GitCompare" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium text-text-primary mb-2">Select Versions to Compare</h4>
              <p className="text-muted-foreground">
                Choose two versions from the dropdowns above to see the differences
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full">
            {viewMode === 'side-by-side' ? (
              <div className="flex h-full">
                {/* Left Version */}
                <div className="flex-1 border-r border-border">
                  <div className="p-3 bg-muted/30 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-text-primary">
                        {allVersions?.find(v => v?.id === selectedVersions?.left)?.version} - 
                        {allVersions?.find(v => v?.id === selectedVersions?.left)?.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {allVersions?.find(v => v?.id === selectedVersions?.left)?.author}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 overflow-y-auto h-full">
                    <pre className="text-sm font-mono whitespace-pre-wrap text-text-primary">
                      {leftContent}
                    </pre>
                  </div>
                </div>

                {/* Right Version */}
                <div className="flex-1">
                  <div className="p-3 bg-muted/30 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-text-primary">
                        {allVersions?.find(v => v?.id === selectedVersions?.right)?.version} - 
                        {allVersions?.find(v => v?.id === selectedVersions?.right)?.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {allVersions?.find(v => v?.id === selectedVersions?.right)?.author}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 overflow-y-auto h-full">
                    <pre className="text-sm font-mono whitespace-pre-wrap text-text-primary">
                      {rightContent}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              /* Unified Diff View */
              (<div className="h-full overflow-y-auto">
                <div className="p-3 bg-muted/30 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-text-primary">
                      Comparing {allVersions?.find(v => v?.id === selectedVersions?.left)?.version} → {allVersions?.find(v => v?.id === selectedVersions?.right)?.version}
                    </h4>
                    <div className="text-xs text-muted-foreground">
                      {filteredDiff?.filter(line => line?.type !== 'unchanged')?.length} changes
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  {filteredDiff?.map((line, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-4 py-1 px-2 ${getLineClass(line?.type)}`}
                    >
                      <span className="text-xs text-muted-foreground w-8 flex-shrink-0">
                        {line?.lineNumber}
                      </span>
                      <div className="flex-1 min-w-0">
                        {line?.type === 'modified' ? (
                          <div className="space-y-1">
                            <div className="text-sm font-mono text-error">
                              - {line?.left}
                            </div>
                            <div className="text-sm font-mono text-success">
                              + {line?.right}
                            </div>
                          </div>
                        ) : (
                          <div className={`text-sm font-mono ${getTextClass(line?.type)}`}>
                            {line?.type === 'added' && '+ '}
                            {line?.type === 'removed' && '- '}
                            {line?.right || line?.left}
                          </div>
                        )}
                      </div>
                      
                      {(line?.type === 'added' || line?.type === 'modified') && onAcceptChange && (
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onAcceptChange(line)}
                            iconName="Check"
                            className="text-success hover:text-success h-6 w-6 p-0"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRejectChange(line)}
                            iconName="X"
                            className="text-error hover:text-error h-6 w-6 p-0"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>)
            )}
          </div>
        )}
      </div>
      {/* Footer */}
      {selectedVersions?.left && selectedVersions?.right && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {filteredDiff?.filter(line => line?.type === 'added')?.length} additions, 
              {filteredDiff?.filter(line => line?.type === 'removed')?.length} deletions, 
              {filteredDiff?.filter(line => line?.type === 'modified')?.length} modifications
            </span>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                Accept All Changes
              </Button>
              <Button variant="outline" size="sm">
                Reject All Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionComparison;