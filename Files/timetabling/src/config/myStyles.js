const myStyles = {
  classNames: {
    default: {
      background: "background",
      PageSelection: "PageSelection",
      PageSelectionSelect: "PageSelectionSelect",
      containerItemSelection: "selectionBar",
      containerCards: "CRUDContainComponents",
      containerCardsHolder: "",
      containerCardBaseInfo: "containerCardBaseInfo",
      componentTable: "showBasicDataTable",
      // infoCard: "infoCard",
      // containerItemBaseInfo: "showBasicDataCard",
    },
    local: {
      page: {},
      component: {
        classTimeViewTable: {
          header: "header",
        },
      },
    },
  },
  selects: {
    className: "SelectList",
    fullWidth: {
      menu: ({ width, ...css }) => ({ ...css }),
    },
    fixedWidth: {
      menu: ({ width, ...css }) => ({ ...css, width: 300 }),
    },
    fullItem: {
      control: (css) => ({
        ...css,
        width: "100%",
      }),
      menu: (css) => ({
        ...css,
        minWidth: "max-content",
        zIndex: 2,
      }),
      option: (css) => ({
        ...css,
        width: "100%",
      }),
    },
  },
};

// export { defaultClassNames: myStyles.classNames.default };
export default myStyles;
