// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { Login } from '../Login';
import * as Enzyme from 'enzyme';
const Adapter = require('enzyme-adapter-react-16');

describe('Login component tests >', () => {

    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter });
    });

    beforeEach(() => {
        jest.resetModules();        
    });

    test('render Dashboard (authenticated)', () => {

        jest.doMock('../AuthHelper', () => ({
            token: () => { return 'token'; },
            login: () => { },
            logOut: () => { },
            getName: () => { return 'John Dow'; }
        }));

        const authHelper = require('../AuthHelper');

        var props = {
            auth: authHelper,
            infoBar: {
                show: () => { console.log('test'); }
            },
            isBusy: (mode: boolean) => { console.log(mode); }
        };

        const login = Enzyme.shallow(<Login {...props} />);
        var dashboard = login.find('Dashboard');

        expect(dashboard).not.toBeNull;
        expect(dashboard).not.toBeUndefined;
    });

    test('render Login (not authenticated) > SignIn button call AuthHelper.login() method.', () => {

        jest.doMock('../AuthHelper', () => ({
            token: (): string => {                
                return null;
            },
            login: jest.fn(),
            logOut: () => { },
            getName: () => { return ''; }
        }));

        const authHelper = require('../AuthHelper');

        var props = {
            auth: authHelper,
            infoBar: {
                show: () => { console.log('test'); }
            },
            isBusy: (mode: boolean) => { console.log(mode); }
        };

        const login = Enzyme.shallow(<Login {...props} />);
        var signInBtn = login.find('input');

        expect(signInBtn).not.toBeNull;
        expect(signInBtn).not.toBeUndefined;

        signInBtn.simulate('click');
        expect(authHelper.login).toHaveBeenCalledTimes(1);
    });
});