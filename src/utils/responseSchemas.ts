// schemas must be in the format of OpenAPI schema
// https://spec.openapis.org/oas/v3.0.3#schema-object
/*
{
  "type": enum (Type),
  "format": string,
  "description": string,
  "nullable": boolean,
  "enum": [
    string
  ],
  "maxItems": string,
  "minItems": string,
  "properties": {
    string: {
      object (Schema)
    },
    ...
  },
  "required": [
    string
  ],
  "propertyOrdering": [
    string
  ],
  "items": {
    object (Schema)
  }
}

EXAMPLES:
{ "type": "string", "enum": ["a", "b", "c"] }

{ "type": "string", "format": "date-time" }

{ "type": "integer", "format": "int64" }

{ "type": "number", "format": "double" }

{ "type": "boolean" }

{ "type": "array", "minItems": 3, "maxItems": 3, "items": { "type": ... } }

{ "type": "object",
  "properties": {
    "a": { "type": ... },
    "b": { "type": ... },
    "c": { "type": ... }
  },
  "nullable": true,
  "required": ["c"],
  "propertyOrdering": ["c", "b", "a"]
}
*/


export const storiesResponseSchema = {
  "type": "object",
  "properties": {
    "html": { "type": "string" },
    "markdown": { "type": "string" },
    "date": { "type": "string" },
    "pdfMake": { "type": "object" },
  },
  "required": [
    "html",
    "markdown",
    "date",
    "pdfMake"
  ]
}
