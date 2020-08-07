import { Module, getModule, VuexModule } from 'vuex-module-decorators'
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
  sites = [{ id: 1, name: 'test' }]
}

export default getModule(SitesStore)
