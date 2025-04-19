// Helper functions for project-related data

/**
 * Returns the appropriate color based on project stage
 * @param stage Project stage
 * @returns Color name for styling
 */
export function getStageColor(stage: string): string {
  switch (stage) {
    case 'Idea':
      return 'blue';
    case 'Concept':
      return 'indigo';
    case 'Validation':
      return 'purple';
    case 'Building MVP':
      return 'violet';
    case 'Launch Ready':
      return 'pink';
    case 'Scaling':
      return 'green';
    default:
      return 'primary';
  }
}

/**
 * Returns the progress percentage based on project stage
 * @param stage Project stage
 * @returns Progress percentage (0-100)
 */
export function getProgressPercentage(stage: string): number {
  switch (stage) {
    case 'Idea':
      return 10;
    case 'Concept':
      return 25;
    case 'Validation':
      return 45;
    case 'Building MVP':
      return 65;
    case 'Launch Ready':
      return 85;
    case 'Scaling':
      return 100;
    default:
      return 0;
  }
}

/**
 * Formats the date in a user-friendly way
 * @param date Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  if (!date) return 'Unknown date';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    return 'Invalid date';
  }
}

/**
 * Truncates text to a specified length
 * @param text Text to truncate
 * @param length Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, length: number): string {
  if (!text) return '';
  if (text.length <= length) return text;
  
  return text.slice(0, length) + '...';
}