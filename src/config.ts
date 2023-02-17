import EmailPassword from 'supertokens-node/recipe/emailpassword'
import Session from 'supertokens-node/recipe/session'
import { TypeInput } from 'supertokens-node/types'
import Dashboard from 'supertokens-node/recipe/dashboard'
import UserRoles from 'supertokens-node/recipe/userroles'

export const SuperTokensConfig: TypeInput = {
  framework: 'express',
  supertokens: {
    // this is the location of the SuperTokens core.
    connectionURI: 'https://dev-7f211381a9f111ed8e003f2d6f3c87f9-us-east-1.aws.supertokens.io:3570',
    apiKey: 'cNGHn=QghoT4=uKGNJ-h-9k1vZty7l',
  },
  appInfo: {
    appName: 'SuperTokens Demo App',
    apiDomain: 'http://localhost:3001',
    websiteDomain: 'http://localhost:5174',
    apiBasePath: '/login',
    websiteBasePath: '/login',
  },
  // recipeList contains all the modules that you want to
  // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
  recipeList: [
    EmailPassword.init(),
    Session.init(),
    UserRoles.init(),
    Dashboard.init({
      apiKey: 'cNGHn=QghoT4=uKGNJ-h-9k1vZty7l',
    }),
  ],
}
