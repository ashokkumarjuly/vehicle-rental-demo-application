import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from '../user';

export interface Data {
    readonly rental_id?: number;
    readonly user_id?: number;
    readonly transaction_id?: string;
    readonly total_amount?: number;
    readonly sub_total_amount?: number;
    readonly additional_amount?: number;
    readonly damage_amount?: number;
    readonly payment_status?: number;
    readonly created_at?: string | Date;
    readonly updated_at?: string | Date;
    readonly created_by?: number;
    readonly invoiceItems?: DataInvoiceItem[];
}

export interface DataInvoiceItem {
    readonly invoice_id?: number;
    readonly vehicle_id?: number;
    readonly user_id?: number;
    readonly amount?: string;
    readonly total_amount?: string;
    readonly damage_amount?: number;
    readonly damage_remarks?: string | null;
    readonly payment_status?: number;
    readonly created_at?: string | Date;
    readonly updated_at?: string | Date;
    readonly created_by?: number;
}

export interface IOptions {
    readonly data: Data;
    readonly loggedInUser?: IUserAttributes;
}

type ISignature = AsyncHandler<IOptions, IUserAttributes>;

export default ISignature;
