import React from "react";
import styled from "styled-components";
import { RootStateType } from "client/configureStore";

import { BoardPostList } from "client/components/organisms";

interface IProps {
  className?: string;
  title: string;
  totalCount: number;
  currentPage: number;
  postlist: RootStateType["board"]["rows"];
  postPerPage: number;
  handlePage: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}
export default styled(
  ({
    className,
    title,
    totalCount,
    currentPage,
    postlist,
    postPerPage,
    handlePage,
  }: IProps) => {
    return (
      <div className={className}>
        <h3 className="title">{title}</h3>
        <BoardPostList
          totalCount={totalCount}
          currentPage={currentPage}
          postlist={postlist}
          postPerPage={postPerPage}
          handlePage={handlePage}
        />
      </div>
    );
  },
)`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(47, 44, 55);
  h3 {
    padding: 15px;
    font-size: 1.8rem;
  }
`;
