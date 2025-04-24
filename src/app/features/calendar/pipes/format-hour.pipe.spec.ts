import { FormatHourPipe } from './format-hour.pipe';

describe('FormatHourPipe', () => {
  let pipe: FormatHourPipe;

  beforeEach(() => {
    pipe = new FormatHourPipe();
  });

  it('should format a single digit hour', () => {
    expect(pipe.transform('1')).toBe('01:00');
  });

  it('should format a double digit hour', () => {
    expect(pipe.transform('12')).toBe('12:00');
  });

  it('should throw an error for invalid format', () => {
    expect(() => pipe.transform('123')).toThrowError('Invalid hour format');
  });

  it('should return the input if it is empty', () => {
    expect(pipe.transform('')).toBe('');
  });
});