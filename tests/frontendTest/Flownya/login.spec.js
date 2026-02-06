import {test} from '@playwright/test';

import{
    LoginLocal
} from '../LocatorLocal/loginLocal'

test.describe(' Login aja dulu ', {tag: '@Login'}, () =>{
    let HalamanParkir;

    test.beforeEach(async({ page }) =>{
        HalamanParkir = new LoginLocal(page);
        await HalamanParkir.gotoWebsite();
    })

    test(' flownya ', async () => {
        await HalamanParkir.inputUserInfo('Bimo1234567','12345678');
        await HalamanParkir.expectDashboard();
    })
} );