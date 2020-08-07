import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { BackendProvider } from '@/api/providers/BackendProvider'

@Module({
  dynamic: true,
  store,
  name: 'LocksStore'
})
class LocksStore extends VuexModule {
  /** @type {Array<import('@/models/LockTypeModel').LockTypeModel>} */
  types = []

  @MutationAction({ mutate: ['types'] })
  async loadTypes () {
    const api = new BackendProvider()
    const lockTypes = await api.getLockTypes()

    return {
      types: lockTypes.data.data?.map((it, index) => ({
        id: index,
        type: it
      }))
    }
  }
}

export default getModule(LocksStore)
