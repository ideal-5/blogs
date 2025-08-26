// src/global.d.ts
export {}; // 必须写，避免把这个文件当成 script 模式

declare global {
  interface RequestResponse<T> {
    code: number;
    data: T;
    msg: string;
  }
}
