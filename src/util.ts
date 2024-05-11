import { useEffect, useState } from "react";
import { Identifier, RaRecord, RowClickFunction, useDataProvider, useGetOne } from "react-admin";
import { useParams, useLocation, useMatches } from 'react-router-dom';

export const getFormData = (object: any) => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());

export const useBasePath = (resource: string) => {
    const { organisation_id, election_id, voter_id, candidate_id } = useParams()

    switch (resource) {
        case "organisations":
            return `/organisations`;
        case "elections":
            return `/organisations/${organisation_id}/elections`;
        case "voters":
            return `/organisations/${organisation_id}/elections/${election_id}/voters`;
        case "ballots":
            return `/organisations/${organisation_id}/elections/${election_id}/ballots`;
        case "candidates":
            return `/organisations/${organisation_id}/elections/${election_id}/candidates`;
        case "profiles":
            return `/organisations/${organisation_id}/elections/${election_id}/candidates/${candidate_id}/profiles`;
    }
    return `/organisations/${organisation_id}/${resource}`;
}

export const useShowPath = (resource: string) => {
    const basePath = useBasePath(resource);
    return (id: Identifier) => {
        return `${basePath}/${id}`;
    }
}

export const useEditPath = (resource: string) => {
    const showPath = useShowPath(resource)

    return (id: Identifier): string => {
        return showPath(id) + "/edit";
    }
}

export const useCreatePath = (resource: string): string => {
    const basePath = useBasePath(resource);
    return `${basePath}/create`
}

export const useGetParent = () => {
    const [parent, setParent] = useState<any>(undefined)
    const { getOne } = useDataProvider()

    return (resource: string, record: any) => {
        useEffect(() => {
            switch (resource) {
                case "voters":
                    getOne("elections", { id: record.election_id }).then(setParent);
                    return;
                case "ballots":
                    getOne("elections", { id: record.election_id }).then(setParent);
                    return;
                case "candidates":
                    getOne("ballots", { id: record.ballot_id }).then(setParent);
                    return;
                case "profiles":
                    getOne("candidates", { id: record.candidate_id }).then(setParent);
                    return;
                case "elections":
                    getOne("organisations", { id: record.organisation_id }).then(setParent);
                    return;
            }
        }, [resource, record ? record.id : null])

        return parent;
    }
}

export const useResource = () => {
    const matches = useMatches();
    console.log(matches);
}

export const getRepresentation = (resource: string, value: any) => {
    switch (resource) {
        case "voters":
            return `${value.first_name} ${value.last_name}`
        case "candidates":
            return `${value.first_name} ${value.last_name}`
    }
    if ('title' in value) {
        return value.title
    }
    if ('label' in value) {
        return value.label
    }
    return value.id
}

export const getSingluar = (resource: string) => {
    let title = fieldLabel(resource);
    if (title.endsWith('s')) title = title.slice(0, -1);
    return title;
}



export const titleCase = (s: string) =>
    s
        .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
        .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_

export const fieldLabel = (column: string) => titleCase(column);
