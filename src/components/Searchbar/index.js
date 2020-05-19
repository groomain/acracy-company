import React, { useState, useEffect, useRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure
} from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';
import { connectStateResults } from 'react-instantsearch-dom';
import Select, { components, createFilter } from 'react-select'
import Highlighter from 'react-highlight-words';

import { Grid, Typography, Box } from '@material-ui/core';
import SearchIcon from '../../assets/icons/searchIcon';

import styles, { reactSelectStyles } from './styles';

import profilIcon from '../../assets/icons/profil-roll-out-black.svg';
import projectIcon from '../../assets/icons/livrable-black.svg';
import profilIconYellow from '../../assets/icons/profil-roll-out-yellow.svg';
import livrableYellow from '../../assets/icons/livrable-yellow.svg';

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

const SearchResults = ({ searchResults, ...props }) => {
  const classes = styles();
  const { t } = useTranslation();

  const [resultsList, setResultsList] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    if (searchResults) {
      const { hits } = searchResults;
      const groupedOptions = [{
        label: (t('searchbar.profileLabel')),
        options: hits.filter(x => x.title === 'Profils'),
      }, {
        label: (t('searchbar.briefsLabel')),
        options: hits.filter(x => x.title === 'Livrables'),
      }];
      setResultsList(groupedOptions);
      setIsLoading(false);
    }
  }, [searchResults]);

  const filterConfig = {
    trim: true
  };

  const formatGroupLabel = data => (
    <Grid container alignItems="center">
      {data.label === 'Profils'
        ? <img src={profilIcon} alt={(t('searchbar.profileLabel'))} className={classes.img} />
        : <img src={projectIcon} alt={(t('searchbar.briefsLabel'))} className={classes.img} />}
      <span>{data.label}</span>
    </Grid>
  );

  const formatOptionLabel = ({ label, tags }, { inputValue }) => {
    return (
      <>
        <Grid container>
          <Grid
            container
            item
            xs={4}
            alignContent="center"
            className={classes.optionValue}
          >
            <Highlighter
              searchWords={[inputValue.trim()]}
              textToHighlight={label}
              highlightClassName={classes.highlight}
            />
          </Grid>
          <Grid item container xs={8}>
            {tags && (
              tags.map((tag, key) => (
                <Grid item xs={4} key={key}>
                  <small>#{tag.toLowerCase()}</small>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </>
    );
  }

  const ValueContainer = ({ children, ...props }) => {
    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          <SearchIcon color={'#000'} className={classes.searchImg} />
          <Grid>{children}</Grid>
        </components.ValueContainer>
      )
    );
  };

  const SingleValue = props => {
    return (
      <components.SingleValue {...props} className={classes.value}>
        {props.data.label}
      </components.SingleValue>
    )
  };

  const ref = useRef();

  useEffect(() => {
    ref.current.select.getNextFocusedOption = () => null;
  }, []);

  const handleOnChange = (option) => {
    setSearchValue(option || null)
  }

  const displayTitle = (searchValueTitle) => {
    switch (searchValueTitle) {
      case 'Profils':
        return (
          <Box style={{ display: 'flex', flexDirection: 'row' }}>
            <img scr={profilIconYellow} alt='profil' />
            <Typography variant="h2">&nbsp;Profil recherché</Typography>
          </Box>
        )
      case 'Livrables':
        return (
          <Box>
            <img scr={livrableYellow} alt='livrable' />
            <Typography variant="h2">&nbsp;Livrable recherché</Typography>
          </Box>
        )
      case 'unknown':
        return (
          <Typography variant="h2">Vous avez recherché</Typography>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Box my={2} style={{ height: 30 }}>
        {displayTitle(searchValue?.title)}
      </Box>
      <Select
        ref={ref}
        onChange={handleOnChange}
        placeholder={t('searchbar.placeholder')}
        options={resultsList}
        formatOptionLabel={formatOptionLabel}
        formatGroupLabel={formatGroupLabel}
        isClearable
        classNamePrefix="react-select"
        className={classes.searchbar}
        maxMenuHeight={400}
        filterOption={createFilter(filterConfig)}
        noOptionsMessage={() => loading ? t('searchbar.loading') : t('searchbar.noOptions')}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          ValueContainer,
          SingleValue
        }}
        styles={reactSelectStyles}
      />
    </>
  )
}

const CustomSearchbar = connectStateResults(SearchResults)

export default Searchbar;
