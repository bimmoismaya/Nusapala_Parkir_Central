import { expect, test } from "@playwright/test";

export class MasterMember{
    constructor(page){
        this.page='https://parking.abarobotics.com/admin/master/member';
        this.sideMaster=page.locator(':text-is("Master")');
        this.sideMasterMember=page.locator(':text-is("Member")');
        this.btnTambah=page.getByRole('link', { name: 'Tambah' });
        this.textNama=page.locator('[name="user_full_name"]');
        this.noTelp=page.locator('[name="user_no_telp"]');
        this.email=page.locator('[name="email"]');
        this.platNomor=page.getByRole('textbox', { name: 'H XXXX AA' });
        this.dropdownTipeKendaraan=page.locator('[name="vehicle_type"]');
        this.pilihAktivasi=page.locator('[name="vehicle_type"]');
        this.pilihMembership=page.locator('[name="vehicle_type"]');
        this.headerMember=page.getByText('Master / Member');
    }

    async bukaMasterMember(){
        await this.sideMaster.click();
        await this.sideMasterMember.click();
    }

    async expectHalamanMember(){
        await expect(this.page).toHaveURL(this.page);
        await expect(this.headerMember).toBeVisible();
    }

    async hitButtonTambah(){
        await this.btnTambah.click();
    }

    async 
}