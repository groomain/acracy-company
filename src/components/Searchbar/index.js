import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure
} from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';
import { connectStateResults } from 'react-instantsearch-dom';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { Grid, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from './styles';

const Searchbar = () => {

  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA,
    process.env.REACT_APP_ALGOLIA_KEY
  );

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
    >
      <Configure hitsPerPage={12} />
      <CustomSearchbar />
    </InstantSearch>
  );
}

const StateResults = ({ searchResults, ...props }) => {
  const classes = styles();
  const { t } = useTranslation();

  const results = searchResults && searchResults.hits;

  const group = results && results.map((option, key) => {
    const category = option.title;
    const tags = option.tags;
    return {
      category,
      tags,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="searchbar"
      options={group}
      getOptionLabel={(option) => option.name}
      freeSolo
      groupBy={(option) => option.category}
      noOptionsText={t('noOptions')}
      classes={{
        input: classes.input,
        paper: classes.root,
        listbox: classes.listbox,
        inputRoot: classes.root,
        paper: classes.paper,
        option: classes.option,
        groupLabel: classes.groupLabel
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )
      }}
      {...props}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);

        return (
          <Grid container>
            <Grid item xs={4}>
              {parts.map((part, index) => {
                return (
                  <span key={index}
                    style={{
                      fontWeight: part.highlight ? 600 : 400,
                      color: part.highlight ? '#151D15' : 'inherit'
                    }}>
                    {part.text}
                  </span>
                )
              })}
            </Grid>
            <Grid item container xs={8}>
              {option.tags && (
                option.tags.map(tag => (
                  <Grid item xs={4}>
                    <small>#{tag}</small>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        );
      }}
    />
  )
}

const CustomSearchbar = connectStateResults(StateResults)

export default Searchbar;
