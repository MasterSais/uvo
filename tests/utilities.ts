import { Error, MetaData, Processor } from '@lib/types';

export const notNullError = () => 'error';

export const emptyMeta = (): MetaData => ({ _deps: {}, path: [], params: [] });

const _emptyFunction = (): null => null;
export const emptyFunction = () => _emptyFunction;

const _emptyObject = {};
export const emptyObject = () => _emptyObject;

const _emptyArray: Array<any> = [];
export const emptyArray = () => _emptyArray;

export const baseCases = <T = any, R = T>(validator: Processor<T, R>, rightCases: Array<T>, wrongCases: Array<T>, processor?: (value: T) => R) =>
  (
    rightCases.forEach((input, index) => {
      test('r_' + index, () => {
        expect(validator(input)).toEqual(processor ? processor(input) : input);
      });
    }),
    wrongCases.forEach((input, index) => {
      test('w_' + index, () => {
        expect(validator(input)).toBeNull();
      });
    })
  );

export const baseCasesWithParams = <T = any, R = T>(validator: (...args: any) => Processor<T, R>, rightCases: Array<[Array<any>, T, T?]>, wrongCases: Array<[Array<any>, T]>, processor?: (value: T) => R) =>
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

export const withErrorCases = <T = any, R = T>(validator: Processor<T, R>, values: [[T, R?], [T]?], meta?: MetaData, processor?: (value: T) => R) => {
  let error: Error = null;

  const errorSetter = (err: Error, meta: MetaData) => error = (
    typeof err === typeof Function
      ? (err as Function)(meta)
      : err
  );

  values.forEach(([input, expected], index) => {
    test(String(index), () => {
      expect(validator(input, errorSetter, meta))
        .toEqual(
          (values.length === 1 || index)
            ? null
            : (processor ? processor(input) : expected !== undefined ? expected : input)
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

export const paramsCases = (validator: (...args: any) => Processor<any, any>, rightCases: Array<Array<any>>, wrongCases: Array<Array<any>>, validatorName: string) =>
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

export const errorMetaCase = (path: Array<string | number>, params: Array<any>, validator: string) =>
  (meta: MetaData) => (metaCase(meta, path, params, validator), notNullError());