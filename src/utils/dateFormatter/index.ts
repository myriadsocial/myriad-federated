import * as dateFns from 'date-fns';
import en from 'date-fns/locale/en-US/index';
import id from 'date-fns/locale/id';

export type DateFormatType =
  | 'dd MMMM yyyy'
  | 'yyyy-MM-dd'
  | 'dd-MMMM-yyyy'
  | 'dd MMM yyyy'
  | 'EEEE, dd MMMM yyyy'
  | 'EEE, dd MMM yyyy'
  | 'HH:mm:ss'
  | 'HH:mm'
  | 'yyyy-MM-dd'
  | 'yyyyMMdd'
  | 'dd MMMM yyyy HH:mm'
  | 'dd MMM yyyy HH:mm'
  | 'dd MMM yyyy - HH:mm'
  | 'MMMM yyyy'
  | 'dd LLL'
  | 'HH:mm - dd MMM yyyy'
  | 'LLLL yyyy'
  | 'EEE'
  | 'dd/MM/yy'
  | 'yyyy-MM-dd HH:mm:ss'
  | 'EEEE,dd LLL';

type DateFormatOption = Omit<Parameters<typeof dateFns.format>[2], 'locale'> & {
  locale?: 'id' | 'en';
};

export const dateFormatter = (
  date: Date,
  dateFormat?: DateFormatType,
  {locale = 'id', ...option}: DateFormatOption = {},
) => {
  return dateFns.format(date, dateFormat || 'dd MMMM yyyy', {
    locale: locale === 'en' ? en : id,
    ...option,
  });
};

export const formatDistanceToNow = (date: Date) =>
  dateFns.formatDistanceToNow(date, {
    locale: id,
  });

export const formatTimeWorkHoursMinutes = (date: Date | null) => {
  const timeSplit = date ? dateFormatter(date, 'HH:mm').split(':') : '';
  const hour = parseInt(timeSplit[0], 10) !== 0 ? parseInt(timeSplit[0], 10) + 'h' : '';
  const minute = parseInt(timeSplit[1], 10) !== 0 ? parseInt(timeSplit[1], 10) + 'm' : '';
  return date ? hour + minute : '-';
};

export const formatTimeWorkHours = (date: Date | null) => {
  const timeSplit = date ? dateFormatter(date, 'HH:mm').split(':') : '';
  const diffMinutes =
    dateFns.differenceInMinutes(
      new Date(0, 0, 0, parseInt(timeSplit[0], 10), parseInt(timeSplit[1], 10)),
      new Date(0, 0, 0, 0, 0),
    ) / 60;
  return date ? diffMinutes.toFixed(parseInt(timeSplit[1], 10) === 0 ? 0 : 1) + 'h' : '-';
};

export const getWeekNumberFromDate = (date: Date) => {
  const week = dateFns.getISOWeek(date);
  if (date.getDay() < 1) {
    return week + 1;
  }
  return week > 52 ? 1 : week;
};

export const isNextAvailable = ({selectionDate, maxDate}: {selectionDate: Date; maxDate: Date}) => {
  selectionDate.setDate(selectionDate.getDate() - selectionDate.getDay());
  return selectionDate <= maxDate;
};

export const isPrevAvailable = ({selectionDate, minDate}: {selectionDate: Date; minDate: Date}) => {
  selectionDate.setDate(selectionDate.getDate() + (6 - selectionDate.getDay()));
  return selectionDate >= minDate;
};

export const getNextWeek = ({date}: {date: Date}) => {
  const newDays = new Date(date);
  newDays.setDate(date.getDate() + 7);
  return new Date(newDays);
};

export const getPrevWeek = ({date}: {date: Date}) => {
  const newDays = new Date(date);
  newDays.setDate(date.getDate() - 7);
  return new Date(newDays);
};

export const timeToDate = ({time}: {time: string}) => {
  const date = new Date();
  if (time) {
    const tokenTime = time.split(':');
    const hour = Number(tokenTime[0]);
    const minute = Number(tokenTime[1]);
    const second = Number(tokenTime[2]);

    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
  }
  return date;
};
