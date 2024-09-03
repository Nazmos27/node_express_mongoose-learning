import config from "../config"
import { USER_ROLE } from "../modules/user/user.constant"
import { UserModel } from "../modules/user/user.model"

const superUser = {
    id : '0001',
    email : 'b190501053@law.jnu.ac.bd',
    password : config.super_admin_password,
    needPasswordChange : false,
    role : USER_ROLE.superAdmin,
    status : 'in-progress',
    isDeleted : false,

}

const seedSuperAdmin = async() => {
    const isSuperAdminExist = await UserModel.findOne( {role : USER_ROLE.superAdmin})
    if(!isSuperAdminExist){
        await UserModel.create(superUser)
    }
}

export default seedSuperAdmin;