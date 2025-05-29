# Websim Development Context

This document outlines the context, tools, and APIs available for developing interactive web content on the Websim platform.

## Websim Database Documentation

WebsimSocket features built-in support for collections and access to users' usernames and avatars.

**Initialization:**
```javascript
// Do this at the global scope, even in React.
const room = new WebsimSocket({
  schema: {
    drawing: {
      id: "uuid",
      url: "text",
    },
    reactions: {
      id: "uuid",
      drawing_id: "uuid",
      type: "text",
    },
  },
});

// Valid column types: "text" | "uuid" | "boolean" | "timestamptz" | "integer" | "numeric" | "jsonb"

console.log(room.schema);
// {
//   drawing: { id: 'uuid', url: 'text', user_id: 'uuid', username: 'text', created_at: 'timestamptz', updated_at: 'timestamptz' },
//   reactions: { id: 'uuid', drawing_id: 'uuid', type: 'text', user_id: 'uuid', username: 'text', created_at: 'timestamptz', updated_at: 'timestamptz' },
//   user: { id: 'uuid', username: 'text', avatar_url: 'text', created_at: 'timestamptz' }
// }
// Note how the schema has been expanded to include the managed columns.