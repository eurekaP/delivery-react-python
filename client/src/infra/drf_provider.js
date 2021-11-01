import {
    Identifier,
    Pagination,
    Sort,
    Filter,
    DataProvider,
} from 'ra-core'
import { stringify } from 'query-string'


const getPaginationQuery = (pagination: Pagination) => {
    return {
        offset: (pagination.page - 1) * pagination.perPage,
        limit: pagination.perPage,
    }
}


const getFilterQuery = (filter: Filter) => {
    const { q: search, ...otherSearchParams } = filter
    return {
        ...otherSearchParams,
        search,
    }
}


const getOrderingQuery = (sort: Sort) => {
    const { field, order } = sort
    if (field === 'id')
        return {}
    return {
        ordering: `${order === 'ASC' ? '' : '-'}${field}`,
    }
}


const resource2filefields = {
    trucks: ['photo'],
}


const company_resources = {
    trucks:  'trucks',
    members: 'members',
}


const DrfProvider = (auth_store): DataProvider => {
    const api = auth_store.api
    const getOneJson = (resource: String, id: Identifier) => {
        return api.sendRequest('get', `${resource}/${id}/`)
    }

    const fixCompanyResource = (resource) => {
        const path = company_resources[resource]
        if (path) {
            resource = `my_fleets/${auth_store.currentCompanyId}/${path}`
        }
        return resource
    }

    function data_and_files( resource, params) {
        var data = params.data

        var file_fields4resource = resource2filefields[ resource] || []
        var file_fields4add = []
        var file_fields_no_change = []
        Object.entries( data).forEach( entry => {
            const [k, v] = entry
            if (file_fields4resource.includes( k) && v) {
                if (v.rawFile) {
                    file_fields4add.push( k)
                    return
                }
                file_fields_no_change.push( k)
            }
        })
        if ( file_fields4add.length) {
            data = new FormData()
            Object.entries( params.data).forEach( entry => {
                const [k, v] = entry
                if (file_fields4add.includes( k)) {
                    data.append( k, v.rawFile, v.rawFile.name)
                    return
                    }
                if (file_fields_no_change.includes( k))
                    return
                //HACK to send null in formData use empty string
                data.append( k, v === null ? '' : v )
            })
        } else {
            file_fields_no_change.forEach( ff => delete data[ ff])
        }

        return [ data, file_fields4add ]
    }

    return {
        getList: async (resource, params) => {
            resource = fixCompanyResource(resource)
            const query = {
                ...getFilterQuery(params.filter),
                ...getPaginationQuery(params.pagination),
                ...getOrderingQuery(params.sort),
            }
            const json = await api.sendRequest('get', `${resource}/?${stringify(query)}`)
            return {
                data: json.results || json,
                total: json.count === undefined ? json.length : json.count,
            }
        },
        getOne: async (resource, params) => {
            resource = fixCompanyResource(resource)
            const data = await getOneJson(resource, params.id)
            return { data, }
        },
        getMany: (resource, params) => {
            resource = fixCompanyResource(resource)
            return Promise.all(
                params.ids.map(id => getOneJson(resource, id))
            ).then(data => ({ data }))
        },

        getManyReference: async (resource, params) => {
            resource = fixCompanyResource(resource)
            const query = {
                ...getFilterQuery(params.filter),
                ...getPaginationQuery(params.pagination),
                ...getOrderingQuery(params.sort),
                [params.target]: params.id,
            }
            const json = await api.sendRequest(`${resource}/?${stringify(query)}`)
            return {
                data: json.results,
                total: json.count,
            }
        },
        update: async (resource, params) => {
            const [ data, file_fields ] = data_and_files( resource, params)

            resource = fixCompanyResource( resource)
            const json = await api.sendRequest(
                'patch',
                `${resource}/${params.id}/`,
                data,
                file_fields.length ? { headers: {'content-type': 'multipart/form-data'}} : undefined,
            )
            return { data: json }
        },
        updateMany: (resource, params) => {
            resource = fixCompanyResource(resource)
            return Promise.all(
                params.ids.map(
                    id => api.sendRequest('patch', `${resource}/${id}/`, params.data)
                )
            ).then( responses => ({ data: responses.map(( json ) => json.id) }))
        },
        create: async (resource, params) => {
            const [ data, file_fields ] = data_and_files( resource, params)

            resource = fixCompanyResource(resource)
            const json = await api.sendRequest('post', `${resource}/`, data,
                file_fields.length ? { headers: {'content-type': 'multipart/form-data'}} : undefined,
                )
            return {
                data: { ...json },
            }
        },
        delete: (resource, params) => {
            resource = fixCompanyResource(resource)
            return api.sendRequest('delete', `${resource}/${params.id}/`)
                .then(() => ({ data: params.previousData }))
        },
        deleteMany: (resource, params) => {
            resource = fixCompanyResource(resource)
            return Promise.all(
                params.ids.map(
                    id => api.sendRequest('delete', `${resource}/${id}/`)
                )
            ).then( responses => ({ data: responses.map( json => json.id) }))
        },
    }
}


export default DrfProvider

// vim:ts=4:sw=4:expandtab
