const styleFunctions = {
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
};

export default styleFunctions;
