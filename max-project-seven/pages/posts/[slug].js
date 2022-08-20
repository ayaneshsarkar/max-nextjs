import Head from "next/head"
import PostContent from "../../components/posts/post-detail/post-content"
import { getPostData, getPostFiles } from '../../lib/posts-util'

const PostDetailPage = props => {
  return (
    <>
      <Head>
        <title>{ props.post.title }</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  )
}

export const getStaticProps = async context => {
  const { params } = context
  const { slug } = params

  const postData = getPostData(slug)

  return {
    props: {
      post: postData
    },
    revalidate: 700
  }
}

export const getStaticPaths = async () => {
  const postFileNames = getPostFiles()
  const slugs = postFileNames.map(fileName => fileName.replace(/\.md$/, ''))

  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false
  }
}

export default PostDetailPage