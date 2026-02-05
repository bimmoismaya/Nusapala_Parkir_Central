import {test} from '@playwright/test';

import{
    LoginCentral
} from '../LocatorCentral/LoginCentral'

test.describe(' Login Central', {tag: '@Login'}, ()=>{
    let HalamanCentral;

    test.beforeEach(async({page})=>{
        HalamanCentral = new LoginCentral(page);
        await HalamanCentral.gotoCentralWeb();
    })

    test(' Flow Login', async()=>{
        await HalamanCentral.inputUserInfo('bimmoStaging', 'nba1234567');
        await HalamanCentral.expectDashboard();
    })
})