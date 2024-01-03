import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { KeyboardArrowDown } from "@mui/icons-material";
import { MdSpaceDashboard } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { MdGames } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import { MdBlock } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { TbLockAccess } from "react-icons/tb";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { TbPasswordMobilePhone } from "react-icons/tb";
import { FaLanguage } from "react-icons/fa6";
import { RiBillFill } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa";

function Sidebar({ display }) {
  const navigate = useNavigate();
  const handleListItemClick = (path) => {
    navigate(path);
  };

  const SidebarOptionList = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdSpaceDashboard />,
    },
    {
      title: "Manage",
      isExpandable: true,
      options: [
        {
          title: "Super Admin",
          path: "/manage/super-admin",
          icon: <FaUserFriends />,
        },
        {
          title: "Super Stockist",
          path: "/manage/super-stockist",
          icon: <FaUserFriends />,
        },
        {
          title: "Admin",
          path: "/manage/admin",
          icon: <FaUserFriends />,
        },
        {
          title: "Stockist",
          path: "/manage/stockist",
          icon: <FaUserFriends />,
        },
        {
          title: "User",
          path: "/manage/user",
          icon: <FaUserFriends />,
        },
      ],
      icon: <RiAdminFill />,
    },
    {
      title: "Live Matches",
      path: "/live-matches",
      icon: <MdGames />,
    },
    {
      title: "Completed Matches",
      path: "/completed-matches",
      icon: <MdDoneAll />,
    },
    {
      title: "Casino Profit Loss",
      path: "/casino-report",
      icon: <GiProfit />,
    },
    {
      title: "Block Sports",
      path: "/block-sports",
      icon: <MdBlock />,
    },
    {
      title: "Manage Clients",
      isExpandable: true,
      options: [
        {
          title: "My Clients",
          path: "/clients/my-clients",
          icon: <FaUsers />,
        },
        {
          title: "Blocked Clients",
          path: "/clients/blocked-clients",
          icon: <FaUserAltSlash />,
        },
        {
          title: "Commission & Limits",
          path: "/clients/commission-and-limits",
          icon: <FaMoneyBillTrendUp />,
        },
      ],
      icon: <MdManageAccounts />,
    },
    {
      title: "Manage Password",
      path: "/manage-password",
      icon: <TbPasswordMobilePhone />,
    },
    {
      title: "Language",
      path: "/language",
      icon: <FaLanguage />,
    },
    {
      title: "Manage ledgers",
      isExpandable: true,
      options: [
        {
          title: "Collection Report",
          path: "/ledger/collection-report",
          icon: <FaAddressBook />,
        },
        {
          title: "Company Ledger",
          path: "/ledger/company-ledger",
          icon: <FaAddressBook />,
        },
        {
          title: "My Statement",
          path: "/ledger/my-statement",
          icon: <FaAddressBook />,
        },
        {
          title: "Profit & Loss",
          path: "/ledger/profit-loss",
          icon: <GiProfit />,
        },
      ],
      icon: <RiBillFill />,
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
