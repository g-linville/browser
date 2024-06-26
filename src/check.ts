import { type Page } from 'playwright'
import { inspect } from './browse'
import { delay } from './delay'
import { type BrowserSettings } from './settings'

// check checks a checkbox or radio button.
export async function check (page: Page, userInput: string, keywords: string[], matchTextOnly: boolean, settings: BrowserSettings): Promise<void> {
  const locators = await inspect(page, userInput, 'check', matchTextOnly, settings, keywords)
  console.log(locators)
  for (const locator of locators) {
    try {
      await page.check(`${locator}`, { timeout: 5000 })
      await delay(3000)
      break
    } catch (e) {
      try {
        await page.check(`[for=${locator}]`, { timeout: 5000 })
        break
      } catch (e) {
      }
    }
  }
}
