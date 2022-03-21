import { Repository } from 'typeorm';

export type AdvancedSearchQuery = {
    category?: string;
    subcategory?: string;
    query: string;
}

export type AdvancedSearchResults = Array<{
    id: string;
    image: string;
    title: string;
    description: string;
    type: string;
    destinationUrl: string;
}>

export type AdvancedSearchDesiredRepos = Array<{
    name: string;
    repo: Repository<any>;
    options: {
        select: Array<string>
        searchFrom: Array<string>
    }
    mapperFunction: Function
}>
