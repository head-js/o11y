export interface LegacyIntegrationConfiguration {
//   /* @deprecated - This does not indicate browser types anymore */
//   type?: string

//   versionSettings?: {
//     version?: string
//     override?: string
//     componentTypes?: Array<'browser' | 'android' | 'ios' | 'server'>
//   }

//   bundlingStatus?: string

  // Segment.io specific
  retryQueue?: boolean

  // any extra unknown settings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface LegacySettings {
  integrations: {
    [name: string]: LegacyIntegrationConfiguration
  }

//   middlewareSettings?: {
//     routingRules: RoutingRule[]
//   }

//   enabledMiddleware?: Record<string, boolean>
//   metrics?: MetricsOptions

// //   plan?: Plan

//   legacyVideoPluginsEnabled?: boolean

//   remotePlugins?: RemotePlugin[]
}