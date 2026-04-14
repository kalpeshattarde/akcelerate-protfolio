import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NewsAndSentiment = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const newsData = [
    {
      id: 1,
      title: "Nifty 50 hits fresh all-time high as IT stocks surge on strong Q3 results",
      summary: "Technology stocks led the rally with TCS, Infosys gaining over 5% each following better-than-expected quarterly earnings.",
      source: "Economic Times",
      time: "15 mins ago",
      sentiment: "positive",
      impact: "high",
      relatedStocks: ["TCS", "INFY", "WIPRO"],
      category: "market"
    },
    {
      id: 2,
      title: "RBI maintains repo rate at 6.5%, signals cautious approach on inflation",
      summary: "Central bank keeps key interest rates unchanged while monitoring global economic uncertainties and domestic price pressures.",
      source: "Business Standard",
      time: "1 hour ago",
      sentiment: "neutral",
      impact: "high",
      relatedStocks: ["HDFCBANK", "ICICIBANK", "SBIN"],
      category: "policy"
    },
    {
      id: 3,
      title: "Adani Group stocks rally 8% on debt reduction announcement",
      summary: "Adani Ports leads the surge as group announces accelerated debt repayment plan and improved credit ratings outlook.",
      source: "Mint",
      time: "2 hours ago",
      sentiment: "positive",
      impact: "medium",
      relatedStocks: ["ADANIPORTS", "ADANIENT", "ADANIGREEN"],
      category: "corporate"
    },
    {
      id: 4,
      title: "Metal stocks under pressure as China demand concerns persist",
      summary: "Steel and aluminum companies face headwinds amid slowing Chinese manufacturing activity and global supply chain disruptions.",
      source: "Reuters",
      time: "3 hours ago",
      sentiment: "negative",
      impact: "medium",
      relatedStocks: ["TATASTEEL", "JSWSTEEL", "HINDALCO"],
      category: "sector"
    },
    {
      id: 5,
      title: "Pharma sector outlook positive on export growth and new drug approvals",
      summary: "Leading pharmaceutical companies report strong international sales growth and pipeline of new product launches.",
      source: "Financial Express",
      time: "4 hours ago",
      sentiment: "positive",
      impact: "medium",
      relatedStocks: ["SUNPHARMA", "DRREDDY", "CIPLA"],
      category: "sector"
    }
  ];

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return { icon: 'TrendingUp', color: 'text-success' };
      case 'negative': return { icon: 'TrendingDown', color: 'text-error' };
      default: return { icon: 'Minus', color: 'text-warning' };
    }
  };

  const getImpactBadge = (impact) => {
    switch (impact) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredNews = activeFilter === 'all' 
    ? newsData 
    : newsData?.filter(news => news?.category === activeFilter);

  const categories = [
    { key: 'all', label: 'All News', count: newsData?.length },
    { key: 'market', label: 'Market', count: newsData?.filter(n => n?.category === 'market')?.length },
    { key: 'corporate', label: 'Corporate', count: newsData?.filter(n => n?.category === 'corporate')?.length },
    { key: 'policy', label: 'Policy', count: newsData?.filter(n => n?.category === 'policy')?.length },
    { key: 'sector', label: 'Sector', count: newsData?.filter(n => n?.category === 'sector')?.length }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Market News & Sentiment</h3>
          <p className="text-sm text-muted-foreground">Real-time news with impact analysis</p>
        </div>
        <Button variant="ghost" size="sm" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      {/* Category Filters */}
      <div className="flex items-center space-x-1 mb-4 overflow-x-auto">
        {categories?.map((category) => (
          <button
            key={category?.key}
            onClick={() => setActiveFilter(category?.key)}
            className={`
              flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
              ${activeFilter === category?.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }
            `}
          >
            <span>{category?.label}</span>
            <span className={`
              px-1.5 py-0.5 rounded-full text-xs
              ${activeFilter === category?.key
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-background text-muted-foreground'
              }
            `}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* News List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNews?.map((news) => {
          const sentimentData = getSentimentIcon(news?.sentiment);
          return (
            <div
              key={news?.id}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`p-1 rounded-full ${sentimentData?.color} bg-current/10`}>
                    <Icon name={sentimentData?.icon} size={12} className={sentimentData?.color} />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactBadge(news?.impact)}`}>
                    {news?.impact?.toUpperCase()} IMPACT
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>{news?.time}</span>
                </div>
              </div>
              <h4 className="font-medium text-foreground mb-2 line-clamp-2 leading-snug">
                {news?.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                {news?.summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-muted-foreground">{news?.source}</span>
                  {news?.relatedStocks?.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Tag" size={12} className="text-muted-foreground" />
                      <div className="flex space-x-1">
                        {news?.relatedStocks?.slice(0, 3)?.map((stock) => (
                          <span
                            key={stock}
                            className="px-1.5 py-0.5 bg-muted text-xs font-mono text-foreground rounded"
                          >
                            {stock}
                          </span>
                        ))}
                        {news?.relatedStocks?.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{news?.relatedStocks?.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="BookmarkPlus" className="h-8 w-8" />
                  <Button variant="ghost" size="sm" iconName="Share2" className="h-8 w-8" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Sentiment Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span className="text-sm font-medium text-success">Positive</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              {newsData?.filter(n => n?.sentiment === 'positive')?.length}
            </span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Minus" size={14} className="text-warning" />
              <span className="text-sm font-medium text-warning">Neutral</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              {newsData?.filter(n => n?.sentiment === 'neutral')?.length}
            </span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="TrendingDown" size={14} className="text-error" />
              <span className="text-sm font-medium text-error">Negative</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              {newsData?.filter(n => n?.sentiment === 'negative')?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndSentiment;