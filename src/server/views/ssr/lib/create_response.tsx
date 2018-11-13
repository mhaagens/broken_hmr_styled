import React from "react";
import { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { renderTemplate } from "@server/views/ssr/lib/render_template";
import App from "@common/components/app";

export const createResponse = (
  req: Request,
  res: Response
): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      const routerContext: any = {};
      const application: string = renderToString(
        <StaticRouter location={req.url} context={routerContext}>
          <App />
        </StaticRouter>
      );
      const html: string = renderTemplate(application);
      resolve(html);
    } catch (e) {
      reject(e);
    }
  });
