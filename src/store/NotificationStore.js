import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'

@Module({
  dynamic: true,
  store,
  name: 'NotificationStore'
})
class NotificationStore extends VuexModule {
  /** @type {Required<{ message: string, status: 'success' | 'info' | 'error' }>} */
  message = { message: '', status: 'success' }

  /**
   * @param {Required<{ message: string, status: 'success' | 'info' | 'error' }>} message
   */
  @MutationAction({ mutate: ['message'], rawError: true })
  async showMessage (message) {
    return {
      message
    }
  }
}

export default getModule(NotificationStore)
