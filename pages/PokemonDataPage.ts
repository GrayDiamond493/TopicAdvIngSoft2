import { expect, Page } from '@playwright/test';

export class PokemonDataPage {
  constructor(private page: Page) {}

  async setItem(item: string) {
    await this.page.fill('//input[@name="item"]', item);
  }

  async setNickname(nickname: string) {
    await this.page.fill('//input[@name="nickname"]', nickname);
  }

  async setDetails(details: {level: string; gender: string; shiny: string}) {
    await this.page.click('//button[@name="details"]')
    await this.page.fill('//input[@name="level"]', details.level);
    const genderSelector = `//input[@type="radio" and @name="gender" and @value="${details.gender}"]`
    const isGenderSelectable = await this.page.locator(genderSelector).isVisible();

  if (isGenderSelectable) {
    await this.page.click(genderSelector);
  } else {
    console.log(`Pokémon has fixed gender`);
  }

    
  await this.page.click(`//input[@type="radio" and @name="shiny" and @value="${details.shiny}"]`);
  }

  async setMoves(moves: { move1: string; move2: string; move3: string; move4: string }) {
    await this.page.fill('//input[@name="move1"]', moves.move1);
    await this.page.fill('//input[@name="move2"]', moves.move2);
    await this.page.fill('//input[@name="move3"]', moves.move3);
    await this.page.fill('//input[@name="move4"]', moves.move4);
  }

  async setEVs(evs: { hp: string; atk: string; def: string; spa: string; spd: string; spe: string }) {
    await this.page.click('//button[@name="stats"]')
    await this.page.fill('//input[@name="evslider-hp"]', evs.hp);
    await this.page.fill('//input[@name="evslider-atk"]', evs.atk);
    await this.page.fill('//input[@name="evslider-def"]', evs.def);
    await this.page.fill('//input[@name="evslider-spa"]', evs.spa);
    await this.page.fill('//input[@name="evslider-spd"]', evs.spd);
    await this.page.fill('//input[@name="evslider-spe"]', evs.spe);
  }

  async verifyTotalEvs() {
    const remainingEVs = await this.page.textContent('//div[@class="totalev"]//em');
    expect(remainingEVs).toEqual("0");
  }

  async goBackToTeam() {
    await this.page.click('//button[@name="back"]'); 
  }
}
