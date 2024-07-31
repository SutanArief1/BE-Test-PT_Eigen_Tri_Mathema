const str = "NEGIE1"

function reverseLetter(word: string): string {
  let letters = '';
  let numbers = '';

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    
    if (char >= '0' && char <= '9') {
      numbers += char;
    } else {
      letters += char;
    }
  }

  const reversedLetters = letters.split("").reverse().join("");

  const result = reversedLetters + numbers;

  return result;
}

console.log(reverseLetter(str));
