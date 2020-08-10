<template>
  <v-dialog
    v-model="value"
    @click:outside="closeDialog"
    max-width="520px"
  >
    <v-card>
      <v-card-title class="headline font-weight-regular">
        {{ $vuetify.lang.t('$vuetify.locks.params_dialog.headline') }}
      </v-card-title>

      <v-card-text v-if="value">
        <v-simple-table>
          <thead>
            <tr>
              <th v-text="$vuetify.lang.t('$vuetify.locks.params_dialog.headers.param')" />
              <th v-text="$vuetify.lang.t('$vuetify.locks.params_dialog.headers.value')" />
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in params">
              <tr
                v-if="item.value"
                :key="i"
              >
                <td>
                  <code>{{ item.key }}</code>
                </td>
                <td>{{ item.value }}</td>
              </tr>
            </template>
          </tbody>
        </v-simple-table>
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          color="info"
          @click="openExternalDoc"
        >
          <v-icon class="mr-2">mdi-information-outline</v-icon>
          {{ $vuetify.lang.t('$vuetify.common.more') }}
        </v-btn>

        <v-spacer />

        <v-btn
          text
          color="accent"
          @click="closeDialog"
        >
          {{ $vuetify.lang.t('$vuetify.common.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script src="@/ui/components/DeviceInfoModal" />
