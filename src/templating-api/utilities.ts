import { MetaData } from '@lib/classic-api/types';
import { callee } from '@lib/classic-api/utilities';
import { CNT, INJ, REF, SQ, VL, VLD } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { containerBase, validatorBase } from '@lib/templating-api/validators-base';
import { referenceBuilder } from '@lib/templating-api/validators/reference';

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

export const extractParam = (meta: CompilerMeta, { code, value, params }: ValidatorData) => (
  (
    code === INJ.code && params && params[0].code === REF.code && ({
      code: REF.code,
      value: params[0].value,
      callee: (refValue: any) => callee(meta.injections[value])(refValue)
    })
  ) || (
    code === INJ.code && (() => callee(meta.injections[value])())
  ) || (
    code === SQ.code && callee(value)
  ) || (
    code === REF.code && { code: REF.code, value: value }
  ) || (
    code === VL.code && callee(extractValue(value))
  ) || (
    code === VLD.code && validatorBase.get(value)
  )
);

export const extractValidator = (meta: CompilerMeta, data: ValidatorData) => {
  const validator = (
    data.code === VLD.code && validatorBase.get(data.value) ||
    data.code === CNT.code && containerBase.get(data.value) ||
    data.code === REF.code && referenceBuilder
  ) || null;

  if (!validator) {
    throw `Unsupported validator name '${data.value}'`;
  }

  return validator(meta, data);
};

export const not = (name: string) => `not:${name}`;