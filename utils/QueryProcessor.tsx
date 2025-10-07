// Helper function to parse numbers (both digits and written numbers)
function parseNumber(input: string): number | null {
  const num = parseInt(input);
  if (!isNaN(num)) {
    return num;
  }
  
  const writtenNumbers: { [key: string]: number } = {
    'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
    'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20
  };
  
  return writtenNumbers[input.toLowerCase()] || null;
}

// Helper function to check if a number is prime
function isPrime(num: number): boolean {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

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
  const additionPattern = /what\s+is\s+(\d+|[a-z]+)\s+plus\s+(\d+|[a-z]+)/i;
  const additionMatch = query.match(additionPattern);
  if (additionMatch) {
    const num1 = parseNumber(additionMatch[1]);
    const num2 = parseNumber(additionMatch[2]);
    if (num1 !== null && num2 !== null) {
      return (num1 + num2).toString();
    }
  }

  // Handle subtraction questions: "What is X minus Y?"
  const subtractionPattern = /what\s+is\s+(\d+|[a-z]+)\s+minus\s+(\d+|[a-z]+)/i;
  const subtractionMatch = query.match(subtractionPattern);
  if (subtractionMatch) {
    const num1 = parseNumber(subtractionMatch[1]);
    const num2 = parseNumber(subtractionMatch[2]);
    if (num1 !== null && num2 !== null) {
      return (num1 - num2).toString();
    }
  }

  // Handle multiplication questions: "What is X times Y?" or "What is X multiplied by Y?"
  const multiplicationPattern = /what\s+is\s+(\d+|[a-z]+)\s+(?:times|multiplied\s+by)\s+(\d+|[a-z]+)/i;
  const multiplicationMatch = query.match(multiplicationPattern);
  if (multiplicationMatch) {
    const num1 = parseNumber(multiplicationMatch[1]);
    const num2 = parseNumber(multiplicationMatch[2]);
    if (num1 !== null && num2 !== null) {
      return (num1 * num2).toString();
    }
  }

  // Handle division questions: "What is X divided by Y?"
  const divisionPattern = /what\s+is\s+(\d+|[a-z]+)\s+divided\s+by\s+(\d+|[a-z]+)/i;
  const divisionMatch = query.match(divisionPattern);
  if (divisionMatch) {
    const num1 = parseNumber(divisionMatch[1]);
    const num2 = parseNumber(divisionMatch[2]);
    if (num1 !== null && num2 !== null) {
      if (num2 === 0) {
        return "Cannot divide by zero";
      }
      return (num1 / num2).toString();
    }
  }

  // Handle exponent questions: "What is X to the power of Y?" or "What is X^Y?"
  const exponentPattern = /what\s+is\s+(\d+|[a-z]+)\s+(?:to\s+the\s+power\s+of|\^)\s+(\d+|[a-z]+)/i;
  const exponentMatch = query.match(exponentPattern);
  if (exponentMatch) {
    const num1 = parseNumber(exponentMatch[1]);
    const num2 = parseNumber(exponentMatch[2]);
    if (num1 !== null && num2 !== null) {
      return Math.pow(num1, num2).toString();
    }
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

  // Handle "smallest number" questions: "Which of the following numbers is the smallest: X, Y, Z?"
  const smallestPattern = /which\s+of\s+the\s+following\s+numbers\s+is\s+the\s+smallest:\s*(\d+),\s*(\d+),\s*(\d+)/i;
  const smallestMatch = query.match(smallestPattern);
  if (smallestMatch) {
    const num1 = parseInt(smallestMatch[1]);
    const num2 = parseInt(smallestMatch[2]);
    const num3 = parseInt(smallestMatch[3]);
    const smallest = Math.min(num1, num2, num3);
    return smallest.toString();
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

  // Handle "shortest word" questions: "What is the shortest word: word1, word2, word3?" or "Give me the shortest word: word1, word2, word3"
  const shortestWordPattern = /(?:what\s+is\s+the\s+shortest\s+word|give\s+me\s+the\s+shortest\s+word):\s*([^?]+)/i;
  const shortestWordMatch = query.match(shortestWordPattern);
  if (shortestWordMatch) {
    const wordsString = shortestWordMatch[1];
    const words = wordsString.split(',').map(word => word.trim());
    const shortestWord = words.reduce((shortest, current) => 
      current.length < shortest.length ? current : shortest
    );
    return shortestWord;
  }

  // Handle square root questions: "What is the square root of X?"
  const squareRootPattern = /what\s+is\s+the\s+square\s+root\s+of\s+(\d+|[a-z]+)/i;
  const squareRootMatch = query.match(squareRootPattern);
  if (squareRootMatch) {
    const num = parseNumber(squareRootMatch[1]);
    if (num !== null && num >= 0) {
      return Math.sqrt(num).toString();
    }
  }

  // Handle percentage questions: "What is X% of Y?"
  const percentagePattern = /what\s+is\s+(\d+)\%\s+of\s+(\d+|[a-z]+)/i;
  const percentageMatch = query.match(percentagePattern);
  if (percentageMatch) {
    const percentage = parseInt(percentageMatch[1]);
    const num = parseNumber(percentageMatch[2]);
    if (num !== null) {
      return ((percentage / 100) * num).toString();
    }
  }

  // Handle average questions: "What is the average of X, Y, Z?"
  const averagePattern = /what\s+is\s+the\s+average\s+of\s*([^?]+)/i;
  const averageMatch = query.match(averagePattern);
  if (averageMatch) {
    const numbersString = averageMatch[1];
    const numbers = numbersString.split(',').map(num => parseNumber(num.trim())).filter((num): num is number => num !== null);
    if (numbers.length > 0) {
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      return (sum / numbers.length).toString();
    }
  }

  // Handle prime number questions: "Which of the following numbers is a prime number: X, Y, Z?" or "Which is a prime number: X, Y, Z?"
  const primePattern = /which\s+(?:of\s+the\s+following\s+numbers\s+)?is\s+(?:a\s+)?prime\s+number:\s*([^?]+)/i;
  const primeMatch = query.match(primePattern);
  if (primeMatch) {
    const numbersString = primeMatch[1];
    const numbers = numbersString.split(',').map(num => parseNumber(num.trim())).filter((num): num is number => num !== null);
    const primes = numbers.filter(num => isPrime(num));
    if (primes.length > 0) {
      return primes[0].toString(); // Return the first prime found
    }
  }

  // Handle biggest prime questions: "Which of the following numbers is the biggest prime number: X, Y, Z?" or "Which is the biggest prime number: X, Y, Z?"
  const biggestPrimePattern = /which\s+(?:of\s+the\s+following\s+numbers\s+)?is\s+the\s+biggest\s+prime\s+number:\s*([^?]+)/i;
  const biggestPrimeMatch = query.match(biggestPrimePattern);
  if (biggestPrimeMatch) {
    const numbersString = biggestPrimeMatch[1];
    const numbers = numbersString.split(',').map(num => parseNumber(num.trim())).filter((num): num is number => num !== null);
    const primes = numbers.filter(num => isPrime(num));
    if (primes.length > 0) {
      return Math.max(...primes).toString();
    }
  }

  // Handle not prime questions: "Which of the following numbers is not a prime number: X, Y, Z?" or "Which one isn't a prime number: X, Y, Z?"
  const notPrimePattern = /which\s+(?:of\s+the\s+following\s+numbers\s+)?(?:one\s+)?(?:is\s+not|isn't)\s+(?:a\s+)?prime\s+number:\s*([^?]+)/i;
  const notPrimeMatch = query.match(notPrimePattern);
  if (notPrimeMatch) {
    const numbersString = notPrimeMatch[1];
    const numbers = numbersString.split(',').map(num => parseNumber(num.trim())).filter((num): num is number => num !== null);
    const nonPrimes = numbers.filter(num => !isPrime(num));
    if (nonPrimes.length > 0) {
      return nonPrimes[0].toString(); // Return the first non-prime found
    }
  }

  return "";
}
