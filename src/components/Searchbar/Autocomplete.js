import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import { useTranslation } from "react-i18next";

import { Grid } from '@material-ui/core';
import styles from './styles';
// import { SuggestionsTitle } from './SuggestionsTitle';

const Autocomplete = ({ currentRefinement, onSuggestionCleared, hits, onSuggestionSelected, refine }) => {
  const { t } = useTranslation();
  const classes = styles();

  const [state, setState] = useState({
    value: currentRefinement,
  })

  const isSuggestionHasCategories = (suggestion) => {
    return (
      suggestion.instant_search &&
      suggestion.instant_search.facets &&
      suggestion.instant_search.facets.exact_matches &&
      suggestion.instant_search.facets.exact_matches.categories &&
      suggestion.instant_search.facets.exact_matches.categories.length
    );
  }

  const normalizeSuggestionCategories = (suggestions) => {
    return suggestions.map(suggestion => {
      const context = suggestion.instant_search || {};
      const facets = context.facets || {};
      const matches = facets.exact_matches || {};
      const categories = matches.categories || [];

      return {
        ...suggestion,
        // eslint-disable-next-line
        instant_search: {
          ...context,
          facets: {
            ...facets,
            // eslint-disable-next-line
            exact_matches: {
              ...matches,
              categories,
            },
          },
        },
      };
    });
  }

  const createMostRelevantSuggestionForAllCategories = (suggestion) => {
    return {
      ...suggestion,
      // eslint-disable-next-line
      instant_search: {
        ...suggestion.instant_search,
        facets: {
          ...suggestion.instant_search.facets,
          // eslint-disable-next-line
          exact_matches: {
            ...suggestion.instant_search.facets.exact_matches,
            categories: [{ value: 'ALL_CATEGORIES' }],
          },
        },
      },
    };
  }

  const onChange = (_, { newValue }) => {
    if (!newValue) { onSuggestionCleared(); }
    setState({ value: newValue, });
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    refine(value);
  };

  const onSuggestionsClearRequested = () => {
    refine();
  };

  const getSuggestionValue = (hit) => {
    return hit.query;
  }

  const renderSuggestion = (hit) => {
    const [category] = hit.instant_search.facets.exact_matches.categories;

    return (
      <Grid container onClick={() => console.log("suggestion clicked")}>
        <Grid item xs={4}>
          <Highlight attribute="query" hit={hit} tagName="mark" />
        </Grid>
        <Grid item xs={8}>
          {category && (
            <span>
              {category.value === 'ALL_CATEGORIES'
                ? 'All categories'
                : `#${category.value}`
              }
            </span>
          )}
        </Grid>
      </Grid>
    );
  };

  const { value } = state;

  const inputProps = {
    placeholder: t('searchbarPlaceholder'),
    onChange: onChange,
    value,
  };

  const suggestions = normalizeSuggestionCategories(hits);
  const suggestionsWithAllCategories =
    suggestions[0] && isSuggestionHasCategories(suggestions[0])
      ? [createMostRelevantSuggestionForAllCategories(suggestions[0])]
      : [];

  // function renderSectionTitle(section) {
  //   return <SuggestionsTitle/>;
  // }


  return (
    <AutoSuggest
      suggestions={[...suggestionsWithAllCategories, ...suggestions]}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      // multiSection={true}
      // renderSectionTitle={renderSectionTitle}
      theme={{
        input: classes.input,
        inputFocused: classes.focused,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
        suggestionHighlighted: classes.highlighted
      }
      }
    />
  );
}

Autocomplete.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  onSuggestionCleared: PropTypes.func.isRequired,
};

export default connectAutoComplete(Autocomplete);
