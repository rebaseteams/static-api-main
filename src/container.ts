import { createContainer, asValue, asClass} from 'awilix';

import { Server } from './interfaces/http/server';
import { Application } from './app/app';
import { CreateUserBrand } from './app/userbrand/create';
import { RemoveUserBrand } from './app/userbrand/remove';
import { GetUserBrand } from './app/userbrand/get';
import { UpdateUserBrand } from './app/userbrand/update';
import { SearchUserBrand } from './app/userbrand/search';

const container = createContainer();

container.register({
    server : asClass(Server).singleton(),
    app : asClass(Application).singleton(),
    createUserBrand : asClass(CreateUserBrand).singleton(),
    removeUserBrand : asClass(RemoveUserBrand).singleton(),
    updateUserBrand : asClass(UpdateUserBrand).singleton(),
    GetUserBrand : asClass(GetUserBrand).singleton(),
    searchUserBrand : asClass(SearchUserBrand).singleton()
});