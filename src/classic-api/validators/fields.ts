import { V_FIELDS } from '@lib/classic-api/names';
import { Error, ErrorCallback, FieldsSpec, MetaData, ObjectLike, Validator } from '@lib/classic-api/types';
import { applyError, extendMeta, isArray, isEmpty, isObject, isString, throwValidatorError } from '@lib/classic-api/utilities';

const fieldsMap = {
  op: <T extends ObjectLike>(value: T, names: Array<FieldsSpec | string>): number =>
    names.reduce((result: number, field) =>
      result + Number(isString(field) ? !isEmpty(value[field as string]) : fieldsMap[field[0]](value, field.slice(1))), 0),

  '&': <T extends ObjectLike>(value: T, names: Array<FieldsSpec | string>): boolean =>
    fieldsMap.op(value, names) === names.length,

  '|': <T extends ObjectLike>(value: T, names: Array<FieldsSpec | string>): boolean =>
    fieldsMap.op(value, names) > 0,

  '^': <T extends ObjectLike>(value: T, names: Array<FieldsSpec | string>): boolean =>
    fieldsMap.op(value, names) === 1
};

const isLogicalLexeme = (lexeme: string) => ['&', '|', '^'].indexOf(lexeme) >= 0;

const validateFieldsSpec = (spec: FieldsSpec): boolean =>
  (isString(spec) && spec.length > 0 && !isLogicalLexeme(spec as string))
  || (
    isArray(spec)
    && spec.length > 2
    && isLogicalLexeme(spec[0])
    && (spec as Array<FieldsSpec>)
      .reduce((result: boolean, field, index) => index === 0 || result && validateFieldsSpec(field), true)
  );

/**
 * {@link docs/classic-api/validators/fields}
 */
export const fields = <T extends ObjectLike>(spec: FieldsSpec, error?: Error): Validator<T> =>
  (
    validateFieldsSpec(spec)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            extendMeta(meta, value, V_FIELDS, [spec]),

            isObject(value) && fieldsMap.op(value, [spec]) > 0
              ? value
              : applyError(error, onError, meta)
          )
      )
      : throwValidatorError(V_FIELDS)
  );