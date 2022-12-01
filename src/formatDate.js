'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const yearFormFull = 'YYYY';
  const yearFormShort = 'YY';
  const monthForm = 'MM';
  const dayForm = 'DD';
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const splittedDate = date.split(fromSeparator);

  const holder = {};
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case yearFormFull :
        holder[splittedDate[i]] = splittedDate[i];
        break;

      case yearFormShort :
        holder[yearFormFull] = (splittedDate[i] >= 24) ? `19${splittedDate[i]}` : `20${splittedDate[i]}`;
        break;

      default:
        break;
    }

    holder[fromFormat[i]] = splittedDate[i];
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case dayForm:
        newDate.push(holder[dayForm]);
        break;

      case monthForm:
        newDate.push(holder[monthForm]);
        break;

      case yearFormFull:
        newDate.push(holder[yearFormFull]);
        break;

      case yearFormShort:
        newDate.push(holder[yearFormFull].slice(2));
        break;

      default:
        break;
    }
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;
