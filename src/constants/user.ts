export const USER_STATUS = {
    ACTIVE: 1,
    PENDING: 0,
    INACTIVE: 2,
    DELETED: -1
};

export const USER_WALLET_AMOUNT_TYPE = {
    CREDIT: 1,
    DEBIT: 2
};

export const USER_STATUS_LABEL: { [key: number]: string } = {
    1: 'ACTIVE',
    0: 'INACTIVE'
};
