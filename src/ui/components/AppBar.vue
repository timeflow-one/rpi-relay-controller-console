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
        <v-btn v-for="(item, i) in routes" :key="i" text v-text="item.title" :to="item.route" />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script src="@/ui/components/AppBar" />
