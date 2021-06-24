export type JsonPrimitives = string | number | boolean | null | undefined | JsonArray | JsonMap
interface JsonMap { [key: string]: JsonPrimitives}
export type JsonArray = JsonPrimitives[]
export type Json = JsonArray | JsonMap
