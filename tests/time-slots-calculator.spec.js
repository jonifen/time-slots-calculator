import TimeSlotsCalculator from '../src/time-slots-calculator';

describe('time slots calculator', () => {
  it('should get time slots for "default" day', () => {
    const checkDate = new Date('2019-03-08');
    let calc = new TimeSlotsCalculator(checkDate);
    let hours = calc.checkDate();
    expect(hours).toEqual({open: 9, close: 20});
  });

  it('should get time slots for "Saturday" day', () => {
    const checkDate = new Date('2019-03-09');
    let calc = new TimeSlotsCalculator(checkDate);
    let hours = calc.checkDate();
    expect(hours).toEqual({open: 9, close: 18});
  });

  it('should get time slots for "2019-04-19" day', () => {
    const checkDate = new Date('2019-04-19');
    let calc = new TimeSlotsCalculator(checkDate);
    let hours = calc.checkDate();
    expect(hours).toEqual({open: 10, close: 18});
  });
});