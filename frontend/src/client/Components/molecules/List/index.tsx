import React from "react";
interface IProps<T extends Array<any>> {
  wrapper: React.ElementType;
  dataList: T;
  temp: (data: IProps<T>["dataList"][0]) => React.ReactNode;
}
export default <T extends Array<any>>(props: IProps<T>) => {
  const Wrapper = props.wrapper;
  return <Wrapper>{props.dataList.map(props.temp)}</Wrapper>;
};

/** @props
 *  wrapper
 *  dataList
 *  temp
 * example>>
 *  <List<RootStateType["main"]["boardlist"]>
 *       wrapper={"ul"}
 *       dataList={props.boardlist}
 *       temp={(data) => <li>{data.name}</li>}
 *  />
 */
