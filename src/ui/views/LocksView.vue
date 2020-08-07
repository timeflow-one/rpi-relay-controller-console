<template>
  <div>
    <v-subheader class="text-uppercase" v-text="$vuetify.lang.t('$vuetify.locks.add_lock_header')" />
    <AddLockComponent />

    <v-divider class="mt-5 mb-2"/>
    <v-subheader class="text-uppercase" v-text="$vuetify.lang.t('$vuetify.locks.list_locks_header')" />
    <LocksTableComponent />
  </div>
</template>

<script src="@/ui/views/LocksView" />
