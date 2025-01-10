const roles = ['user', 'broker', 'admin']

const permissions = {
    admin:  ['create', 'edit', 'delete', 'read'],
    broker: ['create', 'edit', 'read'],
    user:   ['read', 'edit'],
}


function hasAccess(role, action){

    if (permissions[role]) {
        
        return permissions[role].includes(action)

    }


    return false

}


console.log(hasAccess('user', 'edit'));
