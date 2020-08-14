import Axios from 'axios'

export class BackendProvider {
  /**
   * @private
   */
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

  /**
   * @returns {Promise<import('axios').AxiosResponse<import('../responses/CommonResponse').CommonResponse<Array<import('@/models/LockModel').LockModel>>>>}
   */
  async getLocks () {
    return this.requestManager.get('/api/locks')
  }

  /**
   * @param {Partial<import('../requests/LockRequest').LockRequest>} lock
   * @returns {Promise<import('axios').AxiosResponse<import('../responses/CommonResponse').CommonResponse<import('@/models/LockModel').LockModel>>>}
   */
  async addLock (lock) {
    return this.requestManager.post('/api/locks', lock)
  }

  /**
   * @param {number} lockId
   * @returns {Promise<import('axios').AxiosResponse<void>>}
   */
  async removeLock (lockId) {
    return this.requestManager.delete(`/api/locks/${lockId}`)
  }

  /**
   * @param {import('@/models/LockModel').LockModel} lock
   * @returns {Promise<import('axios').AxiosResponse<void>>}
   */
  async openLock (lock) {
    return this.requestManager.post('/lock/open', {
      source: lock.destination,
      initiator: 'console'
    })
  }

  /**
   * @param {string} token
   * @param {object} params
   * @returns {Promise<import('axios').AxiosResponse<import('../responses/ApiResponse').ApiResponse<Array<import('@/models/SiteModel').SiteModel>>>>}
   */
  async getSites (token, params = {}) {
    return this.requestManager.get('/api/sites', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    })
  }

  /**
   * @param {string} token
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  async checkToken (token) {
    // TODO (2020.08.12): Check token
    // throw new Error('Not implemented')
    return this.requestManager.get('/api/sites', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
