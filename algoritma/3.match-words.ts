const input = ['xc', 'dz', 'bbb', 'dz']
const query = ['bbb', 'ac', 'dz']

function matchWords(input: string[], query: string[]): number[] {
  const test = query.map(char => 
    input.reduce((count, word) => word === char ? count + 1 : count, 0)
  )
  
  return query.map(char =>     
    input.reduce((count, word) => word === char ? count + 1 : count, 0)
  );
}

console.log(matchWords(input, query));
