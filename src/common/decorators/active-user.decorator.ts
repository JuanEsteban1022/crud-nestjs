import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * createParamDecorator: sirve para inyectar datos adicionales en los parámetros de los controladores.
 * ExecutionContext: En el caso de las aplicaciones basadas en Express, el contexto de ejecución es una instancia de la clase http.Request.
 */
export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
