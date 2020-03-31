import { V_UQ } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isArray, isFunction, setMetaPath, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/unique}
 */
export const unique = <T>(field?: string | number | ((value: T) => any), error?: Error): Validator<Array<T>> => {
  const isMapperFunction = isFunction(field);

  const mapper = (isMapperFunction ? field : (value: T) => (field ? value[field as string] : value)) as Function;

  return (
    (data: Array<T>, onError?: ErrorCallback, meta?: MetaData): Array<T> => {
      const valuesMap = {};

      meta = setMetaValidator(meta, V_UQ, [data]);

      return isArray(data)
        ? (
          data.map((item, index) => {
            const value = mapper(item);

            return valuesMap[value] === undefined
              ? (
                valuesMap[value] = index, item
              )
              : (
                applyError(error, onError, setMetaPath(meta, (field && !isMapperFunction) ? [index, field] : [index])), null
              );
          })
        )
        : applyError(error, onError, meta);
    }
  );
};