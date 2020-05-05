import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
} from 'react-instantsearch-dom';
import Autocomplete from './Autocomplete';

import styles from './styles';
import { environment } from '../../environment';

const searchClient = algoliasearch(
  environment.ALGOSEARCH_TEST,
  environment.ALGOSEARCH_TEST_KEY
);

const Searchbar = ({ items }) => {
  const classes = styles();
  const [state, setState] = useState({
    query: '',
    categories: []
  });

  const onSuggestionSelected = (_, { suggestion }) => {
    const [category] = suggestion.instant_search.facets.exact_matches.categories;

    setState({
      query: suggestion.query,
      categories: category && category.value !== 'ALL_CATEGORIES' ? [category.value] : [],
    });
  };

  const onSuggestionCleared = () => {
    setState({
      query: '',
      categories: [],
    });
  };

  const { query, categories } = state;

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="instant_search_demo_query_suggestions"
      className={classes.root}
    >
      <Configure hitsPerPage={12} />
      <Autocomplete
        items={items}
        onSuggestionSelected={onSuggestionSelected}
        onSuggestionCleared={onSuggestionCleared}
      />
    </InstantSearch>
  );
}

export default Searchbar;
