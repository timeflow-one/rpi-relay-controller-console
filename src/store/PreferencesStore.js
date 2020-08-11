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
  configured = false

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
  setConfigured (state) {
    this.configured = state
  }

  @Action
  async save () {
    const preferences = {
      token: this.token,
      token_available: this.configured
    }

    localStorage.setItem(this.PREFERENCES, btoa(JSON.stringify(preferences)))
  }

  @MutationAction({ mutate: ['token', 'configured'], rawError: true })
  async loadPreferences () {
    const preferences = localStorage.getItem(this.PREFERENCES)

    if (preferences) {
      const parsedPreferences = JSON.parse(atob(preferences))

      return {
        token: parsedPreferences.token,
        configured: parsedPreferences.token_available
      }
    } else {
      return {
        token: null,
        configured: false
      }
    }
  }

  /**
   * @param {string} token
   */
  @MutationAction({ mutate: ['token'], rawError: true })
  async checkToken (token) {
    const api = new BackendProvider()
    await api.checkToken(token)

    return {
      token
    }
  }
}

export default getModule(PreferencesStore)
