import fs from "fs"
import { join } from "path"
import matter from "gray-matter"

const postsDirectory = join(process.cwd(), "/blog")

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: any, fields: any = []) {
  const realSlug = slug.replace(/\.mdx$/, "")
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  console.log("slug", slug)
  const { data, content } = matter(fileContents)

  const items = {}

  //@ts-ignore
  fields.forEach((field: any) => {
    if (field === "slug") {
      //@ts-ignore
      items[field] = realSlug
    }
    if (field === "content") {
      //@ts-ignore
      items[field] = content
    }

    if (data[field]) {
      //@ts-ignore
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: any = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    //@ts-ignore
    .sort((post1: any, post2: any) => (post1?.date > post2?.date ? "-1" : "1"))
  return posts
}