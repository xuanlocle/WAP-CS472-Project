import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "English Dictionary Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
            },
            contact: {
                name: "Xuan Loc Le",
                email: "xuanloc.le@miu.edu",
            },
        },
        servers: [
            {
                url: 'http://localhost:3001/',
            },
        ],
    },
    apis: ['./routers/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}