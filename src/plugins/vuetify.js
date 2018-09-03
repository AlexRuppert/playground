import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VDivider,
  VExpansionPanel,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VTooltip,
  VCard,
  VMenu,
  VTextField,
  VSubheader,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VDivider,
    VExpansionPanel,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VTooltip,
    VCard,
    VMenu,
    VTextField,
    VSubheader,
    transitions
  },
  theme: {
    primary: '#009688',
    secondary: '#00796B',
    accent: '#FF5722',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
})