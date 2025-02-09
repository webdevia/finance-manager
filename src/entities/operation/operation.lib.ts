import {
  getRandomDescription,
  getRandomItemFromArray,
  getRandomNumber,
} from 'src/shared/data-generation-utils/data-generator';
import { OperationAddInput, OperationType } from './operation.types';
import { nouns } from 'src/shared/data/nouns';
import { adjectives } from 'src/shared/data/adjectives';
import { operations } from 'src/shared/data/operations';

export const createRandomOperation = (operationType: OperationType): OperationAddInput => ({
  name: getRandomItemFromArray(operations),
  date: '2025-01-01',
  desc: getRandomDescription(nouns, adjectives),
  amount: getRandomNumber(1, 10000),
  categoryId: '67a8b036959ec5e015c3d292',
  type: operationType,
});
