<template>
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
        :label="$vuetify.lang.t('$vuetify.locks.select_site_label')"
        :title="$vuetify.lang.t('$vuetify.locks.select_site_label')"
        solo
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
        :label="$vuetify.lang.t('$vuetify.locks.input_door_label')"
        :title="$vuetify.lang.t('$vuetify.locks.input_door_label')"
        solo
        clearable
        hide-details
      />
    </v-col>

    <v-col
      cols="12"
      sm="6"
      lg="3"
    >
      <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.lock_type_label')" />
      <v-select
        v-model="selectedLockType"
        :items="lockTypes"
        item-value="id"
        item-text="type"
        :disabled="lockTypes.length <= 1"
        :label="$vuetify.lang.t('$vuetify.locks.select_lock_type_label')"
        :title="$vuetify.lang.t('$vuetify.locks.select_lock_type_label')"
        solo
        hide-details
      />
    </v-col>

    <v-col
      cols="12"
      sm="6"
      lg="3"
    >
      <v-subheader v-text="$vuetify.lang.t('$vuetify.locks.relay_label')" />
      <v-autocomplete
        v-model="selectedRelay"
        :items="relays"
        item-value="id"
        item-text="gpio"
        :label="$vuetify.lang.t('$vuetify.locks.select_relay_label')"
        :title="$vuetify.lang.t('$vuetify.locks.select_relay_label')"
        solo
        hide-details
      />
    </v-col>
  </v-row>
</template>

<script src="@/ui/components/AddLockComponent" />
