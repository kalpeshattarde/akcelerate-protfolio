import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ComplianceOverview from './components/ComplianceOverview';
import ComplianceMonitoring from './components/ComplianceMonitoring';
import ComplianceReporting from './components/ComplianceReporting';
import AuditTrail from './components/AuditTrail';
import RegulatoryUpdates from './components/RegulatoryUpdates';

const ComplianceCenter = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('monitoring');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock data for compliance frameworks
  const complianceData = [
    {
      id: 1,
      name: "GDPR",
      type: "Data Protection",
      icon: "Shield",
      percentage: 95,
      compliantContracts: 1247,
      outstandingIssues: 3,
      nextAudit: "Mar 15, 2025"
    },
    {
      id: 2,
      name: "SOX",
      type: "Financial Compliance",
      icon: "DollarSign",
      percentage: 88,
      compliantContracts: 892,
      outstandingIssues: 12,
      nextAudit: "Apr 20, 2025"
    },
    {
      id: 3,
      name: "HIPAA",
      type: "Healthcare",
      icon: "Heart",
      percentage: 92,
      compliantContracts: 456,
      outstandingIssues: 5,
      nextAudit: "May 10, 2025"
    },
    {
      id: 4,
      name: "PCI DSS",
      type: "Payment Security",
      icon: "CreditCard",
      percentage: 97,
      compliantContracts: 234,
      outstandingIssues: 1,
      nextAudit: "Jun 30, 2025"
    }
  ];

  // Mock data for compliance monitoring
  const monitoringData = [
    {
      id: 1,
      contractTitle: "Healthcare Data Processing Agreement",
      vendor: "MedTech Solutions Inc.",
      regulation: "HIPAA",
      riskLevel: "high",
      dueDate: "Jan 15, 2025",
      complianceScore: 72,
      lastReview: "Dec 20, 2024",
      issues: [
        "Missing data encryption clause for patient records",
        "Insufficient breach notification procedures",
        "Incomplete business associate agreement terms"
      ]
    },
    {
      id: 2,
      contractTitle: "Financial Services Platform Agreement",
      vendor: "FinanceCore Technologies",
      regulation: "SOX",
      riskLevel: "critical",
      dueDate: "Jan 10, 2025",
      complianceScore: 65,
      lastReview: "Dec 18, 2024",
      issues: [
        "Internal controls documentation missing",
        "Audit trail requirements not specified",
        "Financial reporting standards non-compliant"
      ]
    },
    {
      id: 3,
      contractTitle: "EU Customer Data Management Contract",
      vendor: "DataFlow Europe Ltd.",
      regulation: "GDPR",
      riskLevel: "medium",
      dueDate: "Jan 25, 2025",
      complianceScore: 85,
      lastReview: "Dec 22, 2024",
      issues: [
        "Data subject rights procedures need clarification",
        "Cross-border transfer mechanisms require update"
      ]
    },
    {
      id: 4,
      contractTitle: "Payment Processing Service Agreement",
      vendor: "SecurePay Systems",
      regulation: "PCI DSS",
      riskLevel: "low",
      dueDate: "Feb 5, 2025",
      complianceScore: 94,
      lastReview: "Dec 25, 2024",
      issues: [
        "Quarterly security assessment schedule needs confirmation"
      ]
    }
  ];

  // Mock data for audit trail
  const auditData = [
    {
      id: 1,
      user: "Sarah Wilson",
      userId: "sarah.wilson",
      action: "approved",
      description: "Approved GDPR compliance remediation for Healthcare Data Processing Agreement",
      timestamp: "2025-01-04 14:30:15",
      ipAddress: "192.168.1.45",
      details: {
        contractId: "HC-2024-001",
        previousStatus: "Under Review",
        newStatus: "Compliant",
        approvalLevel: "Senior Compliance Officer"
      }
    },
    {
      id: 2,
      user: "Mike Johnson",
      userId: "mike.johnson",
      action: "modified",
      description: "Updated compliance framework settings for SOX requirements",
      timestamp: "2025-01-04 13:15:42",
      ipAddress: "192.168.1.67",
      details: {
        framework: "SOX",
        changedFields: "Risk Threshold, Audit Frequency",
        previousValues: "Medium, Quarterly",
        newValues: "High, Monthly"
      }
    },
    {
      id: 3,
      user: "Jane Smith",
      userId: "jane.smith",
      action: "created",
      description: "Created new compliance monitoring rule for HIPAA contracts",
      timestamp: "2025-01-04 11:45:23",
      ipAddress: "192.168.1.89",
      details: {
        ruleType: "Automated Monitoring",
        regulation: "HIPAA",
        triggerConditions: "Contract expiry within 90 days",
        notificationRecipients: "Compliance Team, Legal Team"
      }
    },
    {
      id: 4,
      user: "John Doe",
      userId: "john.doe",
      action: "exported",
      description: "Exported compliance report for Q4 2024 regulatory audit",
      timestamp: "2025-01-04 10:20:11",
      ipAddress: "192.168.1.23",
      details: {
        reportType: "Quarterly Compliance Summary",
        dateRange: "Oct 1, 2024 - Dec 31, 2024",
        format: "PDF",
        fileSize: "2.4 MB"
      }
    },
    {
      id: 5,
      user: "Sarah Wilson",
      userId: "sarah.wilson",
      action: "rejected",
      description: "Rejected compliance exception request for vendor contract",
      timestamp: "2025-01-04 09:10:33",
      ipAddress: "192.168.1.45",
      details: {
        contractId: "VN-2024-156",
        exceptionType: "Data Retention Period",
        rejectionReason: "Insufficient risk mitigation measures",
        requestedBy: "Procurement Team"
      }
    }
  ];

  // Mock data for regulatory updates
  const updatesData = [
    {
      id: 1,
      title: "GDPR Article 28 Amendment - Data Processing Requirements",
      category: "gdpr",
      impact: "high",
      status: "new",
      effectiveDate: "Mar 1, 2025",
      publishedDate: "Dec 15, 2024",
      priority: "High",
      deadline: "Feb 15, 2025",
      description: `New amendments to GDPR Article 28 introduce stricter requirements for data processing agreements between controllers and processors. Organizations must update their contracts to include enhanced security measures and more detailed data processing instructions.`,
      impactAssessment: {
        contractsAffected: 234,
        estimatedCost: "$45,000",
        timeToImplement: "6 weeks"
      },
      requiredActions: [
        "Review all existing data processing agreements",
        "Update contract templates with new security requirements",
        "Conduct vendor compliance assessments",
        "Implement enhanced monitoring procedures"
      ]
    },
    {
      id: 2,
      title: "SOX Section 404 Internal Controls Enhancement",
      category: "sox",
      impact: "critical",
      status: "pending",
      effectiveDate: "Apr 1, 2025",
      publishedDate: "Dec 10, 2024",
      priority: "Critical",
      deadline: "Mar 1, 2025",
      description: `Updated SOX Section 404 requirements mandate enhanced documentation and testing of internal controls over financial reporting. All financial service contracts must include specific audit trail and control testing provisions.`,
      impactAssessment: {
        contractsAffected: 156,
        estimatedCost: "$78,000",
        timeToImplement: "8 weeks"
      },
      requiredActions: [
        "Enhance internal control documentation requirements",
        "Update financial reporting contract clauses",
        "Implement quarterly control testing procedures",
        "Train finance team on new requirements"
      ]
    },
    {
      id: 3,
      title: "HIPAA Security Rule Update - Cloud Storage Requirements",
      category: "hipaa",
      impact: "medium",
      status: "reviewed",
      effectiveDate: "May 15, 2025",
      publishedDate: "Dec 5, 2024",
      priority: "Medium",
      deadline: "Apr 15, 2025",
      description: `New HIPAA Security Rule updates address cloud storage and transmission of protected health information (PHI). Healthcare contracts must include specific cloud security requirements and encryption standards.`,
      impactAssessment: {
        contractsAffected: 89,
        estimatedCost: "$23,000",
        timeToImplement: "4 weeks"
      },
      requiredActions: [
        "Update cloud service provider agreements",
        "Implement enhanced encryption requirements",
        "Conduct security risk assessments",
        "Update business associate agreements"
      ]
    }
  ];

  // Mock data for reporting
  const reportingData = {
    scheduledReports: [
      {
        id: 1,
        name: "Monthly Compliance Dashboard",
        frequency: "Monthly",
        nextRun: "Feb 1, 2025"
      },
      {
        id: 2,
        name: "Quarterly Audit Readiness Report",
        frequency: "Quarterly",
        nextRun: "Mar 31, 2025"
      },
      {
        id: 3,
        name: "Weekly Risk Assessment Summary",
        frequency: "Weekly",
        nextRun: "Jan 11, 2025"
      }
    ]
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const tabs = [
    { id: 'monitoring', label: 'Compliance Monitoring', icon: 'Monitor' },
    { id: 'audit', label: 'Audit Trail', icon: 'FileSearch' },
    { id: 'updates', label: 'Regulatory Updates', icon: 'Bell' },
    { id: 'reporting', label: 'Reporting', icon: 'BarChart3' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'monitoring':
        return <ComplianceMonitoring monitoringData={monitoringData} />;
      case 'audit':
        return <AuditTrail auditData={auditData} />;
      case 'updates':
        return <RegulatoryUpdates updatesData={updatesData} />;
      case 'reporting':
        return <ComplianceReporting reportingData={reportingData} />;
      default:
        return <ComplianceMonitoring monitoringData={monitoringData} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Compliance Center - ContractFlow Pro</title>
        <meta name="description" content="Comprehensive compliance monitoring with regulatory tracking, audit trails, and automated compliance reporting." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary mb-2">Compliance Center</h1>
                  <p className="text-muted-foreground">
                    Ensure regulatory adherence and audit readiness across all contract activities
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline">
                    <Icon name="Download" size={16} className="mr-2" />
                    Export Report
                  </Button>
                  <Button variant="default">
                    <Icon name="Plus" size={16} className="mr-2" />
                    New Compliance Rule
                  </Button>
                </div>
              </div>

              {/* Compliance Overview */}
              <ComplianceOverview complianceData={complianceData} />
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="flex space-x-8">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-text-primary hover:border-border'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ComplianceCenter;