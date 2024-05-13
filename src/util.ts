import { useEffect, useState } from "react";
import { Identifier, RaRecord, RowClickFunction, useDataProvider, useGetOne } from "react-admin";
import { useParams, useLocation, useMatches } from 'react-router-dom';
import { RESOURCE } from "./const/resources";
import { getBaseTemplate } from "./util/resource";

export const getFormData = (object: any) => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());

export const useBasePath = (resource: RESOURCE) => {
    const params = useParams();

    let template = getBaseTemplate(resource) || "";

    const templateIds = [
        'organisation_id',
        'election_id',
        'candidate_id',
        'voter_id',
        'ballot_id'
    ]

    for (const t of templateIds) {
        const id = params[t];
        if (id) {
            template = template.replace(`:${t}`, id)
        }
    }

    return template;
}

export const useShowPath = (resource: RESOURCE) => {
    const basePath = useBasePath(resource);
    return (id: Identifier) => {
        return `${basePath}/${id}`;
    }
}

export const useEditPath = (resource: RESOURCE) => {
    const showPath = useShowPath(resource)

    return (id: Identifier): string => {
        return showPath(id) + "/edit";
    }
}

export const useCreatePath = (resource: RESOURCE): string => {
    const basePath = useBasePath(resource);
    return `${basePath}/create`
}

export const useGetParent = () => {
    const [parent, setParent] = useState<any>(undefined)
    const { getOne } = useDataProvider()

    return (resource: RESOURCE, record: any) => {
        useEffect(() => {
            switch (resource) {
                case RESOURCE.voter:
                    getOne(RESOURCE.election, { id: record.election_id }).then(setParent);
                    return;
                case RESOURCE.ballot:
                    getOne(RESOURCE.election, { id: record.election_id }).then(setParent);
                    return;
                case RESOURCE.candidate:
                    getOne(RESOURCE.ballot, { id: record.ballot_id }).then(setParent);
                    return;
                case RESOURCE.profile:
                    getOne(RESOURCE.candidate, { id: record.candidate_id }).then(setParent);
                    return;
                case RESOURCE.election:
                    getOne(RESOURCE.organisation, { id: record.organisation_id }).then(setParent);
                    return;
            }
        }, [resource, record ? record.id : null])

        return parent;
    }
}



export const titleCase = (s: string) =>
    s
        .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
        .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_

export const fieldLabel = (column: string) => titleCase(column);


export const useParamsOrState = (field: string) => {
    const params = useParams();
    const { state, search } = useLocation();
    if (params && field in params) {
        return params[field];
    }
    if (state && field in state) {
        return state[field];
    }
    if (search) {
        const searchParams = new URLSearchParams(search);
        if (searchParams.has(field)) {
            return searchParams.get(field);
        }
    }
    return undefined;
}