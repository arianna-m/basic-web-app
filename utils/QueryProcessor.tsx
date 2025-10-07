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

  // Handle "longest word" questions: "What is the longest word: word1, word2, word3?" or "Give me the biggest word: word1, word2, word3" or "Give me the longest word: word1, word2, word3" or "Give me the word with the most letters: word1, word2, word3"
  const longestWordPattern = /(?:what\s+is\s+the\s+longest\s+word|give\s+me\s+the\s+(?:biggest|longest)\s+word|give\s+me\s+the\s+word\s+with\s+the\s+most\s+letters):\s*([^?]+)/i;
  const longestWordMatch = query.match(longestWordPattern);
  if (longestWordMatch) {
    const wordsString = longestWordMatch[1];
    const words = wordsString.split(',').map(word => word.trim());
    const longestWord = words.reduce((longest, current) => 
      current.length > longest.length ? current : longest
    );
    return longestWord;
  }

  return "";
}
