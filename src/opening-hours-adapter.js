import OpeningHours from './opening-hours.json';

export default class OpeningHoursAdapter {
  constructor(url) {
    this._url = url;

    this._getDayFromDate = this._getDayFromDate.bind(this);
    this._checkForPublicHoliday = this._checkForPublicHoliday.bind(this);
  }

  _fetchOpeningHours(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300)
          resolve(xhr.response);
        else
          reject(`Status code ${xhr.status} returned from opening hours request`);
      }

      xhr.onerror = () => {
        reject("Error returning opening hours");
      }

      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.send();
    });
  }

  _getDayFromDate(date) {
    const daysOfWeek = ["Sunday", "default", "default", "default", "default", "default", "Saturday"];
    return daysOfWeek[date.getDay()];
  }

  _checkForPublicHoliday(date) {
    const isoDate = date.toISOString().split('T')[0];
    let holidays = OpeningHours["holidays"].filter((holiday) => {
      if (holiday["date"] === isoDate)
        return holiday;
    });

    if (holidays.length > 0)
      return holidays[0]["hours"];

    return;
  }

  checkDate(date) {
    let openingHours = this._checkForPublicHoliday(date);
    if (!openingHours) {
      let dayOfWeek = this._getDayFromDate(date);
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
