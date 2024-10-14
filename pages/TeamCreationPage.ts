import { Page, expect } from '@playwright/test';

export class TeamCreationPage {
  constructor(private page: Page) {}

  async selectFormat(format: string, gen: string) {
    await this.page.click('//li[@class="format-select"]//button[@name="format"]');
    const format_value = gen.replace(" ","").toLowerCase()+format.toLowerCase()
    await this.page.click(`//button[@value="${format_value}"]`);
  }

  async addPokemon(name: string) {
    await this.page.click('//button[@name="addPokemon"]');
    await this.page.fill('//input[@name="pokemon"]', name);
    await this.page.keyboard.press('Enter');  
  }

  async validateTeam(format: string, gen: string) {
    await this.page.click('//button[@name="validate"]');
    
    const validationMessage = await this.page.textContent('//div[@class="ps-popup"]//p');

    // ASSERT
    expect(validationMessage).toContain(`Your team is valid for [${gen}] ${format}.`);
  }
}
