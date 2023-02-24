import { Response } from "express";
import Session from "supertokens-node/recipe/session";
import { getUserById } from "supertokens-node/recipe/emailpassword";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import { tryCatch, router } from "./utils";
import db from "./db/knexfile";

router.get("/logout", verifySession(), async (req: SessionRequest, res: Response, next) => {
  let session = req.session;
  await tryCatch(Session.revokeSession(session!.getHandle()), next);
  res.send();
});

// An example API that requires session verification
router.get("/sessioninfo", verifySession(), async (req: SessionRequest, res: Response, next) => {
  let session = req.session;
  let userId = session!.getUserId();
  let userInfo = await tryCatch(getUserById(userId), next);
  //let userInfo = await Session.getSessionInformation(session!.getHandle())
  res.send({
    user: userInfo,
    sessionHandle: session!.getHandle(),
    userId: session!.getUserId(),
    accessTokenPayload: session!.getAccessTokenPayload(),
  });
});

router.get("/updateUser", verifySession(), async (req: SessionRequest, res: Response, next) => {
  let userId = req.session!.getUserId();
  let userInfo = await tryCatch(getUserById(userId), next);
  const user = {
    auth_id: userId,
    email: userInfo!.email,
  };

  //await db.migrate.up()

  await db("users")
    .insert(user)
    .onConflict("auth_id")
    .merge()
    .returning("id")
    .then((data) => res.send(data))
    .catch((error) => {
      return res.status(400).send({ status: "400", error: error.message });
    });
});

export default router;
