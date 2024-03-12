const myStyles = {
  classNames: {
    default: {
      background: "background",
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
          noClasses: "NoOfferedClasses",
        },
        classes: {
          horizontalIcons: "HorizontalIcons",
        },
        main: {
          logo: "Logo",
        },
      },
      component: {
        classItemTable: {
          header: "splitHeader",
          select: "SelectContainer",
          classTimes: "ClassTimes",
        },
        classTimeViewTable: {
          header: "header",
        },
        notOfferedSubjects: {
          highlight: "FirstExpectedSemesterHighlight",
        },
        classTimeTable: {
          padding: "SmallPadding",
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
        PageSelection: {
          PageSelection: "PageSelection",
          PageSelectionHighlight: "PageSelectionHighlight",
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
        maxWidth: "400px",
      }),
      menu: (css) => ({
        /* Menu is the opened window */
        ...css,
        minWidth: "max-content",
        textAlign: "left",
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
