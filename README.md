# MikroHash

**MikroHash is a simple, zero-dependency, tested way to hash string values to hex, base64, or binary.**

![Build Status](https://github.com/mikaelvesavuori/mikrohash/workflows/main/badge.svg)

[![codecov](https://codecov.io/gh/mikaelvesavuori/mikrohash/graph/badge.svg?token=02721R3RGK)](https://codecov.io/gh/mikaelvesavuori/mikrohash)

[![Maintainability](https://api.codeclimate.com/v1/badges/a3f5bfabb00f8dc33142/maintainability)](https://codeclimate.com/github/mikaelvesavuori/mikrohash/maintainability)

Why wouldn't you just write your own hashing utility? You could! Node.js already has tools for this (which MikroHash uses), but for some of us it's not crystal-clear how they work or how to get around somewhat opaque cases. The goal of MikroHash is simply to ease your life so you have to deal with less frustration when you need hashing.

- Dead easy
- No proprietary stuff – just Node.js native methods under the hood
- Tiny (~0.63 KB gzipped)
- Zero dependencies
- Has 100% test coverage

## Usage

### Basic importing and usage

```typescript
// ES5 format
const { MikroHash } = require('mikrohash');
// ES6 format
import { MikroHash } from 'mikrohash';

const mikroHash = new MikroHash();

mikroHash.hash('hello world'); // Use default length and encoding
mikroHash.hash('hello world', 32); // Use custom length (32) and default encoding
mikroHash.setEncoding('hex'); // Switch to hex encoding
mikroHash.hash('hello world'); // Now it uses hex encoding and default length
mikroHash.setLength(10); // Use another value for future hashes
mikroHash,hash('hello world') // Will be a 10-character hash

const customHash = new MikroHash({ length: 32, encoding: 'hex' }); // Initialize with the values you need
customHash.hash('hello world');
```

## Valid encodings

The valid encodings are:

- `base64`
- `base64url` (**default**)
- `hex`
- `binary`

### Maximum length

While SHA-256 is used for hashing, the output hashes always have a maximum length related to the encoding.

- `base64`: 44
- `base64url`: 44
- `hex`: 64
- `binary`: 32

The default length is **16**.

## License

MIT. See `LICENSE` file.
