import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Mx_Width } from "@Client/Styles/Device";
import UMenu from "./UserMenu";

const Title = styled.div`
  /* Symphonia */
  left: 0;
  margin-left: 10vw;
  ${props => props.theme.headerAttr}
  font-family: Montserrat Alternates;
  font-weight: 300;
  letter-spacing: 7px;
  border-bottom: 1px solid #000;
`;
const UserBox = styled.div`
  /* signIn */
  right: 0;
  margin-right: 10vw;
  min-width: 100px;
  text-align: right;
  ${props => props.theme.headerAttr}
  ${Mx_Width(`{
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }`).mobileL}
`;

export default (props: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  toggle: boolean;
  auth: IAuthState;
}) => {
  const { auth, toggle, onMouseEnter, onMouseLeave } = props;
  return (
    <>
      <Title>
        <Link to="/">Symphonia</Link>
      </Title>

      <UserBox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {auth.isLogged ? (
          <>
            {auth.me.userName}
            <UMenu toggle={toggle} />
          </>
        ) : (
          <Link to="/auth">Join</Link>
        )}
      </UserBox>
    </>
  );
};
