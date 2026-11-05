import {
  Trophy, Globe, BarChart3, Target, Zap, CheckCircle2, Award, Download, Mail, Linkedin,
  Briefcase, Layers, ShieldCheck, Coins, RefreshCw, Users, Network, Rocket, Cpu, Wallet,
  MessageSquareText, Car, KanbanSquare, BookOpen, GitPullRequest, LayoutGrid, Table2, Code2, Database,
  Github, LineChart, TrendingDown, MessageSquare, Sparkles, Terminal, type LucideIcon,
} from "lucide-react";

/** Maps the icon keys used in portfolio.mock.ts to lucide icons. */
export const ICONS: Record<string, LucideIcon> = {
  trophy: Trophy, globe: Globe, chart: BarChart3, target: Target, zap: Zap, check: CheckCircle2,
  award: Award, download: Download, mail: Mail, linkedin: Linkedin, briefcase: Briefcase,
  layers: Layers, shield: ShieldCheck, coins: Coins, refresh: RefreshCw, users: Users,
  network: Network, rocket: Rocket, cpu: Cpu, wallet: Wallet, message: MessageSquareText, car: Car,
  kanban: KanbanSquare, book: BookOpen, pullrequest: GitPullRequest, grid: LayoutGrid, sheet: Table2, code: Code2,
  database: Database, github: Github, linechart: LineChart, chat: MessageSquare, sparkles: Sparkles, terminal: Terminal, trendingdown: TrendingDown,
};
export const icon = (key?: string): LucideIcon => (key && ICONS[key]) || Trophy;
