import {test} from '@playwright/test';

import{
    LoginNP
} from '../Login/login'

test.describe(' Login aja dulu ', {tag: '@Login'}, () =>{
    let HalamanParkir;

    test.beforeEach(async({ page }) =>{
        HalamanParkir = new LoginNP(page);
        await HalamanParkir.gotoWebsite();
    })

    test(' flownya ', async () => {
        await HalamanParkir.inputUserInfo('Bimo1234567','12345678');
        await HalamanParkir.expectDashboard();
    })
} );