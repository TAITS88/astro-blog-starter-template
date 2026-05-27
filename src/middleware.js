export function onRequest(context, next) {
  context.locals.runtime = {
    env: context.env
  };

  return next();
}
