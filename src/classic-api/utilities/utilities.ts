import { Error, ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { identity, isPromise } from '@lib/classic-api/utilities/types';

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

export const applyError = (error: Error, onError: ErrorCallback, meta: MetaData): null => (
  onError && onError(error, meta), null
);

export const throwValidatorError = (validator: string) => {
  throw `Invalid params provided in '${validator}'`;
};

export const passValidators = (value: any, onError: ErrorCallback, meta: MetaData, validators: Array<Validator<any>>): any => {
  for (let i = 0; i < validators.length; i++) {
    if (isPromise(value)) {
      for (; i < validators.length; i++) {
        const validator = validators[i];

        value = value.then((inValue: any) => (
          inValue !== null
            ? validator(inValue, onError, meta)
            : null
        ));
      }

      break;
    }

    value = validators[i](value, onError, meta);

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
    meta && meta._async
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