import { Component, Vue } from 'vue-property-decorator'
import AddLockComponent from '@/ui/components/AddLockComponent.vue'

@Component({
  components: {
    AddLockComponent
  }
})
export default class LocksView extends Vue {

}
