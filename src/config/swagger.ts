import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Presentation',
                description: 'API operations related to presentations'
            }
        ],
        info: {
            title: 'Rest API Node.js / Express / Typescript',
            version: "1.0.0",
            description: "API Docs for Volcán WebApp"
        }
    },
    apis:['./src/routes.ts']
}

const swaggerSpec = swaggerJSDoc(options);

export const swaggerUiOptions:SwaggerUiOptions = {
    customSiteTitle: 'Documentación REST API Express / Typescript'
}

export default swaggerSpec;