import OpeningHoursAdapter from './opening-hours-adapter';

export default class TimeSlotsCalculator {
  getTimeSlotsInOpeningHours(hours, slotLengthMins) {
    if (!hours)
      return [];

    if (hours["closed"] === true)
      return [];

    let totalHoursOpen = (hours["close"] - hours["open"]);
    let slotsPerHour = 60 / slotLengthMins;
    let totalSlots = totalHoursOpen * slotsPerHour;
    let totalSlotsAvailable = totalSlots - 2;
    let slots = [];
    let openTime = new Date(2020, 1, 1, hours["open"]);

    for (let slot = 1; slot <= totalSlotsAvailable; slot++) {
      let startSlotTime = new Date(openTime.getTime() + ((slotLengthMins * slot) * 60000));
      let endSlotTime = new Date(startSlotTime.getTime() + (slotLengthMins * 60000));
      slots.push(`${this._getFormattedTime(startSlotTime)}-${this._getFormattedTime(endSlotTime)}`);
    }

    return slots;
  }

  getTimeSlotsForDate(date, slotLengthMins, openingTimesUrl) {
    let openingHoursAdapter = new OpeningHoursAdapter(openingTimesUrl);
    let hours = openingHoursAdapter.checkDate(date);
    return this.getTimeSlotsInOpeningHours(hours, slotLengthMins);
  }

  _getFormattedTime(time) {
    return `${this._padLeft(time.getHours())}:${this._padLeft(time.getMinutes())}`;
  }

  _padLeft(element) {
    return ("0" + element).slice(-2);
  }
}