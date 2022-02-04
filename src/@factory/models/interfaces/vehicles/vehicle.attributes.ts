export interface IVehicleAttributes {
    id?: number;
    uid?: string;
    sku?: string;
    fuel_type_id?: number;
    vehicle_model_id?: number;
    vehicle_variant_id?: number;
    vehicle_no?: string;
    status?: number;
    hourly_rent?: number;
    daily_rent?: number;
    created_at?: string | Date;
    updated_at?: string | Date;
    deleted_at?: string | Date;
    created_by?: number;
}
