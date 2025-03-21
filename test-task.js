function serialize(numbers) {
  if (!numbers.length) return "";
  
  numbers = [...new Set(numbers)].sort((a, b) => a - b); // Убираем дубликаты и сортируем
  let result = [];
  let start = numbers[0], prev = numbers[0];

  for (let i = 1; i <= numbers.length; i++) {
      if (numbers[i] === prev + 1) {
          prev = numbers[i];
      } else {
          result.push(start === prev ? `${start}` : `${start}-${prev}`);
          start = numbers[i];
          prev = numbers[i];
      }
  }

  return result.join(",");
}

function deserialize(str) {
  if (!str) return [];
  
  return str.split(",").flatMap(part => {
      if (part.includes("-")) {
          let [start, end] = part.split("-").map(Number);
          return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      }
      return [Number(part)];
  });
}

// Тесты
const testCases = [
  [1, 2, 3, 4, 5, 10, 11, 12, 100, 101, 102, 200, 300],
  [1, 3, 5, 7, 9, 11],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [100, 101, 102, 103, 104, 105],
  [1, 100, 200, 300],
];

testCases.forEach(tc => {
  let compressed = serialize(tc);
  let decompressed = deserialize(compressed);
  console.log(`Original: ${tc}`);
  console.log(`Compressed: "${compressed}"`);
  console.log(`Decompressed: ${decompressed}`);
  console.log(`Compression ratio: ${(tc.join(",").length / compressed.length).toFixed(2)}`);
  console.log("====================================");
});