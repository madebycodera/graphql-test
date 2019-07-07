module.exports = async promise => {
  const result = await promise;
  return { updated: !!result[0] };
};
