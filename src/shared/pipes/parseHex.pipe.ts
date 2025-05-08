import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { hex } from 'src/thirdApi/evm/evm.types';

@Injectable()
export class ParseHexPipe implements PipeTransform<number | string, string> {
  transform(value: number | string): hex {
    if (typeof value === 'number') {
      return `0x${value.toString(16)}`;
    }

    if (typeof value === 'string') {
      const isHex = /^0x[0-9a-fA-F]+$/.test(value);
      if (!isHex) {
        throw new BadRequestException(
          'String value must be a valid hex (e.g., 0x1a)',
        );
      }
      return value as hex;
    }

    throw new BadRequestException('Value must be a number or hex string');
  }
}
