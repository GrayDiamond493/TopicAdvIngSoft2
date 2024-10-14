import { Page } from '@playwright/test';

export class TeamListPage {
  constructor(private page: Page) {}

  async createNewTeam() {
    await this.page.click('//button[@name="newTop" and @value="team"]');
  }
}
