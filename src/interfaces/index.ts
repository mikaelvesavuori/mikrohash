export type MikroHashOptions = {
  length?: number;
  encoding?: Encoding;
};

export type Encoding = 'base64' | 'hex' | 'binary';
