import { PROJECT_STAGES } from '@/utils/constants';

/**
 * Get the color associated with a project stage
 * @param stage - The project stage name
 * @returns The color name to use with Tailwind
 */
export function getStageColor(stage: string): string {
  const stageInfo = PROJECT_STAGES.find(s => s.value === stage);
  return stageInfo?.color || 'gray';
}

/**
 * Calculate progress percentage based on project stage
 * @param stage - The project stage name
 * @returns A percentage value from 0-100
 */
export function getProgressPercentage(stage: string): number {
  switch (stage) {
    case 'Idea Stage':
      return 10;
    case 'Building MVP':
      return 40;
    case 'Active Project':
      return 65;
    case 'Looking for Co-founder':
      return 20;
    case 'New Project':
      return 15;
    default:
      return 0;
  }
}

/**
 * Format the team size display
 * @param current - Current team size
 * @param max - Maximum team size
 * @returns Formatted string with percentage
 */
export function formatTeamSize(current: number, max: number): string {
  const percentage = Math.round((current / max) * 100);
  return `${current}/${max} (${percentage}%)`;
}

/**
 * Get team completion status based on team size
 * @param current - Current team size
 * @param max - Maximum team size
 * @returns Status text
 */
export function getTeamStatus(current: number, max: number): string {
  const ratio = current / max;
  
  if (ratio === 1) {
    return 'Complete';
  } else if (ratio >= 0.75) {
    return 'Nearly Complete';
  } else if (ratio >= 0.5) {
    return 'Halfway There';
  } else if (ratio > 0) {
    return 'Just Started';
  } else {
    return 'No Members Yet';
  }
}

/**
 * Check if a project is accepting new members
 * @param teamSize - Current team size
 * @param maxTeamSize - Maximum team size
 * @returns Boolean indicating if project is accepting new members
 */
export function isAcceptingMembers(teamSize: number, maxTeamSize: number): boolean {
  return teamSize < maxTeamSize;
}

/**
 * Truncate project description to specified length
 * @param description - Project description
 * @param maxLength - Maximum length before truncation
 * @returns Truncated description with ellipsis if needed
 */
export function truncateDescription(description: string, maxLength: number = 100): string {
  if (description.length <= maxLength) return description;
  return `${description.substring(0, maxLength).trim()}...`;
}

/**
 * Format date for display
 * @param date - Date string or object
 * @returns Formatted date string
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Calculate time since project creation
 * @param createdAt - Creation date
 * @returns Human-readable time string (e.g., "2 days ago")
 */
export function getTimeSinceCreation(createdAt: string | Date): string {
  const dateObj = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  } else {
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  }
}
