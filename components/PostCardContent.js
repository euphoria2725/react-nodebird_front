import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ content }) => {
  return (
    <div>
      {content.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtags/${v.slice(1)}`} prefetch={false} key={i}>
              {v}
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostCardContent;
