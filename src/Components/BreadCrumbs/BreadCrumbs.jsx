import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import "./bread_crumb.scss";
import { capitalize } from "@mui/material";

function BreadCrumbs({ heading, links }) {
  const scrumb = window.location.pathname.split("/");
  if (heading == undefined) {
    heading = scrumb[scrumb.length - 1]
      .split("-")
      .map((item) => capitalize(item))
      .join(" ");
    if (heading == "") {
      heading = "Dashboard";
    }
  }
  return (
    <div className="breadHolder">
      <span>{heading}</span>
      <br />
      <Breadcrumbs sx={{ color: "white" }} aria-label="breadcrumb">
        {["Dashboard", ...scrumb]
          .filter((item) => item != "")
          .map((item) => (
            <Link underline="hover" color="inherit">
              {item
                .split("-")
                .map((item) => capitalize(item))
                .join(" ")}
            </Link>
          ))}
        {/* <Typography color="text.primary">{}</Typography> */}
      </Breadcrumbs>
    </div>
  );
}

export default BreadCrumbs;
