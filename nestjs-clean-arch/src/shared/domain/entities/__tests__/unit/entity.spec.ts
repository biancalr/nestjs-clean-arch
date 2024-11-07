import { validate as uuidValidate } from 'uuid';
import { Entity } from '../../entity';

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('Should set props and id', () => {
    const props = { prop1: 'value1', prop2: 21 };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity._id).not.toBeNull();
    expect(uuidValidate(entity._id)).toBeTruthy();
  });

  it('Should accept a valid id', () => {
    const props = { prop1: 'value1', prop2: 21 };
    const id = 'ace00085-43ec-4a45-b734-cdc91a9603c9';
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity._id)).toBeTruthy();
    expect(entity._id).toBe(id);
  });

  it('Should convert a entity to a JSON', () => {
    const props = { prop1: 'value1', prop2: 21 };
    const id = 'ace00085-43ec-4a45-b734-cdc91a9603c9';
    const entity = new StubEntity(props, id);

    expect(entity.toJson()).toStrictEqual({
      id,
      ...props,
    });
  });
});
