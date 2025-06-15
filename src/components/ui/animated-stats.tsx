
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  className?: string;
  delay?: number;
}

export function AnimatedStatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = 'blue',
  className,
  delay = 0
}: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600'
  };

  const bgClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30',
    green: 'bg-green-100 dark:bg-green-900/30',
    purple: 'bg-purple-100 dark:bg-purple-900/30',
    orange: 'bg-orange-100 dark:bg-orange-900/30',
    red: 'bg-red-100 dark:bg-red-900/30'
  };

  return (
    <div 
      className={cn(
        "glass-card p-6 hover-lift interactive-card group cursor-pointer",
        "animate-scale-in-center",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
          bgClasses[color],
          "group-hover:scale-110 group-hover:shadow-glow"
        )}>
          <Icon className={cn(
            "w-6 h-6 transition-transform duration-300",
            `text-${color}-600 dark:text-${color}-400`,
            "group-hover:scale-110"
          )} />
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            trend.isPositive 
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          )}>
            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-all duration-300 group-hover:text-gradient">
          {value}
        </p>
      </div>

      <div className={cn(
        "mt-4 h-1 rounded-full bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity duration-300",
        colorClasses[color]
      )} />
    </div>
  );
}

interface StatsGridProps {
  stats: StatCardProps[];
  className?: string;
}

export function AnimatedStatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
      className
    )}>
      {stats.map((stat, index) => (
        <AnimatedStatCard
          key={stat.title}
          {...stat}
          delay={index * 100}
        />
      ))}
    </div>
  );
}
