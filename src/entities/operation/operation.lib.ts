import {
  getRandomDescription,
  getRandomItemFromArray,
  getRandomNumber,
} from 'src/shared/utils/dataGenerationUtils/dataGenerators';
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

import { SelectOptionProps } from 'src/shared/ui/Forms/FormFields/SelectField/SelectField';
import { OperationCategoryOption } from './operation.types';

export const transformCategoriesToOptions = (categories: OperationCategoryOption[]): SelectOptionProps[] =>
  categories.map((category) => ({ text: category.name, value: category.id }));
