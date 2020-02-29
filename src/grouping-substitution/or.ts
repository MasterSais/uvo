import { Error, ErrorCallback, MetaData, Processor, Relevance } from '../types';

export const or = (...validators: Array<Processor<any, any>>): Processor<any, any> =>
  (value: any, onError?: ErrorCallback, meta?: MetaData): any => {
    let processed = null;

    const relevance: Relevance = { value: false };

    validators.find((nextValidator: Processor<any, any>) =>
      (
        processed = nextValidator(value, onError ? (error: Error, meta?: MetaData) => onError(error, meta, relevance) : null, meta),
        processed !== null
      )
    );

    if (processed === null) {
      relevance.value = true;
    }

    return processed;
  };