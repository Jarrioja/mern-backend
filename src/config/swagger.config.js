export const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion",
      description: "Documentacion de la API",
    },
  },
  apis: [`./docs/**/*.yaml`],
};
