<template>
  <v-simple-table>
    <thead>
      <tr>
        <th
          class="text-left"
          v-for="(item, i) in columnsConfig"
          :key="i"
          v-text="item.header"
        />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in locks"
        :key="i"
      >
        <td v-text="item.site" />
        <td v-text="item.door" />
        <td>
          <v-chip v-text="item.type" />
        </td>
        <td v-if="item.relay_in">
          <v-chip v-text="item.relay_in" />
        </td>
        <td
          v-else
          v-text="'-'"
        />
        <td v-if="item.relay_out">
          <v-chip v-text="item.relay_out" />
        </td>
        <td
          v-else
          v-text="'-'"
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
