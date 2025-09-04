export type ReportStatus = "pending" | "in_progress" | "completed";

export interface StoredReport {
  id: string;
  title: string;
  category: string;
  status: ReportStatus;
  priority: "low" | "medium" | "high" | "urgent";
  location: string;
  submittedDate: string; // ISO date
  description: string;
  updates: { date: string; status: string; message: string }[];
}

const REPORTS_KEY = "civic_reports";
const POINTS_KEY = "civic_points";
const REVIEWS_KEY = "civic_reviews";

export function getReports(): StoredReport[] {
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    return raw ? (JSON.parse(raw) as StoredReport[]) : [];
  } catch {
    return [];
  }
}

export function saveReports(reports: StoredReport[]) {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

export function addReport(report: StoredReport) {
  const reports = getReports();
  reports.unshift(report);
  saveReports(reports);
}

export function generateReportId(date = new Date()): string {
  const year = date.getFullYear();
  const seq = Math.floor(Math.random() * 9000 + 1000); // 4-digit
  return `CR-${year}-${seq}`;
}

export function getPoints(): number {
  const raw = localStorage.getItem(POINTS_KEY);
  return raw ? parseInt(raw, 10) || 0 : 0;
}

export function addPoints(points: number) {
  const current = getPoints();
  localStorage.setItem(POINTS_KEY, String(current + points));
}

export interface ReviewEntry {
  id: string; // report id
  rating: number; // 1-5
  feedback: string;
  date: string;
}

export function getReviews(): ReviewEntry[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? (JSON.parse(raw) as ReviewEntry[]) : [];
  } catch {
    return [];
  }
}

export function addReview(entry: ReviewEntry) {
  const list = getReviews();
  list.unshift(entry);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(list));
}
