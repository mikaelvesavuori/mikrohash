/**
 * @description Used when a string is either too short or too long.
 */
export class LengthNotWithinBoundsError extends Error {
  constructor(maximumLength: number) {
    super();
    this.name = 'LengthNotWithinBoundsError';
    const message = `Value must be between 1-${maximumLength} characters for the current encoding!`;
    this.message = message;

    console.error(message);
  }
}

/**
 * @description Used an invalid or unknown encoding is provided.
 */
export class InvalidEncodingError extends Error {
  constructor(encoding: string) {
    super();
    this.name = 'InvalidEncodingError';
    const message = `Invalid encoding: ${encoding}"! MikroHash supports: base64, hex, binary.`;
    this.message = message;

    console.error(message);
  }
}
