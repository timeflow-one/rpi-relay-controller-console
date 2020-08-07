import Axios from 'axios'

export class BackendProvider {
  requestManager = Axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
  })

  /**
   * @returns {Promise<import('axios').AxiosResponse<import('../responses/CommonResponse').CommonResponse<Array<import('@/models/LockTypeModel').LockTypeModel>>>>}
   */
  async getLockTypes () {
    return this.requestManager.get('/api/locks/types')
  }

  /**
   * @returns {Promise<import('axios').AxiosResponse<import('../responses/CommonResponse').CommonResponse<Array<import('@/models/RelayModel').RelayModel>>>>}
   */
  async getRelays () {
    return this.requestManager.get('/api/relays')
  }
}
