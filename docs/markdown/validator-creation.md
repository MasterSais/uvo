You can create your own validator or processor.

Base validator template:
```js
yourValidatorName(...yourProbableParams: Array<any>, error?: Error): Validator<any> =>
  (
    (value: any, onError?: ErrorCallback, meta?: MetaData): any =>
      (
        ... check input value
      )
        ? value : (onError && onError(error, meta), null)
  );
```

Simple example:
```js
const gte = (bound: number, error?: Error): Validator<number> =>
  (
    (value: number, onError?: ErrorCallback, meta?: MetaData): number =>
      (
        value >= bound
      )
        ? value : (onError && onError(error, meta), null)
  );
```

You must provide validator name and params into meta scheme for proper errors handling.
```js
... onError(error, meta && { ...meta, validator: 'name', params: [... your params] }) ...
```

Processor injection example:
```js
import * as v from 'baridetta';

const simpleOne = (
  v.consecutive(
    v.array([
      v.number(),
      v.gte(0)
    ]),
    (data: Array<number>) => data.filter(value => !!value) // Remove null values.
  )
);
```