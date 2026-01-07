import { createClient } from "@sanity/client"
import { createImageUrlBuilder } from "@sanity/image-url"

const isDev = import.meta.env.DEV

export const sanity = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: !isDev,
})

const builder = createImageUrlBuilder(sanity)

export const urlFor = (source: any) => builder.image(source)
