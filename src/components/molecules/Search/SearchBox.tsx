import React, { useState } from 'react';

import Image from 'next/image';

import { debounce } from 'lodash';
import { Magnifier } from 'public/icons';

import { SearchBoxColor, SearchBoxProps, useStyles } from '.';
import { Grid, IconButton, InputBase, Paper } from '@mui/material';

const SearchBox: React.FC<SearchBoxProps> = ({
  color = SearchBoxColor.PRIMARY,
  ariaLabel = 'search-box',
  placeholder = 'Search',
  outlined = false,
  onSubmit,
  iconPosition = 'start',
  hidden = false,
  ...props
}) => {
  const classes = useStyles({ outlined, hidden });

  const [input, setInput] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInput(value);
    debouncedSubmit(value);
  };

  const submitClickSearch = () => {
    debouncedSubmit();
  };

  const submitSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') debouncedSubmit();
  };

  const debouncedSubmit = debounce((value?: string) => {
    if (onSubmit) onSubmit(value ?? input);
  }, 500);

  return (
    <Grid
      container
      direction={iconPosition === 'end' ? 'row-reverse' : 'row'}
      className={classes.root}
      component={Paper}
      elevation={iconPosition === 'end' ? 0 : 1}
    >
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={submitClickSearch}
      >
        <Image src={Magnifier} alt="" height={24} width={24} />
      </IconButton>
      <InputBase
        onKeyUp={submitSearch}
        className={classes.input}
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
        inputProps={{ 'aria-label': ariaLabel }}
        {...props}
      />
    </Grid>
  );
};

export default SearchBox;
