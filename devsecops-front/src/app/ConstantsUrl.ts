import { environment } from "src/environments/environment";
 
export class ConstantURL {
    public static readonly   GlobalApiUrl= 'http://localhost:3000/'
    /*############################## URL backend  ##############################*/
    // Registration & Login :
    public static readonly LOGIN_URL =  ConstantURL.GlobalApiUrl+"auth/login"
    public static readonly REGISTER_URL =  ConstantURL.GlobalApiUrl+"auth/registre"
    // Todo :
    public static readonly TODO_URL =  ConstantURL.GlobalApiUrl+"todo"
    // Articles :
    public static readonly ARTICLES_LIST_URL =  ConstantURL.GlobalApiUrl+"article/articleList"
    public static readonly ARTICLE_URL =  ConstantURL.GlobalApiUrl+"article/articleList"
    public static readonly ADD_ARTICLE_URL =  ConstantURL.GlobalApiUrl+"article"
    /*############################## URL Admin ################################*/
    public static readonly Users_Url=  ConstantURL.GlobalApiUrl+"admin/allUser"
    public static readonly RecherhceUser_Url=  ConstantURL.GlobalApiUrl+"admin/rechercheUser"
    public static readonly userById_Url=  ConstantURL.GlobalApiUrl+"admin/userById"
    public static readonly UpdateuserById_Url= ConstantURL.GlobalApiUrl+"admin/updateuser"
    
    
}