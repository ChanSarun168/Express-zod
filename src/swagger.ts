export const swaggerDocument = {
        "openapi": "3.0.0",
        "info": {
          "title": "User API",
          "description": "This User Api document that contain a lot of users",
          "version": "1.0.0"
        },
        "paths": {
          "/user": {
            "get": {
              "summary": "Get all users",
              "responses": {
                "200": {
                  "description": "Successful response",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": { "type": "string" },
                            "username": { "type": "string" },
                            "email": { "type": "string" }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "post": {
                "summary": "Create a new user",
                "requestBody": {
                  "required": true,
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "username": {
                            "type": "string",
                            "description": "Username of the new user"
                          },
                          "email": {
                            "type": "string",
                            "description": "Email address of the new user"
                          },
                          "password": {
                            "type": "string",
                            "description": "Password for the new user"
                          }
                        },
                        "required": ["username", "email", "password"]
                      }
                    }
                  }
                },
                "responses": {
                  "201": {
                    "description": "Created",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "object",
                          "properties": {
                            "id": { "type": "string" },
                            "username": { "type": "string" },
                            "email": { "type": "string" }
                          }
                        }
                      }
                    }
                  },
                  "400": {
                    "description": "Bad Request",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "object",
                          "properties": {
                            "message": { "type": "string" }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
};
