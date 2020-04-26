import { Error, MetaData, Validator } from '@lib/base-api/types';

export const notNullError = () => 'error';

export const emptyMeta = (): MetaData => ({ _deps: {}, _logs: [], path: [], params: [] });

const _emptyFunction = (): null => null;
export const emptyFunction = () => _emptyFunction;

const _emptyObject = {};
export const emptyObject = () => _emptyObject;

const _emptyArray: Array<any> = [];
export const emptyArray = () => _emptyArray;

export const callee = (value: any): any => (typeof value === 'function' ? value : (() => value));

export const invertError = (name: string, invert: boolean) => invert ? `not:${name}` : name;

export const baseCases = <T = any, R = T>(validator: (...args: any) => Validator<T, R>, params: Array<any>, rightCases: Array<T>, wrongCases: Array<T>, processor?: (value: T) => R) =>
  (
    rightCases.forEach((input, index) => {
      test('r_' + index, () => {
        expect(validator(...params)(input)).toEqual(processor ? processor(input) : input);
      });
    }),
    wrongCases.forEach((input, index) => {
      test('w_' + index, () => {
        expect(validator(...params)(input)).toBeNull();
      });
    })
  );

export const baseCasesWithParams = <T = any, R = T>(validator: (...args: any) => Validator<T, R>, rightCases: Array<[Array<any>, T, T?]>, wrongCases: Array<[Array<any>, T]>, processor?: (value: T) => R) =>
  (
    rightCases.forEach(([params, input, expected], index) => {
      test('r_' + index, () => {
        expect(validator(...params)(input)).toEqual(
          processor
            ? processor(expected !== undefined ? expected : input)
            : (expected !== undefined ? expected : input)
        );
      });
    }),
    wrongCases.forEach(([params, input], index) => {
      test('w_' + index, () => {
        expect(validator(...params)(input)).toEqual(null);
      });
    })
  );

export const withErrorCases = <T = any, R = T>(validator: Validator<T, R>, values: [[T, R?], [T]?], meta?: MetaData, processor?: (value: T) => R) => {
  let error: Error = null;

  const errorSetter = (err: Error, meta: MetaData) => error = (
    typeof err === typeof Function
      ? (err as Function)(meta)
      : err
  ) || null;

  values.forEach(([input, expected], index) => {
    test(String(index), () => {
      expect(validator(input, errorSetter, meta))
        .toEqual(
          (values.length === 1 || index)
            ? null
            : (processor ? processor(input) : (expected !== undefined ? expected : input))
        );

      (values.length === 1 || index) ? expect(error).not.toBe(null) : expect(error).toBe(null);

      error = null;
    });
  });
};

export const metaCase = (meta: MetaData, path: Array<string | number>, params: Array<any>, validator: string) => {
  expect(meta.path).toEqual(path);
  expect(meta.params).toEqual(params);
  expect(meta.validator).toEqual(validator);
};

export const paramsCases = (validator: (...args: any) => Validator<any, any>, rightCases: Array<Array<any>>, wrongCases: Array<Array<any>>, validatorName: string) =>
  (
    rightCases.forEach((params, index) =>
      test('r_' + index, () =>
        expect(() => validator(...params)).not.toThrow(validatorName)
      )
    ),
    wrongCases.forEach((params, index) =>
      test('w_' + index, () =>
        expect(() => validator(...params)).toThrow(validatorName)
      )
    )
  );

export const errorMetaCase = (path: Array<string | number>, params: Array<any>, validator: string) => (
  (meta: MetaData) => (metaCase(meta, path, params, validator), notNullError())
);

export const asyncCases = (validator: Validator<any>, cases: Array<[any, any]>) => (
  cases.forEach(([value, expected], index) => (
    test.concurrent(`r_${index}`, () => (
      expect(validator(value)).resolves.toEqual(expected)
    ))
  ))
);

export const resolve = (value?: any): Promise<any> => Promise.resolve(value);

export const reject = (value?: any): Promise<any> => Promise.reject(value);