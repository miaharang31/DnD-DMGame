import { RowDataPacket } from "mysql2";

export default interface Users extends RowDataPacket {
    id?: number;
    email?: string;
    password?: string;
}