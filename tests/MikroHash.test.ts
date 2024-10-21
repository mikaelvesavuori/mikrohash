import { test, describe, expect } from 'vitest';

import { MikroHash } from '../src/index.js';
import { InvalidEncodingError, LengthNotWithinBoundsError } from '../src/errors/errors.js';

const id = 'abc123';

describe('Initialization', () => {
  test('It should create a new instance', () => {
    const mikrohash = new MikroHash();
    expect(mikrohash).toBeInstanceOf(MikroHash);
  });

  test('It should create a new with provided options', () => {
    const mikrohash = new MikroHash({ length: 12, encoding: 'hex' });
    // @ts-ignore
    expect(mikrohash.length).toBe(12);
    // @ts-ignore
    expect(mikrohash.encoding).toBe('hex');
  });
});

describe('Hash length', () => {
  test('It should use at least 1 character in length', () => {
    expect(() => new MikroHash().setLength(0)).toThrowError(LengthNotWithinBoundsError);
  });

  test('It should use no more than 64 characters in length', () => {
    expect(() => new MikroHash().setLength(65)).toThrowError(LengthNotWithinBoundsError);
  });

  test('It should set the default length', () => {
    const mikrohash = new MikroHash();
    mikrohash.setLength(24);
    const hash = mikrohash.hash(id);
    expect(hash.length).toBe(24);
  });

  test('It should use the default length', () => {
    const hash = new MikroHash().hash(id);
    expect(hash.length).toBe(16);
  });

  test('It should use a custom length (short', () => {
    const hash = new MikroHash().hash(id, 8);
    expect(hash.length).toBe(8);
  });

  test('It should use a custom length (long)', () => {
    const hash = new MikroHash().hash(id, 40);
    expect(hash.length).toBe(40);
  });

  test('It should have a length that is no more than 44 for base64url encoding', () => {
    expect(() => new MikroHash().hash(id, 45)).toThrowError();
  });

  test('It should have a length that is no more than 44 for base64 encoding', () => {
    expect(() => new MikroHash({ encoding: 'base64' }).hash(id, 45)).toThrowError();
  });

  test('It should have a length that is no more than 64 for hex encoding', () => {
    expect(() => new MikroHash({ encoding: 'hex' }).hash(id, 65)).toThrowError();
  });

  test('It should have a length that is no more than 32 for binary encoding', () => {
    expect(() => new MikroHash({ encoding: 'binary' }).hash(id, 33)).toThrowError();
  });
});

describe('Setting hash encoding', () => {
  test('It should set a hex encoding', () => {
    const mikrohash = new MikroHash();
    mikrohash.setEncoding('hex');
    const hash = mikrohash.hash('abc123');
    expect(hash).toBe('6ca13d52ca70c883');
  });

  test('It should set a base64 encoding', () => {
    const mikrohash = new MikroHash();
    mikrohash.setEncoding('base64');
    const hash = mikrohash.hash('abc123');
    expect(hash).toBe('bKE9UspwyIPg8LsQ');
  });

  test('It should set a binary encoding', () => {
    const mikrohash = new MikroHash();
    mikrohash.setEncoding('binary');
    const binaryHash = mikrohash.hash(id) as any;
    const hashBuffer = Buffer.from(binaryHash, 'binary');
    expect(hashBuffer.toString('hex')).toBe('6ca13d52ca70c883e0f0bb101e425a89');
  });

  test('It should not allow unknown encodings', () => {
    // @ts-ignore
    expect(() => new MikroHash().setEncoding('abc')).toThrowError(InvalidEncodingError);
  });
});

describe('Hashing values', () => {
  test('It should hash a GitHub repository ID', () => {
    // Matches `repository.id` in the `push` webhook event
    const id = '12345678';
    const hash = new MikroHash().hash(id);
    expect(hash).toBe('73l8gRjwLftklgfd');
  });

  test('It should hash a GitLab repository ID', () => {
    // Matches `project.id` in the `push` webhook event
    const id = '654321';
    const hash = new MikroHash().hash(id);
    expect(hash).toBe('SB9swFERQ8zdfi0b');
  });

  test('It should hash a Bitbucket repository ID', () => {
    // Matches `repository.uuid` in the `push` webhook event
    const id = '{123e4567-e89b-12d3-a456-426614174000}';
    const hash = new MikroHash().hash(id);
    expect(hash).toBe('4yi2US8aNX4v9sgD');
  });
});
