import { makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Project } from './contentLayer/types/project'
import { UseCases } from './contentLayer/types/useCases'
import { About } from './contentLayer/types/about'
import { Contact } from './contentLayer/types/contact'
import { Home } from './contentLayer/types/home'
import { Globals } from './contentLayer/types/globals'

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Globals, Home, About, Project, UseCases, Contact],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeUnwrapImages,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted']
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
})
