export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type Category = 'CVE' | 'Data Breach' | 'Malware' | 'Zero-Day' | 'News' | 'Physical Security' | 'Logistics' | 'Food Defense';

export interface Trend {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: Category;
  severity: Severity;
  dateDiscovered: string;
  affectedSystems: string[];
  mentions: number;
  timeline: { date: string; event: string }[];
  remediation: string[];
  references: { title: string; url: string }[];
  relatedIds: string[];
}

export interface Stat {
  label: string;
  value: number | string;
  trend: number; // percentage change
}
