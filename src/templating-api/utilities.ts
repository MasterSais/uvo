import { Error, ErrorCallback, MetaData } from '@lib/classic-api/types';
import { applyError, callee, extendMeta } from '@lib/classic-api/utilities';
import { CNT, INJ, REF, SQ, VL, VLD } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { containerBase, validatorBase } from '@lib/templating-api/validators-base';
import { setDepBuilder } from '@lib/templating-api/validators/set-dep';

const reservedValues: { [name: string]: any } = {
  'true': true,
  'false': false,
  'null': null,
  'undefined': undefined
};

const extractValue = (value: string) => (
  reservedValues.hasOwnProperty(value)
    ? reservedValues[value]
    : !isNaN(+value) && callee(+value)
);

export const extractError = (cmeta: CompilerMeta, error: string | number) => (
  (meta: MetaData) => callee(cmeta.errors[error])(meta)
);

export const extractParam = (meta: CompilerMeta, p1: ValidatorData) => (
  (
    p1.code === INJ.code && p1.params && p1.params[0].code === REF.code && ({
      code: REF.code,
      value: p1.params[0].value,
      callee: (refValue: any) => callee(meta.injections[p1.value])(refValue)
    })
  ) || (
    p1.code === INJ.code && (() => callee(meta.injections[p1.value])())
  ) || (
    p1.code === SQ.code && callee(p1.value)
  ) || (
    p1.code === REF.code && { code: REF.code, value: p1.value }
  ) || (
    p1.code === VL.code && callee(extractValue(p1.value))
  )
);

export const extractValidator = (meta: CompilerMeta, data: ValidatorData) => {
  const validator = (
    data.code === VLD.code && validatorBase.get(data.value) ||
    data.code === CNT.code && containerBase.get(data.value) ||
    data.code === REF.code && setDepBuilder
  ) || null;

  if (!validator) {
    throw `Unsupported validator name '${data.value}'`;
  }

  return validator(meta, data);
};

export const not = (name: string) => `not:${name}`;

export const c_is = <T>(validator: string, param: () => any, comparator: ((value: T) => boolean), error?: Error) =>
  (
    (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
      (
        extendMeta(meta, value, validator, [param()]),

        comparator(value)
          ? value
          : applyError(error, onError, meta)
      )
  );