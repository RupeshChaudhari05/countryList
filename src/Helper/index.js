export const validateFormData = (values) => {
  const error = {
    name: '',
    rank: '',
    continent: '',
    flag: ''
  };

  if (!values.name) {
    error.name = "Name is required";
  } else if (values.name.length < 3) {
    error.name = "Please enter atleast 3 characaters";
  } else if (values.name.length > 20) {
    error.name = "Maximum 20 characaters allowed";
  }

  const re = /^[0-9\b]+$/;
  if (!values.rank) {
    error.rank = "Rank is required";
  } else if (!re.test(values.rank)) {
    error.rank = "Rank shoud be numaric value";
  }

  if (!values.continent) {
    error.continent = "Continent is required";
  } else if (values.continent.length < 3) {
    error.continent = "Please enter atleast 3 characaters";
  } else if (values.continent.length > 20) {
    error.continent = "Maximum 20 characaters allowed";
  }

  if (!values.flag) {
    error.flag = "Image is required";
  }

  return error
}