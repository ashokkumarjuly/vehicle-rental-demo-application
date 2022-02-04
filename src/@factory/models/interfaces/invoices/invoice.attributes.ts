export interface IInvoiceAttributes {
    id?: number;
    rental_id?: number;
    user_id?: number;
    transaction_id?: string;
    total_amount?: number;
    sub_total_amount?: number;
    additional_amount?: number;
    damage_amount?: number;
    payment_status?: number;
    payment_method?: string;
    created_at?: string | Date;
    updated_at?: string | Date;
    created_by?: number;
}

export interface IInvoiceItemAttributes {
    id?: number;
    invoice_id?: number;
    vehicle_id?: number;
    user_id?: number;
    amount?: number;
    total_amount?: number;
    damage_amount?: number;
    damage_remarks?: string | null;
    payment_status?: number;
    created_at?: string | Date;
    updated_at?: string | Date;
    created_by?: number;
}
