module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    if (ctx.status === 500) {
      console.error(error);
      ctx.body = '';
    } else {
      ctx.body = error.body || error.message;
    }
  }
};
