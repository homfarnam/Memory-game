import { IProps } from '../interfaces/types';

export const shuffleImages = (arr: IProps[]) => {
  return arr.sort(() => Math.random() - 0.5);
};
