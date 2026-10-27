import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';

describe('PWA install icons',()=>{
  for (const [file,size] of [['icons/icon-192.png',192],['icons/icon-512.png',512],['apple-touch-icon.png',180],['favicon.png',48]] as const) {
    it(`${file} is a valid ${size}x${size} PNG`,()=>{
      const bytes=readFileSync(`public/${file}`);
      expect(bytes.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');
      expect(bytes.readUInt32BE(16)).toBe(size);
      expect(bytes.readUInt32BE(20)).toBe(size);
    });
  }
});
