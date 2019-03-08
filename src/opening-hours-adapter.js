import OpeningHours from './opening-hours.json';

export default class OpeningHoursAdapter {
  constructor(date) {
    this._date = date;

    this._getDayFromDate = this._getDayFromDate.bind(this);
    this._checkForPublicHoliday = this._checkForPublicHoliday.bind(this);
  }

  _getDayFromDate() {
    const daysOfWeek = ["Sunday", "default", "default", "default", "default", "default", "Saturday"];
    return daysOfWeek[this._date.getDay()];
  }

  _checkForPublicHoliday() {
    const isoDate = this._date.toISOString().split('T')[0];
    let holidays = OpeningHours["holidays"].map((holiday) => {
      if (holiday["date"] === isoDate)
        return holiday["hours"];
    });

    if (holidays)
      return holidays[0];

    return;
  }

  checkDate() {
    let openingHours = this._checkForPublicHoliday();
    if (!openingHours) {
      let dayOfWeek = this._getDayFromDate();
      if (dayOfWeek === "default")
        openingHours = OpeningHours["default"];
      else
        openingHours = OpeningHours["days"].map((day) => {
          if (day["dayOfWeek"] === dayOfWeek)
            return day["hours"];
        })[0];
    }

    return openingHours;
  }
}
