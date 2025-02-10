import {
  getRandomDescription,
  getRandomItemFromArray,
  getRandomNumber,
} from 'src/shared/utils/dataGenerationUtils/dataGenerators';
import { OperationAddInput, OperationType, OperationCategoryOption } from '../types/operation.types';
import { nouns } from 'src/shared/data/nouns';
import { adjectives } from 'src/shared/data/adjectives';
import { operations } from 'src/shared/data/operations';

const categories = [
  '67a8b036959ec5e015c3d292',
  '67a8b0a1959ec5e015c3d2e3',
  '67a93073959ec5e015c4bf3a',
  '67a9337d959ec5e015c4c56d',
  '67a9c754959ec5e015c4ee93',
  '67a9c782959ec5e015c4ee99',
  '67a9c81e959ec5e015c4eef6',
  '67a9c877959ec5e015c4ef0c',
  '67a9c8d1959ec5e015c4ef12',
  '67a9c9c5959ec5e015c4ef32',
  '67a9cb30959ec5e015c4f058',
  '67a9cb8a959ec5e015c4f0a9',
  '67a9cc5f959ec5e015c4f170',
];

export const createRandomOperation = (operationType: OperationType): OperationAddInput => ({
  name: getRandomItemFromArray(operations),
  date: '2025-01-01',
  desc: getRandomDescription(nouns, adjectives),
  amount: getRandomNumber(1, 1000),
  categoryId: getRandomItemFromArray(categories),
  type: operationType,
});

import { SelectOptionProps } from 'src/shared/ui/Forms/FormFields/SelectField/SelectField';

export const transformCategoriesToOptions = (categories: OperationCategoryOption[]): SelectOptionProps[] =>
  categories.map((category) => ({ text: category.name, value: category.id }));
