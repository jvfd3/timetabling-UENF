useEffect(() => {
  const keydownHandler = (event) => {
    if (event.key === "s") {
      document.body.style.overflow = "hidden";
    }
  };

  const keyupHandler = (event) => {
    if (event.key === "s") {
      document.body.style.overflow = "auto";
    }
  };

  window.addEventListener("keydown", keydownHandler);
  window.addEventListener("keyup", keyupHandler);

  return () => {
    window.removeEventListener("keydown", keydownHandler);
    window.removeEventListener("keyup", keyupHandler);
  };
}, []);
