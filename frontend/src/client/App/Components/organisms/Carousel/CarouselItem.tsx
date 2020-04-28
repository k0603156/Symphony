import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RootStateType } from "@Services/Store/modules/index";

interface IProps {
  className?: string;
  length: number;
  data: RootStateType["main"]["postlist"][0];
}

const CarouselItem = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 2%;
  color: white;
  h2.title {
    font-size: 1.5rem;
    a {
      color: white;
    }
  }
  div {
    margin-top: 8px;
  }
  div.username {
    text-align: right;
    font-size: 1rem;
  }
  div.updatedat {
    text-align: right;
    font-size: 0.8rem;
  }
  div.tags {
    display: flex;
    width: 100%;
    font-size: 0.8rem;
    span {
      border: 1px solid lightgray;
      border-radius: 3px;
      padding: 2px 4px;
      &:not(:last-of-type) {
        margin-right: 3px;
      }
    }
  }
  div.views {
    text-align: right;
    font-size: 0.8rem;
  }
`;
export default styled((props: IProps) => {
  return (
    <CarouselItem className={props.className} key={props.data.id}>
      <h2 className={"title"}>
        <Link to={`board/post/${props.data.id}`}>{props.data.title}</Link>
      </h2>
      <div className={"username"}>@{props.data.user.userName}</div>
      <div className={"updatedat"}>{props.data.updatedAt}</div>
      <div className={"tags"}>
        {props.data.hashtags.map((hashtag) => (
          <span key={hashtag.name}>#{hashtag.name}</span>
        ))}
      </div>
      <div className={"views"}>viws {props.data.readcount}</div>
    </CarouselItem>
  );
})`
  height: 100%;
  width: ${({ length }) => 100 / length}%;
  list-style: none;
  background: rgb(21, 18, 31);
  box-shadow: 5px 5px 10px rgb(47, 44, 55);
`;