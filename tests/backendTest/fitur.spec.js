import { test, expect } from '@playwright/test';

const BASE_URL = 'https://main-engine-staging.nusapalaparking.com';

test.describe('Backend API Testing - Fitur', () => {

    // Hook ini akan dijalankan sekali sebelum semua test case di dalam describe block ini
    test.beforeAll(async ({ playwright }) => {
        // 1. Buat context request baru khusus untuk login (terpisah dari test context)
        const apiContext = await playwright.request.newContext();

        // 2. Lakukan request Login untuk mendapatkan token
        // Ganti endpoint '/api/v1/auth/login' dan credential sesuai kebutuhan
        /*
        const response = await apiContext.post(`${BASE_URL}/api/v1/auth/login`, {
            data: {
                username: 'USERNAME_ANDA',
                password: 'PASSWORD_ANDA'
            }
        });

        if (response.status() === 200) {
            const body = await response.json();
            // 3. Simpan token ke dalam environment variable
            process.env.JWT_TOKEN = body.token; // Sesuaikan key 'token' dengan respons JSON Anda
            console.log('Token berhasil disimpan ke environment variable.');
        } else {
            console.error('Gagal login, status:', response.status());
        }
        */

        // Contoh placeholder/manual set jika belum ada endpoint login
        if (!process.env.JWT_TOKEN) {
            console.log('Info: JWT_TOKEN belum di-set. Uncomment blok login di atas.');
        }
    });

    test('Sistem mengambil data sesuai urutan (GET)', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/v1/main-engine/features`, {
            headers: {
                // Gunakan token dari environment variable
                'Authorization': `Bearer ${process.env.JWT_TOKEN || ''}`
            }
        });
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('Respon API:', JSON.stringify(body, null, 2));

    });

    test('Sistem get fitur code bervalue Modular', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/v1/main-engine/features`, {
            headers: {
                'Authorization': `Bearer ${process.env.JWT_TOKEN || ''}`
            }
        });
        const body = await response.json();

        const findFitur = body.data.find(item => item.feature_code === 'MODULAR');
        expect(findFitur).toBeDefined();

        expect(findFitur.feature_code).toBe('MODULAR');

        expect(findFitur.feature_active).toBe(true);
    });

    test('Sistem buat fitur baru', async ({ request }) => {
        const randomCode = Math.floor(Math.random() * 1000);
        const response = await request.post(`${BASE_URL}/api/v1/main-engine/features`, {
            headers: {
                'Authorization': `Bearer ${process.env.JWT_TOKEN || ''}`
            },
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

    test('Sistem mengupdate fitur', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/api/v1/main-engine/features/226`, {
            headers: {
                'Authorization': `Bearer ${process.env.JWT_TOKEN || ''}`
            },
            data: {
                feature_active: true,
                feature_code: `AUTO_Update`,
                feature_description: "Test-menggunakan-automation",
                feature_name: "otoupdate",
                parent_feature_id: null
            }
        });
        const body = await response.json();
        console.log('RESPON PUT :', JSON.stringify(body, null, 2));
        expect(response.status()).toBe(200);
    });

});