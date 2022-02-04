export interface IRentalAttributes {
    id?: number;
    vehicle_id?: number;
    user_id?: number;
    is_active?: number;
    initial_amount?: number;
    total_amount?: number;
    payment_status?: number;
    rent_type?: number;
    planned_start_date?: string | Date;
    actual_start_date?: string | Date;
    planned_return_date?: string | Date;
    actual_return_date?: string | Date;
    created_at?: string | Date;
    updated_at?: string | Date;
    created_by?: number;
    updated_by?: number;
}
