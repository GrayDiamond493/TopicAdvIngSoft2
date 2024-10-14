import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    
    await this.page.goto('https://play.pokemonshowdown.com/');
  }

  async openTeamBuilder() {
    await this.page.click('//button[@name="joinRoom"]'); 
  }
}
