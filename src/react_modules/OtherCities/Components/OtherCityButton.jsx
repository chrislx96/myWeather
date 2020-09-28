import React from "react";
import style from "./button.scss";

class OtherCityButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("style:" + style.mybutton);
    const { children, onClick } = this.props;
    return (
      <>
        <button className={style.mybutton} onClick={onClick}>
          {children}
        </button>
      </>
    );
  }
}

export default OtherCityButton;
