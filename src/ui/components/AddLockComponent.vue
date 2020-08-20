<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="2"
      >
        <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.site_label')" />
        <v-autocomplete
          v-model="selectedSite"
          :items="sites"
          item-text="title"
          item-value="id"
          :placeholder="$vuetify.lang.t('$vuetify.locks.select_site_label')"
          :title="$vuetify.lang.t('$vuetify.locks.select_site_label')"
          prepend-inner-icon="mdi-office-building"
          outlined
          hide-details
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="2"
      >
        <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.door_label')" />
        <v-text-field
          v-model="inputDoorIdentificator"
          :placeholder="$vuetify.lang.t('$vuetify.locks.input_door_label')"
          :title="$vuetify.lang.t('$vuetify.locks.input_door_label')"
          prepend-inner-icon="mdi-door-closed-lock"
          outlined
          clearable
          hide-details
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="2"
      >
        <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.timeout_label')" />
        <v-slider
          v-model="timeout"
          color="accent"
          class="px-3 py-3 border rounded"
          prepend-icon="mdi-lock-clock"
          persistent-hint
          step="1"
          min="1"
          max="20"
          hide-details
          thumb-label="always"
          thumb-size="21"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="2"
      >
        <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.lock_type_label')" />
        <v-select
          v-model="selectedLockType"
          :items="lockTypes"
          item-value="id"
          item-text="text"
          :disabled="lockTypes.length <= 1"
          :placeholder="$vuetify.lang.t('$vuetify.locks.select_lock_type_label')"
          :title="$vuetify.lang.t('$vuetify.locks.select_lock_type_label')"
          prepend-inner-icon="mdi-lock-alert"
          outlined
          hide-details
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="2"
      >
        <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.relay_in_label')" />
        <v-select
          v-model="selectedRelayIn"
          :items="relays"
          item-value="id"
          item-text="gpio"
          :placeholder="$vuetify.lang.t('$vuetify.locks.select_relay_in_label')"
          :title="$vuetify.lang.t('$vuetify.locks.select_relay_in_label')"
          prepend-inner-icon="mdi-transit-detour"
          outlined
          hide-details
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="2"
      >
        <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.relay_out_label')" />
        <v-select
          v-model="selectedRelayOut"
          :items="relays"
          item-value="id"
          item-text="gpio"
          :placeholder="$vuetify.lang.t('$vuetify.locks.select_relay_out_label')"
          :title="$vuetify.lang.t('$vuetify.locks.select_relay_out_label')"
          :disabled="selectedSimpleLockType"
          prepend-inner-icon="mdi-transit-detour"
          outlined
          hide-details
        />
      </v-col>
    </v-row>

    <v-layout
      class="my-4"
      justify-end
    >
      <v-btn
        color="accent"
        :disabled="addButtonDisabled"
        :loading="addButtonStateLoading"
        @click="addLock"
      >{{ $vuetify.lang.t('$vuetify.locks.add_lock') }}</v-btn>
    </v-layout>
  </div>
</template>

<style lang="scss" scoped>
.border {
  border: 1px rgba(0, 0, 0, 0.38) solid;
  padding-bottom: 10px !important;
  transition-duration: 0.3s;
  transition-property: border-color;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    border-color: rgba(0, 0, 0, 0.87);
  }
}
</style>

<script src="@/ui/components/AddLockComponent" />
