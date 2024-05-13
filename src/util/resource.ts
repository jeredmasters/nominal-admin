import { ORG_ROUTES, ResourceRoute } from "../resource-routes";
import { RESOURCE } from "../const/resources";
import { fieldLabel } from "../util";
import { RouteObject } from "react-router-dom";

type ResourseInfoMap = { [resource in RESOURCE]?: ResourceRoute };
type ResourseUrlMap = { [resource in RESOURCE]?: string };
const flatten = (resourceRoute: ResourceRoute): ResourseInfoMap => {
    if (resourceRoute.children) {
        return {
            [resourceRoute.resource]: resourceRoute,
            ...resourceRoute.children
                .map(flatten)
                .reduce((accumulator: ResourseInfoMap, item) => {
                    return Object.assign(accumulator, item);
                }, {}),
        };
    }
    return { [resourceRoute.resource]: resourceRoute };
};
const flattenUrls = (resourceRoute: ResourceRoute, basePath: string = ""): ResourseUrlMap => {
    const path = basePath + "/" + resourceRoute.resource;
    if (resourceRoute.children) {
        const instancePath = path + "/:" + resourceRoute.idName;
        return {
            [resourceRoute.resource]: path,
            ...resourceRoute.children
                .map(c => flattenUrls(c, instancePath))
                .reduce((accumulator: ResourseUrlMap, item) => {
                    return Object.assign(accumulator, item);
                }, {}),
        };
    }
    return { [resourceRoute.resource]: path };
};

const resourceMap = flatten(ORG_ROUTES);
const resourceUrlMap = flattenUrls(ORG_ROUTES)

export const getBaseTemplate = (resource: RESOURCE) => {
    return resourceUrlMap[resource];
}

export const getSingluar = (resource: RESOURCE) => {
    const r = resourceMap[resource];
    if (r && r.labelSingular) {
        return r.labelSingular;
    }
    let title = fieldLabel(resource);
    if (title.endsWith("s")) title = title.slice(0, -1);
    return title;
};

export const getRepresentation = (resource: RESOURCE, value: any) => {
    const r = resourceMap[resource];
    if (r && r.representation) {
        return r.representation(value);
    }
    if ("title" in value) {
        return value.title;
    }
    if ("label" in value) {
        return value.label;
    }
    return value.id;
};


export const resourceToRoutes = (info: ResourceRoute): RouteObject => {
    const bastRoute: RouteObject & { children: RouteObject[] } = {
        id: `base:${info.resource}`,
        path: info.resource,
        children: [],
    };
    if (info.list) {
        bastRoute.children.push({
            id: `list:${info.resource}`,
            index: true,
            element: info.list,
        });
    }
    if (info.create) {
        bastRoute.children.push({
            id: `create:${info.resource}`,
            path: `create`,
            element: info.create,
        });
    }
    const instanceRoute: RouteObject & { children: RouteObject[] } = {
        id: `instance:${info.resource}`,
        path: `:${info.idName}`,
        children: [],
    };
    if (info.show) {
        instanceRoute.children.push({
            id: `show:${info.resource}`,
            index: true,
            element: info.show,
        });
    }
    if (info.edit) {
        instanceRoute.children.push({
            id: `edit:${info.resource}`,
            path: `edit`,
            element: info.edit,
        });
    }
    if (info.children) {
        for (const child of info.children) {
            instanceRoute.children.push(resourceToRoutes(child));
        }
    }
    bastRoute.children.push(instanceRoute);
    return bastRoute;
};
