import React, {useEffect, Fragment} from "react";

const Page = props => {
  useEffect(() => {
    document.title = `${props.title} | Ellnot`;
    // eslint-disable-next-line
  }, [props]);
  return <Fragment>{props.children}</Fragment>;
};

export default Page;
