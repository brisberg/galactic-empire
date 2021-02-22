/**
 * @fileoverview
 * This file contains various type and enum definitions used by many packages.
 */

/**
 * Generic mapping of arbitrary strings to a numerical value
 * Commonly used to return subsets of other enum mappings.
 */
export type StringToNumMapping = {
  [key: string]: number;
};
