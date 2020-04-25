import { Async, Error, ErrorCallback, MetaData, Relevance, Validator } from '@lib/base-api/types';
import { identity, isPromise } from '@lib/base-api/utilities/types';

export const setMetaPath = (meta: MetaData, path: string | number | Array<any>): MetaData => (meta && {
  ...meta,
  path: meta.path.concat(path)
});

export const extendMeta = (meta: MetaData, value: any, validator: string, params: Array<any> = []): MetaData => (meta && (
  meta.validator = validator,
  meta.params = params,
  meta._logs.push([validator, value, params])
), meta);

export const postToMeta = <T>(value: T, field: string | number, meta: MetaData): T => (
  meta
    ? (meta._deps[field] = value)
    : value
);

export const getFromMeta = <T>(field: string, meta: MetaData): T => (
  meta ? meta._deps[field] : null
);

export const postAsyncToMeta = <T>(value: Promise<T>, field: string | number, meta: MetaData): Promise<T> => (
  meta
    ? (meta._asyncStack[field] = value)
    : value
);

export const getAsyncFromMeta = <T>(field: string, meta: MetaData): Promise<T> => (
  meta ? meta._asyncStack[field] : null
);

export const applyError = (error: Error, onError: ErrorCallback, meta: MetaData): null => (
  onError && onError(error, meta), null
);

export const throwValidatorError = (validator: string) => {
  throw `Invalid params provided in '${validator}'`;
};

export const passValidators = (value: any, onError: ErrorCallback, meta: MetaData, validators: Array<Validator<any>>): any => {
  for (let i = 0; i < validators.length;) {
    if (isPromise(value)) {
      let hasError = false;

      const onSeqError = (error: Error, meta?: MetaData, relevance?: Relevance) => (
        hasError = true,
        onError && onError(error, meta, relevance)
      );

      for (; i < validators.length; i++) {
        const validator = validators[i] as Async<Validator<any>>;

        value = (
          validator.async
            ? validator(value, onSeqError, meta)
            : value.then((inValue: any) =>
              (
                !(hasError = hasError && inValue === null)
                  ? validator(inValue, onSeqError, meta)
                  : null
              )
            )
        );
      }

      break;
    }

    value = validators[i++](value, onError, meta);

    if (value === null) break;
  }

  return value;
};

export const onAsync = (value: any, callee: (value: any, error?: any) => void) => (
  isPromise(value)
    ? value.then(callee).catch((error: any) => callee(null, error))
    : callee(value)
);

export const asyncActor = (meta: MetaData): [(value: any, callee: (value: any) => void) => void, (value: any) => any] => {
  const actions: Array<any> = [];

  return (
    meta && meta._asyncStack
      ? [
        (value: any, callee: (value: any, error?: any) => void) => (
          isPromise(value)
            ? actions.push(value.then(callee).catch((error: any) => callee(null, error)))
            : callee(value)
        ),
        (value: any) => (
          actions.length > 0
            ? Promise.all(actions).then(() => value)
            : value
        )
      ]
      : [
        (value: any, callee: (value: any) => void) => callee(value),
        identity
      ]
  );
};