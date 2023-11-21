export const getRandomWord = (): string => {
    const words = [
        'thirdweb', 
        'ethereum', 
        'polygon', 
        'optimism', 
        'base',
        'avalanche',
        'cookies',
    ];
    return words[Math.floor(Math.random() * words.length)];
  };
  
  export const checkGuess = (word: string, guess: string): boolean => {
    return word.includes(guess);
  };
  