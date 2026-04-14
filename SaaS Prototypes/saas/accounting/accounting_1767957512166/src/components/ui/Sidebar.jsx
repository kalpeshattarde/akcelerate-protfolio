import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Static navigation items - all always visible, no filtering
  const navigationItems = [
    {
      section: 'overview',
      label: 'Overview',
      items: [
        {
          label: 'Dashboard',
          path: '/dashboard',
          icon: 'LayoutDashboard',
          tooltip: 'Financial overview and insights'
        }
      ]
    },
    {
      section: 'transactions',
      label: 'Transactions',
      items: [
        {
          label: 'Transaction Management',
          path: '/transactions-management',
          icon: 'Receipt',
          tooltip: 'Manage financial transactions'
        },
        {
          label: 'Bank Reconciliation',
          path: '/bank-reconciliation',
          icon: 'Building2',
          tooltip: 'Reconcile bank statements'
        }
      ]
    },
    {
      section: 'reports',
      label: 'Reports & Compliance',
      items: [
        {
          label: 'Financial Reports',
          path: '/financial-reports',
          icon: 'FileText',
          tooltip: 'Generate financial statements'
        },
        {
          label: 'Tax Compliance Center',
          path: '/tax-compliance-center',
          icon: 'Calculator',
          tooltip: 'Tax filing and compliance'
        }
      ]
    },
    {
      section: 'administration',
      label: 'Administration',
      items: [
        {
          label: 'User Management',
          path: '/user-management',
          icon: 'Users',
          tooltip: 'Manage system users'
        },
        {
          label: 'Client Portal',
          path: '/client-portal',
          icon: 'Globe',
          tooltip: 'Client access and communication'
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isItemActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-sidebar"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-header-height left-0 h-[calc(100vh-64px)] bg-primary border-r border-border z-sidebar
        nav-transition lg:translate-x-0
        ${collapsed ? '-translate-x-full lg:w-sidebar-collapsed' : 'translate-x-0 w-sidebar-width'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-primary-700">
            <div className="flex items-center justify-between">
              {!collapsed && (
                <h2 className="font-heading font-semibold text-white">FinanceFlow</h2>
              )}
              <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-primary-700 nav-transition"
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <Icon 
                  name={collapsed ? 'ChevronRight' : 'ChevronLeft'} 
                  size={16} 
                  color="white" 
                />
              </button>
            </div>
            {!collapsed && (
              <p className="text-xs text-primary-200 mt-1">Professional Dashboard</p>
            )}
          </div>

          {/* Navigation Content */}
          <nav className="flex-1 overflow-y-scroll scrollbar-hide py-4" 
               style={{
                 scrollbarWidth: 'none',
                 msOverflowStyle: 'none',
                 WebkitScrollbar: { display: 'none' }
               }}
               onWheel={(e) => {
                 e?.currentTarget?.scrollBy({
                   top: e?.deltaY,
                   behavior: 'auto'
                 });
               }}>
            {navigationItems?.map((section) => (
              <div key={section?.section} className="mb-6">
                {!collapsed && (
                  <h3 className="px-4 mb-2 text-xs font-caption font-medium text-primary-200 uppercase tracking-wider">
                    {section?.label}
                  </h3>
                )}
                
                <ul className="space-y-1 px-2">
                  {section?.items?.map((item) => (
                    <li key={item?.path}>
                      <button
                        onClick={() => handleNavigation(item?.path)}
                        className={`
                          w-full flex items-center px-3 py-3 rounded-lg nav-transition
                          ${isItemActive(item?.path)
                            ? 'bg-white text-primary shadow-card' 
                            : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                          }
                          ${collapsed ? 'justify-center' : 'justify-start space-x-3'}
                        `}
                        title={collapsed ? item?.tooltip : ''}
                        aria-label={item?.label}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={20} 
                          color={isItemActive(item?.path) ? '#283593' : '#E8EAF6'} 
                        />
                        {!collapsed && (
                          <span className="font-nav text-nav font-medium">{item?.label}</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer - Quick Actions */}
          <div className="p-4 border-t border-primary-700">
            {!collapsed ? (
              <div className="bg-primary-800 rounded-lg p-3">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Zap" size={16} color="white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Quick Actions</p>
                    <p className="text-xs text-primary-200">Keyboard shortcuts</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-primary-200">
                  <div className="flex justify-between">
                    <span>New Transaction</span>
                    <kbd className="px-1 py-0.5 bg-primary-700 rounded text-white font-data">Ctrl+N</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Search</span>
                    <kbd className="px-1 py-0.5 bg-primary-700 rounded text-white font-data">Ctrl+K</kbd>
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="w-full p-2 rounded-lg hover:bg-primary-700 nav-transition flex justify-center"
                title="Quick Actions"
                aria-label="Quick Actions"
              >
                <Icon name="Zap" size={20} color="#FF9800" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;