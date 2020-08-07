import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'

@Module({
  dynamic: true,
  store,
  name: 'NotificationStore'
})
class NotificationStore extends VuexModule {
  message = ''

  /**
   * @param {string} message
   */
  @MutationAction({ mutate: ['message'] })
  async showMessage (message) {
    return {
      message
    }
  }

  @MutationAction({ mutate: ['message'] })
  async cleanMessage () {
    return {
      message: ''
    }
  }
}

export default getModule(NotificationStore)
