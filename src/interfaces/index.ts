export type MikroHashOptions = {
  length?: number;
  encoding?: Encoding;
};

export type Encoding = 'base64' | 'base64url' | 'hex' | 'binary';
