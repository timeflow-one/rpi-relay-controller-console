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
  static PREFERENCES = 'preferences'

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
      configured: this.configured
    }

    localStorage.setItem(PreferencesStore.PREFERENCES, btoa(JSON.stringify(preferences)))
  }

  @MutationAction({ mutate: ['token', 'configured'], rawError: true })
  async loadPreferences () {
    const preferences = localStorage.getItem(PreferencesStore.PREFERENCES)

    if (preferences) {
      const parsedPreferences = JSON.parse(atob(preferences))

      return {
        token: parsedPreferences.token,
        configured: parsedPreferences.configured
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
