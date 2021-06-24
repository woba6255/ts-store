export declare type JsonPrimitives = string | number | boolean | null | undefined | JsonArray | JsonMap;
interface JsonMap {
    [key: string]: JsonPrimitives;
}
export declare type JsonArray = JsonPrimitives[];
export declare type Json = JsonArray | JsonMap;
export {};
