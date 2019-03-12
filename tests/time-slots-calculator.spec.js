import TimeSlotsCalculator from '../src/time-slots-calculator';

describe('Time Slots Calculator', () => {
  it('Can create new instance of TimeSlotsCalculator', () => {
    const calc = new TimeSlotsCalculator();
    expect(calc).toBeDefined();
  });

  it('Should return 42x 15min slots (covering 9:15-19:45) when opening hours are 09:00-20:00', () => {
    const calc = new TimeSlotsCalculator();
    let hours = { open: 9, close: 20 };
    let timeslots = calc.getTimeSlotsInOpeningHours(hours, 15);
    expect(timeslots.length).toBe(42);
  });

  it('Should return 20x 30min slots (covering 9:30-19:30) when opening hours are 09:00-20:00', () => {
    const calc = new TimeSlotsCalculator();
    let hours = { open: 9, close: 20 };
    let timeslots = calc.getTimeSlotsInOpeningHours(hours, 30);
    expect(timeslots.length).toBe(20);
  });

  it('Should return 9x 60min slots (covering 10:00-19:00) when opening hours are 09:00-20:00', () => {
    const calc = new TimeSlotsCalculator();
    let hours = { open: 9, close: 20 };
    let timeslots = calc.getTimeSlotsInOpeningHours(hours, 60);
    expect(timeslots.length).toBe(9);
  });

  it('Should return 14x 30min slots (covering 10:30-17:30) for 19/04/19 when opening hours are 10:00-18:00', () => {
    const calc = new TimeSlotsCalculator();
    let timeslots = calc.getTimeSlotsForDate(new Date('2019-04-19'), 30);
    expect(timeslots.length).toBe(14);
  });

  it('Should return 0x 30min slots for Christmas Day as we are closed', () => {
    const calc = new TimeSlotsCalculator();
    let timeslots = calc.getTimeSlotsForDate(new Date('2019-12-25'), 30);
    expect(timeslots.length).toBe(0);
  });
});