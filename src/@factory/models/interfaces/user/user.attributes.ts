export interface IUserAttributes {
    id?: number;
    uid?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    email?: string;
    password?: string;
    customer_preferred_size?: number;
    phone_no?: string;
    phone_code?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip_code?: string | number;
    status?: number;
    created_by?: number;
    created_at?: string | Date;
    updated_at?: string | Date;
    deleted_at?: string | Date;
    roles?: IRoleAttributes[];
    available_amount?: number;
}

export interface IRoleAttributes {
    id?: number;
    name?: string;
    description?: string;
    created_at?: string | Date;
    updated_at?: string | Date;
    deleted_at?: string | Date;
}
