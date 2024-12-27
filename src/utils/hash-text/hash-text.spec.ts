import { hashText } from './hash-text';

describe('testing hashing text function', () => {
  test('are hashes of one text equal to each other', async () => {
    const text = 'Hello world!';
    const hash1 = await hashText(text);
    const hash2 = await hashText(text);
    expect(hash1).toEqual(hash2);
  });
});
