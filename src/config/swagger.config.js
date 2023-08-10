export const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentacion Coder',
      description: 'Documentacion de la API',
      contact: {
        name: 'Jesus Arrioja',
        email: 'hello@jesusarrioja.dev',
      },
    },
  },
  apis: [`./docs/**/*.yaml`],
};
