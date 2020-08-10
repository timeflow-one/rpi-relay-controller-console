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
        <td
          v-text="item.site"
          :hidden="columnsConfig[0].hidden"
        />
        <td
          v-text="item.door"
          :hidden="columnsConfig[1].hidden"
        />
        <td :hidden="columnsConfig[2].hidden">
          <v-checkbox
            v-model="item.is_enabled"
            readonly
          />
        </td>
        <td
          v-text="item.timeout / 1000"
          :hidden="columnsConfig[3].hidden"
        />
        <td :hidden="columnsConfig[4].hidden">
          <v-chip v-text="$vuetify.lang.t(`$vuetify.locks.type.${item.type}`)" />
        </td>
        <td
          v-if="item.relay_in"
          :hidden="columnsConfig[5].hidden"
        >
          <v-chip v-text="item.relay_in" />
        </td>
        <td
          v-else
          v-text="'-'"
          :hidden="columnsConfig[5].hidden"
        />
        <td
          v-if="item.relay_out"
          :hidden="columnsConfig[6].hidden"
        >
          <v-chip v-text="item.relay_out" />
        </td>
        <td
          v-else
          v-text="'-'"
          :hidden="columnsConfig[6].hidden"
        />
        <td>
          <v-btn
            icon
            color="primary"
            :title="$vuetify.lang.t('$vuetify.locks.table.actions.delete_door')"
            :loading="item.state.delete.loading"
            @click="removeDoor(item)"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </td>
        <td>
          <v-btn
            text
            color="accent"
            :title="$vuetify.lang.t('$vuetify.locks.table.actions.open_door_expand')"
            :loading="item.state.open.loading"
            :disabled="!item.is_enabled"
            @click="openDoor(item)"
          >{{ $vuetify.lang.t('$vuetify.locks.table.actions.open_door') }}</v-btn>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script src="@/ui/components/LocksTableComponent" />
