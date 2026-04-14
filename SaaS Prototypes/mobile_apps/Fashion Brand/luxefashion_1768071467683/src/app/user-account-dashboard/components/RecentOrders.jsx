'use client';

import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const RecentOrders = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-success bg-success/10';
      case 'shipped':
        return 'text-accent bg-accent/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'cancelled':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-card-foreground">Recent Orders</h2>
        <Link 
          href="/orders" 
          className="text-accent hover:text-accent/80 font-medium text-sm transition-colors"
        >
          View All Orders
        </Link>
      </div>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div key={order?.id} className="border border-border bg-background">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-foreground">#{order?.orderNumber}</span>
                  <span className={`px-2 py-1 text-xs font-medium uppercase tracking-wide ${getStatusColor(order?.status)}`}>
                    {order?.status}
                  </span>
                </div>
                <button
                  onClick={() => toggleOrderExpansion(order?.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors btn-press"
                  aria-label={`${expandedOrder === order?.id ? 'Collapse' : 'Expand'} order details`}
                >
                  <Icon 
                    name={expandedOrder === order?.id ? "ChevronUpIcon" : "ChevronDownIcon"} 
                    size={20} 
                  />
                </button>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span>Ordered on {order?.date}</span>
                <span className="font-heading font-bold text-foreground">${order?.total}</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                {order?.items?.slice(0, 3)?.map((item, index) => (
                  <div key={index} className="w-12 h-12 bg-muted overflow-hidden">
                    <AppImage
                      src={item?.image}
                      alt={item?.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {order?.items?.length > 3 && (
                  <div className="w-12 h-12 bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                    +{order?.items?.length - 3}
                  </div>
                )}
              </div>

              {expandedOrder === order?.id && (
                <div className="border-t border-border pt-4 mt-4 animate-fade-in">
                  <div className="space-y-3">
                    {order?.items?.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-muted overflow-hidden">
                          <AppImage
                            src={item?.image}
                            alt={item?.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{item?.name}</h4>
                          <p className="text-sm text-muted-foreground">Size: {item?.size} | Qty: {item?.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-heading font-bold text-foreground">${item?.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                    <button className="flex-1 bg-accent text-accent-foreground py-2 px-4 font-heading font-semibold text-sm uppercase tracking-wide hover:bg-accent/90 transition-colors btn-press">
                      Reorder
                    </button>
                    <Link 
                      href={`/orders/${order?.id}`}
                      className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 font-heading font-semibold text-sm uppercase tracking-wide hover:bg-secondary/90 transition-colors text-center btn-press"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

RecentOrders.propTypes = {
  orders: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      orderNumber: PropTypes?.string?.isRequired,
      status: PropTypes?.string?.isRequired,
      date: PropTypes?.string?.isRequired,
      total: PropTypes?.string?.isRequired,
      items: PropTypes?.arrayOf(
        PropTypes?.shape({
          name: PropTypes?.string?.isRequired,
          image: PropTypes?.string?.isRequired,
          alt: PropTypes?.string?.isRequired,
          size: PropTypes?.string?.isRequired,
          quantity: PropTypes?.number?.isRequired,
          price: PropTypes?.string?.isRequired
        })
      )?.isRequired
    })
  )?.isRequired
};

export default RecentOrders;