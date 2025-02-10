import { BalanceItem, OperationType } from '../types/balance.types';

export const calcBalance = (balanceItems: BalanceItem[]) =>
  balanceItems.reduce(
    (acc, current) => acc + (current.type === OperationType.Cost ? current.amount * -1 : current.amount),
    0
  );
