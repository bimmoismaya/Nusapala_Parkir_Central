import { test, expect } from '@playwright/test';
import { request } from 'http';

const BASE_URL = 'https://main-engine-staging.nusapalaparking.com';

test.describe('Backend API Testing - Fitur', () => {

    test('Sistem mengambil data sesuai urutan (GET)', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/v1/main-engine/features`);
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('Respon API:', JSON.stringify(body, null, 2));

    });

    test('Sistem get fitur code bervalue Modular', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/v1/main-engine/features`);
        const body = await response.json();

        const findFitur = body.data.find(item => item.feature_code === 'MODULAR');
        expect(findFitur).toBeDefined();

        expect(findFitur.feature_code).toBe('MODULAR');

        expect(findFitur.feature_active).toBe(true);
    });

    test('Sistem buat fitur baru', async ({ request }) => {
        const randomCode = Math.floor(Math.random()*1000);
        const response = await request.post(`${BASE_URL}/api/v1/main-engine/features`, {
            data: {
                feature_active: true,
                feature_code: `AUTO_${randomCode}`,
                feature_description: "Test-menggunakan-automation",
                feature_name: "Auto003",
                parent_feature_id: null

            }
        });
        const body = await response.json();
        console.log('Respon POST:', JSON.stringify(body, null, 2));
        expect(response.status()).toBe(201);

    });

})