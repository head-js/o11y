import { datadogRum } from '@datadog/browser-rum';


export default function datadog(
  analytics: any,
  settings?: any,
  integrations?: any
): any {
  const defaultOptions = {
  };

  const options = {
    ...defaultOptions,
    ...settings,
  };

  datadogRum.init(options);

  async function addAction(ctx: any): Promise<any> {
    const event = ctx.event;
    datadogRum.addAction(event.event, event);
    return Promise.resolve();
  }

  const plugin: any = {
    name: 'Datadog.com',
    type: 'destination',
    version: '4.21.2-1',
    isLoaded: (): boolean => true,
    load: (): Promise<void> => Promise.resolve(),
    track: addAction,
    // identify: send,
    page: (): Promise<void> => Promise.resolve(),
    // alias: send,
    // group: send,
  }

  return plugin;
}