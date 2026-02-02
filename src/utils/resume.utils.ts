/**
 * Format a date range for resume display
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
  return `${startDate} - ${endDate}`;
};

/**
 * Clean a URL for display by removing protocol and trailing slash
 */
export const cleanUrlForDisplay = (url: string): string => {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

/**
 * Parse description text into bullet points
 * Handles both HTML and plain text formats
 */
export const parseDescriptionToBulletPoints = (
  description: string,
): string[] => {
  return description
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .split(/\n|<br>|<\/li>/)
    .map((point) => point.trim())
    .filter((point) => point.length > 0);
};
