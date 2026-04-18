import { Badge, type DataTableColumn } from '@design-system';
import type { UserRow, UserSortField } from '@/features/dashboard/types';

const toStatusTone = (status: UserRow['status']): 'success' | 'warning' | 'error' => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'error';
    default:
      return 'warning';
  }
};

export const usersTableColumns: DataTableColumn<UserRow, UserSortField>[] = [
  {
    id: 'name',
    header: 'Name',
    sortable: true,
    sortKey: 'name',
    cell: (row: UserRow) => row.name,
  },
  {
    id: 'email',
    header: 'Email',
    sortable: true,
    sortKey: 'email',
    cell: (row: UserRow) => row.email,
  },
  {
    id: 'role',
    header: 'Role',
    sortable: true,
    sortKey: 'role',
    cell: (row: UserRow) => row.role,
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    sortKey: 'status',
    cell: (row: UserRow) => <Badge tone={toStatusTone(row.status)}>{row.status}</Badge>,
  },
  {
    id: 'country',
    header: 'Country',
    sortable: true,
    sortKey: 'country',
    cell: (row: UserRow) => row.country,
  },
  {
    id: 'lastActive',
    header: 'Last Active',
    sortable: true,
    sortKey: 'lastActive',
    cell: (row: UserRow) => row.lastActive,
  },
  {
    id: 'spend',
    header: 'Spend',
    sortable: true,
    sortKey: 'spend',
    align: 'right',
    cell: (row: UserRow) => `$${row.spend.toLocaleString()}`,
  },
];
