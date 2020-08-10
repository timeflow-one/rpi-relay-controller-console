import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'

@Module({
  dynamic: true,
  store,
  name: 'SitesStore'
})
class SitesStore extends VuexModule {
  /**
   * @type {Array<{id: number; name: string}>}
   */
  sites = []

  @MutationAction({ mutate: ['sites'], rawError: true })
  async loadSites () {
    // TODO (2020.08.10): Load sites
    return {
      sites: [{ id: 1, name: 'test' }, { id: 2, name: 'test_app' }]
    }
  }
}

export default getModule(SitesStore)
