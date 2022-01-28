import { Environment } from './models/types/config';
import MainServer from './server';

const PORT = 3000;

const environment: Environment = process.env.ENV === 'production'
  ? 'production' : 'development';

new MainServer(environment).app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT} in ${environment} environment`);
});
