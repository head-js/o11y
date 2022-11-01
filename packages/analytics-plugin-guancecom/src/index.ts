import { datafluxRum } from '@cloudcare/browser-rum';


export default function guancecom(
  analytics: any,
  settings?: any,
  integrations?: any
): any {
  const defaultOptions = {
    env: 'production',
    version: '1.0.0',
    traceType: 'jaeger',
    trackInteractions: true,
  };

  const options = {
    ...defaultOptions,
    ...settings,
  };

  datafluxRum.init(options);

  async function addAction(ctx: any): Promise<any> {
    const event = ctx.event;
    datafluxRum.addAction(event.event, event);
    return Promise.resolve();
  }

  const guancecom: any = {
    name: 'Guance.com',
    type: 'destination',
    version: '2.1.5-1',
    isLoaded: (): boolean => true,
    load: (): Promise<void> => Promise.resolve(),
    track: addAction,
    // identify: send,
    page: (): Promise<void> => Promise.resolve(),
    // alias: send,
    // group: send,
  }

  return guancecom
}