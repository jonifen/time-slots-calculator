import OpeningHoursAdapter from '../src/opening-hours-adapter';

describe('Opening Hours Adapter', () => {
  it('should get opening hours for "default" day', () => {
    const checkDate = new Date('2019-03-08');
    let calc = new OpeningHoursAdapter(checkDate);
    let hours = calc.checkDate();
    expect(hours).toEqual({open: 9, close: 20});
  });

  it('should get opening hours for "Saturday" day', () => {
    const checkDate = new Date('2019-03-09');
    let calc = new OpeningHoursAdapter(checkDate);
    let hours = calc.checkDate();
    expect(hours).toEqual({open: 9, close: 18});
  });

  it('should get opening hours for "2019-04-19" day', () => {
    const checkDate = new Date('2019-04-19');
    let calc = new OpeningHoursAdapter(checkDate);
    let hours = calc.checkDate();
    expect(hours).toEqual({open: 10, close: 18});
  });

  it('should get opening hours for "2019-12-25" day', () => {
    const checkDate = new Date('2019-12-25');
    let calc = new OpeningHoursAdapter(checkDate);
    let hours = calc.checkDate();
    expect(hours).toEqual({closed: true});
  });
});