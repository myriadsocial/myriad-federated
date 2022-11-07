import React, { useState } from 'react';

import Image from 'next/image';

import { debounce } from 'lodash';
import { Magnifier } from 'public/icons';

import { IconButton, InputBase } from '@mui/material';
import { SearchBoxProps } from './SearchBox.interfaces';

const SearchBox: React.FC<SearchBoxProps> = ({
  ariaLabel = 'search-box',
  placeholder = 'Search',
  outlined = false,
  onSubmit,
  iconPosition = 'start',
  hidden = false,
  ...props
}) => {
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
    <div className="py-2 px-2 bg-white rounded-[10px] shadow-md items-center flex">
      <IconButton aria-label="search" onClick={submitClickSearch}>
        <Image src={Magnifier} alt="" height={24} width={24} />
      </IconButton>
      <InputBase
        onKeyUp={submitSearch}
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
        inputProps={{ 'aria-label': ariaLabel }}
        style={{ marginLeft: 8, fontFamily: 'mulish' }}
        {...props}
      />
    </div>
  );
};

export default SearchBox;
