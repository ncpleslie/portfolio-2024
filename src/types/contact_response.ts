/**
 * A response returned when submitting a contact request.
 */
export type ContactResponse = {
  /**
   * The returned message.
   * Could contact an error or success message.
   */
  message: string;

  /**
   * A string array containing issues.
   */
  issues?: string[];
};
