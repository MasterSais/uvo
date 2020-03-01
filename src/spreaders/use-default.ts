import { ErrorCallback, MetaData, Processor, Validator } from '../types';
import { isFunction, isEmpty } from '../utilities';

export const useDefault = <T extends unknown>(defaultValue: T, ...validators: Array<Processor<any, any>>): Processor<any, any> =>
  (value: any, onError?: ErrorCallback, meta?: MetaData): any =>
    !isEmpty(value)
      ? validators.reduce((value: any, nextValidator: Validator<T>) =>
        (value !== null ? nextValidator(value, onError, meta) : null), value)
      : (
        isFunction(defaultValue)
          ? (defaultValue as Function)(meta)
          : defaultValue
      );