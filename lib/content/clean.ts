export type Clean<T> = Omit<T, "_raw" | "type">;

/**
 * Recursively strip `_raw` and `type` from every object/array.
 */
export function removeInternals<T>(obj: T): Clean<T> {
  if (Array.isArray(obj)) {
    // Map each element through removeInternals, then cast via unknown
    return obj.map(item => removeInternals(item)) as unknown as Clean<T>;
  } else if (obj !== null && typeof obj === "object") {
    // Build a plain object, strip internal keys, then cast via unknown
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (key === "_raw" || key === "type") continue;
      result[key] = removeInternals(value as unknown);
    }

    return result as unknown as Clean<T>;
  }

  // Primitives can be returned directly
  return obj as unknown as Clean<T>;
}
