1. Brutal Force 
   - 모든 부분합을 하나씩 다 찾는다.
    
```javascript
// O(n^3)

function solution(A) {
  if(A.length === 1) return A[0];

  const candidates = [];

  for(let i=0; i < A.length; i++) {
      const localCandidates = [];
      for(let j=i; j < A.length; j++) {
          let sum = 0;
          let index = i;

          while(index <= j) {
              sum += A[index];
              index += 1;
          }

          localCandidates.push(sum);
      }
      if(localCandidates.length) candidates.push(Math.max(...localCandidates));
  }

  return Math.max(...candidates);
}
```

2. Kadane’s Algorithm
    - 이전 최대 부분합을 알고있기 때문에, 다음 최대 부분합을 구할 때 하나씩 찾을 필요가 없다.

```javascript
// O(n)

function solution(A) {
  if(A.length === 1) return A[0];

  let localMaximum = A[0];
  let globalMaximum = A[0];

  for(let i=1; i < A.length; i++) {
    localMaximum = Math.max(A[i], A[i] + localMaximum);
    globalMaximum = Math.max(globalMaximum, localMaximum);
  }

  return globalMaximum;
}
```