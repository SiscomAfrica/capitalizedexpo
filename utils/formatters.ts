/**
 * Utility functions for formatting data
 */

/**
 * Format currency value
 */
export const formatCurrency = (value: number | null, currency: string = 'USD'): string => {
  if (!value && value !== 0) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number | null): string => {
  if (!value && value !== 0) return 'N/A';
  return `${value}%`;
};

/**
 * Format date
 */
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const date = new Date(dateString);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', options || defaultOptions);
};

/**
 * Format date with time
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get relative time (e.g., "2 days ago")
 */
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

/**
 * Format number with commas
 */
export const formatNumber = (value: number | null): string => {
  if (!value && value !== 0) return 'N/A';
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Get risk color based on level
 */
export const getRiskColor = (risk: 'low' | 'medium' | 'high' | null): string => {
  switch (risk) {
    case 'low':
      return '#10B981';
    case 'medium':
      return '#F59E0B';
    case 'high':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};

/**
 * Get status color
 */
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    active: '#10B981',
    closed: '#EF4444',
    draft: '#6B7280',
    archived: '#9CA3AF',
    upcoming: '#3B82F6',
    ongoing: '#8B5CF6',
    past: '#6B7280',
    cancelled: '#EF4444',
  };
  
  return statusColors[status.toLowerCase()] || '#6B7280';
};

