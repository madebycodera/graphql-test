module.exports = ({ orderBy, sortBy, completed }) => {
  let params = {};
  if (typeof completed !== 'undefined') {
    params.where = { completed };
  }
  if (orderBy) {
    params.order = [[orderBy]];
    if (sortBy) {
      params.order[0].push(sortBy);
    }
  }
  return params;
};
