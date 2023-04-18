export const catchError = () => {
  process.on('unhandledRejection', (reason, p) => {
    console.log('Promise: ', p, 'Reason: ', reason);
  });
};
