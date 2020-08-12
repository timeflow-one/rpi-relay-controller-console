<template>
  <v-app>
    <AppBar />

    <v-main>
      <v-container>
        <router-view />

        <NotificationComponent />
      </v-container>
    </v-main>
  </v-app>
</template>

<script src="@/ui/views/AppView" />
