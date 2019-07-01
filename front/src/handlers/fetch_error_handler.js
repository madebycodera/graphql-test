const errorHandler = (e) => {
    if (e.name === "TypeError" && e.message === "Failed to fetch") {
        console.error(e);
        throw e;
      }

      if (!e.response) {
        console.log("!error.response");
        console.error(e.stack);
      }

      console.log("error");
      console.log(e);

      throw e;
};

export default errorHandler;