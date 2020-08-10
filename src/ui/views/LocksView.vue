<template>
  <div v-if="hasInit">
    <v-expansion-panels
      v-model="expanded"
      focusable
      flat
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-subheader
            class="text-uppercase"
            v-text="$vuetify.lang.t('$vuetify.locks.add_lock_header')"
          />
        </v-expansion-panel-header>

        <v-expansion-panel-content class="expansion-border">
          <AddLockComponent />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider class="mt-5 mb-2" />
    <v-subheader
      class="text-uppercase"
      v-text="$vuetify.lang.t('$vuetify.locks.list_locks_header')"
    />
    <LocksTableComponent />
  </div>

  <v-layout
    v-else
    class="absolute-center"
    column
    justify-center
    align-center
  >
    <span class="text-h4 text-center font-weight-thin">
      {{ $vuetify.lang.t('$vuetify.locks.require_config') }}
    </span>
    <v-btn class="mt-4" color="accent" to="config">
      {{ $vuetify.lang.t('$vuetify.routes.config') }}
    </v-btn>
  </v-layout>
</template>

<style lang="scss" scoped>
.expansion-border {
  --border-color: rgba(229, 229, 229, 1);

  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.absolute-center {
  position: absolute;
  top: 50%;
  bottom: 50%;
  left: 0;
  right: 0;
}
</style>

<script src="@/ui/views/LocksView" />
