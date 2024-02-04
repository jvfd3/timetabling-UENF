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
    },
    local: {
      page: {
        multiClasses: {
          header: "Title",
        },
      },
      component: {
        classTimeViewTable: {
          header: "header",
        },
        notOfferedSubjects: {
          highlight: "FirstExpectedSemesterHighlight",
        },
        ClassTimeGridCC: {
          table: "TabelaCC",
          headerRow: "HeaderRow",
          topLeftCorner: "TopLeftCorner",
          daysHeader: "daysHeader",
          contentCell: "ContentCell",
          horariosCol: "HorariosCol",
          eachClassInCell: "eachClassInCell",
        },
        filters: {
          item: "filterItem",
          block: "filterBlock",
        },
        CRUDButtons: {
          container: "CRUDButtonsContainer",
        },
        DumbButtons: {
          create: "iconCreate",
          read: "iconRead",
          update: "iconUpdate",
          delete: "iconDelete",
          locked: "iconLocked",
          unlocked: "iconUnlocked",
          inputSubject: "iconInputSubject",
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
