import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

import Breadcrumb from 'components/ui/Breadcrumb';
import SearchFilters from './components/SearchFilters';
import JobCard from './components/JobCard';
import AdvancedSearchModal from './components/AdvancedSearchModal';
import JobPreviewPanel from './components/JobPreviewPanel';

const JobSearchBrowse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    employmentType: [],
    salaryRange: '',
    companySize: '',
    postingDate: '',
    experienceLevel: '',
    remoteWork: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set(['1', '3', '7']));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentSearches] = useState(['React Developer', 'Product Manager', 'UX Designer']);
  const [searchSuggestions] = useState(['Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 'DevOps Engineer']);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const searchInputRef = useRef(null);
  const observerRef = useRef(null);

  // Mock job data
  const mockJobs = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp Solutions',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center',
      location: 'San Francisco, CA',
      employmentType: 'Full-time',
      salaryRange: '$120,000 - $160,000',
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      description: `We're looking for a Senior React Developer to join our dynamic team. You'll be responsible for building scalable web applications using modern React patterns and best practices.

Key responsibilities include developing user interfaces, optimizing application performance, and collaborating with cross-functional teams to deliver high-quality software solutions.`,
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Redux/Context API', 'Testing frameworks'],
      companySize: '100-500',
      experienceLevel: 'Senior',
      remoteWork: true,
      featured: true
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'InnovateLabs',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center',
      location: 'New York, NY',
      employmentType: 'Full-time',
      salaryRange: '$130,000 - $170,000',
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      description: `Join our product team as a Product Manager where you'll drive product strategy and execution for our flagship SaaS platform.

You'll work closely with engineering, design, and marketing teams to define product roadmaps, gather user feedback, and ensure successful product launches.`,
      requirements: ['3+ years product management', 'Agile methodologies', 'Data analysis skills', 'User research experience'],
      companySize: '50-100',
      experienceLevel: 'Mid-level',
      remoteWork: false,
      featured: false
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      company: 'DesignStudio Pro',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center',
      location: 'Austin, TX',
      employmentType: 'Contract',
      salaryRange: '$80,000 - $110,000',
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      description: `We're seeking a talented UX/UI Designer to create intuitive and engaging user experiences for our digital products.

You'll be responsible for conducting user research, creating wireframes and prototypes, and collaborating with development teams to implement designs.`,
      requirements: ['4+ years UX/UI design', 'Figma/Sketch proficiency', 'User research skills', 'Prototyping experience'],
      companySize: '10-50',
      experienceLevel: 'Mid-level',
      remoteWork: true,
      featured: false
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudTech Systems',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=64&h=64&fit=crop&crop=center',
      location: 'Seattle, WA',
      employmentType: 'Full-time',
      salaryRange: '$140,000 - $180,000',
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      description: `Join our infrastructure team as a DevOps Engineer to help scale our cloud-native applications and improve deployment processes.

You'll work with containerization, CI/CD pipelines, and cloud platforms to ensure reliable and efficient software delivery.`,
      requirements: ['AWS/Azure experience', 'Docker/Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code'],
      companySize: '200-500',experienceLevel: 'Senior',
      remoteWork: true,
      featured: true
    },
    {
      id: '5',title: 'Data Scientist',company: 'Analytics Plus',logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop&crop=center',location: 'Boston, MA',employmentType: 'Full-time',salaryRange: '$110,000 - $150,000',postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),description: `We're looking for a Data Scientist to join our analytics team and help drive data-driven decision making across the organization.

You'll work with large datasets, build predictive models, and create insights that directly impact business strategy and product development.`,
      requirements: ['Python/R proficiency', 'Machine learning', 'SQL expertise', 'Statistical analysis'],
      companySize: '100-200',experienceLevel: 'Mid-level',
      remoteWork: false,
      featured: false
    },
    {
      id: '6',title: 'Frontend Developer',company: 'WebCraft Agency',logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=center',location: 'Los Angeles, CA',employmentType: 'Part-time',salaryRange: '$60,000 - $80,000',
      postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      description: `Join our creative team as a Frontend Developer to build beautiful and responsive web applications for our diverse client base.

You'll work with modern JavaScript frameworks and collaborate with designers to bring creative visions to life.`,
      requirements: ['3+ years frontend development', 'React/Vue.js', 'CSS/SASS', 'Responsive design'],
      companySize: '10-50',
      experienceLevel: 'Mid-level',
      remoteWork: true,
      featured: false
    },
    {
      id: '7',
      title: 'Backend Engineer',
      company: 'ServerTech Solutions',
      logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=64&h=64&fit=crop&crop=center',
      location: 'Chicago, IL',
      employmentType: 'Full-time',
      salaryRange: '$125,000 - $165,000',
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      description: `We're seeking a Backend Engineer to design and implement scalable server-side applications and APIs.You'll work with microservices architecture, databases, and cloud platforms to build robust backend systems that power our applications.`,
      requirements: ['Node.js/Python/Java', 'Database design', 'API development', 'Microservices'],
      companySize: '50-100',
      experienceLevel: 'Senior',
      remoteWork: true,
      featured: false
    },
    {
      id: '8',
      title: 'Marketing Manager',
      company: 'GrowthCo',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=center',
      location: 'Miami, FL',
      employmentType: 'Full-time',
      salaryRange: '$90,000 - $120,000',
      postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      description: `Join our marketing team as a Marketing Manager to develop and execute comprehensive marketing strategies that drive growth and brand awareness.

You'll manage campaigns across multiple channels, analyze performance metrics, and collaborate with cross-functional teams to achieve business objectives.`,
      requirements: ['5+ years marketing experience', 'Digital marketing', 'Analytics tools', 'Campaign management'],
      companySize: '100-200',experienceLevel: 'Senior',
      remoteWork: false,
      featured: false
    }
  ];

  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [displayedJobs, setDisplayedJobs] = useState(mockJobs.slice(0, 6));

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = mockJobs;

    // Search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Location filter
    if (selectedFilters.location.length > 0) {
      filtered = filtered.filter(job =>
        selectedFilters.location.some(loc => job.location.includes(loc))
      );
    }

    // Employment type filter
    if (selectedFilters.employmentType.length > 0) {
      filtered = filtered.filter(job =>
        selectedFilters.employmentType.includes(job.employmentType)
      );
    }

    // Experience level filter
    if (selectedFilters.experienceLevel) {
      filtered = filtered.filter(job =>
        job.experienceLevel === selectedFilters.experienceLevel
      );
    }

    // Remote work filter
    if (selectedFilters.remoteWork) {
      filtered = filtered.filter(job => job.remoteWork);
    }

    // Posting date filter
    if (selectedFilters.postingDate) {
      const now = new Date();
      const daysAgo = {
        '24h': 1,
        '3d': 3,
        '7d': 7,
        '30d': 30
      }[selectedFilters.postingDate];

      if (daysAgo) {
        const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(job => job.postedDate >= cutoffDate);
      }
    }

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.postedDate - a.postedDate;
        case 'salary':
          const aSalary = parseInt(a.salaryRange.replace(/[^0-9]/g, ''));
          const bSalary = parseInt(b.salaryRange.replace(/[^0-9]/g, ''));
          return bSalary - aSalary;
        case 'relevance':
        default:
          // Featured jobs first, then by date
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.postedDate - a.postedDate;
      }
    });

    setFilteredJobs(filtered);
    setDisplayedJobs(filtered.slice(0, 6));
    setCurrentPage(1);
  }, [searchQuery, selectedFilters, sortBy]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreJobs();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  const loadMoreJobs = () => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * 6;
      const endIndex = startIndex + 6;
      const newJobs = filteredJobs.slice(startIndex, endIndex);

      if (newJobs.length > 0) {
        setDisplayedJobs(prev => [...prev, ...newJobs]);
        setCurrentPage(nextPage);
      }

      if (endIndex >= filteredJobs.length) {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedFilters.location.length > 0) count++;
    if (selectedFilters.employmentType.length > 0) count++;
    if (selectedFilters.salaryRange) count++;
    if (selectedFilters.companySize) count++;
    if (selectedFilters.postingDate) count++;
    if (selectedFilters.experienceLevel) count++;
    if (selectedFilters.remoteWork) count++;
    return count;
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      location: [],
      employmentType: [],
      salaryRange: '',
      companySize: '',
      postingDate: '',
      experienceLevel: '',
      remoteWork: false
    });
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb />
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Find Your Next Opportunity</h1>
          <p className="text-text-secondary">Discover jobs from top companies in your field</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="Search" size={20} color="#64748B" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search jobs, companies, or skills..."
                className="w-full pl-12 pr-12 py-4 text-lg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth bg-background shadow-soft"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <Icon name="X" size={20} color="#64748B" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-modal z-50">
                {searchQuery && (
                  <div className="p-4 border-b border-border-light">
                    <h4 className="text-sm font-medium text-text-secondary mb-2">Search for "{searchQuery}"</h4>
                    <button
                      onClick={() => {
                        setShowSuggestions(false);
                        searchInputRef.current?.blur();
                      }}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Press Enter to search
                    </button>
                  </div>
                )}
                
                {searchSuggestions.filter(suggestion => 
                  suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                ).length > 0 && (
                  <div className="p-4 border-b border-border-light">
                    <h4 className="text-sm font-medium text-text-secondary mb-2">Suggestions</h4>
                    <div className="space-y-1">
                      {searchSuggestions
                        .filter(suggestion => suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(0, 3)
                        .map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchQuery(suggestion);
                              setShowSuggestions(false);
                            }}
                            className="block w-full text-left px-2 py-1 text-sm text-text-primary hover:bg-surface rounded transition-smooth"
                          >
                            {suggestion}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {recentSearches.length > 0 && (
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-text-secondary mb-2">Recent Searches</h4>
                    <div className="space-y-1">
                      {recentSearches.slice(0, 3).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(search);
                            setShowSuggestions(false);
                          }}
                          className="flex items-center space-x-2 w-full text-left px-2 py-1 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded transition-smooth"
                        >
                          <Icon name="Clock" size={14} />
                          <span>{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg shadow-soft"
          >
            <Icon name="Filter" size={20} />
            <span>Filters</span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <SearchFilters
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
              activeFiltersCount={getActiveFiltersCount()}
            />
          </div>

          {/* Mobile Filters Panel */}
          {isMobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="absolute right-0 top-0 h-full w-80 bg-background overflow-y-auto">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 hover:bg-surface rounded-lg transition-smooth"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
                <div className="p-4">
                  <SearchFilters
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onClearAll={clearAllFilters}
                    activeFiltersCount={getActiveFiltersCount()}
                    onClose={() => setIsMobileFiltersOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <p className="text-text-secondary">
                  <span className="font-medium text-text-primary">{filteredJobs.length}</span> jobs found
                </p>
                
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsAdvancedSearchOpen(true)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-surface transition-smooth"
                >
                  <Icon name="Settings" size={16} />
                  <span>Advanced</span>
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="date">Most Recent</option>
                  <option value="salary">Highest Salary</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.location.map((location) => (
                    <span
                      key={location}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                    >
                      <span>{location}</span>
                      <button
                        onClick={() => handleFilterChange('location', selectedFilters.location.filter(l => l !== location))}
                        className="hover:bg-primary-100 rounded-full p-0.5"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}
                  
                  {selectedFilters.employmentType.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                    >
                      <span>{type}</span>
                      <button
                        onClick={() => handleFilterChange('employmentType', selectedFilters.employmentType.filter(t => t !== type))}
                        className="hover:bg-primary-100 rounded-full p-0.5"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}

                  {selectedFilters.remoteWork && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                      <span>Remote Work</span>
                      <button
                        onClick={() => handleFilterChange('remoteWork', false)}
                        className="hover:bg-primary-100 rounded-full p-0.5"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Job Listings */}
            <div className="space-y-4">
              {displayedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={savedJobs.has(job.id)}
                  onSave={() => handleSaveJob(job.id)}
                  onSelect={() => setSelectedJobId(job.id)}
                  isSelected={selectedJobId === job.id}
                  formatTimeAgo={formatTimeAgo}
                />
              ))}

              {/* Loading Skeleton */}
              {isLoading && (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-background border border-border rounded-lg p-6 animate-pulse">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary-200 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                          <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
                          <div className="h-3 bg-secondary-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More Trigger */}
              {hasMore && !isLoading && (
                <div ref={observerRef} className="h-10 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* No More Results */}
              {!hasMore && displayedJobs.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-text-secondary">You've reached the end of the results</p>
                </div>
              )}

              {/* No Results */}
              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} color="#64748B" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No jobs found</h3>
                  <p className="text-text-secondary mb-4">Try adjusting your search criteria or filters</p>
                  <button
                    onClick={clearAllFilters}
                    className="btn-primary"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Job Preview Panel - Desktop */}
          {selectedJobId && (
            <div className="hidden xl:block w-96 flex-shrink-0">
              <JobPreviewPanel
                job={filteredJobs.find(j => j.id === selectedJobId)}
                onClose={() => setSelectedJobId(null)}
                isSaved={savedJobs.has(selectedJobId)}
                onSave={() => handleSaveJob(selectedJobId)}
                formatTimeAgo={formatTimeAgo}
              />
            </div>
          )}
        </div>

        {/* Floating Action Button - Mobile */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          <div className="flex flex-col space-y-3">
            <Link
              to="/job-seeker-dashboard"
              className="w-14 h-14 bg-secondary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-secondary-700 transition-smooth"
            >
              <Icon name="Bookmark" size={24} />
            </Link>
            <button
              onClick={() => setIsAdvancedSearchOpen(true)}
              className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-smooth"
            >
              <Icon name="Bell" size={24} />
            </button>
          </div>
        </div>

        {/* Advanced Search Modal */}
        <AdvancedSearchModal
          isOpen={isAdvancedSearchOpen}
          onClose={() => setIsAdvancedSearchOpen(false)}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default JobSearchBrowse;