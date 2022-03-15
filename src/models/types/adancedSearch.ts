export type AdvancedSearchQuery = {
    category: string;
    subcategory: string;
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
