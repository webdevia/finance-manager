export const getRandomItemFromArray = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomDescription = (nouns: string[], adjectives: string[]): string => {
  const someAdjectives = [...Array(10)].map(() => getRandomItemFromArray(adjectives)).join(' ');
  const noun = getRandomItemFromArray(nouns);
  return `${someAdjectives} ${noun}`;
};
