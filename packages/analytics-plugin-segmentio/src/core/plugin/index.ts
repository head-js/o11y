import { Analytics } from '../analytics'
import { Context } from '../context'

interface PluginConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any
  priority: 'critical' | 'non-critical' // whether AJS should expect this plugin to be loaded before starting event delivery
}

export interface Plugin {
  name: string
  version: string
  type: 'before' | 'after' | 'destination' | 'enrichment' | 'utility'
  alternativeNames?: string[]

  isLoaded: () => boolean
  load: (
    ctx: Context,
    instance: Analytics,
    config?: PluginConfig
  ) => Promise<unknown>

  // unload?: (ctx: Context, instance: Analytics) => Promise<unknown> | unknown

  // ready?: () => Promise<unknown>
  track?: (ctx: Context) => Promise<Context> | Context
  identify?: (ctx: Context) => Promise<Context> | Context
  page?: (ctx: Context) => Promise<Context> | Context
  // group?: (ctx: Context) => Promise<Context> | Context
  // alias?: (ctx: Context) => Promise<Context> | Context
  // screen?: (ctx: Context) => Promise<Context> | Context
}