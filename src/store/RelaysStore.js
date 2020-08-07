import { Module, getModule, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({
  dynamic: true,
  store,
  name: 'RelaysStore'
})
class RelaysStore extends VuexModule {

}

export default getModule(RelaysStore)
