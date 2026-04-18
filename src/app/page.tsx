import {
  ArrowUpIcon,
  Badge,
  DataTable,
  InputField,
  SearchIcon,
  SortIcon,
} from "@design-system";
import {
  AnalyticsPanel,
  type AnalyticsSeries,
} from "@/features/dashboard/components/AnalyticsPanel";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import type { StatCardData } from "@/features/dashboard/components/StatsCard";
import { AppShell } from "@/features/dashboard/layout/AppShell";
import styles from "./page.module.css";

type UserStatus = "Active" | "Pending" | "Inactive";

type UserRow = {
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  country: string;
  lastActive: string;
  spend: string;
};

const STATS: StatCardData[] = [
  {
    id: "total-users",
    metric: "Total Users",
    value: "48,392",
    trend: { direction: "up", percentage: 12.4 },
    icon: "users",
  },
  {
    id: "monthly-revenue",
    metric: "Monthly Revenue",
    value: "$1.24M",
    trend: { direction: "up", percentage: 8.1 },
    icon: "revenue",
  },
  {
    id: "avg-sessions",
    metric: "Avg. Sessions",
    value: "6.8",
    trend: { direction: "down", percentage: 1.7 },
    icon: "sessions",
  },
  {
    id: "conversion-rate",
    metric: "Conversion Rate",
    value: "4.92%",
    trend: { direction: "up", percentage: 3.6 },
    icon: "conversion",
  },
];

const ANALYTICS: AnalyticsSeries = {
  range: "30d",
  points: [
    { label: "1", value: 42 },
    { label: "2", value: 48 },
    { label: "3", value: 54 },
    { label: "4", value: 50 },
    { label: "5", value: 56 },
    { label: "6", value: 62 },
    { label: "7", value: 58 },
    { label: "8", value: 64 },
    { label: "9", value: 69 },
    { label: "10", value: 66 },
  ],
};

const USER_ROWS: UserRow[] = [
  {
    name: "Aarav Brown",
    email: "aarav.brown.17@example.com",
    role: "Admin",
    status: "Inactive",
    country: "United States",
    lastActive: "2026-01-15",
    spend: "$1,681",
  },
  {
    name: "Aarav Sharma",
    email: "aarav.sharma.1@example.com",
    role: "Admin",
    status: "Active",
    country: "United States",
    lastActive: "2026-01-31",
    spend: "$450",
  },
  {
    name: "Aarav Thomas",
    email: "aarav.thomas.49@example.com",
    role: "Admin",
    status: "Active",
    country: "United States",
    lastActive: "2026-01-27",
    spend: "$1,677",
  },
  {
    name: "Aarav Wilson",
    email: "aarav.wilson.33@example.com",
    role: "Admin",
    status: "Pending",
    country: "United States",
    lastActive: "2026-01-21",
    spend: "$1,679",
  },
  {
    name: "Amelia Brown",
    email: "amelia.brown.30@example.com",
    role: "Manager",
    status: "Pending",
    country: "United Kingdom",
    lastActive: "2026-01-24",
    spend: "$1,217",
  },
  {
    name: "Amelia Sharma",
    email: "amelia.sharma.14@example.com",
    role: "Manager",
    status: "Inactive",
    country: "United Kingdom",
    lastActive: "2026-01-18",
    spend: "$1,219",
  },
  {
    name: "Amelia Thomas",
    email: "amelia.thomas.62@example.com",
    role: "Manager",
    status: "Inactive",
    country: "United Kingdom",
    lastActive: "2026-01-14",
    spend: "$2,446",
  },
  {
    name: "Amelia Wilson",
    email: "amelia.wilson.46@example.com",
    role: "Manager",
    status: "Active",
    country: "United Kingdom",
    lastActive: "2026-01-30",
    spend: "$1,215",
  },
];

function statusTone(status: UserStatus): "success" | "warning" | "error" {
  if (status === "Active") {
    return "success";
  }

  if (status === "Pending") {
    return "warning";
  }

  return "error";
}

export default function HomePage() {
  return (
    <AppShell>
      <section className={styles.page}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Analytics Dashboard</h1>
          <p className={styles.subtitle}>
            A token-driven design system with server-first rendering, URL-synced
            table interactions, and container-aware components.
          </p>
        </section>

        <StatsGrid stats={STATS} />

        <div className={styles.rangeRow} role="group" aria-label="Date range">
          <button type="button" className={styles.rangeButton}>
            7d
          </button>
          <button
            type="button"
            className={`${styles.rangeButton} ${styles.activeRange}`}
            aria-current="true"
          >
            30d
          </button>
          <button type="button" className={styles.rangeButton}>
            90d
          </button>
        </div>

        <AnalyticsPanel series={ANALYTICS} />

        <section className={styles.usersSection} aria-label="Users table">
          <div className={styles.usersHead}>
            <h2 className={styles.usersTitle}>Users</h2>
            <InputField
              className={styles.searchUsers}
              hideMeta
              placeholder="Search users"
              prefix={<SearchIcon size={20} />}
              aria-label="Search users"
              floatingLabel={false}
            />
          </div>

          <DataTable className={styles.userTable}>
            <thead>
              <tr>
                <th scope="col">
                  <span className={styles.headerCell}>
                    Name <ArrowUpIcon size={16} />
                  </span>
                </th>
                <th scope="col">
                  <span className={styles.headerCell}>
                    Email <SortIcon size={16} />
                  </span>
                </th>
                <th scope="col">
                  <span className={styles.headerCell}>
                    Role <SortIcon size={16} />
                  </span>
                </th>
                <th scope="col">
                  <span className={styles.headerCell}>
                    Status <SortIcon size={16} />
                  </span>
                </th>
                <th scope="col">
                  <span className={styles.headerCell}>
                    Country <SortIcon size={16} />
                  </span>
                </th>
                <th scope="col">
                  <span className={styles.headerCell}>
                    Last Active <SortIcon size={16} />
                  </span>
                </th>
                <th scope="col">
                  <span className={styles.headerCell}>
                    Spend <SortIcon size={16} />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {USER_ROWS.map((user) => (
                <tr key={user.email}>
                  <th scope="row" className={styles.rowName}>
                    {user.name}
                  </th>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Badge tone={statusTone(user.status)}>{user.status}</Badge>
                  </td>
                  <td>{user.country}</td>
                  <td>{user.lastActive}</td>
                  <td>{user.spend}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>

          <div className={styles.metaRow}>
            <p className={styles.metaText}>Page 1 of 8 - 64 items</p>
            <div className={styles.pagination}>
              <button type="button" className={styles.pageButtonPrimary}>
                Previous
              </button>
              <button
                type="button"
                className={`${styles.pageButton} ${styles.pageButtonActive}`}
                aria-current="page"
              >
                1
              </button>
              <button type="button" className={styles.pageButton}>
                2
              </button>
              <button type="button" className={styles.pageButton}>
                8
              </button>
              <button type="button" className={styles.pageButtonPrimary}>
                Next
              </button>
            </div>
          </div>
        </section>
      </section>
    </AppShell>
  );
}
