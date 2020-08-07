import { Module, getModule, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({
  dynamic: true,
  store,
  name: 'SitesStore'
})
class SitesStore extends VuexModule {

}

export default getModule(SitesStore)
