<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.site_label')" />
        <v-autocomplete
          v-model="selectedSite"
          :items="sites"
          item-text="name"
          item-value="id"
          :placeholder="$vuetify.lang.t('$vuetify.locks.select_site_label')"
          :title="$vuetify.lang.t('$vuetify.locks.select_site_label')"
          outlined
          hide-details
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.door_label')" />
        <v-text-field
          v-model="inputDoorIdentificator"
          :placeholder="$vuetify.lang.t('$vuetify.locks.input_door_label')"
          :title="$vuetify.lang.t('$vuetify.locks.input_door_label')"
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
          class="mt-3"
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
          outlined
          hide-details
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="2"
        hidden
      >
        <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.relay_out_label')" />
        <v-select
          v-model="selectedRelayOut"
          :items="relays"
          item-value="id"
          item-text="gpio"
          :placeholder="$vuetify.lang.t('$vuetify.locks.select_relay_out_label')"
          :title="$vuetify.lang.t('$vuetify.locks.select_relay_out_label')"
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

<script src="@/ui/components/AddLockComponent" />
