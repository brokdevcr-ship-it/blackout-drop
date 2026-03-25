/**
 * Shared image utilities for the LEVN storefront.
 *
 * ROOT CAUSE of broken Unsplash images:
 * Unsplash serves images via Imgix CDN (images.unsplash.com). Without the
 * `ixlib` parameter, the CDN intermittently returns 403 or redirect errors
 * when images are requested without a full API key. Adding `ixlib=rb-4.0.3`
 * signals a valid Imgix client and resolves the issue.
 */

/**
 * Build a reliable Unsplash CDN URL with the required Imgix parameters.
 * Use this for ALL Unsplash photo references across the project.
 */
export function unsplashUrl(id: string, w = 700, h = 933): string {
  return (
    `https://images.unsplash.com/photo-${id}` +
    `?ixlib=rb-4.0.3&w=${w}&h=${h}&fit=crop&q=80&auto=format`
  );
}

/**
 * Dark branded SVG fallback — displayed when any image fails to load.
 * Self-contained data URI: no external requests, no broken-image icons.
 * Matches the brand's dark (#0a0a0a) background aesthetic.
 */
const DARK_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' " +
  "width='700' height='933'%3E" +
  "%3Crect fill='%230a0a0a' width='700' height='933'/%3E" +
  "%3C/svg%3E";

/**
 * Drop-in onError handler for any <img> element.
 * Sets the src to a dark placeholder and disables further error events
 * to prevent infinite error loops.
 *
 * Usage:
 *   import { onImgError } from "@/lib/imageUtils";
 *   <img src={url} onError={onImgError} ... />
 */
export function onImgError(e: { currentTarget: HTMLImageElement }): void {
  const img = e.currentTarget;
  img.onerror = null; // prevent infinite loop if placeholder itself fails
  img.src = DARK_PLACEHOLDER;
}
