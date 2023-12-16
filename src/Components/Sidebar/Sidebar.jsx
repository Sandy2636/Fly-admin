import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { KeyboardArrowDown } from "@mui/icons-material";

function Sidebar({ display }) {
  const navigate = useNavigate();
  const handleListItemClick = (path) => {
    navigate(path);
  };

  const SidebarOptionList = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MenuIcon />,
    },
    {
      title: "Manage",
      isExpandable: true,
      options: [
        {
          title: "Super Stockist",
          path: "/manage/sst",
          icon: <></>,
        },
        {
          title: "Stockist",
          path: "/manage/stockist",
          icon: <></>,
        },
        {
          title: "User",
          path: "/manage/user",
          icon: <></>,
        },
      ],
      icon: <></>,
    },
    {
      title: "Live Matches",
      path: "/live-matches",
      icon: <></>,
    },
    {
      title: "Completed Matches",
      path: "/completed-matches",
      icon: <></>,
    },
    {
      title: "Casino Profit Loss",
      path: "/casino-report",
      icon: <></>,
    },
    {
      title: "Block Sports",
      path: "/block-sports",
      icon: <></>,
    },
    {
      title: "Manage Clients",
      isExpandable: true,
      options: [
        {
          title: "My Clients",
          path: "/clients/my-clients",
          icon: <></>,
        },
        {
          title: "Blocked Clients",
          path: "/clients/blocked-clients",
          icon: <></>,
        },
        {
          title: "Commission & Limits",
          path: "/clients/commission-and-limits",
          icon: <></>,
        },
      ],
      icon: <></>,
    },
    {
      title: "Manage Password",
      path: "/manage-password",
      icon: <></>,
    },
    {
      title: "Language",
      path: "/language",
      icon: <></>,
    },
    {
      title: "Manage ledgers",
      isExpandable: true,
      options: [
        {
          title: "Collection Report",
          path: "/ledger/collection-report",
          icon: <></>,
        },
        {
          title: "Company Ledger",
          path: "/ledger/company-ledger",
          icon: <></>,
        },
        {
          title: "My Statement",
          path: "/ledger/my-statement",
          icon: <></>,
        },
        {
          title: "Profit & Loss",
          path: "/ledger/profit-loss",
          icon: <></>,
        },
      ],
      icon: <></>,
    },
  ];

  const SideOption = (item) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
      <>
        <div
          className="option"
          onClick={(e) => {
            if (item.isExpandable) {
              setIsExpanded((prev) => !prev);
            } else {
              handleListItemClick(item.path);
            }
          }}
        >
          <div className="option_icon">{item.icon}</div>
          <div className="option_text">
            <span className="option_text_span">{item.title}</span>
          </div>
          <div
            style={{
              transition: "all 0.1s ease",
              flex: 1,
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            {item.isExpandable && <KeyboardArrowDown />}
          </div>
        </div>

        {isExpanded && item.isExpandable && (
          <div>
            {item.options.map((obj) => (
              <div
                className="option"
                onClick={(e) => handleListItemClick(obj.path)}
              >
                <div className="option_icon">{obj.icon}</div>
                <div className="option_text">
                  <span className="option_text_span">{obj.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };
  return (
    <div className="sidebar" style={display && { display: "block" }}>
      <div className="logo_holder">
        <img src={Logo} />
      </div>
      {SidebarOptionList.map(SideOption)}
    </div>
  );
}

export default Sidebar;
