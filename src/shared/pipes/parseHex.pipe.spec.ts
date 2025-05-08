import { BadRequestException } from '@nestjs/common';
import { ParseHexPipe } from './parseHex.pipe';

describe('ParseHexPipe', () => {
  let pipe: ParseHexPipe;

  beforeEach(() => {
    pipe = new ParseHexPipe();
  });

  it('transform number to hex', () => {
    expect(pipe.transform(10)).toBe('0xa');
    expect(pipe.transform(255)).toBe('0xff');
  });

  it('return the same hex string when valid', () => {
    expect(pipe.transform('0x1a')).toBe('0x1a');
    expect(pipe.transform('0xABC')).toBe('0xABC');
  });

  it('throw BadRequestException for invalid hex string', () => {
    expect(() => pipe.transform('1234')).toThrow(BadRequestException);
    expect(() => pipe.transform('xyz')).toThrow(BadRequestException);
  });
});
