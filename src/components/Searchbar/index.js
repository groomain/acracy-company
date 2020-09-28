import React, { useState, useEffect, useMemo } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure
} from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';
import { connectStateResults } from 'react-instantsearch-dom';
import { useSelector, useDispatch } from 'react-redux';

import { components, createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Highlighter from 'react-highlight-words';

import { Grid, Typography, Box } from '@material-ui/core';
import SearchIcon from '../../assets/icons/searchIcon';

import styles, { reactSelectStyles } from './styles';
import profilIcon from '../../assets/icons/profil-roll-out-black.svg';
import projectIcon from '../../assets/icons/livrable-black.svg';
import profilIconYellow from '../../assets/icons/profil-roll-out-yellow.svg';
import livrableYellow from '../../assets/icons/livrable-yellow.svg';

const CustomConfigure = connectStateResults(({ searchResults }) =>
  <Configure hitsPerPage={Math.max(1000, searchResults?.nbHits)} />
);

const Searchbar = ({ onUpdateChosenCategory, value, hideLabel }) => {
  const searchClient = useMemo(() => algoliasearch(
    process.env.REACT_APP_ALGOLIA,
    process.env.REACT_APP_ALGOLIA_KEY
  ), []);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
    >
      <CustomConfigure />
      <CustomSearchbar onUpdateChosenCategory={onUpdateChosenCategory} value={value} hideLabel={hideLabel} />
    </InstantSearch>
  );
};

const SearchResults = ({ searchResults, onUpdateChosenCategory, value, hideLabel }) => {
  const classes = styles();
  const { t } = useTranslation();

  const [resultsList, setResultsList] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState();
  const [newOption, setNewOption] = useState({ title: t('leadCreation.reseachLabel') });

  useEffect(() => {
    if (value?.type === "PROFILE" && resultsList.length > 0 && !searchValue) {
      let profileResults = resultsList.find(result => result.label === t('searchbar.profileLabel'))
      let algoliaFullProfileResult = profileResults.options.find(result => result.TEXT === value.text)
      setSearchValue(algoliaFullProfileResult)
      onUpdateChosenCategory(algoliaFullProfileResult);
    }
    else if (value?.type === "DELIVERABLE" && resultsList.length > 0 && !searchValue) {
      let deliverableResults = resultsList.find(result => result.label === t('searchbar.briefsLabel'))
      let algoliaFullDeliverableResult = deliverableResults?.options.find(result => result.TEXT === value.text)
      setSearchValue(algoliaFullDeliverableResult)
      onUpdateChosenCategory(algoliaFullDeliverableResult);
    }
    else if (value?.type === "OTHER") {
      let newValue = { KEY: '', TEXT: value.text, TYPE: 'OTHER' }
      let algoliaFullDeliverableResult = value.text
      setSearchValue(newValue)
      onUpdateChosenCategory(algoliaFullDeliverableResult);
    }
  }, [value, resultsList]);

  useEffect(() => {
    if (searchResults) {
      const { hits } = searchResults;
      const groupedOptions = [{
        label: (t('searchbar.profileLabel')),
        options: hits.filter(x => x.TYPE === 'PROFILE'),
      }, {
        label: (t('searchbar.briefsLabel')),
        options: hits.filter(x => x.TYPE === 'DELIVERABLE'),
      }];
      setResultsList(groupedOptions);
      setIsLoading(false);
    }
  }, [searchResults, t]);

  const formatGroupLabel = data => (
    <Grid container alignItems="center">
      {data.label === t('searchbar.profileLabel')
        ? <img src={profilIcon} alt={(t('searchbar.profileLabel'))} className={classes.img} />
        : <img src={projectIcon} alt={(t('searchbar.briefsLabel'))} className={classes.img} />}
      <span>{data.label}</span>
    </Grid>
  );

  const formatOptionLabel = ({ TEXT, TAGS }, { inputValue }) => {
    return (
      <>
        {TEXT
          ? (
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
                  textToHighlight={TEXT}
                  highlightClassName={classes.highlight}
                />
              </Grid>
              <Grid item container xs={8}>
                {TAGS && (
                  TAGS.map((tag, key) => (
                    <Grid item xs={4} key={key}>
                      <small>#{tag.toLowerCase()}</small>
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
          )
          : <Typography variant="body2" className={classes.createOption}>{t('searchbar.createMessage')} {inputValue}</Typography>
        }
      </>
    );
  };

  const ValueContainer = ({ children, ...props }) => {
    return (
      <components.ValueContainer {...props}>
        <SearchIcon color={'#000'} className={classes.searchImg} />
        <Grid>{children}</Grid>
      </components.ValueContainer>
    );
  };

  const SingleValue = props => {
    return (
      <components.SingleValue {...props} className={classes.value}>
        {searchValue?.text || props.data.TEXT || newOption?.value}
      </components.SingleValue>
    )
  };

  const handleOnChange = (newValue, actionMeta) => {
    if (actionMeta?.action === "create-option") {
      setNewOption({ title: "Vous avez recherché", value: newValue.value })
    }
    if (actionMeta.action === 'clear') {
      setNewOption({ title: t('leadCreation.reseachLabel') })
    }
    setSearchValue(newValue || null);
    onUpdateChosenCategory(newValue);
  }

  const renderTitle = (title) => {
    switch (title) {
      case "PROFILE":
        return (
          <Grid container alignItems='center'>
            <img src={profilIconYellow} alt='profil' className={classes.img} />
            <Typography variant="h2">&nbsp;{t('searchbar.profileLabel')}</Typography>
          </Grid>
        )
      case "DELIVERABLE":
        return (
          <Grid container alignItems='center'>
            <img src={livrableYellow} alt='livrable' className={classes.img} />
            <Typography variant="h2">&nbsp;{t('searchbar.briefsLabel')}</Typography>
          </Grid>
        )
      case "OTHER":
        return (
          <Grid container alignItems='center'>
            <Typography variant="h2">Vous avez recherché</Typography>
          </Grid>
        )
      default:
        break;
    }
  }

  return (
    <Box my={4}>
      {!hideLabel &&
        <Box my={2} style={{ height: 30 }}>
          <Typography variant="h2">
            {renderTitle(searchValue?.TYPE) || newOption?.title}
          </Typography>
        </Box>}
      <CreatableSelect
        onChange={handleOnChange}
        value={searchValue}
        placeholder={t('searchbar.placeholder')}
        options={resultsList}
        formatOptionLabel={formatOptionLabel}
        formatGroupLabel={formatGroupLabel}
        formatCreateLabel={(inputValue) => `Créer ${inputValue}`}
        isClearable
        classNamePrefix="react-select"
        className={classes.searchbar}
        maxMenuHeight={400}
        getOptionLabel={option => option.TEXT}
        noOptionsMessage={() => loading ? t('searchbar.loading') : t('searchbar.noOptions')}
        filterOption={createFilter({ ignoreAccents: true })} // Prevent lagging with large sets of data
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          ValueContainer,
          SingleValue
        }}
        styles={reactSelectStyles}
        
      />
      {newOption && (
        <Box my={2}>
          <Typography variant="h2">
            {searchValue?.TYPE === "OTHER" &&
              ('« ' + searchValue?.TEXT + ' » ' + t('searchbar.newOption'))
            }
          </Typography>
        </Box>
      )}
    </Box>
  )
};

const CustomSearchbar = connectStateResults(SearchResults)

export default Searchbar;
