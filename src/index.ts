import { Environment } from './models/types/config';
import MainServer from './server';

const PORT = 3000;

const environment: Environment = process.env.ENV === 'production'
  ? 'production' : 'development';

const main = new MainServer(environment);

const timeout = setTimeout(() => {
  if (main) {
    const t2 = setTimeout(() => {
      if (main.app) {
        main.app.listen(PORT, () => {
          // eslint-disable-next-line no-console
          console.log(`Server running on port ${PORT} in ${environment} environment`);
        });
        clearTimeout(t2);
      }
    }, 1000);

    clearTimeout(timeout);
  }
}, 1000);
