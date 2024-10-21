import { createHash } from 'crypto';

import { Encoding, MikroHashOptions } from '../interfaces/index.js';

import { InvalidEncodingError, LengthNotWithinBoundsError } from '../errors/errors.js';

/**
 * @description Hash strings using the SHA-256 algorithm.
 * You may provide custom options for `length` and `encoding`.
 * @example
 * const mikroHash = new MikroHash();
 * mikroHash.hash('hello world');
 * const customHash = new MikroHash({ length: 32, encoding: 'hex' });
 * customHash.hash('hello world');
 */
export class MikroHash {
  private length: number = 16;
  private encoding: Encoding = 'base64';

  private readonly validEncodings = ['base64', 'hex', 'binary'];

  constructor(options?: MikroHashOptions) {
    if (options?.length) this.setLength(options.length);
    if (options?.encoding) this.setEncoding(options.encoding);
  }

  /**
   * @description Hash a string value. Optionally, pass a numeric `hashLength`.
   * Otherwise the length will fallback to the default value (16 unless reconfigured).
   * The encoding will always use the default encoding. To change it, first call
   * the `setEncoding()` method.
   * @example
   * const mikroHash = new MikroHash();
   * mikroHash.hash('hello world'); // Use default length and encoding
   * mikroHash.hash('hello world', 32); // Use custom length (32) and default encoding
   * mikroHash.setEncoding('hex'); // Switch to hex encoding
   * mikroHash.hash('hello world'); // Now it uses hex encoding and default length
   */
  public hash(value: string, hashLength?: number) {
    const length = hashLength || this.length;
    const maxLength = this.getMaxLength();

    if (length > maxLength) throw new LengthNotWithinBoundsError(maxLength);

    const hash = createHash('sha256').update(value);

    if (this.encoding === 'binary') return hash.digest().subarray(0, length);

    return hash.digest(this.encoding).substring(0, length);
  }

  private getMaxLength() {
    return this.encoding === 'binary' ? 32 : this.encoding === 'hex' ? 64 : 44;
  }

  /**
   * @description Set the default length of hashes.
   * Must be between 1 and 64.
   */
  public setLength(length: number) {
    const maxLength = this.getMaxLength();
    if (length < 1) throw new LengthNotWithinBoundsError(maxLength);
    if (length > 64) throw new LengthNotWithinBoundsError(maxLength);

    this.length = length;
  }

  /**
   * @description Set the default encoding of hashes.
   * Valid encodings are:
   * - `base64`
   * - `hex`
   * - `binary`
   * @example
   * const mikroHash = new MikroHash({ encoding: 'hex' }); // Can be set during initialization
   * mikroHash.setEncoding('binary'); // Can also be changed post-initialization
   */
  public setEncoding(encoding: Encoding) {
    if (!this.validEncodings.includes(encoding)) throw new InvalidEncodingError(encoding);

    this.encoding = encoding;
  }
}
