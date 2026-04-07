import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'Rest API Node.js / Express / Typescript',
            version: "1.0.0",
            description: "API Docs for products"
        }
    },
    apis:['./src/routes.ts']
}

const swaggerSpec = swaggerJSDoc(options);

export const swaggerUiOptions:SwaggerUiOptions = {
    customSiteTitle: 'Documentación REST API Express / Typescript'
}

export default swaggerSpec;