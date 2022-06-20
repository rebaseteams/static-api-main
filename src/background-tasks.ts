import { ConfigInterface } from './models/types/config';
import setPoll from './utils/setPoll';

export function setupBackgroundTasks(config: ConfigInterface): void {
  const { providers: { auth0 }, services: { ccRecommendationService } } = config;

  setPoll(() => auth0.generateToken(), 1 * 60 * 60 * 1000);

  // eslint-disable-next-line no-console
  console.info('Setting recommendation job poller in background');
  setPoll(() => ccRecommendationService.updateRecommendationStatus('30sec'), 30 * 1000);
}
