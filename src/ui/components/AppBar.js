import { Component, Vue } from 'vue-property-decorator'
@Component
export default class AppBar extends Vue {
  /**
   * @type {Array<{ title: string, route: Partial<import('vue-router').Route>, disabled: boolean }>}
   */
  routes = [
    {
      title: this.$vuetify.lang.t('$vuetify.routes.locks'),
      route: { name: 'locks' },
      disabled: false
    },
    {
      title: this.$vuetify.lang.t('$vuetify.routes.config'),
      route: { name: 'config' },
      disabled: false
    }
  ]
}
