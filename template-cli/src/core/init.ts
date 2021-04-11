import { getOptions } from './inquirer';
import { load } from './load';
import validate from './validate';

export const init = (name: string, options = {}) => {
  const context = {
    name
  };

  validate(context);

  getOptions(context).then(() => {
    load(context);
  });
};
