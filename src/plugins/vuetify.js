import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ru from '@/lang/ru.json'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#ed2527',
        secondary: '#424242',
        accent: '#2358a3',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        toolbar: '#2358a3'
      }
    }
  },
  lang: {
    locales: { ru },
    current: 'ru'
  }
})
