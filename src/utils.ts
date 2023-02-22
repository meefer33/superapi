import express, { Router } from "express";
import UserRoles from "supertokens-node/recipe/userroles";

export const router: Router = express.Router();

export const tryCatch = async (func: any, next: any) => {
  try {
    const response = await func;
    return response;
  } catch (error: any) {
    //console.log(error)
    //next(error);
  }
};

export const isAdmin = {
  overrideGlobalClaimValidators: async (globalValidators: any) => [
    ...globalValidators,
    UserRoles.UserRoleClaim.validators.includes("admin"),
    // UserRoles.PermissionClaim.validators.includes("edit")
  ],
};
