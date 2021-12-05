export const VARCHAR_FIELD_LENGTH = 255;
export const TEXT_FIELD_LENGTH = 21_844;
export const ORDER_BY = {
    ASC: 'asc',
    DESC: 'desc'
};

export const GEO_COUNTRY_MODEL_VISIBLE_PROPERTIES = ['id', 'name', 'shortname', 'phonecode'];
export const USER_MODEL_VISIBLE_PROPERTIES = [
    'id',
    'uid',
    'first_name',
    'last_name',
    'full_name',
    'email',
    'status',
    'customer_preferred_size',
    'address',
    'city',
    'state',
    'country',
    'zip_code',
    'phone_code',
    'phone_no',
    'created_at',
    'updated_at'
];
export const VEHICLE_MODEL_VISIBLE_PROPERTIES = [
    'uid',
    'sku',
    'status',
    'fuel_type_id',
    'vehicle_model_id',
    'vehicle_variant_id',
    'vehicle_no',
    'hourly_rent',
    'daily_rent',
    'created_at',
    'updated_at'
];

export const VEHICLE_RENTAL_MODEL_VISIBLE_PROPERTIES = [
    'vehicle_id',
    'user_id',
    'planned_start_date',
    'actual_start_date',
    'planned_return_date',
    'actual_return_date',
    'is_active',
    'initial_amount',
    'total_amount',
    'payment_status',
    'rent_type'
];
