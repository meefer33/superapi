import { Request, Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import UserRoles from "supertokens-node/recipe/userroles";
import { tryCatch, isAdmin, router } from './utils'

router.get('/admin/roles', verifySession(isAdmin), async (req: Request, res: Response) => {
    const roles: string[] = (await UserRoles.getAllRoles()).roles
    res.send({roles})
});

router.post('/admin/roles/create', verifySession(isAdmin), async (req: Request, res: Response) => {
    const createRole = await UserRoles.createNewRoleOrAddPermissions(req.body.role, req.body.perm)
    res.send(createRole)
    //createRole.createdNewRole ? res.send({createRole}) : res.send({'error':'Role all ready exists.'})
});

router.post('/admin/roles/remove/perm', verifySession(isAdmin), async (req: Request, res: Response) => {
    const removePerm = await UserRoles.removePermissionsFromRole(req.body.role, req.body.perm)
    removePerm.status === 'UNKNOWN_ROLE_ERROR' ? res.send({'error':'Role does not exist.'}) : res.send(removePerm)
});

router.post('/admin/roles/roleperms', verifySession(isAdmin), async (req: Request, res: Response) => {
    const rolePerms = await UserRoles.getPermissionsForRole(req.body.role)
    rolePerms.status === 'UNKNOWN_ROLE_ERROR' ? res.send({'error':'Role does not exist.'}) : res.send(rolePerms)
});

router.post('/admin/roles/permsroles', verifySession(isAdmin), async (req: Request, res: Response, next:any) => {
    const rolePerm = await tryCatch(UserRoles.getRolesThatHavePermission(req.body.perm),next)
    res.send(rolePerm)
})

router.post('/admin/roles/user/add', verifySession(isAdmin), async (req: SessionRequest, res: Response) => {
    // let userId = req.session!.getUserId(); also add req: SessionRequest
    const addRoleToUser = await UserRoles.addRoleToUser(req.body.userId, req.body.addRole);

    res.send(addRoleToUser)
    /*
    addRoleToUser.status === "UNKNOWN_ROLE_ERROR" ? res.send({'error':'Role does not exist.'}) 
    : 
    addRoleToUser.didUserAlreadyHaveRole === true ? res.send({'error':'Role does not exist.'})
    */
});

export default router;