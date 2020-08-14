import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { BackendProvider } from '@/api/providers/BackendProvider'
import PreferencesStore from './PreferencesStore'

@Module({
  dynamic: true,
  store,
  name: 'SitesStore'
})
class SitesStore extends VuexModule {
  /**
   * @type {Array<import('@/models/SiteModel').SiteModel>}>}
   */
  sites = []

  @MutationAction({ mutate: ['sites'], rawError: true })
  async loadSites () {
    if (PreferencesStore.token) {
      const api = new BackendProvider()
      const sites = await (await api.getSites(PreferencesStore.token)).data.results

      return {
        sites
      }
    } else {
      throw new Error('Token can\'t be null')
    }
  }
}

export default getModule(SitesStore)
