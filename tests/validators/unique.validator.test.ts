import { withErrors } from '@lib/containers/with-errors';
import { withMeta } from '@lib/containers/with-meta';
import { consecutive } from '@lib/groupers/consecutive';
import { V_UQ as VALIDATOR_NAME } from '@lib/names';
import { array } from '@lib/validators/array';
import { object2 } from '@lib/validators/object2';
import { unique } from '@lib/validators/unique';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  test('base', () => {
    const validator = (
      withMeta(
        withErrors(
          consecutive(
            array(),
            unique(null, meta => meta.path.join('.'))
          )
        )
      )
    );

    expect(validator([
      1, 2, 3
    ])).toEqual({
      result: [
        1, 2, 3
      ],
      errors: null
    });

    expect(validator([
      1, 2, 1
    ])).toEqual({
      result: [
        1, 2, null
      ],
      errors: ['2']
    });

    expect(validator([
      1, 2, 1, 1
    ])).toEqual({
      result: [
        1, 2, null, null
      ],
      errors: ['2', '3']
    });
 
    expect(validator([
      1, 2, 1, 2
    ])).toEqual({
      result: [
        1, 2, null, null
      ],
      errors: ['2', '3']
    });

    const objValidator = (
      withMeta(
        withErrors(
          consecutive(
            array(object2()),
            unique('id', meta => meta.path.join('.'))
          )
        )
      )
    );

    expect(objValidator([
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ])).toEqual({
      result: [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ],
      errors: null
    });

    expect(objValidator([
      { id: 1 },
      { id: 2 },
      { id: 1 }
    ])).toEqual({
      result: [
        { id: 1 },
        { id: 2 },
        null
      ],
      errors: ['2.id']
    });

    expect(objValidator([
      { id: 1 },
      { id: 2 },
      { id: 1 },
      { id: 1 }
    ])).toEqual({
      result: [
        { id: 1 },
        { id: 2 },
        null,
        null
      ],
      errors: ['2.id', '3.id']
    });

    expect(objValidator([
      { id: 1 },
      { id: 2 },
      { id: 1 },
      { id: 2 }
    ])).toEqual({
      result: [
        { id: 1 },
        { id: 2 },
        null,
        null
      ],
      errors: ['2.id', '3.id']
    });

    const mapperValidator = (
      withMeta(
        withErrors(
          consecutive(
            array(object2()),
            unique(value => value.id, meta => meta.path.join('.'))
          )
        )
      )
    );

    expect(mapperValidator([
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ])).toEqual({
      result: [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ],
      errors: null
    });

    expect(mapperValidator([
      { id: 1 },
      { id: 2 },
      { id: 1 }
    ])).toEqual({
      result: [
        { id: 1 },
        { id: 2 },
        null
      ],
      errors: ['2']
    });

    expect(mapperValidator([
      { id: 1 },
      { id: 2 },
      { id: 1 },
      { id: 1 }
    ])).toEqual({
      result: [
        { id: 1 },
        { id: 2 },
        null,
        null
      ],
      errors: ['2', '3']
    });

    expect(mapperValidator([
      { id: 1 },
      { id: 2 },
      { id: 1 },
      { id: 2 }
    ])).toEqual({
      result: [
        { id: 1 },
        { id: 2 },
        null,
        null
      ],
      errors: ['2', '3']
    });
  });
});