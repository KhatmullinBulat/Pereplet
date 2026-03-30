import type { ApiFactoryOptions, ApiFactoryRoutes, BaseApiTyped, PaginatedData } from '../types/api.types'
import { useApi } from './useApi'

const defaultRoutes: Required<ApiFactoryRoutes> = {
  getOne: ({ endpoint, id }) => `${endpoint}/${id}/`,
  getAll: ({ endpoint, additional_endpoint }) => additional_endpoint ? `${endpoint}/${additional_endpoint}` : `${endpoint}/`,
  getMore: ({ endpoint, additional_endpoint }) => additional_endpoint ? `${endpoint}/${additional_endpoint}/` : `${endpoint}/`,
  create: ({ endpoint }) => `${endpoint}/`,
  update: ({ endpoint, id }) => `${endpoint}/${id}/`,
  remove: ({ endpoint, id }) => `${endpoint}/${id}/`,
}

/**
 * Factory function to create a CRUD Api service.
 * Generates a standardized methods:
 * - Fetching single items (getOne)
 * - Fetching paginated lists (getAll, getMore)
 * - Creating, updating, and deleting resources (create, update, remove)
 * @template T - Type of a single list item
 * @template K - Type of query parameters
 * @template U - Type of create/update payload
 * @template I - Type of detail view response
 * @param endpoint - Base Api endpoint
 * @example
 * ```ts
 * const ticketsApi = useApiFactory<TicketItem, TicketFilters, CreateTicketForm, TicketDetail>('/api/tickets')
 * ```
 */
export function useApiFactory<T, K extends object, U extends object, I = void, L = PaginatedData<T>>(
  endpoint: string,
  options: ApiFactoryOptions = {},
): BaseApiTyped<T, K, U, I, L> {
  const { $api } = useNuxtApp()
  const routes = {
    ...defaultRoutes,
    ...options.routes,
  }

  const api: BaseApiTyped<T, K, U, I, L> = {
    endpoint,

    getOne(config) {
      return useApi<I>(routes.getOne({
        endpoint,
        id: config.id,
      }), config.options)
    },

    getAll(config) {
      return useApi<L>(routes.getAll({
        endpoint,
        additional_endpoint: config.additional_endpoint,
      }), {
        query: config.params,
        ...config.options,
      })
    },

    getMore(params?: K, additional_endpoint: string = '') {
      return $api<L>(routes.getMore({
        endpoint,
        additional_endpoint,
      }), {
        query: params,
      })
    },

    create(data) {
      return $api<I>(routes.create({ endpoint }), {
        method: 'POST',
        body: data,
      })
    },

    update(id, data) {
      return $api<I>(routes.update({
        endpoint,
        id,
      }), {
        method: 'PATCH',
        body: data,
      })
    },

    remove(id) {
      return $api(routes.remove({
        endpoint,
        id,
      }), {
        method: 'DELETE',
      })
    },
  }

  return api
}
