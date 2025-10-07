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

  // Handle addition questions: "What is X plus Y?"
  const additionPattern = /what\s+is\s+(\d+)\s+plus\s+(\d+)/i;
  const additionMatch = query.match(additionPattern);
  if (additionMatch) {
    const num1 = parseInt(additionMatch[1]);
    const num2 = parseInt(additionMatch[2]);
    return (num1 + num2).toString();
  }

  // Handle "largest number" questions: "Which of the following numbers is the largest: X, Y, Z?"
  const largestPattern = /which\s+of\s+the\s+following\s+numbers\s+is\s+the\s+largest:\s*(\d+),\s*(\d+),\s*(\d+)/i;
  const largestMatch = query.match(largestPattern);
  if (largestMatch) {
    const num1 = parseInt(largestMatch[1]);
    const num2 = parseInt(largestMatch[2]);
    const num3 = parseInt(largestMatch[3]);
    const largest = Math.max(num1, num2, num3);
    return largest.toString();
  }

  return "";
}
