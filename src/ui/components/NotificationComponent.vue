<template>
  <v-snackbar
    v-model="model"
    :top="top"
    :right="right"
    :bottom="bottom"
    :left="left"
    :color="status"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        v-bind="attrs"
        @click="closeNotification"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script src="@/ui/components/NotificationComponent" />
