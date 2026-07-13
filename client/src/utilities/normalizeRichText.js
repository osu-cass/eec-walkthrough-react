// Normalize empty rich text HTML emitted by Quill-like editors.
export function normalizeEmptyRichText(value) {
  if (typeof value !== "string") {
    return value;
  }

  const stripped = value
    .replace(/&nbsp;/gi, "")
    .replace(/<p>/gi, "")
    .replace(/<\/p>/gi, "")
    .replace(/<br\s*\/?>/gi, "")
    .trim();

  return stripped.length ? value : "";
}
