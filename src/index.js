function solution(A) {
  const pos = A.filter(num => num >= 1).sort((a, b) => a - b);
  let x = 1;

  for(let i = 0; i < pos.length; i++) {
    if (x < pos[i]) {
      return x;
    }
    x = pos[i] + 1;
  } 
  return x;
}

console.log(`The solution is ${solution([1, 3, 8, 4, 1, 2])}`);