const sentence = "Saya sangat senang mengerjakan soal algoritma"

function findLongestWord(sentence: string): string {
  const words = sentence.split(" ");
  let longestWord = "";

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }

  return `${longestWord}: ${longestWord.length} character`;
}

console.log(findLongestWord(sentence))