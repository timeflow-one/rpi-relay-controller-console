import { Component, Vue, Watch } from 'vue-property-decorator'
import LocksStore from '@/store/LocksStore'

@Component
export default class LocksTableComponent extends Vue {
  columnsConfig = [
    {
      header: this.$vuetify.lang.t('$vuetify.locks.table.headers[0]'),
      hidden: false
    },
    {
      header: this.$vuetify.lang.t('$vuetify.locks.table.headers[1]'),
      hidden: false
    },
    {
      header: this.$vuetify.lang.t('$vuetify.locks.table.headers[2]'),
      hidden: true
    },
    {
      header: this.$vuetify.lang.t('$vuetify.locks.table.headers[3]'),
      hidden: false
    },
    {
      header: this.$vuetify.lang.t('$vuetify.locks.table.headers[4]'),
      hidden: false
    },
    {
      header: this.$vuetify.lang.t('$vuetify.locks.table.headers[5]'),
      hidden: false
    },
    {
      header: this.$vuetify.lang.t('$vuetify.locks.table.headers[6]'),
      hidden: true
    },
    {
      header: this.$vuetify.lang.t('$vuetify.locks.table.headers[7]'),
      hidden: false
    },
    {
      header: this.$vuetify.lang.t('$vuetify.locks.table.headers[8]'),
      hidden: false
    }
  ]

  /** @type {Array<{id: number, delete: {loading: boolean}, open: {loading: boolean}}>} */
  locksActionsState = []

  get locks () {
    return LocksStore.locks.map(it => ({
      id: it.id,
      destination: it.destination,
      site: it.destination.split(String(process.env.VUE_APP_DOOR_SEPARATOR))[0],
      door: it.destination.split(String(process.env.VUE_APP_DOOR_SEPARATOR))[1],
      type: it.type,
      is_enabled: it.is_enabled,
      relay_in: it.relay_in ? it.relay_in.gpio : null,
      relay_out: it.relay_out ? it.relay_out.gpio : null,
      timeout: it.timeout
    }))
  }

  /**
   * @param {import('@/models/LockModel').LockModel} lock
   */
  async openDoor (lock) {
    /** @type {Required<{id: number, delete: {loading: boolean}, open: {loading: boolean}}>} */
    // @ts-ignore
    const lockActionsState = this.locksActionsState.find(it => it.id === lock.id)
    try {
      lockActionsState.open.loading = true
      await LocksStore.openLock(lock)
    } catch (err) {
      // TODO (2020.08.07): Add alert with message
      throw new Error('Not implemented')
    } finally {
      lockActionsState.open.loading = false
    }
  }

  /**
   * @param {import('@/models/LockModel').LockModel} lock
   */
  async deleteDoor (lock) {
    /** @type {Required<{id: number, delete: {loading: boolean}, open: {loading: boolean}}>} */
    // @ts-ignore
    const lockActionsState = this.locksActionsState.find(it => it.id === lock.id)
    try {
      lockActionsState.delete.loading = true
      await LocksStore.removeLock(lock.id)
    } catch (err) {
      // TODO (2020.08.07): Add alert with message
      throw new Error('Not implemented')
    } finally {
      lockActionsState.delete.loading = false
    }
  }

  /**
   * @param {Array<import('@/models/LockModel').LockModel>} locks
   */
  @Watch('locks')
  onLocksChanged (locks) {
    this.locksActionsState.length = 0
    this.locksActionsState.push(...Array.from({ length: locks.length }, (_, k) => ({
      id: locks[k].id,
      delete: {
        loading: false
      },
      open: {
        loading: false
      }
    })))
  }
}
