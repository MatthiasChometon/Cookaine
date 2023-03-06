import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { Dialog, Notify, Quasar } from 'quasar'
import App from './App.vue'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    ctx.app.use(Quasar, {
      plugins: { Notify, Dialog },
    })
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./common/modules/*.ts')).forEach(i => i.install?.(ctx))
  },
)
