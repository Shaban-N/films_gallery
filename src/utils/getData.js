export const getParsedFilms = (event) => {
  return new Promise((resolve, reject) => {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function () {
      const text = reader.result;
      const splitted = text.split("\n");
      let resultData = [];
      let start_index = 0;
      splitted.forEach((item, index) => {
        if (item == "") {
          let obj = {};
          let arrayOfProprties = splitted.slice(start_index, index);
          arrayOfProprties.map(property => {
            if (property.includes("Title:")) (obj.title = property.slice(7));
            if (property.includes("Release Year:")) (obj.release = property.slice(14));
            if (property.includes("Format:")) (obj.format = property.slice(8));
            if (property.includes("Stars:")) (obj.stars = property.slice(7));
          })
          start_index = index + 1;
          console.log(obj)
          resultData.push(obj)
        }
      });
      resolve(resultData);
    };
    reader.readAsText(input.files[0]);
  });
};