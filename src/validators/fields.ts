import { V_FIELDS } from '../names';
import { Error, ErrorCallback, Fields, MetaData, ObjectLike, Validator } from '../types';
import { applyError, isArray, isEmpty, isObject, isString, setMetaValidator, validatorParamsError } from '../utilities';

const fieldsMap = {
  op: <T extends ObjectLike>(value: T, names: Array<Fields | string>): number =>
    names.reduce((result: number, field) =>
      result + Number(isString(field) ? !isEmpty(value[field as string]) : fieldsMap[field[0]](value, field.slice(1))), 0),

  '&': <T extends ObjectLike>(value: T, names: Array<Fields | string>): boolean =>
    fieldsMap.op(value, names) === names.length,

  '|': <T extends ObjectLike>(value: T, names: Array<Fields | string>): boolean =>
    fieldsMap.op(value, names) > 0,

  '^': <T extends ObjectLike>(value: T, names: Array<Fields | string>): boolean =>
    fieldsMap.op(value, names) === 1
};

const isLogicalLexeme = (lexeme: string) => ['&', '|', '^'].indexOf(lexeme) >= 0;

const validateFieldsSpec = (spec: Fields): boolean =>
  (isString(spec) && spec.length > 0 && !isLogicalLexeme(spec as string))
  || (
    isArray(spec)
    && spec.length > 2
    && isLogicalLexeme(spec[0])
    && (spec as Array<Fields>)
      .reduce((result: boolean, field, index) => index === 0 || result && validateFieldsSpec(field), true)
  );

/**
 * Type: validator. Checks for fields in the input object.
 * 
 * @param {Array|string} spec Fields specification.
 * If array, the first element represents a logical operation, otherwise a name of single field.
 * Operations: OR - '|', AND - '&', XOR - '^'. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'spec' is invalid.
 */
export const fields = <T extends ObjectLike>(spec: Fields, error?: Error): Validator<T> =>
  (
    validateFieldsSpec(spec)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            isObject(value)
            && (
              fieldsMap.op(value, [spec]) > 0
            )
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_FIELDS, [spec]))
      )
      : validatorParamsError(V_FIELDS)
  );