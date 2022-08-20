import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import ReactMarkdown from 'react-markdown';
import PostHeader from './post-header';
import classes from './post-content.module.css';

const PostContent = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    /* image(image) {
      return (
        <Image
          src={`/images/posts/${post.slug}/${image.src}`}
          alt={image.alt}
          width={601}
          height={300}
        />
      );
    }, */
    paragraph(paragraph) {
      const { node } = paragraph;

      if (node.children[0].type === 'image') {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.url}`}
              alt={image.alt}
              width={601}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>
    },

    code (code) {
      const { language, value } = code;
      return <SyntaxHighlighter language={language} children={value} style={atomDark} />
    }
  };

  const MarkdownComponents = {
    img: image => {
      return (
        <Image
          src={`/images/posts/${post.slug}/${image.src}`}
          alt={image.alt}
          width={601}
          height={300}
        />

        // <div className={classes.image}>
          
        // </div>
      )
    },
    code (code) {
      const { className, node, children } = code;
      return <SyntaxHighlighter language={className} children={children} style={atomDark} />
    }
  }

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <div>
        <ReactMarkdown 
          children={post.content}
          components={MarkdownComponents}
        />
      </div>
    </article>
  );
};

export default PostContent;
