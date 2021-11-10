import MainServer from './server';

new MainServer().app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port 4000');
});
