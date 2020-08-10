import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import NotificationStore from '@/store/NotificationStore'

@Component
export default class NotificationComponent extends Vue {
  /**
   * @type {boolean}
   */
  @Prop({ default: true })
  top

  /**
   * @type {boolean}
   */
  @Prop({ default: true })
  right

  /**
   * @type {boolean}
   */
  @Prop({ default: false })
  bottom

  /**
   * @type {boolean}
   */
  @Prop({ default: false })
  left

  /** @type {boolean} */
  model = false
  /** @type {string} */
  text = ''
  /** @type {'success' | 'info' | 'error'} */
  status = 'success'

  get message () {
    return NotificationStore.message
  }

  closeNotification () {
    this.model = false
  }

  /**
   * @param {Required<{ message: string, status: 'success' | 'info' | 'error' }>} value
   */
  @Watch('message')
  async onMessageChanged (value) {
    this.model = false
    await new Promise(resolve => setTimeout(resolve, 300))
    this.model = true
    this.text = value.message
    this.status = value.status
  }
}
