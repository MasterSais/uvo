import { V_UQ } from '@lib/classic-api/names';
import { Error, ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { applyError, extendMeta, isArray, isDefined, isFunction, setMetaPath } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/validators/unique}
 */
export const unique = <T>(field?: string | number | ((value: T) => any), error?: Error): Validator<Array<T>> => {
  const isMapperFunction = isFunction(field);

  const mapper = (isMapperFunction ? field : (value: T) => (field ? value[field as string] : value)) as Function;

  return (
    (data: Array<T>, onError?: ErrorCallback, meta?: MetaData): Array<T> => {
      const valuesMap = {};

      extendMeta(meta, data, V_UQ, [data]);

      return (
        isArray(data)
      )
        ? (
          data.map((item, index) => {
            const value = mapper(item);

            return !isDefined(valuesMap[value])
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