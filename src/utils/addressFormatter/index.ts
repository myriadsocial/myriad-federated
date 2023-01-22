const addressFormatter: ({
  position,
  text,
  length = 4,
}: {
  position?: 'start' | 'middle' | 'end';
  text: string;
  length: number;
}) => string = ({ text, length }) => {
  let first: string = '';
  let middle: string = '';
  let last: string = '';

  if (text) {
    first = text.substring(0, length);
    middle = '...';
    last = text.substring(text.length - length);
    return first + middle + last;
  }

  return '';
};

export default addressFormatter;
