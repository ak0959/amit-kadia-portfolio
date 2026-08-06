import { ProjectItem } from "@/types/portfolio";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "smart-inventory",
    title: "Smart Inventory Management Dashboard",
    description: "Developed an interactive inventory analytics application that tracks stock levels, highlights low-stock and overstock risks, and supports faster replenishment decisions. The dashboard converts operational inventory data into clear trends, alerts, and actionable business insights.",
    tags: ["Inventory Analytics", "Dashboard", "Python", "Streamlit", "Business Intelligence"],
    accentColor: "#0F9D8A", // Teal / Green
    accentClass: "border-accent-teal",
    projectUrl: "https://www.ampitics.com/smart-inventory"
  },
  {
    id: "expense-tracker",
    title: "Interactive Expense Tracker",
    description: "Built a user-friendly expense management application that records, categorises, and analyses spending across periods and expense types. The dashboard provides visual summaries, budget visibility, and spending patterns to support better financial planning and control.",
    tags: ["Expense Analytics", "Dashboard", "Python", "Streamlit", "Data Visualisation"],
    accentColor: "#D97706", // Amber / Gold
    accentClass: "border-accent-gold",
    projectUrl: "https://www.ampitics.com/expense-tracker/dashboard"
  },
  {
    id: "tmdb-sentiment",
    title: "TMDB Movie Sentiment Analysis Pipeline",
    description: "Developed an interactive Streamlit application that applies NLP and machine learning to classify movie-review sentiment and demonstrate how unstructured customer feedback can be converted into actionable insights.",
    tags: ["NLP", "Machine Learning", "Sentiment Analysis", "Streamlit", "Python"],
    accentColor: "#C2415D", // Rose / Magenta
    accentClass: "border-accent-mauve",
    projectUrl: "https://tmdbsentimentpipeline-hxzs7krjdez2jzvn5pgwn9.streamlit.app/"
  },
  {
    id: "nyc-taxi",
    title: "NYC Taxi Fare Analysis",
    description: "Completed an end-to-end analysis of NYC Yellow Taxi data using PySpark, covering data cleaning, exploratory analysis, feature engineering, demand patterns, and fare prediction modelling.",
    tags: ["PySpark", "Data Analysis", "Feature Engineering", "Machine Learning", "Predictive Modelling"],
    accentColor: "#E6A700", // Taxi Yellow-Orange
    accentClass: "border-accent-blue",
    githubUrl: "https://github.com/ak0959/NYC-Taxi-Fare-Analysis"
  },
  {
    id: "ipl-insights",
    title: "IPL Tactical Insights Dashboard",
    description: "Developed an interactive Streamlit and Plotly dashboard using ball-by-ball and match-level data to analyse toss strategy, venue patterns, and batting performance.",
    tags: ["Streamlit", "Plotly", "Sports Analytics", "Python", "Interactive Dashboard"],
    accentColor: "#2563EB", // Cricket Blue
    accentClass: "border-accent-coral",
    projectUrl: "https://iplanalyticsdashboardgit-ak0959.streamlit.app/"
  }
];
