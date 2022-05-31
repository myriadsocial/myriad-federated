import React from "react";

import { SearchBox as SearchBoxComponent } from ".";

export const SearchBoxContainer = ({
  onSubmitSearch,
  iconPosition,
  outlined,
  hidden,
}) => {
  return (
    <SearchBoxComponent
      onSubmit={onSubmitSearch}
      iconPosition={iconPosition}
      outlined={outlined}
      hidden={hidden}
    />
  );
};
