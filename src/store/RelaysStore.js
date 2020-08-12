import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { BackendProvider } from '@/api/providers/BackendProvider'

@Module({
  dynamic: true,
  store,
  name: 'RelaysStore'
})
class RelaysStore extends VuexModule {
  /** @type {Array<import('@/models/RelayModel').RelayModel>} */
  relays = []

  @MutationAction({ mutate: ['relays'], rawError: true })
  async loadRelays () {
    const api = new BackendProvider()
    const relays = await api.getRelays()

    return {
      relays: relays.data.data?.map((it) => ({
        id: it.id,
        gpio: it.gpio
      }))
    }
  }
}

export default getModule(RelaysStore)
