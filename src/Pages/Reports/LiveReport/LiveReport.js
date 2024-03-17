import React, { useState, useEffect } from "react";
import { SwipeableDrawer, Tab, Tabs } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import "./LiveReport.scss";
import axios from "../../../authAxios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "../../../Components/Table/Table";

export default function LiveReport() {
  const { match_id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [odds, setodds] = useState();
  const [oddsPositionArr, setOddsPositionArr] = useState({});
  const [market_id, setmarket_id] = useState();
  const [diamondFancy, setdiamondFancy] = useState([]);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [matchBets, setMatchBets] = useState();
  const [sessionBets, setSessionBets] = useState([]);
  const [bookMaker, setbookMaker] = useState([]);
  const [declaredSessionData, setDeclaredSession] = useState([]);
  const [undeclaredSessionData, setUndeclaredSession] = useState([]);
  const [liveMatchPosition, setliveMatchPosition] = useState();
  const [Home, setHome] = useState("");
  const [Away, setAway] = useState("");

  const getMatchBets = async () => {
    try {
      const response = await axios.get("/analysis/matchBets", {
        params: { user_id: localStorage.getItem("_id"), match_id: match_id },
      });

      if (response) {
        console.log(response);
        setMatchBets(response.data.dataobj);
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSessionBets = async () => {
    try {
      const response = await axios.get("/analysis/sessionBets", {
        params: { user_id: localStorage.getItem("_id"), match_id: match_id },
      });

      if (response) {
        setSessionBets(response.data.dataobj);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDeclareSession = async () => {
    try {
      const response = await axios.get("/analysis/declaredFancy", {
        params: { match_id: match_id },
      });

      if (response) {
        setDeclaredSession(response.data.dataobj);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUndeclareSession = async () => {
    try {
      const response =await axios.get("/analysis/undeclaredFancy", {
        params: { match_id: match_id },
      });

      if (response) {
        setUndeclaredSession(response.data.dataobj);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const geLiveMatchPosition = async (Home,Away) => {
    try {
      var position ={};
      console.log("Home",Home);
      console.log("Away",Away);
      position[Home] = 0;
      position[Away] = 0;

      const response =await axios.get("/analysis/getLiveMatchReport", {
        params: { user_id: localStorage.getItem("_id"), match_id: match_id,position},
      });

      if (response) {
        setliveMatchPosition(response.data.dataobj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatchBets();
    getSessionBets();
    getDeclareSession();
    getUndeclareSession();
   
  }, []);
  useEffect(() => {
    let useEffectMarket_id = "";
    const getRunners = async () => {
      console.log("market Id", market_id);
      try {
        const response = await axios.get("/t-p/getRunners", {
          params: {
            market_id: useEffectMarket_id,
          },
        });
        setHome(response.data.dataobj[0]?.runners[0]?.runnerName);
        // console.log(response.data.dataobj[0]?.runners[0]?.runnerName);
        // console.log(response.data.dataobj[0]?.runners[1]?.runnerName);
        setAway(response.data.dataobj[0]?.runners[1]?.runnerName);
        geLiveMatchPosition(response.data.dataobj[0]?.runners[0]?.runnerName,response.data.dataobj[0]?.runners[1]?.runnerName);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getMarketList = async () => {
      try {
        let res = await axios.get("/t-p/getMarketList", {
          params: {
            match_id,
          },
        });
        console.log("Market List", res.data.dataobj[0].marketId);
        if (res.data.status) {
          setmarket_id(res.data.dataobj[0].marketId);
          useEffectMarket_id = res.data.dataobj[0].marketId;
          getOdds();
          getRunners();
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMarketList();
    const getOdds = async () => {
      try {
        const response = await axios.get("/t-p/getOdds", {
          params: {
            market_id: useEffectMarket_id,
          },
        });

        // console.log("get Oddssss",response);
        if (
          response.data.status &&
          Array.isArray(response.data.dataobj) &&
          response.data.dataobj.length > 0
        ) {
          setodds(response.data.dataobj);
          // console.log("res bookmaker", response.data.dataobj);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getBookMakerMarket = async () => {
      try {
        const response = await axios.get("/t-p/bookMakerMarket", {
          params: {
            match_id,
          },
        });
        if (response.data.status) {
          setbookMaker(response.data.dataobj);
          // console.log("res bookmaker", response.data.dataobj);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    let intervalIdBM = setInterval(getOdds, 10000);
    let intervalIdOdds = setInterval(getBookMakerMarket, 10000);

    return () => {
      console.log("THIS WAS TRIGGERD < PAGE EXITED", {
        intervalIdBM,
        intervalIdOdds,
      });
      clearInterval(intervalIdBM);
      clearInterval(intervalIdOdds);
    };
  }, [match_id]);

  const oddsTable = () => {
    if (!odds || !Array.isArray(odds[0]?.runners)) {
      return null; // Render nothing if odds are not yet fetched or malformed
    }
    return (
      <div>
        <div
          className="betting"
          style={{ padding: "10px 0", margin: "16px 0" }}
        >
          {/* <h2>Match Odds</h2> */}
          <h6>Odds Market </h6>
          <table>
            <thead>
              <tr>
                <th>Runner</th>
                {/* <th colSpan={2}></th> */}
                <th>Back</th>
                <th>Lay</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {(
                odds[0].runners.sort(
                  (a, b) => a.sortPriority - b.sortPriority
                ) || []
              ).map((item, index) => {
                if (item.runner === "The Draw") return;
                return (
                  <tr>
                    <td>{item.runner}</td>
                    <td style={{ width: "60px" }}>
                      {item?.ex?.availableToBack[0]?.price}
                    </td>
                    <td style={{ width: "60px" }}>
                      {item?.ex?.availableToLay[0]?.price}
                    </td>
                    <td>{oddsPositionArr[item.runner]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const bookMakerTable = () => {
    return (
      bookMaker.sort(function (a, b) {
        if (a.marketName === "bookmaker") return -1;
        if (b.marketName === "bookmaker") return 1;
      }) || []
    )?.map((bookMakerObj) => (
      <>
        <div
         className="betting"
          style={{
            padding: "10px 0",
            margin: "16px 0",
            overflowX: "auto",
          }}
        >
          <h6>Bookmaker Market</h6>
          <table>
            <thead>
              <tr>
                <th>Runner</th>
                <th>Back</th>
                <th>Lay</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {(
                bookMakerObj.runners.sort(
                  (a, b) => a.sortPriority - b.sortPriority
                ) || []
              ).map((item, index) => {
                if (item.runner === "The Draw") return;
                return (
                  <tr>
                    <td>{item.runnerName}</td>
                    {item.status == "ACTIVE" ? (
                      <>
                        <td
                        // style={{ width: "60px" }}
                        >
                          {item?.ex?.availableToBack[0]?.price}
                        </td>
                        <td
                          // style={{ width: "60px" }}
                          onClick={() => {}}
                        >
                          {item?.ex?.availableToLay[0]?.price}
                        </td>
                      </>
                    ) : (
                      <>
                        <td colSpan={2} style={{ color: "red" }}>
                          {item.status}
                        </td>
                      </>
                    )}
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    ));
  };

  const diamandFancyTable = () => {
    return (
      <>
        <div
          className="betting"
          style={{ padding: "10px 0", margin: "16px 0" ,}}
        >
          <h6>Pending Session </h6>
          <table style={{ overflow: "scroll" }}>
            <thead>
              <tr>
                <th>SESSION</th>
                <th>No</th>
                <th>Rate</th>
                <th>Yes</th>
                <th>Rate</th>
                <th>Pos No</th>
                <th>Pos Yes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {diamondFancy.map((item) => {
                return (
                  <>
                    {item?.GameStatus == "" ? (
                      <tr>
                        <td>{item?.RunnerName}</td>
                        <td>{item?.LayPrice1}</td>
                        <td>{item?.LaySize1 / 100}</td>
                        <td>{item?.BackPrice1}</td>
                        <td>{item?.BackSize1 / 100}</td>
                      </tr>
                    ) : (
                      <tr>
                        <td>{item?.RunnerName}</td>
                        <td colSpan={4} style={{ color: "red" }}>
                          {item?.GameStatus}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const declareTossMarket = () => {
    if (!odds || !Array.isArray(odds[0]?.runners)) {
      return null; // Render nothing if odds are not yet fetched or malformed
    }
    return (
      <div>
        <div
          className="betting"
          style={{ padding: "10px 0", margin: "16px 0" }}
        >
          {/* <h2>Match Odds</h2> */}
          <h6>DECLARED TOSS MARKETS</h6>
          <table>
            <thead>
              <tr>
                <th>Market</th>
                <th>Result</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Toss Winner Market</td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "60px" }}></td>
              </tr>
              <tr>
                <td>Declare TOSS Market Total</td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "60px" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const declaredSession = () => {
    return (
      <>
        <div>
          <div
            className="betting"
            style={{ padding: "10px 0", margin: "16px 0" }}
          >
            {/* <h2>Match Odds</h2> */}
            <h6>DECLARED SESSIONS</h6>
            <table>
              <thead>
                <tr>
                  <th>SESSION</th>
                  <th>Settled at Runs</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{
                }
                <tr>
                  <td></td>
                  <td style={{ width: "60px" }}></td>
                  <td style={{ width: "60px" }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  function convertToIST(utcDateTimeString) {
    const utcDateTime = new Date(utcDateTimeString);
    
    const istOptions = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
  
    const istDateTimeString = utcDateTime.toLocaleString("en-IN", istOptions);
    
    return istDateTimeString;
  }
  const pendingSessionCol = [
    { name: "SESSION", selector: (row) => row.runnerName,wrap:"true",width:"200px" },
    { name: "Yes", selector: (row) => row.layPrice },
    { name: "No", selector: (row) => row.backPrice },
    { name: "Yes", selector: (row) => 1 },
    { name: "NO", selector: (row) => 1 },
    { name: "Pos Yes", selector: (row) => 0 },
    { name: "Pos No	", selector: (row) => 0 },
    { name: "Action", selector: (row) => (<button>Position</button>)},
  ];

  const matchOddCol = [
    { name: "Member", selector: (row) => row.user_id,width:"100px" },
    { name: "Market", selector: (row) => row.type,width:"100px" },
    { name: "Selection", selector: (row) => row.bet_on,width:"150px",wrap:"true" },
    { name: "Rate", selector: (row) => row.bet_rate },
    { name: "Stake", selector: (row) => row.bet_amount },
    { name: "P&L", selector: (row) => row.bet_amount },
    { name: "Place Date/Time	", selector: (row) => convertToIST(row.createdAt),width:'190px' },
    { name: "MatchedTime", selector: (row) => convertToIST(row.createdAt),width:'190px'},
  ];

  const sessionCol = [
    { name: "Fancy", selector: (row) => row.fancy_Detail.runnerName,width:"200px",wrap:'true' },
    { name: "Client", selector: (row) => row._id },
    { name: "Yes/No", selector: (row) => row.bet_type },
    { name: "Rate", selector: (row) => row.bet_rate },
    { name: "Y/N", selector: (row) => row.bet_type=="No"?row.fancy_Detail.layPrice1: row.fancy_Detail.backPrice1},
    { name: "Stack", selector: (row) => row.bet_amount },
    { name: "P&L", selector: (row) => row.bet_amount },
    { name: "DateTime	", selector: (row) =>convertToIST(row.createdAt),width:'190px'},
  ];

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <input
        style={{ outline: "none" }}
        placeholder="Search Here"
        onChange={(e) => setFilterText(e.target.value)}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
      <div>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            marginBottom: "8px",
          }}
        >
          <Tabs
            value={activeTab}
            sx={{
              ".Mui-selected": {
                color: `#fff`,
                outline: "none",
              },
              "&:hover": {
                outline: "none",
              },
            }}
            TabIndicatorProps={{ style: { background: "#896cef" } }}
            aria-label="tabs example"
            onChange={(e, newVal) => {
              setActiveTab(newVal);
            }}
          >
            <Tab
              value={0}
              label={
                <span style={{ color: activeTab == 0 ? "#896cef" : "#fff" }}>
                  Scoreboard
                </span>
              }
            />
            <Tab
              value={1}
              label={
                <span style={{ color: activeTab == 1 ? "#896cef" : "#fff" }}>
                  Live Telecast
                </span>
              }
            />
          </Tabs>
        </div>
        {activeTab === 0 && (
          <div
            style={{ width: "100%", objectFit: "contain", overflow: "hidden" }}
          >
            {/* <iframe srcDoc={liveLine} style={{ width: "100%", height: "40vh" }} /> */}
            <IframeRenderer
              url={`https://diamondapi.uk/dcasino/sr.php?eventid=${match_id}&sportid=4`}
              key={"test"}
            />
          </div>
        )}
        {activeTab === 1 && (
          <div
            style={{ width: "100%", objectFit: "contain", overflow: "hidden" }}
          >
            {/* <iframe srcDoc={liveLine} style={{ width: "100%", height: "40vh" }} /> */}
            <IframeRenderer
              url={`https://diamondapi.uk/dcasino/nntv.php?MatchID=${match_id}`}
              key={"test2"}
            />
          </div>
        )}
      </div>
      {oddsTable()}
      {bookMakerTable()}
      {declareTossMarket()}
      {declaredSession()}
      <Accordion style={{ backgroundColor: "transparent" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="#ffffff" />}
          aria-controls="panel2-content"
          id="panel2-header"
          style={{
            backgroundColor: "#8d73ff",
            color: "white",
          }}
        >
          <Typography>Pendding Session</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "transparent" }}>
          <Typography>
            <Table
              style={{ padding: "0px !important" }}
              data={undeclaredSessionData}
              columns={pendingSessionCol}
              pagination
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              paginationResetDefaultPage={resetPaginationToggle}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ backgroundColor: "transparent" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="#ffffff" />}
          aria-controls="panel2-content"
          id="panel2-header"
          style={{
            backgroundColor: "#8d73ff",
            color: "white",
          }}
        >
          <Typography>Matched-Bets</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "transparent" }}>
          <Typography>
            <Table
              style={{ padding: "0px !important" }}
              data={matchBets}
              columns={matchOddCol}
              pagination
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              paginationResetDefaultPage={resetPaginationToggle}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ backgroundColor: "transparent" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="#ffffff" />}
          aria-controls="panel2-content"
          id="panel2-header"
          style={{
            backgroundColor: "#8d73ff",
            color: "white",
          }}
        >
          <Typography>Sesstion-Bets</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "transparent" }}>
          <Typography>
            <Table
              style={{ padding: "0px !important" }}
              data={sessionBets}
              columns={sessionCol}
              pagination
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              paginationResetDefaultPage={resetPaginationToggle}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const IframeRenderer = ({ url }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const updateIframeStyles = () => {
      const iframeDocument = iframeRef.current.contentDocument;

      if (iframeDocument) {
        // Adjust the styles as needed
        iframeDocument.body.style.overflow = "hidden";
        iframeDocument.body.style.maxWidth = "100%";
        iframeDocument.body.style.boxSizing = "border-box";
        iframeDocument.documentElement.style.height = "100%";
        iframeDocument.documentElement.style.overflowY = "hidden";
      }
    };

    window.addEventListener("resize", updateIframeStyles);
    updateIframeStyles(); // Initial update on component mount

    return () => {
      window.removeEventListener("resize", updateIframeStyles);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <iframe
        title="Rendered HTML"
        src={url}
        style={{ width: "100%", height: "100%", border: "none" }}
        ref={iframeRef}
      />
    </div>
  );
};
