import { DateTime } from "luxon";
import dotenv from "dotenv";

dotenv.config()

export const formatTimezoneOffset = () => {
  let offset = Math.abs(new Date().getTimezoneOffset());
  return `${String(offset / 60 | 0).padStart(2, '0')}:${String(offset % 60).padStart(2, '0')}:00`;
};

export const formatDate = (date, format, isLocal) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(date, isLocal, timeZone)
  const parsedDate = DateTime.fromFormat(date, format, { zone: timeZone });
  return (isLocal ? parsedDate.toUTC().toISO() : parsedDate.toISO())
}