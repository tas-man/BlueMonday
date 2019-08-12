import colors from './color';

const theme = {
  default: {
    // Sections
    topBarColor: colors.turq1,
    mainViewBgColor: colors.gray8,
    bottomBarColor: colors.black,
    fontColor: colors.gray5,
    // Button
    navMenuBtnHover: colors.turq2,
    navMenuItemHover: colors.turq2,
    navMenuItemActive: colors.turq2,
    primaryBtn: colors.turq2,
    primaryBtnHover: colors.turq5,
    secondaryBtn: colors.gray6,
    secondaryBtnHover: colors.gray7,
    buttonBorderOverlay: colors.blackOverlay,
    // Job
    jobListItemBg: colors.gray6,
    jobListItemHover: colors.turq2,
    jobListItemBorderHover: 'white',
    jobListItemTaskCount: colors.gray4,
    jobListItemInfo: colors.gray9,
    jobListItemInfoHover: colors.gray3,
    // Modal
    modalBg: colors.blackOverlay,
    modalContentBg: colors.turq0,
    // Alert
    warning: colors.orange0,
    // Font
    font: 'white',
    accountDescriptor: colors.gray7,
    // Dropdown
    dropdownDivider: 'white',
  },
  // Add more themes
};

export default theme;
