import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";

const PostImages = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, idx) => {
        return (
          <img src={image.src} alt="post-img" role="presentation" key={idx} />
        );
      })}
    </Carousel>
  );
};

export default PostImages;
