import { Module, getModule, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({
  dynamic: true,
  store,
  name: 'LocksStore'
})
class LocksStore extends VuexModule {

}

export default getModule(LocksStore)
