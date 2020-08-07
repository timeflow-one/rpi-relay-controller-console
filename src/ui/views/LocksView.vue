<template>
  <div>
    <!-- <v-subheader
      class="text-uppercase"
      v-text="$vuetify.lang.t('$vuetify.locks.add_lock_header')"
    /> -->
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
          <!-- <div>
            <v-icon v-if="expanded == null">mdi-plus</v-icon>
            <v-icon v-else>mdi-minus</v-icon>
          </div> -->
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
</style>

<script src="@/ui/views/LocksView" />
