<template>
  <v-app-bar
    app
    dark
    color="toolbar"
    hide-on-scroll
  >
    <v-toolbar-title v-text="$vuetify.lang.t('$vuetify.appbar.title')" />

    <v-spacer />

    <v-toolbar-items>
      <v-btn
        v-for="(item, i) in routes"
        :key="i"
        text
        :to="item.route"
        :disabled="item.disabled"
      >{{ item.title }}</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script src="@/ui/components/AppBar" />
