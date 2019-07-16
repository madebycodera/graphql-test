import { isArray } from "lodash";

export default data => {
  if (isArray(data)) {
    return data.map(el => {
      el.id = el._id;
      delete el._id;
      delete el._v;
      return el;
    });
  } else {
    data.id = data._id;
    delete data._id;
    delete data._v;
    return data;
  }
};
