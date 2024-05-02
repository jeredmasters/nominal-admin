import { Identifier, RaRecord, RowClickFunction } from "react-admin";
import { useParams } from 'react-router-dom';

export const getFormData = (object: any) => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());


export const useShowPath = () => {
    const { organisation_id } = useParams()

    return (id: Identifier, resource: string, record?: RaRecord) => `/organisations/${organisation_id}/${resource}/${id}/show`
}

export const useEditPath = (id: Identifier, resource: string): string => {
    const { organisation_id } = useParams()

    return `/organisations/${organisation_id}/${resource}/${id}`
}

export const useCreatePath = (resource: string): string => {
    const { organisation_id } = useParams()

    return `/organisations/${organisation_id}/${resource}/create`
}