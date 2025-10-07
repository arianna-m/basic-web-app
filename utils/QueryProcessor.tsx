export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "marym2";
  }

  // Match "andrew id", "andrew ID", "Andrew ID", "andrewID", or "andrewid"
  const andrewIdPattern = /\bandrew\s*id\b/i;
  if (andrewIdPattern.test(query)) {
    return "marym2";
  }

  return "";
}
