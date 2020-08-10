import { Module, getModule, VuexModule, Mutation, MutationAction, Action } from 'vuex-module-decorators'
import store from '@/store'
import { BackendProvider } from '@/api/providers/BackendProvider'

@Module({
  dynamic: true,
  store,
  name: 'PreferencesStore'
})
class PreferencesStore extends VuexModule {
  /**
   * @private
   * @readonly
   */
  PREFERENCES = 'preferences'

  /** @type {string | null} */
  token = null
  tokenAvailable = false

  /**
   * @param {string | null} token
   */
  @Mutation
  setToken (token) {
    this.token = token
  }

  /**
   * @param {boolean} state
   */
  @Mutation
  setTokenAvailable (state) {
    this.tokenAvailable = state
  }

  @Action
  async save () {
    const preferences = {
      token: this.token,
      token_available: this.tokenAvailable
    }

    localStorage.setItem(this.PREFERENCES, btoa(JSON.stringify(preferences)))
  }

  @MutationAction({ mutate: ['token', 'tokenAvailable'], rawError: true })
  async loadPreferences () {
    const preferences = localStorage.getItem(this.PREFERENCES)

    if (preferences) {
      const parsedPreferences = JSON.parse(atob(preferences))

      return {
        token: parsedPreferences.token,
        tokenAvailable: parsedPreferences.token_available
      }
    } else {
      return {
        token: null,
        tokenAvailable: false
      }
    }
  }

  /**
   * @param {string} token
   */
  @MutationAction({ mutate: ['token', 'tokenAvailable'], rawError: true })
  async checkToken (token) {
    const api = new BackendProvider()
    await api.checkToken(token)

    return {
      token,
      tokenAvailable: true
    }
  }
}

export default getModule(PreferencesStore)
