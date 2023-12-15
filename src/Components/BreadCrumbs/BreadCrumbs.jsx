import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function BreadCrumbs({ heading, links }) {
  const scrumb = window.location.pathname.split("/");
  return (
    <div style={{ color: "white" }}>
      <h3>{heading}</h3>
      <br />
      <Breadcrumbs aria-label="breadcrumb">
        {scrumb.map((item) => (
          <Link underline="hover" color="inherit" href="/">
            {item}
          </Link>
        ))}
        {/* <Typography color="text.primary">{}</Typography> */}
      </Breadcrumbs>
    </div>
  );
}

export default BreadCrumbs;
