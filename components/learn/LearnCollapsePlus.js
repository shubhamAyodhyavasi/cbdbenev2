import React from "react";
import Icon from "react-icons-kit";
import { Collapse } from "reactstrap";
import { ic_add, ic_clear } from "react-icons-kit/md";

const LearnCollapsePlus = props => {
  const { isOpen, onClick, title, children } = props;
  return (
    <div className="boxed-collapse-wrapper mb-3 pb-2">
      <div className="cursor-pointer boxed-collapse  mb-1 pt-1 pb-1" onClick={onClick}>
        <span className="d-flex align-items-center justify-content-between">
          <div style={{ fontSize: "19px" }}>{title}</div>
          {isOpen ? (
            <Icon size={24} icon={ic_clear} />
          ) : (
            <Icon size={24} icon={ic_add} />
          )}
        </span>
      </div>
      <Collapse isOpen={isOpen}>
        <div className="boxed-collapse-item">{children}</div>
      </Collapse>
      <style jsx>{`
        .boxed-collapse-wrapper{
          border-bottom: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};
export default LearnCollapsePlus;

