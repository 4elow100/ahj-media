import coordsValidate from '../../utils/coordsValidate';

describe('coordsValidate', () => {
  test('Validate coordinates with space', () => {
    expect(coordsValidate('51.50851, -0.12572')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test('Validate coordinates without space', () => {
    expect(coordsValidate('51.50851,-0.12572')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test('Validate Coordinates with [ and ]', () => {
    expect(coordsValidate('[51.50851, -0.12572]')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test('Not validate with invalid format', () => {
    expect(() => coordsValidate('abc')).toThrow();
    expect(() => coordsValidate('51.5')).toThrow();
    expect(() => coordsValidate('[51.5, abc]')).toThrow();
  });
});
