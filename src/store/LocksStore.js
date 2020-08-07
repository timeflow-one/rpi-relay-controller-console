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

  @MutationAction({ mutate: ['locks'] })
  async loadLocks () {
    const api = new BackendProvider()
    const locks = await api.getLocks()

    return {
      locks: locks.data.data
    }
  }

  /**
   * @param {import('@/api/requests/LockRequest').LockRequest} lock
   */
  @Action
  async addLock (lock) {
    const api = new BackendProvider()
    await api.addLock(lock)
    await this.loadLocks()
  }

  /**
   * @param {number} lockId
   */
  @Action
  async removeLock (lockId) {
    const api = new BackendProvider()
    await api.removeLock(lockId)
    await this.loadLocks()
  }

  /**
   * @param {import('@/models/LockModel').LockModel} lock
   */
  @Action
  async openLock (lock) {
    const api = new BackendProvider()
    await api.openLock(lock)
  }
}

export default getModule(LocksStore)
