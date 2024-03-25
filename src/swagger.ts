export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "User API",
    description: "This User Api document that contain a lot of users",
    version: "1.0.0",
  },
  paths: {
    "/user": {
      get: {
        summary: "Get all users",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      username: { type: "string" },
                      email: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/user/{userId}": {
      // Corrected placement of this object
      get: {
        summary: "Get user by ID",
        parameters: [
          {
            name: "userId",
            in: "path",
            description: "ID of the user to get",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User not found" },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update user by ID",
        parameters: [
          {
            name: "userId",
            in: "path",
            description: "ID of the user to update",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserInput",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful update",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User not found" },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete user by ID",
        parameters: [
          {
            name: "userId",
            in: "path",
            description: "ID of the user to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "204": {
            description: "User deleted successfully",
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User not found" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      UserInput: {
        type: "object",
        properties: {
          username: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["username", "email", "password"],
      },
    },
  },
};
