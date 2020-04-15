import { getDep } from '@lib/classic-api/spreaders/get-dep';
import { setDep } from '@lib/classic-api/spreaders/set-dep';
import { setVDep } from '@lib/classic-api/spreaders/set-v-dep';
import { MetaData, Validator } from '@lib/classic-api/types';
import { callee, isDefined } from '@lib/classic-api/utilities';
import { CNT, GR, INJ, REF, SQ, VL, VLD } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { containerBase, grouperBase, validatorBase } from '@lib/templating-api/validators-base';

const reservedValues: { [name: string]: any } = {
  'true': true,
  'false': false,
  'null': null,
  'undefined': undefined
};

export const extractInjection = (meta: CompilerMeta, { code, value }: ValidatorData, wrap: Function) => (
  code === INJ.code && (
    wrap((...args: any) => callee(meta.injections[value])(...args))
  )
);

export const extractInnerReference = ({ code, value }: ValidatorData, wrap: Function) => (
  code === REF.code && (
    getDep(value, (refValue: any) =>
      isDefined(refValue) && wrap(() => refValue)
    )
  )
);

export const extractInnerInjectionReference = (meta: CompilerMeta, { code, value, params }: ValidatorData, wrap: Function) => (
  code === INJ.code && params && params[0].code === REF.code && (
    getDep(params[0].value, (refValue: any) =>
      isDefined(refValue) && wrap(() => callee(meta.injections[value])(refValue))
    )
  )
);

export const extractLiteral = ({ code, value }: ValidatorData, wrap: Function) => (
  code === VL.code && (
    wrap(() => (
      reservedValues.hasOwnProperty(value)
        ? reservedValues[value]
        : !isNaN(+value) && +value
    ))
  )
  ||
  code === SQ.code && (
    wrap(() => value)
  )
);

export const extractError = (cmeta: CompilerMeta, error: string | number) => (
  (meta: MetaData) => callee(cmeta.errors[error])(meta)
);

export const extractReference = (meta: CompilerMeta, { code, state, value, params }: ValidatorData): Validator<any> => (
  code === REF.code && (
    state === 1
      ? getDep(value, v => v)
      : params
        ? (
          params[0].code === VLD.code && (
            /* eslint-disable @typescript-eslint/no-use-before-define */
            setVDep(value, ...params.map(data => extractValidator(meta, data)))
          )
          ||
          extractLiteral(params[0], (literal: any) => setDep(value, literal))
        )
        : setDep(value)
  )
);

export const extractValidator = (meta: CompilerMeta, data: ValidatorData) => {
  data.error = extractError(meta, data.error) as any;

  const validator = (
    data.code === VLD.code && (
      validatorBase.get(data.value)
    )
    ||
    data.code === CNT.code && (
      containerBase.get(data.value)
    )
    ||
    data.code === GR.code && (
      grouperBase.get(data.value)
    )
    ||
    extractReference
  );

  if (!validator) {
    throw `Unsupported validator name '${data.value}'`;
  }

  return validator(meta, data);
};