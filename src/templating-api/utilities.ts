import { getDep } from '@lib/base-api/spreaders/get-dep';
import { setDep } from '@lib/base-api/spreaders/set-dep';
import { setVDep } from '@lib/base-api/spreaders/set-v-dep';
import { MetaData, Validator } from '@lib/base-api/types';
import { callee, identity, isDefined } from '@lib/base-api/utilities/types';
import { CNT, GR, INJ, REF, SQ, VL, VLD } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { containerBase, grouperBase, validatorBase } from '@lib/templating-api/validators-base';

const reservedValues: { [name: string]: any } = {
  'true': true,
  'false': false,
  'null': null
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
    reservedValues.hasOwnProperty(value)
      ? wrap(() => reservedValues[value])
      : !isNaN(+value) && wrap(() => +value)
  )
  ||
  code === SQ.code && (
    wrap(() => value)
  )
);

export const extractError = (cmeta: CompilerMeta, error: string | number) => (
  isDefined(error) ? (meta: MetaData) => callee(cmeta.errors[error])(meta) : error
);

export const extractReference = (meta: CompilerMeta, { code, state, value, params }: ValidatorData): Validator<any> => (
  code === REF.code && (
    state === 1
      ? getDep(value, identity)
      : params
        ? (
          params[0].code === VLD.code && (
            /* eslint-disable @typescript-eslint/no-use-before-define */
            setVDep(value, ...params.map(data => extractSequence(meta, data)))
          )
          ||
          extractLiteral(params[0], (literal: any) => setDep(value, literal))
        )
        : setDep(value)
  )
);

export const extractValidator = (meta: CompilerMeta, data: ValidatorData) => {
  const base = (
    data.code === CNT.code && containerBase
    ||
    data.code === VLD.code && validatorBase
    ||
    data.code === GR.code && grouperBase
  );

  if (base) {
    const builder = base.get(data.value);

    if (!builder) {
      throw `Unsupported validator name: '${data.value}'`;
    }

    return builder(meta, data);
  }
};

export const extractSequence = (meta: CompilerMeta, data: ValidatorData) => {
  data.error = extractError(meta, data.error) as any;

  return (
    extractValidator(meta, data) ||
    extractInnerInjectionReference(meta, data, identity) ||
    extractInjection(meta, data, identity) ||
    extractReference(meta, data)
  );
};