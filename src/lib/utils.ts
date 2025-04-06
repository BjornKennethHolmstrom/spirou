// src/lib/utils.ts
import { base } from '$app/paths';

/**
 * Helper function to get the correct path for internal links and assets
 * Works in both development and production (GitHub Pages)
 * 
 * @param path The path to prepend with the base path
 * @returns The full path with the base path included
 */
export function getPath(path: string): string {
  // Make sure path starts with a slash for consistency
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Return path with base
  return `${base}${normalizedPath}`;
}

/**
 * Helper function to check if a given path is the current active route
 * 
 * @param currentPath The current path from $page.url.pathname
 * @param routePath The route path to check against
 * @returns true if the route is active
 */
export function isActiveRoute(currentPath: string, routePath: string): boolean {
  // Normalize the route path
  const normalizedRoutePath = routePath.startsWith('/') ? routePath : `/${routePath}`;
  
  // Compare with base path accounted for
  return currentPath === `${base}${normalizedRoutePath}`;
}
