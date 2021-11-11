import MainServer from './server';

new MainServer().app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port 3000');
});
