import { httpPost } from '@/utils/http/main';
import { UserInfo } from '@/utils/http/getInfo';

export async function update(
    username:string,
    phone:string,
    avatar:string
):Promise<UserInfo>{
    return await httpPost<{username:string,phone:string,avatar:string},UserInfo>(
        'user/update',
        {username,phone,avatar}
    );
}





// import { httpPost } from '@/utils/http/main';
// import { UserInfo } from '@/utils/http/getInfo';
// export async function login(
//     email:string,
//     password:string
// ):Promise<UserInfo>{
//     return await httpPost<{email:string,password:string},UserInfo>(
//         'user/register',
//         {email,password},
//     )
// }