export const extractServerError = (serverError) => {
  let errors = [{ title: "Error!", detail: "Ooops, something went wrong!" }];
  if (serverError && serverError.data && serverError.data.errors) {
    errors = serverError.data.errors;
  }
  return errors;
};
