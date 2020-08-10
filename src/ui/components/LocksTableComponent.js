import { Component, Vue } from 'vue-property-decorator'
import LocksStore from '@/store/LocksStore'
import NotificationStore from '@/store/NotificationStore'

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
      timeout: it.timeout,
      state: {
        delete: {
          loading: false
        },
        open: {
          loading: false
        }
      }
    }))
  }

  /**
   * @param {import('@/models/LockModel').LockModel} lock
   */
  async openDoor (lock) {
    const lockActionsState = this.locks.filter(it => it.id === lock.id)[0]
    try {
      lockActionsState.state.open.loading = true
      await LocksStore.openLock(lock)
      NotificationStore.showMessage({
        message: this.$vuetify.lang.t('$vuetify.notifications.door_opened', `${lockActionsState.site}-${lockActionsState.door}`),
        status: 'success'
      })
    } catch (err) {
      console.error(err)

      NotificationStore.showMessage({
        message: this.$vuetify.lang.t('$vuetify.notifications.door_open_failed', `${lockActionsState.site}-${lockActionsState.door}`, err.message),
        status: 'error'
      })
    } finally {
      lockActionsState.state.open.loading = false
    }
  }

  /**
   * @param {import('@/models/LockModel').LockModel} lock
   */
  async removeDoor (lock) {
    const lockActionsState = this.locks.filter(it => it.id === lock.id)[0]
    try {
      lockActionsState.state.delete.loading = true
      await LocksStore.removeLock(lock.id)
      LocksStore.loadLocks()

      NotificationStore.showMessage({
        message: this.$vuetify.lang.t('$vuetify.notifications.door_removed', `${lockActionsState.site}-${lockActionsState.door}`),
        status: 'success'
      })
    } catch (err) {
      console.error(err)

      NotificationStore.showMessage({
        message: this.$vuetify.lang.t('$vuetify.notifications.door_remove_failed', `${lockActionsState.site}-${lockActionsState.door}`, err.message),
        status: 'error'
      })
    } finally {
      lockActionsState.state.delete.loading = false
    }
  }
}
