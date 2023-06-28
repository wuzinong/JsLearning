import { setupWebAppAuth } from "@veracity/node-auth";
import { Router } from "express";
import { MemoryStore } from "express-session";

export const setupAuth = (app: Router) => {
  const { refreshTokenMiddleware } = setupWebAppAuth({
    app,
    strategy: {
      // Fill these in with values from your Application Credential
      clientId: "361f6eea-a73a-4a70-9506-b8dd20f1fb82",
      clientSecret: "40b9f712b04c47b683f542c97f11a4f9",
      replyUrl: "https://localhost:3000/user",
    },
    session: {
      secret: "U2d8Q~xyA1vu-QUQvc03Pmw~ueurSfotax6XRcyo", // Replace this with your own secret
      store: new MemoryStore(), // Use MemoryStore only for local development
    },
  });

  app.get("/refresh", refreshTokenMiddleware(), (req, res) => {
    console.log("refreshed token");
    res.send({
      updated: Date.now(),
      user: req.user,
    });
  });
};
