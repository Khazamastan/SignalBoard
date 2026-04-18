import {
  ArrowDownIcon,
  ArrowUpIcon,
  Badge,
  Card,
  ConversionIcon,
  DataTable,
  InputField,
  RevenueIcon,
  SearchIcon,
  SessionsIcon,
  SortIcon,
  UsersIcon,
} from "@design-system";
import { AppShell } from "@/features/dashboard/layout/AppShell";
import styles from "./page.module.css";

type TrendDirection = "up" | "down";
type UserStatus = "Active" | "Pending" | "Inactive";

type KpiItem = {
  label: string;
  value: string;
  change: string;
  trend: TrendDirection;
  icon: React.ComponentType<{ className?: string; size?: number }>;
};

type UserRow = {
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  country: string;
  lastActive: string;
  spend: string;
};

const KPI_ITEMS: KpiItem[] = [
  {
    label: "Total Users",
    value: "48,392",
    change: "12.4%",
    trend: "up",
    icon: UsersIcon,
  },
  {
    label: "Monthly Revenue",
    value: "$1.24M",
    change: "8.1%",
    trend: "up",
    icon: RevenueIcon,
  },
  {
    label: "Avg. Sessions",
    value: "6.8",
    change: "1.7%",
    trend: "down",
    icon: SessionsIcon,
  },
  {
    label: "Conversion Rate",
    value: "4.92%",
    change: "3.6%",
    trend: "up",
    icon: ConversionIcon,
  },
];

const TRAFFIC_POINTS = [42, 48, 54, 50, 56, 62, 58, 64, 69, 66];

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
        <header className={styles.hero}>
          <h1 className={styles.title}>Analytics Dashboard</h1>
          <p className={styles.subtitle}>
            A token-driven design system with server-first rendering, URL-synced
            table interactions, and container-aware components.
          </p>
        </header>

        <section className={styles.kpiGrid} aria-label="Key metrics">
          {KPI_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.label} className={styles.kpiCard}>
                <div className={styles.kpiIconWrap}>
                  <Icon size={28} />
                </div>

                <div>
                  <p className={styles.kpiLabel}>{item.label}</p>
                  <p className={styles.kpiValue}>{item.value}</p>
                </div>

                <p
                  className={`${styles.kpiTrend} ${
                    item.trend === "up" ? styles.kpiTrendUp : styles.kpiTrendDown
                  }`}
                >
                  {item.trend === "up" ? (
                    <ArrowUpIcon size={16} />
                  ) : (
                    <ArrowDownIcon size={16} />
                  )}
                  {item.change}
                </p>
              </Card>
            );
          })}
        </section>

        <div className={styles.rangeTabs} role="group" aria-label="Date range">
          <button type="button" className={styles.rangeButton}>
            7d
          </button>
          <button
            type="button"
            className={`${styles.rangeButton} ${styles.rangeButtonActive}`}
            aria-current="true"
          >
            30d
          </button>
          <button type="button" className={styles.rangeButton}>
            90d
          </button>
        </div>

        <Card className={styles.trafficCard}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Traffic Overview</h2>
            <p className={styles.sectionHint}>Range: 30d</p>
          </div>

          <div className={styles.chartBody}>
            <div className={styles.barTrack}>
              {TRAFFIC_POINTS.map((height, index) => (
                <span
                  key={index}
                  className={styles.bar}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <div className={styles.axis}>
              <span>1</span>
              <span>6</span>
              <span>10</span>
            </div>
          </div>
        </Card>

        <section className={styles.usersSection} aria-label="Users table">
          <div className={styles.usersHead}>
            <h2 className={styles.usersTitle}>Users</h2>
            <InputField
              className={styles.searchUsers}
              hideMeta
              placeholder="Search users"
              prefix={<SearchIcon size={20} />}
              aria-label="Search users"
            />
          </div>

          <DataTable className={styles.userTable}>
            <thead>
              <tr>
                <th scope="col">
                  <span className={styles.headerCell}>
                    Name <SortIcon size={16} />
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
