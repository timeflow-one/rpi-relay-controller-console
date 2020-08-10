import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class DeviceInfoModal extends Vue {
  /**
   * @typedef {object} Lock
   * @property {number} id
   * @property {string} destination
   * @property {string} site
   * @property {string} door
   * @property {import('@/models/LockType').LockType} type
   * @property {boolean} is_enabled
   * @property {number | null} relay_in
   * @property {number | null} relay_out
   * @property {number} timeout
   * @property {object} state
   * @property {object} state.delete
   * @property {boolean} state.delete.loading
   * @property {object} state.open
   * @property {boolean} state.open.loading
   */

  /**
   * @type {boolean}
   */
  @Prop({ default: false })
  value

  /** @type {Partial<Lock>} */
  @Prop()
  lock

  closeDialog () {
    this.$emit('input', false)
  }

  openExternalDoc () {
    throw new Error('Not implemented')
  }

  /**
   * @returns {Array<{ key: string, value: any }>}
   */
  get params () {
    return [
      {
        key: 'acs',
        value: true
      },
      {
        key: 'acs_address',
        value: process.env.VUE_APP_BASE_URL
      },
      {
        key: 'acs_door',
        value: this.lock?.door
      },
      {
        key: 'acs_auth',
        value: this.$vuetify.lang.t('$vuetify.locks.params_dialog.values.manual')
      },
      {
        key: 'acs_action',
        value: this.$vuetify.lang.t('$vuetify.locks.params_dialog.values.manual')
      }
    ]
  }
}
