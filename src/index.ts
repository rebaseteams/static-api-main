import MainServer from './server';

const PORT = 3000;

new MainServer().app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
