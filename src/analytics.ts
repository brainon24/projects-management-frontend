import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-FLXN26SFVX");
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};