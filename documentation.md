# Websim Development Context

This document outlines the context, tools, and APIs available for developing interactive web content on the Websim platform.

## Websim Database Documentation

### WebsimSocket Overview

WebsimSocket provides real-time database capabilities with built-in support for collections and access to users' usernames and avatars.

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

