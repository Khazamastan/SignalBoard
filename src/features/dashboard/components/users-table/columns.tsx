import { Badge, type DataTableColumn } from '@design-system';
import type { UserRow, UserSortField } from '@/features/dashboard/types';
import type { Translate, TranslationKey } from '@/shared/i18n';

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

const statusKeyByValue: Record<UserRow['status'], TranslationKey> = {
  Active: 'table.users.status.active',
  Inactive: 'table.users.status.inactive',
  Pending: 'table.users.status.pending',
};

const roleKeyByValue: Record<UserRow['role'], TranslationKey> = {
  Admin: 'table.users.role.admin',
  Manager: 'table.users.role.manager',
  Analyst: 'table.users.role.analyst',
  Support: 'table.users.role.support',
};

export const createUsersTableColumns = (
  t: Translate,
): DataTableColumn<UserRow, UserSortField>[] => [
  {
    id: 'name',
    header: t('table.users.columns.name'),
    sortable: true,
    sortKey: 'name',
    cell: ({ name }: UserRow) => name,
  },
  {
    id: 'email',
    header: t('table.users.columns.email'),
    sortable: true,
    sortKey: 'email',
    cell: ({ email }: UserRow) => email,
  },
  {
    id: 'role',
    header: t('table.users.columns.role'),
    sortable: true,
    sortKey: 'role',
    cell: ({ role }: UserRow) => t(roleKeyByValue[role], role),
  },
  {
    id: 'status',
    header: t('table.users.columns.status'),
    sortable: true,
    sortKey: 'status',
    cell: ({ status }: UserRow) => (
      <Badge tone={toStatusTone(status)}>
        {t(statusKeyByValue[status], status)}
      </Badge>
    ),
  },
  {
    id: 'country',
    header: t('table.users.columns.country'),
    sortable: true,
    sortKey: 'country',
    cell: ({ country }: UserRow) => country,
  },
  {
    id: 'lastActive',
    header: t('table.users.columns.lastActive'),
    sortable: true,
    sortKey: 'lastActive',
    cell: ({ lastActive }: UserRow) => lastActive,
  },
  {
    id: 'spend',
    header: t('table.users.columns.spend'),
    sortable: true,
    sortKey: 'spend',
    align: 'right',
    cell: ({ spend }: UserRow) => `$${spend.toLocaleString()}`,
  },
];
