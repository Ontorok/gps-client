import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtImage from '@coremat/CmtImage';
import CmtList from '@coremat/CmtList';
import { IconButton, Popover, useTheme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AppContext from '../../../contextProvider/AppContextProvider/AppContext';
import { flags, languageData } from './data';
import LanguageItem from './LanguageItem';

const useStyles = makeStyles(() => ({
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 14,
      paddingBottom: 14
    }
  },
  perfectScrollbarLanguage: {
    height: 324
  },
  menuItemRoot: {
    paddingTop: 0,
    paddingBottom: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  popoverRoot: {
    '& .MuiPopover-paper': {
      width: 205
    }
  }
}));

const LanguageSwitcher = () => {
  const classes = useStyles();
  const { locale, setLocale } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'language' : undefined;

  const switchLanguage = item => {
    setLocale(item);
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton size="small" onClick={handleClick} data-tut="reactour__localization">
        <CmtImage src={flags[locale.locale]} />
      </IconButton>

      <Popover
        className={classes.popoverRoot}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <CmtCard className={classes.cardRoot}>
          <CmtCardHeader
            title="Language"
            separator={{
              color: theme.palette.borderColor.dark,
              borderWidth: 1,
              borderStyle: 'solid'
            }}
          />
          <PerfectScrollbar className={classes.perfectScrollbarLanguage}>
            <CmtList data={languageData} renderRow={(item, index) => <LanguageItem key={index} language={item} onClick={switchLanguage} />} />
          </PerfectScrollbar>
        </CmtCard>
      </Popover>
    </React.Fragment>
  );
};

export default LanguageSwitcher;
