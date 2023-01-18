function getRandomNumber(min: number, max: number) {
  return min + Math.random() * max;
}

function setRandomTimeout(
  resolve: (value: unknown) => void,
  min: number,
  max: number
) {
  setTimeout(resolve, getRandomNumber(min, max));
}

export async function simulateRandomDelay(min: number, max: number) {
  await new Promise((resolve) =>
    // simulate some random delay
    setRandomTimeout(resolve, min, max)
  );
}
