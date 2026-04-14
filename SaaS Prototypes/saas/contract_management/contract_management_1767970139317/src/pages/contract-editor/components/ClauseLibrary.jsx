import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClauseLibrary = ({ onInsertClause }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedClause, setExpandedClause] = useState(null);

  const clauseCategories = [
    { id: 'all', label: 'All Clauses', count: 47 },
    { id: 'termination', label: 'Termination', count: 8 },
    { id: 'payment', label: 'Payment Terms', count: 12 },
    { id: 'liability', label: 'Liability', count: 6 },
    { id: 'confidentiality', label: 'Confidentiality', count: 5 },
    { id: 'intellectual-property', label: 'IP Rights', count: 7 },
    { id: 'compliance', label: 'Compliance', count: 4 },
    { id: 'dispute', label: 'Dispute Resolution', count: 5 }
  ];

  const clauseLibrary = [
    {
      id: 1,
      title: 'Standard Termination Clause',
      category: 'termination',
      description: 'Basic termination rights with 30-day notice period',
      content: `Either party may terminate this Agreement at any time by providing thirty (30) days written notice to the other party. Upon termination, all rights and obligations shall cease except those that by their nature should survive termination.`,
      tags: ['termination', 'notice', 'standard'],
      lastModified: '2024-08-15',
      usage: 156
    },
    {
      id: 2,
      title: 'Net 30 Payment Terms',
      category: 'payment',
      description: 'Standard 30-day payment terms with late fees',
      content: `Payment is due within thirty (30) days of invoice date. Late payments shall incur a service charge of 1.5% per month or the maximum rate permitted by law, whichever is less. All payments shall be made in US Dollars.`,
      tags: ['payment', 'net-30', 'late-fees'],
      lastModified: '2024-08-20',
      usage: 203
    },
    {
      id: 3,
      title: 'Limitation of Liability',
      category: 'liability',
      description: 'Caps liability and excludes consequential damages',
      content: `IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. EACH PARTY'S TOTAL LIABILITY SHALL NOT EXCEED THE TOTAL AMOUNT PAID UNDER THIS AGREEMENT IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.`,
      tags: ['liability', 'limitation', 'damages'],
      lastModified: '2024-08-18',
      usage: 89
    },
    {
      id: 4,
      title: 'Mutual Confidentiality',category: 'confidentiality',description: 'Two-way confidentiality protection',
      content: `Each party acknowledges that it may receive confidential information from the other party. Both parties agree to maintain the confidentiality of such information and not disclose it to third parties without prior written consent, except as required by law.`,
      tags: ['confidentiality', 'mutual', 'nda'],
      lastModified: '2024-08-22',
      usage: 134
    },
    {
      id: 5,
      title: 'Work for Hire - IP Assignment',category: 'intellectual-property',description: 'Assigns all work product to client',
      content: `All work product, deliverables, and intellectual property created by Contractor in connection with this Agreement shall be deemed "work made for hire" and shall be owned exclusively by Client. Contractor hereby assigns all rights, title, and interest in such work to Client.`,
      tags: ['ip', 'work-for-hire', 'assignment'],
      lastModified: '2024-08-19',
      usage: 67
    },
    {
      id: 6,
      title: 'GDPR Compliance',category: 'compliance',description: 'Data protection compliance requirements',
      content: `Both parties shall comply with all applicable data protection laws, including the General Data Protection Regulation (GDPR). Each party shall implement appropriate technical and organizational measures to protect personal data and shall notify the other party of any data breaches within 72 hours.`,
      tags: ['gdpr', 'data-protection', 'compliance'],
      lastModified: '2024-08-25',
      usage: 45
    }
  ];

  const filteredClauses = clauseLibrary?.filter(clause => {
    const matchesSearch = clause?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         clause?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         clause?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || clause?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInsertClause = (clause) => {
    onInsertClause(clause);
  };

  const toggleClauseExpansion = (clauseId) => {
    setExpandedClause(expandedClause === clauseId ? null : clauseId);
  };

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">Clause Library</h3>
          <Button variant="outline" size="sm" iconName="Plus">
            New Clause
          </Button>
        </div>
        
        {/* Search */}
        <Input
          type="search"
          placeholder="Search clauses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="mb-3"
        />
      </div>
      <div className="flex-1 flex">
        {/* Categories Sidebar */}
        <div className="w-48 border-r border-border p-3">
          <h4 className="text-sm font-medium text-text-primary mb-3">Categories</h4>
          <div className="space-y-1">
            {clauseCategories?.map(category => (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-smooth ${
                  selectedCategory === category?.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-text-primary hover:bg-muted'
                }`}
              >
                <span>{category?.label}</span>
                <span className={`text-xs ${
                  selectedCategory === category?.id ? 'text-accent-foreground/80' : 'text-muted-foreground'
                }`}>
                  {category?.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Clauses List */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-3">
            {filteredClauses?.map(clause => (
              <div
                key={clause?.id}
                className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h5 className="font-medium text-text-primary mb-1">{clause?.title}</h5>
                    <p className="text-sm text-muted-foreground mb-2">{clause?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                      <span>Used {clause?.usage} times</span>
                      <span>Modified {clause?.lastModified}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {clause?.tags?.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleClauseExpansion(clause?.id)}
                      iconName={expandedClause === clause?.id ? "ChevronUp" : "ChevronDown"}
                    >
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleInsertClause(clause)}
                      iconName="Plus"
                    >
                      Insert
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedClause === clause?.id && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="bg-muted/30 p-3 rounded text-sm text-text-primary">
                      {clause?.content}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <button className="hover:text-text-primary transition-smooth">
                          <Icon name="Edit3" size={14} className="inline mr-1" />
                          Edit
                        </button>
                        <button className="hover:text-text-primary transition-smooth">
                          <Icon name="Copy" size={14} className="inline mr-1" />
                          Copy
                        </button>
                        <button className="hover:text-text-primary transition-smooth">
                          <Icon name="Star" size={14} className="inline mr-1" />
                          Favorite
                        </button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleInsertClause(clause)}
                        iconName="ArrowRight"
                        iconPosition="right"
                      >
                        Insert Clause
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredClauses?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium text-text-primary mb-2">No clauses found</h4>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or category filter
              </p>
              <Button variant="outline" onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClauseLibrary;