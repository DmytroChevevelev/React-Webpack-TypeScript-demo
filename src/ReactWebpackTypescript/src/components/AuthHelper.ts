import 'expose-loader?AuthenticationContext!./../../node_modules/adal-angular/lib/adal.js';

export class AuthHelper {
    createAuthContextFn: adal.AuthenticationContextStatic = AuthenticationContext;
    context: adal.AuthenticationContext;
    constructor() {

        let config = {
            instance: 'https://login.microsoftonline.com/',
            tenant: 'common',
            clientId: 'be616fd0-e709-4297-82b9-6f4acfb0d339',
            redirectUri: 'http://localhost:3000/index.html', // redirect to the URL where login requested
            cacheLocation: 'localStorage'
        };

        this.context = new this.createAuthContextFn(config);
        if (this.context.isCallback(window.location.hash)) {
            this.context.handleWindowCallback();
        }
    }

    token(): string {
        return this.context.getCachedToken('be616fd0-e709-4297-82b9-6f4acfb0d339');
    }

    getTokenBody(token: string) {
        var startPos = token.indexOf('.') + 1;
        var endPos = token.indexOf('.', startPos);
        return token.substring(startPos, endPos);
    }

    b64_to_utf8(str: string) {
        let qs = require('querystring-browser');
        return decodeURIComponent(qs.escape(window.atob(str)));
    }

    getNameFromToken(token: string) {
        var body = this.b64_to_utf8(this.getTokenBody(token));
        var obj = JSON.parse(body);
        return obj.name;
    }

    public login() {
        this.context.login();
    }

    public logOut() {
        this.context.logOut();
    }

    public getName() {
        if (this.token()) {
            return this.getNameFromToken(this.token());
        }
    }
}