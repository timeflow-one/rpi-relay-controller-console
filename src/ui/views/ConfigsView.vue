<template>
  <v-layout column>
    <v-subheader
      class="text-uppercase"
      v-text="$vuetify.lang.t('$vuetify.configs.token_header')"
    />

    <v-text-field
      v-model="_token"
      solo
      color="accent"
      :loading="checkTokenProgress"
      :placeholder="$vuetify.lang.t('$vuetify.configs.token_placeholder')"
      @input="onTokenChanged"
      hide-details
    />

    <v-btn
      class="align-self-end mt-4"
      color="accent"
      :disabled="!saveButtonEnabled"
      @click="save"
    >{{ $vuetify.lang.t('$vuetify.common.save') }}</v-btn>
  </v-layout>
</template>

<script src="@/ui/views/ConfigsView" />
