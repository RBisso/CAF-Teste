import mongoose, { Schema } from 'mongoose';
import Company from '../interfaces/company';

const CompanySchema: Schema = new Schema({
    cnpj: { type: String, required: true},
    razao_social: { type: String, required: true },
    uf: { type: String, required: true },
    qsa: []
});

export default mongoose.model<Company>('Company', CompanySchema);
