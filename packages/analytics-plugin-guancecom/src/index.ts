import { datafluxRum } from '@cloudcare/browser-rum';


export default function guancecom(
  analytics: any,
  settings?: any,
  integrations?: any
): any {
  const defaultOptions = {
    traceType: 'jaeger',
    trackInteractions: true,
  };

  const uniOptions = {
    service: analytics.settings.app.service,
    version: analytics.settings.app.version,
    env: analytics.settings.app.profile,
  };

  const sdkOptions = {
    applicationId: settings.id,
    // settings.token
    datakitOrigin: settings.endpoint,
  };

  const rumOptions = { ...analytics.settings.rum };

  if (rumOptions.beforeSend) {
    // @ts-ignore
    sdkOptions.beforeSend = rumOptions.beforeSend;
  }

  function isDeny(event: any): boolean {
    if (event.type === 'resource') {
      const origins = rumOptions.denyResourceOrigins;
      for (let i = 0; i < origins.length; i += 1) {
        if (event.resource.url.indexOf(origins[i]) > 0) {
          return true;
        }
      }
    }
    return false;
  }
  if (rumOptions.denyResourceOrigins && rumOptions.denyResourceOrigins.length > 0) {
    // @ts-ignore
    if (sdkOptions.beforeSend) {
      // @ts-ignore
      const that = sdkOptions.beforeSend;
       // @ts-ignore
      sdkOptions.beforeSend = function (event, context) {
        if (isDeny(event)) { return false; }
        if (that(event, context) === false) { return false; }
      };
    } else {
    // @ts-ignore
    sdkOptions.beforeSend = function (event, context) {
      if (isDeny(event)) { return false; }
    };
    }
  }

  const options = {
    ...defaultOptions,
    ...uniOptions,
    ...sdkOptions,
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
    version: '2.2.6-1',
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