import { test, expect } from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {TeamListPage} from '../pages/TeamListPage';
import {TeamCreationPage} from '../pages/TeamCreationPage';
import {PokemonDataPage} from '../pages/PokemonDataPage';
import * as teamData from '../data/teamData.json';

test('Create a valid Paldean Pokémon Team!', async ({page}) => {
    const home = new HomePage(page)
    const pkmnTeams = new TeamListPage(page)
    const teamCreation = new TeamCreationPage(page)
    const pkmnData = new PokemonDataPage(page)

    await home.navigate()
    await home.openTeamBuilder()
    await pkmnTeams.createNewTeam()
    await teamCreation.selectFormat(teamData.format,teamData.gen)
    
    for(const pokemon of teamData.pokemon){
      await teamCreation.addPokemon(pokemon.name)
      await pkmnData.setItem(pokemon.held_item)
      await pkmnData.setNickname(pokemon.nickname)
      await pkmnData.setDetails(pokemon.details)
      await pkmnData.setMoves(pokemon.moves)
      await pkmnData.setEVs(pokemon.effort_values)
      await pkmnData.verifyTotalEvs()
      await page.screenshot({path:`evidences/${pokemon.nickname ? pokemon.nickname : pokemon.name}.png`})
      await pkmnData.goBackToTeam()
    }
    await page.screenshot({path:`evidences/${teamData.region}_team.png`})
    await teamCreation.validateTeam(teamData.format,teamData.gen)
    
    })