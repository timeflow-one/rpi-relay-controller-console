<template>
  <v-simple-table>
    <thead>
      <tr>
        <th
          class="text-left"
          v-for="(item, i) in columnsConfig"
          :key="i"
          v-text="item.header"
          :hidden="item.hidden"
        />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in locks"
        :key="i"
      >
        <td v-text="item.site" :hidden="columnsConfig[0].hidden" />
        <td v-text="item.door" :hidden="columnsConfig[1].hidden" />
        <td v-text="item.timeout / 1000" :hidden="columnsConfig[2].hidden" />
        <td :hidden="columnsConfig[3].hidden">
          <v-chip v-text="$vuetify.lang.t(`$vuetify.locks.type.${item.type}`)" />
        </td>
        <td v-if="item.relay_in" :hidden="columnsConfig[4].hidden">
          <v-chip v-text="item.relay_in" />
        </td>
        <td
          v-else
          v-text="'-'"
          :hidden="columnsConfig[4].hidden"
        />
        <td v-if="item.relay_out" :hidden="columnsConfig[5].hidden">
          <v-chip v-text="item.relay_out" />
        </td>
        <td
          v-else
          v-text="'-'"
          :hidden="columnsConfig[5].hidden"
        />
        <td>
          <v-btn class="mx-1" icon color="accent" :title="$vuetify.lang.t('$vuetify.locks.table.actions.open_door')">
            <v-icon>mdi-lock-open-variant-outline</v-icon>
          </v-btn>

          <v-btn class="mx-1" icon color="primary" :title="$vuetify.lang.t('$vuetify.locks.table.actions.delete_door')">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script src="@/ui/components/LocksTableComponent" />
