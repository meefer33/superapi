import EmailPassword from 'supertokens-node/recipe/emailpassword'
import Session from 'supertokens-node/recipe/session'
import { TypeInput } from 'supertokens-node/types'
import Dashboard from 'supertokens-node/recipe/dashboard'
import UserRoles from 'supertokens-node/recipe/userroles'
import dotenv from "dotenv";

dotenv.config();

export const SuperTokensConfig: TypeInput = {
  framework: 'express',
  supertokens: {
    // this is the location of the SuperTokens core.
    connectionURI: process.env.ST_CONNECT_URI as string,
    apiKey: process.env.ST_API_KEY as string,
  },
  appInfo: {
    appName: process.env.ST_APP_NAME as string,
    apiDomain: process.env.ST_API_DOMAIN as string,
    websiteDomain: process.env.ST_WEBSITE_DOMAIN as string,
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    EmailPassword.init(),
    Session.init(),
    UserRoles.init(),
    Dashboard.init({
      apiKey: process.env.ST_API_KEY as string,
    }),
  ],
}
