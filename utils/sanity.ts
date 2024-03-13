import sanityClient from "@sanity/client"

export default sanityClient({
  projectId: '4hg77u52',
  dataset: 'production',
  apiVersion: '2022-08-31',
  useCdn: false
})