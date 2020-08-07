import { Component, Vue } from 'vue-property-decorator'
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
      hidden: false
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
      hidden: true
    },
    {
      header: this.$vuetify.lang.t('$vuetify.locks.table.headers[6]'),
      hidden: false
    }
  ]

  get locks () {
    return LocksStore.locks.map(it => ({
      id: it.id,
      site: it.destination.split(String(process.env.VUE_APP_DOOR_SEPARATOR))[0],
      door: it.destination.split(String(process.env.VUE_APP_DOOR_SEPARATOR))[1],
      type: it.type,
      relay_in: it.relay_in ? it.relay_in.gpio : null,
      relay_out: it.relay_out ? it.relay_out.gpio : null,
      timeout: it.timeout
    }))
  }
}
