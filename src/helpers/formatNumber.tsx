import React from 'react';
import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from 'react-number-format';
import { BN } from '@polkadot/util';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumberFormatCustom = React.forwardRef<
  NumericFormatProps<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
});

export const formatAmount = (
  value: BN | string | number,
  decimal = 18,
  precision = 5,
): string => {
  const balance = (+value.toString() / Math.pow(10, decimal)).toFixed(
    precision,
  );

  const [num1, num2] = balance.split('.');
  const amountDecimal = parseFloat(num2 ? '0.' + num2 : '')
    .toString()
    .substring(1);

  return Number(num1).toLocaleString() + amountDecimal;
};
