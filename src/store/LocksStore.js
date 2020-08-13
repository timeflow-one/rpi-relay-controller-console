import { Module, getModule, VuexModule, MutationAction, Action } from 'vuex-module-decorators'
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

  /** @type {Array<import('@/models/LockModel').LockModel>} */
  locks = []

  @MutationAction({ mutate: ['types'], rawError: true })
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

  @MutationAction({ mutate: ['locks'], rawError: true })
  async loadLocks () {
    const api = new BackendProvider()
    const locks = await api.getLocks()

    return {
      locks: locks.data.data
    }
  }

  /**
   * @param {Partial<import('@/api/requests/LockRequest').LockRequest>} lock
   */
  @Action({ rawError: true })
  async addLock (lock) {
    const api = new BackendProvider()
    return api.addLock(lock)
  }

  /**
   * @param {number} lockId
   */
  @Action({ rawError: true })
  async removeLock (lockId) {
    const api = new BackendProvider()
    await api.removeLock(lockId)
  }

  /**
   * @param {import('@/models/LockModel').LockModel} lock
   */
  @Action({ rawError: true })
  async openLock (lock) {
    const api = new BackendProvider()
    await api.openLock(lock)
  }
}

export default getModule(LocksStore)
