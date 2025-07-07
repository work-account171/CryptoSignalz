/**
 * This utility file contains helpers for safely handling browser-only API access 
 * to avoid hydration errors in Next.js applications.
 */

/**
 * Safely determines if code is running on the client-side
 */
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Safely access the window object
 * @returns The window object or undefined if running on the server
 */
export const getWindow = (): Window | undefined => {
  if (isClient) {
    return window;
  }
  return undefined;
};

/**
 * Safely access the document object
 * @returns The document object or undefined if running on the server
 */
export const getDocument = (): Document | undefined => {
  if (isClient) {
    return document;
  }
  return undefined;
};

/**
 * Safely get a DOM element by ID
 * @param id The ID of the element to get
 * @returns The element or null if it doesn't exist or if running on the server
 */
export const getElementById = (id: string): HTMLElement | null => {
  if (!isClient) return null;
  return document.getElementById(id);
};

/**
 * Safely get DOM elements by class name
 * @param className The class name to search for
 * @returns An HTMLCollection of matching elements or empty array if running on the server
 */
export const getElementsByClassName = (className: string): HTMLCollectionOf<Element> | [] => {
  if (!isClient) return [];
  return document.getElementsByClassName(className);
};

/**
 * Safely get DOM elements by tag name
 * @param tagName The tag name to search for
 * @returns An HTMLCollection of matching elements or empty array if running on the server
 */
export const getElementsByTagName = (tagName: string): HTMLCollectionOf<Element> | [] => {
  if (!isClient) return [];
  return document.getElementsByTagName(tagName);
};

/**
 * Safely get DOM elements by query selector
 * @param selector The CSS selector to search for
 * @returns A matching element or null if it doesn't exist or if running on the server
 */
export const querySelector = <T extends Element = Element>(selector: string): T | null => {
  if (!isClient) return null;
  return document.querySelector<T>(selector);
};

/**
 * Safely get DOM elements by query selector all
 * @param selector The CSS selector to search for
 * @returns A NodeList of matching elements or empty array if running on the server
 */
export const querySelectorAll = (selector: string): NodeListOf<Element> | [] => {
  if (!isClient) return [];
  return document.querySelectorAll(selector);
};

/**
 * Safely scroll to the top of the page
 * @param options ScrollToOptions object for smooth scrolling
 */
export const scrollToTop = (options?: ScrollToOptions): void => {
  if (!isClient) return;
  window.scrollTo({ top: 0, behavior: 'smooth', ...options });
};

/**
 * Safely scroll to a specific element
 * @param elementId The ID of the element to scroll to
 * @param offset Additional offset in pixels
 * @param behavior The scroll behavior ('auto' or 'smooth')
 */
export const scrollToElement = (
  elementId: string, 
  offset = 0, 
  behavior: ScrollBehavior = 'smooth'
): void => {
  if (!isClient) return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const targetPosition = scrollTop + rect.top + offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior,
  });
};

/**
 * Safely add an event listener to the window
 * @param event The event to listen for
 * @param handler The event handler function
 * @param options Optional event listener options
 * @returns A function to remove the event listener
 */
export const addWindowEventListener = (
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): (() => void) => {
  if (!isClient) return () => {};
  
  window.addEventListener(event, handler, options);
  return () => window.removeEventListener(event, handler, options);
};

/**
 * Safely check if an element is in the viewport
 * @param element The element to check
 * @param offset Optional offset to consider element in view before it's fully visible
 * @returns Boolean indicating if the element is in the viewport
 */
export const isInViewport = (element: Element, offset = 0): boolean => {
  if (!isClient) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.bottom >= 0 - offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset &&
    rect.right >= 0 - offset
  );
};