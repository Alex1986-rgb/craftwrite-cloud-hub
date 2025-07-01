
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Star, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/hooks/useAnalytics';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  icon?: React.ComponentType<{ className?: string }>;
  details?: string[];
  badge?: string;
}

interface InteractiveTimelineProps {
  items: TimelineItem[];
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export default function InteractiveTimeline({
  items,
  className,
  orientation = 'vertical'
}: InteractiveTimelineProps) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { trackInteraction } = useAnalytics();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-item-id');
            if (itemId) {
              setVisibleItems(prev => new Set([...prev, itemId]));
              trackInteraction('timeline_item', 'view', { itemId });
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    const timelineItems = timelineRef.current?.querySelectorAll('[data-item-id]');
    timelineItems?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [trackInteraction]);

  const getStatusColor = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'current':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'upcoming':
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'current':
        return Clock;
      case 'upcoming':
        return Star;
    }
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId);
    trackInteraction('timeline_item', 'click', { itemId });
  };

  if (orientation === 'horizontal') {
    return (
      <div className={cn("relative overflow-x-auto pb-4", className)} ref={timelineRef}>
        <div className="flex gap-8 min-w-max px-4">
          {items.map((item, index) => {
            const StatusIcon = getStatusIcon(item.status);
            const ItemIcon = item.icon || StatusIcon;
            const isVisible = visibleItems.has(item.id);
            const isActive = activeItem === item.id;

            return (
              <div
                key={item.id}
                data-item-id={item.id}
                className={cn(
                  "relative flex flex-col items-center min-w-[300px] cursor-pointer transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => handleItemClick(item.id)}
              >
                {/* Connection line */}
                {index < items.length - 1 && (
                  <div className="absolute top-8 left-[calc(100%-2rem)] w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 z-0" />
                )}

                {/* Icon */}
                <div className={cn(
                  "relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 mb-4",
                  getStatusColor(item.status),
                  "border-2 shadow-lg",
                  isActive && "scale-110 shadow-xl",
                  item.status === 'current' && "animate-pulse"
                )}>
                  <ItemIcon className="w-8 h-8" />
                  
                  {/* Ripple effect */}
                  {item.status === 'current' && (
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20" />
                  )}
                </div>

                {/* Content Card */}
                <Card className={cn(
                  "w-full transition-all duration-300 hover:shadow-lg",
                  isActive ? "shadow-xl scale-105" : "hover:scale-102"
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      {item.badge && (
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                    <p className="text-gray-700 mb-3">{item.description}</p>

                    {/* Expandable details */}
                    {item.details && (
                      <div className={cn(
                        "transition-all duration-300 overflow-hidden",
                        isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      )}>
                        <div className="pt-2 border-t border-gray-200">
                          {item.details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <ArrowDown className="w-4 h-4 text-blue-600 animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} ref={timelineRef}>
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-purple-300" />

      <div className="space-y-8">
        {items.map((item, index) => {
          const StatusIcon = getStatusIcon(item.status);
          const ItemIcon = item.icon || StatusIcon;
          const isVisible = visibleItems.has(item.id);
          const isActive = activeItem === item.id;

          return (
            <div
              key={item.id}
              data-item-id={item.id}
              className={cn(
                "relative flex items-start gap-6 cursor-pointer transition-all duration-500",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => handleItemClick(item.id)}
            >
              {/* Timeline icon */}
              <div className={cn(
                "relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                getStatusColor(item.status),
                "border-2 shadow-lg flex-shrink-0",
                isActive && "scale-110 shadow-xl",
                item.status === 'current' && "animate-pulse"
              )}>
                <ItemIcon className="w-8 h-8" />
                
                {/* Ripple effect for current item */}
                {item.status === 'current' && (
                  <>
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-30" />
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20 animation-delay-500" />
                  </>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Card className={cn(
                  "transition-all duration-300 hover:shadow-lg",
                  isActive ? "shadow-xl scale-[1.02]" : "hover:scale-[1.01]"
                )}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-blue-600 font-medium">
                          {item.date}
                        </p>
                      </div>
                      
                      {item.badge && (
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Expandable details */}
                    {item.details && (
                      <div className={cn(
                        "transition-all duration-500 overflow-hidden",
                        isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      )}>
                        <div className="pt-4 border-t border-gray-200">
                          <div className="grid gap-2">
                            {item.details.map((detail, i) => (
                              <div 
                                key={i} 
                                className={cn(
                                  "flex items-center gap-3 text-gray-600 transition-all duration-300",
                                  isActive ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                                )}
                                style={{ transitionDelay: `${i * 100}ms` }}
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0" />
                                <span className="text-sm">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
