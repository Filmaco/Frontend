
import axios from "axios";

const ID_LIVRO = 'id_livro';
const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const NAME = 'name';
const RESET_EMAIL = "reset_email";
const VIDEO = "id_video";
const API_URL = 'http://localhost:5110';
const ID = 'id'
const ID_USER = 'id'

const TokenService = {

    // getId() {
    //     return localStorage.getItem(ID_LIVRO)
    // },

    // saveID(acessId: string) {
    //     return localStorage.setItem(ID_LIVRO, acessId)
    // },

    // isAuthenticated(): boolean {
       
    //     return this.getToken() !== null; 
    // },

    getToken(){       
        return localStorage.getItem(TOKEN_KEY)
    },

    saveToken(token:string) {
        return localStorage.setItem(TOKEN_KEY, token)
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    // getRefreshToken() {
    //     return localStorage.getItem(REFRESH_TOKEN_KEY);
    // },

    saveName(name:string) {
        return localStorage.setItem(NAME, name);
    },

    getName() {
        return localStorage.getItem(NAME);
    },

    // removeName() {
    //     return localStorage.removeItem(NAME);
    // },

    // saveRefreshToken(refresh_token:any) {
    //     localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
    // },

    // saveEmail(resetEmail:string) {
    //     localStorage.setItem(RESET_EMAIL, resetEmail);
    // },

    // removeRefreshToken() {
    //     localStorage.removeItem(REFRESH_TOKEN_KEY);
    // },

    // removeEmail(){
    //     localStorage.setItem(RESET_EMAIL, "");
    //     localStorage.removeItem(RESET_EMAIL);
    // },

    saveVideo(idVideo:string) {
        localStorage.setItem(VIDEO, idVideo);
    },

    getVideo(){
        return localStorage.getItem(VIDEO);
    },

    saveUser(id:string) {
        localStorage.setItem(ID_USER, id);
    },

    getUser(){
        return localStorage.getItem(ID_USER);
    },

    // logoutAndRedirect(){
    //     this.removeToken();
    //     //this.removeRefreshToken();

    //     //ApiService?.unmount401Interceptor()
    //     //window.location.replace('/')
    // },

    // getUserRole() {
    //     const token = this.getToken();
    //     if (!token) return null;
    
    //     try {
    //         const base64Url = token.split('.')[1];
    //         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    //             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //         }).join(''));
    
    //         const payload = JSON.parse(jsonPayload);
    
    //         return payload.role || null;
    
    //     } catch (error) {
    //         console.error("Erro ao decodificar o token: ", error);
    //         this.logoutAndRedirect(); 
    //         return null;
    //     }
    // },

    parseToken(str = null) {
        try {
            var token = str ? str : this.getToken();
            let url = ''

            if(token && token != '' && token != 'undefined') {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                let response =  JSON.parse(jsonPayload);
                if(typeof response.actort == 'string'){
                    response.actort = JSON.parse(response.actort);
                }

                
                let parts = url.split('/');
                let code = parts ? parts[parts.length - 1] : null;

                return { response, code };
            }
        }   catch (e) {
                //this.logoutAndRedirect();
        }
    },

    getRole(){
        var result = TokenService.parseToken();
        if(!result || !result.response) return [];
        var user = result.response;
        if(user && user.role.length) return user.role;
        return '';
    },

    isAdmin(){
        return this.getPermissions().indexOf("MODULO_GERAL") !== -1;
    },

    getPermissions(){
        let result = this.parseToken();
        if(!result || !result.response) return [];
        let user = result.response;
        if(!user?.actort) return [];
        return user.actort.Permissoes || user.actort.permissoes;
    },

    checkPermissions(perms = [], roles:any=false){
        if(!roles) roles = this.getPermissions();

        for(let i=0; i < roles.length; i++){
            for(let j=0; j < perms.length; j++){
                if(perms[j] === roles[i])
                    return true;
            }
        }
        return false;
    },

    isUser(){
        return !this.isAdmin();
    },

}

export default TokenService;